const User = require("../models/usersmod");


exports.getUsers = (req, res) => {
    res.send("NOT IMPLEMENTED: Users list");
  };
  
exports.getUserID = (req, res) => {
    res.json({ User: req.params.userID, arr: ["1", "2", "3"]});
  };

exports.createUser = async function createUser(req, res) {
  userdetails = {
    a_username: req.body.username, 
    a_password: req.body.password, 
    a_bio: req.body.bio,
    a_posts: []
  }
  var user = new User(userdetails);
  try {
    let otherUser = await User.findOne({a_username: req.body.username}).exec();
    if (otherUser !== null) {
      res.json({Error: "User already exists"})
      return;
    }
    else {
      await user.save();
      res.json({a_username: userdetails.a_username, a_bio: userdetails.a_bio, a_posts: userdetails.a_posts});
      return;
    }
  } catch {
    res.json({Error: "Something went wrong with the Database"});
  }
}