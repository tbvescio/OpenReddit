const createError = require('http-errors')

const Post = require("../models/post");
const Account = require("../models/account");
const Comment = require("../models/comment");

exports.createPost = async (req, res, next) => {
  try {
    const {subreddit, title, body} = req.body;

    const post = new Post({
      username: req.username,
      subreddit: subreddit,
      title: title,
      body: body,
    });

    await post.save();
    await Account.updateOne(
      { username: req.username },
      { $push: { posts: post } }
    );

    return res.status(200).json({ message: "Success!" });
    
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.votePost = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const isUpvote = req.body.isUpvote;

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      const error = new Error("Post does not exists!");
      error.statusCode = 404;
      throw error;
    }
    if (isUpvote == true) {
      await post.upvote();
    } else {
      await post.downvote();
    }

    const user = await Account.findOne({ username: post.username });

    if (isUpvote == true) {
      await user.upvote();
    } else {
      await user.downvote();
    }

    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.commentPost = async (req, res, next) => {
  try {
    const {body,username ,postId } = req.body;

    const commment = new Comment({
      body: body,
      username: username,
      postId: postId,
    });

    await commment.save();
    return res.status(200).json({ message: "Success!" });
  } catch (err) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.voteComment = async (req, res, next) => {
  try {
    const {commentId,isUpvote} = req.body;

    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      const error = new Error("Comment does not exists!");
      error.statusCode = 404;
      throw error;
    }
    if (isUpvote == true) {
      await comment.upvote();
    } else {
      await comment.downvote();
    }

    const user = await Account.findOne({ username: comment.username });

    if (isUpvote == true) {
      await user.upvote();
    } else {
      await user.downvote();
    }

    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.postById = async (req, res, next) => {
  try {
    const {subreddit, postId} = req.params;

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      const error = new Error("Post does not exists!");
      error.statusCode = 404;
      throw error;
    }

    const comments = await Comment.find({ postId: postId });
    return res.status(200).json({ post: post, post_comments: comments });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const username = req.username;
    const postId = req.body.postId;

    const post = await Post.findOne({ _id: postId }).select("username");
    if (post.username === username) {
      await Post.deleteOne({ _id: postId });
      //removes post from user posts
      const user = await Account.findOne({ username: username });
      let userPosts = user.posts.map((post) => {
        if (post._id != postId) {
          return post;
        }
      });
      user.posts = userPosts;
      await user.save();
      return res.status(200).json({ post: post });
    }
    return res.status(401).json({ message: "user dont own post!" });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};
