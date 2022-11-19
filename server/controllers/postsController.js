const Post = require("../models/postsmod");
const User = require("../controllers/usersController");

exports.postExists = async function postExists(postID){
  try{
    const query = {_id: postID};

    const post = await Post.findOne(query);

    if(post === null)
      return false;

    return post;
  }
  catch {
    console.log("Database error");
    return false;
  }
}

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
exports.getPostID = async function getPostID(req, res) {
    try{
      const query = {_id: req.params.postID};
      const post = await Post.findOne(query);
      if (post === null)
      {
        res.json({Error: "Post not found"});
        return;
      }
      res.json(post);
    }
    catch{
      res.json({Error: "Database error"})
    }
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
      a_username: req.body.username,
      a_dateCreated: current_Date,
      a_likes: [],
      a_dislikes: [],
    }

    //check length of text
    if (req.body.text.length > 280) {
      res.json({Error: "Text too long"})
      return;
    }

    if (!(await User.userExists(req.body.username.toLowerCase()))) {
      res.json({Error: "User does not exist"})
      return;
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
exports.ratePost = async (req, res) => {
    if (!(await User.userExists(req.body.username.toLowerCase()))) {
      res.json({Error: "User does not exist"})
      return;
    }

    //Check if post exists
    if (!(await exports.postExists(req.params.postID))) {
      res.json({Error: "Post does not exist"})
      return;
    }

    if (req.body.boolean)
    {
      const post = await Post.findOne({_id: req.params.postID});
      const user = await User.findOne({a_username: req.body.username});
      let index = post.a_likes.indexOf(user._id);
      if (index !== -1)
      {
        //remove user from list of likes
        post.a_likes.splice(index, 1);
      }
      else
      {
        //add user to list of likes
        post.a_likes.push(user._id);
      }
    }
    else
    {
      const post = await Post.findOne({_id: req.params.postID});
      const user = await User.findOne({a_username: req.body.username});
      let index = post.a_dislikes.indexOf(user._id);
      if (index !== -1)
      {
        //remove user from list of dislikes
        post.a_dislikes.splice(index, 1);
      }
      else
      {
        //add user to list of dislikes
        post.a_dislikes.push(user._id);
      }
    }

    Post.save();
  };