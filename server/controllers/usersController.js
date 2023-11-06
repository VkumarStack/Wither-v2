const User = require("../models/usersmod");
const Authentication = require("../controllers/authenticationController");
const helper = require("../controllers/helper");
const PAGINATION_LENGTH = 10;

exports.userExists = async function userExists(username, session = null){
  try{
    const query = {a_username: {$regex: "^" + username + "$", $options: 'i'} };
    
    let user;
    if (session) {
      user = await User.findOne(query).session(session)
    } else {
      user = await User.findOne(query);
    }

    if (user === null)
      return false;

    return user;
  }
  catch {
    return false;
  }
}

exports.getUserID = async function getUserID(req, res){
  try{
    const query = {a_username: {$regex: "^" + req.params.userID + "$", $options: 'i'}};
    const user = await User.findOne(query);
    if (user === null)
    {
      res.json({Error: "User not found"});
      return;
    }
    res.json(user);
  }
  catch{
    res.json({Error: "Database error"})
  }
}


exports.getUsers = async (req, res) => {
  try{
    let queryConditions = {}
    if (req.query.pattern) {
      queryConditions.a_username = { $regex: req.query.pattern, $options: 'i' };
    }
    if (req.query.cursor) {
      queryConditions._id = { $lt: req.query.cursor };
    }
    const response = await User.find(queryConditions).sort({ _id: -1}).limit(PAGINATION_LENGTH).select("-a_password");
    let cursor = null;
    let users = [];
    if (response.length != 0) {
      if (response.length == PAGINATION_LENGTH) {
        cursor = response[response.length - 1]._id;
      }
      response.forEach(element => users.push(element));
    }
    res.send({users: users, cursor: cursor});
  }
  catch {
    res.send({Error: "Could not fetch all users"});
  }
};

//Following a user
exports.followUser = async (req, res) => {
  const followUser = async(req, res, session) => {
    const userFollowing = req.body.username && await User.findOne({a_username: req.body.username}).session(session);
    const userFollowed = await User.findOne({a_username: req.params.userID}).session(session);
    if (!(userFollowing && userFollowed) || (userFollowing._id.equals(userFollowed._id))) {
      throw new Error('Invalid users')
    }

    const i = userFollowing.a_following.indexOf(userFollowed.a_username);
    const j = userFollowed.a_followers.indexOf(userFollowing.a_username);


    // User is already in follow list, so an unfollow
    if (i >= 0) {
      userFollowing.a_following.splice(i, 1);
      userFollowed.a_followers.splice(j, 1);
    } // User is not in follow list, so a follow
    else {
      userFollowing.a_following.push(userFollowed.a_username);
      userFollowed.a_followers.push(userFollowing.a_username);
    }

    await userFollowed.save({ session });
    await userFollowing.save({ session });
    // Return all users the current user is following as well as all users that are following the followee
    res.json({ following: userFollowing.a_following, followers: userFollowed.a_followers });
    return;
  }
  let result = await helper.handleTransaction(followUser, req, res);
  if (!result) {
    res.json({Error: "Could not follow user"});
  }
  /*
  const session = await Mongoose.connection.startSession(); 
  try
   {
    session.startTransaction();
    const userFollowing = req.body.username && await User.findOne({a_username: req.body.username}).session(session);
    const userFollowed = await User.findOne({a_username: req.params.userID}).session(session);
    if (!(userFollowing && userFollowed)) {
      throw new Error('Invalid users')
    }
    const i = userFollowing.a_following.indexOf(userFollowed.a_username);
    const j = userFollowed.a_followers.indexOf(userFollowing.a_username);

    // User is already in follow list, so an unfollow
    if (i >= 0) {
      userFollowing.a_following.splice(i, 1);
      userFollowed.a_followers.splice(j, 1);
    } // User is not in follow list, so a follow
    else {
      userFollowing.a_following.push(userFollowed.a_username);
      userFollowed.a_followers.push(userFollowing.a_username);
    }

    await userFollowed.save({ session });
    await userFollowing.save({ session });
    await session.commitTransaction();
    await session.endSession();
    res.json({ following_List: userFollowing.a_following });
  }
  catch
  {
    await session.abortTransaction();
    await session.endSession();
    res.json({Error: "Could not follow/unfollow user"});
  }
  */
}

exports.suggestUser = async(req, res) => {
  try {
    const query = {a_username: {$ne: `${req.params.userID}`}, a_followers: {$nin: [`${req.params.userID}`]}}

    const result = await User.aggregate([
      {$match: query},
      {$sample: {size: 5}}
    ])
    res.json({users: result})
  } catch {
    res.json({Error: "Could not suggest users to follow"});
  }
}

//Edit bio
exports.validateBio = async(req, res, next) => {
try {
  if(req.body.bio.length > 250)
  {
    res.json({Error: "Inputted bio length is too long"});
    return;
  }
  next();
  } 
  catch {
    res.json({Error: "Invalid bio length"});
  }
}

exports.editBio = async (req, res) => {
  try {
    const data = await User.findOneAndUpdate({a_username: req.params.userID}, {a_bio: req.body.bio}, {new : true});
    res.json(data);
    }
  catch
  {
    res.json({Error: "Bio failed to update"});
  }

}
  
exports.validateRegistration = async(req, res, next) => {
  try {
    const usernameReq = new RegExp("[A-Za-z][A-Za-z0-9_]{2,14}")
    const passwordReq = new RegExp("(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,128}")
    if (req.body.username.match(usernameReq) && req.body.username.match(usernameReq)[0].length == req.body.username.length &&
        req.body.password.match(passwordReq) && req.body.password.match(passwordReq)[0].length == req.body.password.length) {
      next();
      return;
    }
    else {
      throw new Error("Invalid credentials");
    }
  }
  catch {
    res.json({Error: "Invalid regisration"});
  }

}
// Split this so that one function checks if the user already exists 
// and the next adds them to the database
exports.createUser = async function createUser(req, res) {
  try {
    userdetails = {
      a_username: req.body.username, 
      a_password: req.body.password, 
      a_bio: "Create a Bio",
      a_posts: [],
      a_followers: [],
      a_following: []
    }
    const result = await User.updateOne({a_username: {$regex: "^" + userdetails.a_username + "$", $options: 'i'}}, { $setOnInsert: userdetails }, { upsert: true });
    if (result.matchedCount > 0) {
      throw new Error('User already exists')
    }
    
    const token = Authentication.createToken(req.body.username);
    res.json({a_username: req.body.username, token: token});
  } catch {
    res.json({Error: "User already exists"});
  }
}