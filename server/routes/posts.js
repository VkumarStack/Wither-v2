var express = require('express');
var router = express.Router();

/* Controller vars */
const posts_controller = require("../controllers/postsController");
const auth_controller = require("../controllers/authenticationController");

//GET specific post
// This should return all of the information for a specific post in a JSON 
// object - the Post text, author, date, likes, and dislikes
// If the post does not exist in the database, each object key should be null
// DONE
router.get("/:postID", posts_controller.getPostID);

//GET all posts
// This should return an array of Object ID's for all posts in the database
// DONE
router.get("/", posts_controller.getPosts);

//POST new post 
// Request body should contain: username and text
// This should first check to make sure the data entered is valid (i.e. it doesn't exceed)
// the maximum length. Then, it should create a new Post object in the Database with the 
// current time as the date and the author being set to the username passed in the request body.
// It should check to see if the User actually exists in the database (and if they don't, then 
// don't create the post and return an Error JSON object) before setting the post author.
router.post("/", posts_controller.validatePost);
router.post("/", auth_controller.compareToken);
router.post("/", posts_controller.createPost);

//PUT like/dislike
// Request body should contain: username, boolean representing whether the post is liked or disliked
// This should first check to make sure that the user performing the like or dislike exists in the database. 
// If they don't, return an Error.
// It should then check if the post with that ID exists in the database, and also return an Error if it doesn't.
// If the request body indicates that they are liking the post and the post object in the database isn't 
// already liked by the user, add the user to post's array of likes. If the user has already liked it, then remove 
// their like from the post's array of likes. 
// Do the same functionality for dislikes. 
router.put("/:postID", auth_controller.compareToken);
router.put("/:postID", posts_controller.ratePost);

module.exports = router;
