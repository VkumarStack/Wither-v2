const Post = require("../models/postsmod");
const user_controller = require("./usersController");
const User = require("../models/usersmod");

//Dummy data
let samplePosts = {
    1: {
      a_text: "Go UCLA!",
      a_username: "Joe Bruin",
      a_dateCreated: new Date,
      a_likes: [],
      a_dislikes: [],
    },
    2: {
        a_text: "Hello World!",
        a_username: "Mr. A",
        a_dateCreated: Date,
        a_likes: [],
        a_dislikes: [],
    },
    3: {
        a_text: "Go USC!",
        a_username: "Trojan",
        a_dateCreated: Date,
        a_likes: [],
        a_dislikes: [],
    },
  };

//List all posts
exports.getPosts = (req, res) => {
    res.json(samplePosts);
  };
  
//Get specific post
exports.getPostID = (req, res) => {
    res.json(samplePosts[req.params.postID]);
  };

//Create new post
exports.createPost = async function createPost(req, res) {
  let user = await user_controller.userExists(req.body.user);
  if ( user === false)
  {
    res.json({Error: "User creating post does not exist"});
    return;
  }

  current_Date = Date();
    postdetails = {
      a_text: req.body.text,
      a_username: req.body.user,
      a_dateCreated: current_Date,
      a_likes: [],
      a_dislikes: [],
    }

    const newPost = new Post(postdetails);
    try{
      await newPost.save();
      console.log(newPost)
      user.a_posts.push(newPost._id);
      await user.save();
      res.json(newPost);
      return;
    } catch{
      res.json({Error: "Something went wrong with creating your post"});
    }
  }

//Like or Dislike post
exports.ratePost = (req, res) => {
    res.json({ Post: req.params.postID, rate: "Like/Dislike"});
  };