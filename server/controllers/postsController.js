const Post = require("../models/postsmod");

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
exports.getPosts = async (req, res) => {
    try{
      const response = await Post.find();
      let test = [];
      response.forEach(element => test.push(element._id));
      res.send({posts: test});
    }
    catch {
      res.send({Error: "Could not fetch all posts"});
    }
  };
  
//Get specific post
exports.getPostID = (req, res) => {
    res.json(samplePosts[req.params.postID]);
  };

//Create new post
exports.createPost = async function createPost(req, res) {
  current_Date = Date();
    postdetails = {
      a_text: req.body.text,
      a_username: "DUMMY",
      a_dateCreated: current_Date,
      a_likes: [],
      a_dislikes: [],
    }

    const newPost = new Post(postdetails);
    try{
      await newPost.save();
      res.json({
        a_text: postdetails.a_text, 
        a_username: postdetails.a_username,
        a_dateCreated: postdetails.a_dateCreated, 
        a_likes: postdetails.a_likes,
        a_dislikes: postdetails.a_dislikes
      });
      return;
    } catch{
      res.json({Error: "Something went wrong with creating your post"});
    }
  }

//Like or Dislike post
exports.ratePost = (req, res) => {
    res.json({ Post: req.params.postID, rate: "Like/Dislike"});
  };