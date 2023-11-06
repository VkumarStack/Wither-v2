var express = require('express');
var router = express.Router();

/* Controller vars */
const users_controller = require("../controllers/usersController");
const auth_controller = require("../controllers/authenticationController");
const post_controller = require("../controllers/postsController");

/* Controller Requires */
/* GET users listing. */
// To Do: Add a function that gets every single User object from the database and returns it 
// in a JSON array of just their names - i.e. {users: ["Joebruin", "testUser123"]} 
// If there are no users, the array should just be empty
//Done in getAllUsers


// The getUserID should take the parameter from the URL and then search in the database for the 
// user that matches it and return all of the information of the user from the User Model EXCEPT
// for their password - so it should return their username, bio, and posts array. If the user does 
// not exist, have all the values be null
// i.e. { username: "joebruin", bio: "biography", posts: [58909801, 1952158] }
//DONE
router.get("/:userID", users_controller.getUserID);

//Reutrns an array of all users in the data base and their properties
router.get("/:pattern?:cursor?", users_controller.getUsers);

// We also need a router.put("/:userID") for when the user updates their bio or follows another user


router.put("/:userID/follow", auth_controller.compareToken);
router.put("/:userID/follow", users_controller.followUser);

router.put("/:userID/bio", auth_controller.compareToken);
router.put("/:userID/bio", users_controller.validateBio);
router.put("/:userID/bio", users_controller.editBio);

router.get("/:userID/suggest", users_controller.suggestUser);
// We need one more function that checks to make sure the registration data is valid (test the username and 
// password with a Regex expression)
router.post("/", users_controller.validateRegistration);
router.post("/", auth_controller.encryptPassword);
router.post("/", users_controller.createUser);



module.exports = router;
