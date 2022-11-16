const User = require("../models/usersmod");
const Authentication = require("../controllers/authenticationController");

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
  

// Split this so that one function checks if the user already exists 
// and the next adds them to the database
exports.createUser = async function createUser(req, res) {
  userdetails = {
    a_username: req.body.username.toLowerCase(), 
    a_password: req.body.password, 
    a_bio: "Create a Bio",
    a_posts: [],
    a_followers: []
  }
  var user = new User(userdetails);
  try {
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