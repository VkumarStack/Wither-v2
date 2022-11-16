var express = require('express');
var router = express.Router();
var User = require('../models/usersmod');

/* Controller vars */
const users_controller = require("../controllers/usersController");
const auth_controller = require("../controllers/authenticationController");

/* Controller Requires */
/* GET users listing. */
// To Do: Add a function that gets every single User object from the database and returns it 
// in a JSON array of just their names - i.e. {users: ["Joebruin", "testUser123"]} 
// If there are no users, the array should just be empty
router.get('/', users_controller.getUsers);

// Delete this
router.get("/dummy", function (req, res) {
  res.send("Dummy user page");
});

// The getUserID should take the parameter from the URL and then search in the database for the 
// user that matches it and return all of the information of the user from the User Model EXCEPT
// for their password - so it should return their username, bio, and posts array. If the user does 
// not exist, have all the values be null
// i.e. { username: "joebruin", bio: "biography", posts: [58909801, 1952158] }
router.get("/:userID", users_controller.getUserID);
// res.send(users_controller.getUserID););

// We also need a router.put("/:userID") for when the user updates their bio or follows another user

// We need one more function that checks to make sure the registration data is valid (test the username and 
// password with a Regex expression)
router.post("/", auth_controller.encryptPassword);
router.post("/", users_controller.createUser);



module.exports = router;
