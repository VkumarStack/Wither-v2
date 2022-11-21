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
    try {
      let user = await User.userExists(req.body.username);
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
      await newPost.save();
      console.log(newPost)
      user.a_posts.push(newPost._id);
      await user.save();
      res.json(newPost);
      return;
     } 
     catch {
      res.json({Error: "Something went wrong with creating your post"});
     }
}

//Like or Dislike post
exports.ratePost = async (req, res) => {
    try {
      req.body.boolean = String(req.body.boolean);
      let user = await User.userExists(req.body.username.toLowerCase());
      if (!user) {
        res.json({Error: "User does not exist"})
        return;
      }
      let post = await exports.postExists(req.params.postID);
      //Check if post exists
      if (!post) {
        res.json({Error: "Post does not exist"})
        return;
      }
      // Had to alter the code here because I realized that if a user has liked a post and then dislikes, it should remove their dislike (and vice versa)
      let likeIndex = post.a_likes.indexOf(user.a_username);
      let dislikeIndex = post.a_dislikes.indexOf(user.a_username);
      
      // Remove the like if the like exists and either the user has already liked it (so they are removing a like) or they have disliked it already (so the like must be undone)
      if (likeIndex !== -1 && (req.body.boolean.toLowerCase() === "true" || (req.body.boolean.toLowerCase() !== "true" && dislikeIndex === -1)))
      {
        //remove user from list of likes
        post.a_likes.splice(likeIndex, 1);
      }
      // Add them to likes if request is for a like and the like is not already in the array
      if (req.body.boolean.toLowerCase() === "true" && likeIndex === -1)
      {
        //add user to list of likes
        post.a_likes.push(user.a_username);
      }
      // Remove the dislike if the dislike exists and the user has already disliked it (so they are removing the dislike) or they have liked already (so the dislike must be undone)
      if (dislikeIndex !== -1 && (req.body.boolean.toLowerCase() !== "true" || (req.body.boolean.toLowerCase() === "true" && likeIndex === -1)))
      {
        //remove user from list of dislikes
        post.a_dislikes.splice(dislikeIndex, 1);
      }
      // Add them to dislikes if the request is for a dislike and the dislike is not already in the array
      if (req.body.boolean.toLowerCase() !== "true" && dislikeIndex === -1)
      {
        //add user to list of dislikes
        post.a_dislikes.push(user.a_username);
      }

      if (post.a_dislikes.length >= 5 && post.a_dislikes.length >= 2 * post.a_likes.length)
      {
        let postUser = await User.userExists(post.a_username.toLowerCase());
        let index = postUser.a_posts.indexOf(post._id);
        postUser.a_posts.splice(index, 1);
        await postUser.save();
        
        await Post.deleteOne({_id: post._id});

        res.json({Deleted: "true"})
        return;
      }
      else await post.save();
      
      res.json({likes: post.a_likes, dislikes: post.a_dislikes});
    }
    catch {
      res.json({Error: "Something went wrong with rating the post"});
    }
  };