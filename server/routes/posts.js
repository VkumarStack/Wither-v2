var express = require('express');
var router = express.Router();

/* Controller vars */
const posts_controller = require("../controllers/postsController");

//GET specific post
router.get("/:postID", posts_controller.getPostID);

//GET all posts
router.get("/", posts_controller.getPosts);

//POST new post 
router.post("/", posts_controller.createPost);

//PUT like/dislike
router.put("/:postID", posts_controller.ratePost);

module.exports = router;
