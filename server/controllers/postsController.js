const Post = require("../models/postsmod");
const User = require("../controllers/usersController");
const { query } = require("express");
const helper = require("../controllers/helper")
const e = require("express");
const PAGINATION_LENGTH = 10;

exports.postExists = async function postExists(postID, session = null){
  try{
    const query = {_id: postID};

    let post; 
    if (session) {
      post = await Post.findOne(query).session(session);
    } else {
      post = await Post.findOne(query);
    }


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
      let queryConditions = {}
      if (req.query.pattern) {
        queryConditions.a_username = { $regex: req.query.pattern, $options: 'i' };
      }
      if (req.query.cursor) {
        queryConditions._id = { $lt: req.query.cursor };
      }
      const response = await Post.find(queryConditions).sort({createdAt: -1, _id: -1}).limit(PAGINATION_LENGTH);
      let cursor = null;
      let posts = [];
      if (response.length != 0) {
        if (response.length == PAGINATION_LENGTH) {
          cursor = response[response.length - 1]._id;
        }
        response.forEach(element => posts.push(element));
      }
      res.send({posts: posts, cursor: cursor});
    }
    catch {
      res.send({Error: "Could not fetch posts"});
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

exports.validatePost = async(req, res, next) => {
  try {
    if (req.body.text && req.body.text.length <= 280 && req.body.text.length >= 1) {
      next();
    }
    else {
      throw new Error("Invalid post text length")
    }
    return;
  } catch {
    res.json({Error: "Invalid post text length"});
  }
}

// Implement retry logic on this one, as a WriteConflict may occur if the user makes multiple posts at the same time
//Create new post
exports.createPost = async function createPost(req, res) {
  const createPost = async(req, res, session) => {
    const postee = await User.userExists(req.body.username, session);
    if (!postee) {
      throw new Error('User creating post does not exist');
    }

    const post = new Post({a_text: req.body.text, a_username: req.body.username, a_likes: [], a_dislikes: []});
    postee.a_posts.push(post._id);
    await post.save({ session });
    await postee.save({ session });
    res.json(post);
    return;
  }
  let result = await helper.handleTransaction(createPost, req, res);
  if (!result) {
    res.json({ Error: "Could not create post" });
  }

  /* 
  const session = await Mongoose.connection.startSession();
  let currentTry = 0;
  while (currentTry < 5) {
    try {
      session.startTransaction();
      const postee = await User.userExists(req.body.username, session);
      if (!postee) {
        throw new Error('User creating post does not exist');
      }
      
      await sleep(5000);
      const post = new Post({a_text: req.body.text, a_username: req.body.username, a_likes: [], a_dislikes: []});
      postee.a_posts.push(post._id);
      await post.save({ session });
      await postee.save({ session });
      await session.commitTransaction();
      await session.endSession();
      res.json(post);
      return;
      } 
      catch(e) {
      await session.abortTransaction();
      if (e.codeName == "WriteConflict") {
        currentTry++;
        continue;
      }
      await session.endSession();
      res.json({Error: "Cannot create post"});
      return;
      }
  }
  await session.endSession();
  res.json({Error: "Please try again"});
  return;
  */
}

//Like or Dislike post
exports.ratePost = async (req, res) => {
  const ratePost = async(req, res, session) => {
    const user = await User.userExists(req.body.username, session);
    if (!user) {
      throw new Error("User liking post does not exist");
    }

    const post = await exports.postExists(req.params.postID, session);
    if (!post) {
      throw new Error("Post being liked does not exist");
    }

    const likeIndex = post.a_likes.indexOf(user.a_username);
    const dislikeIndex = post.a_dislikes.indexOf(user.a_username);

    // Post is being liked
    if (req.body.boolean == "true") {
      // If the post is already liked, then the user is unliking
      if (likeIndex >= 0) {
        post.a_likes.splice(likeIndex, 1);
      } else { // Otherwise, add a like and remove any existing dislikes (a user cannot both like and dislike a post)
        post.a_likes.push(user.a_username);
        if (dislikeIndex >= 0) {
          post.a_dislikes.splice(dislikeIndex, 1);
        }
      }
    } else {
      // If the post is already disliked, then the user is undisliking
      if (dislikeIndex >= 0) {
        post.a_dislikes.splice(dislikeIndex, 1);
      } else { // Otherwise, add a dislike and remove existing likes
        post.a_dislikes.push(user.a_username);
        if (likeIndex >= 0) {
          post.a_likes.splice(likeIndex, 1);
        }
      }
    }

    // Wither feature - remove a post if there are a sufficient amount of dislikes compared to likes
    if (post.a_dislikes.length >= 5 && post.a_dislikes.length >= 2 * post.a_likes.length) {
      const postUser = await User.userExists(post.a_username, session);
      const index = postUser.a_posts.indexOf(post._id);
      if (index >= 0) {
        postUser.a_posts.splice(index, 1);
      }
      await postUser.save({ session });
      await Post.deleteOne({ _id: post._id }).session(session);
      res.json({Deleted: "true"})
    } else {
      await post.save({ session });
      res.json(post);
    }
    return;
  }

  let result = await helper.handleTransaction(ratePost, req, res);
  if (!result) {
    res.json({Error: "Could not like post"});
  }
  /* 
  const session = await Mongoose.connection.startSession();
  let currentTry = 0;
  while (currentTry < 5) {
    try {
      session.startTransaction();
      const user = await User.userExists(req.body.username, session);
      if (!user) {
        throw new Error("User liking post does not exist");
      }

      const post = await exports.postExists(req.params.postID, session);
      if (!post) {
        throw new Error("Post being liked does not exist");
      }

      const likeIndex = post.a_likes.indexOf(user.a_username);
      const dislikeIndex = post.a_dislikes.indexOf(user.a_username);

      // Post is being liked
      if (req.body.boolean == "true") {
        // If the post is already liked, then the user is unliking
        if (likeIndex >= 0) {
          post.a_likes.splice(likeIndex, 1);
        } else { // Otherwise, add a like and remove any existing dislikes (a user cannot both like and dislike a post)
          post.a_likes.push(user.a_username);
          if (dislikeIndex >= 0) {
            post.a_dislikes.splice(dislikeIndex, 1);
          }
        }
      } else {
        // If the post is already disliked, then the user is undisliking
        if (dislikeIndex >= 0) {
          post.a_dislikes.splice(dislikeIndex, 1);
        } else { // Otherwise, add a dislike and remove existing likes
          post.a_dislikes.push(user.a_username);
          if (likeIndex >= 0) {
            post.a_likes.splice(likeIndex, 1);
          }
        }
      }

      // Wither feature - remove a post if there are a sufficient amount of dislikes compared to likes
      if (post.a_dislikes.length >= 5 && post.a_dislikes.length >= 2 * post.a_likes.length) {
        const postUser = await User.userExists(post.a_username, session);
        const index = postUser.a_posts.indexOf(post._id);
        if (index >= 0) {
          postUser.a_posts.splice(index, 1);
        }
        await postUser.save({ session });
        await Post.deleteOne({ _id: post._id }).session(session);
        res.json({Deleted: "true"})
      } else {
        await post.save({ session });
        res.json(post);
      }

      await session.commitTransaction();
      await session.endSession();
      return;
    } catch(e) {
      await session.abortTransaction();
      if (e.codeName == "WriteConflict") {
        currentTry++;
        continue;
      }
      await session.endSession();
      res.json({Error: "Could not like post"});
      return;
    }
  }
  await session.endSession();
  res.json({Error: "Please try again"});
  return;
  */ 
};