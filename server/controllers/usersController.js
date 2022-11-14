const User = require("../models/usersmod");
const jwt = require('jsonwebtoken');

exports.getUsers = (req, res) => {
    res.send("NOT IMPLEMENTED: Users list");
  };
  
exports.getUserID = (req, res) => {
    res.json({ username: req.params.userID, arr: ["1", "2", "3"]});
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
    let otherUser = await User.findOne({a_username: req.body.username.toLowerCase()}).exec();
    if (otherUser !== null) {
      res.json({Error: "User already exists"})
      return;
    }
    else {
      await user.save();
      const token = jwt.sign({username: req.body.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "2h"});
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
