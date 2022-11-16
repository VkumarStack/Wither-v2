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
<<<<<<< HEAD

//Done in getAllUsers
router.get('/', function(req, res, next) {
  res.json({userlist: ["joebruin123", "penguinz0", "ludwig"]});
});
=======
router.get('/', users_controller.getUsers);
>>>>>>> 1336cd33e3b512a24a3ee6d33e339665dc5b35fd

//Reutrns an array of all users in the data base and thier properties
router.get("/getAllUsers", users_controller.getUsers);
//If a user exists returns that users properties
router.get("/userExists", users_controller.userExists);
//If a user exists returns their ID
router.get("/IdFromUsername", users_controller.idFromUsername);

// The getUserID should take the parameter from the URL and then search in the database for the 
// user that matches it and return all of the information of the user from the User Model EXCEPT
// for their password - so it should return their username, bio, and posts array. If the user does 
// not exist, have all the values be null
// i.e. { username: "joebruin", bio: "biography", posts: [58909801, 1952158] }
//DONE
router.get("/:userID", users_controller.getUserID);
// res.send(users_controller.getUserID););

// We also need a router.put("/:userID") for when the user updates their bio or follows another user

// We need one more function that checks to make sure the registration data is valid (test the username and 
// password with a Regex expression)
router.post("/", auth_controller.encryptPassword);
router.post("/", users_controller.createUser);



module.exports = router;
