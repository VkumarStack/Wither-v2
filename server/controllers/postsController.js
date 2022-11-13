const postInstance = require("../models/postsmod");

//Dummy data
let samplePosts = {
    1: {
      a_text: "Go UCLA!",
      a_username: "Joe Bruin",
      a_likes: '5',
      a_dislikes: '0',
    },
    2: {
        a_text: "Hello World!",
        a_username: "Mr. A",
        a_likes: '3',
        a_dislikes: '2',
    },
    3: {
        a_text: "Go USC!",
        a_username: "Trojan",
        a_likes: '0',
        a_dislikes: '4',
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
exports.createPost = (req, res) => {
    const id = 4;
    const newPost = {
      a_text: req.body.text,
      a_username: "DUMMY",
      a_likes: '0',
      a_dislikes: '0',
    }
    samplePosts[id];
    res.json(newPost);
  };

//Like or Dislike post
exports.ratePost = (req, res) => {
    res.json({ Post: req.params.postID, rate: "Like/Dislike"});
  };