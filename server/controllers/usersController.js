const User = require("../models/usersmod");
const Authentication = require("../controllers/authenticationController");
const { request } = require("express");

exports.idFromUsername = async function idFromUsername(username){
  try{
    const field = "_id";
    const query = {a_username: username.toLowerCase()};

    const id = await User.distinct(field, query);
    if (id.length === 0)
      return false;
    return id;
  }
  catch {
    return false;
  }
}

exports.userExists = async function userExists(username){
  try{
    const query = {a_username: username.toLowerCase()};

    const user = await User.findOne(query).select("-a_password");

    if(user === null)
      return false;

    return user;
  }
  catch {
    console.log("Database error");
    return false;
  }
}

exports.getUserID = async function getUserID(req, res){
  try{
    const query = {a_username: req.params.userID.toLowerCase()};
    const user = await User.findOne(query, {a_password: 0});
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
    const response = await User.find({}).select("a_username -_id");
    let test = [];
    response.forEach(element => test.push(element.a_username));
    res.send({users: test});
  }
  catch {
    res.send({Error: "Could not fetch all users"});
  }
};

//Following a user

exports.followUser = async (req, res) => {
   try
   {
    const userFollowing = await exports.userExists(req.body.username);
    let userFollowed = await exports.userExists(req.params.userID);
    if(userFollowing !== false && userFollowed !== false)
    {
      let n = userFollowed.a_followers.indexOf(userFollowing.a_username);
      let g = userFollowing.a_following.indexOf(userFollowed.a_username);
      //console.log(n);
      if(n >= 0)
      {
        //console.log("test");
        userFollowed.a_followers.splice(n, 1);
      }
      else
      {
        userFollowed.a_followers.push(userFollowing.a_username);
        
      }
      if(g >= 0)
      {
        //console.log("test");
        userFollowing.a_following.splice(n, 1);
      }
      else
      {
        userFollowing.a_following.push(userFollowed.a_username);
      }
      await userFollowed.save();
      await userFollowing.save();
      res.json({ followed_List: userFollowed.a_followers, following_list: userFollowing.a_following });
     // res.json({ following_List: userFollowing.a_following });
    }
    else
      res.json({Error: "User doesn't exist"}); 
  }
  catch
  {
    res.json({Error: "Could not follow/unfollow user"});
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
    res.json({Error: "Something went wrong when editing the bio"});
  }
}
exports.editBio = async (req, res) => {
  try {
    let user = await exports.userExists(req.params.userID);
    if(user === false)
    {
      res.json({Error: "User doesn't exist to edit bio"});
      return;
    }
    user.a_bio = req.body.bio;
    user.save();
    res.json({bio: user.a_bio});
      }
  catch
  {
    res.json({Error: "Bio failed to update"});
  }

}
  

// Split this so that one function checks if the user already exists 
// and the next adds them to the database
exports.createUser = async function createUser(req, res) {
  try {
    userdetails = {
      a_username: req.body.username.toLowerCase(), 
      a_password: req.body.password, 
      a_bio: "Create a Bio",
      a_posts: [],
      a_followers: []
    }
    var user = new User(userdetails);
    if (await exports.userExists(req.body.username.toLowerCase())) {
      res.json({Error: "User already exists"})
      return;
    }
    else {
      await user.save();
      const token = Authentication.createToken(req.body.username);
      res.json({a_username: userdetails.a_username, 
                a_bio: userdetails.a_bio,
                a_posts: userdetails.a_posts, 
                a_followers: userdetails.a_followers,
                token: token});
      return;
    }
  } catch {
    res.json({Error: "Something went wrong with the Database"});
  }
}
