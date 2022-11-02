const userInstance = require("../models/usersmod");


exports.getUsers = (req, res) => {
    res.send("NOT IMPLEMENTED: Users list");
  };
  
exports.getUserID = (req, res) => {
    res.json({ User: req.params.userID, arr: ["1", "2", "3"]});
  };