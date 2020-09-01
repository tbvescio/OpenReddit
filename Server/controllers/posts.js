const Post = require("../models/post");
const Account = require("../models/account");
const Comment = require("../models/comment");

exports.createPost = async (req, res, next) => {
  try {
    const subreddit = req.body.subreddit;
    const title = req.body.title;
    const body = req.body.body;

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

    res.status(200).json({ message: "Success!" });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
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

    res.status(200).json({ message: "Success!" });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};

exports.commentPost = async (req, res, next) => {
  try {
    const body = req.body.body;
    const username = req.body.username;
    const postId = req.body.postId;

    const commment = new Comment({
      body: body,
      username: username,
      postId: postId,
    });

    await commment.save();
    res.status(200).json({ message: "Success!" });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};

exports.voteComment = async (req, res, next) => {
  try {
    const commentId = req.body.commentId;
    const isUpvote = req.body.isUpvote;

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

    res.status(200).json({ message: "Success!" });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};

exports.postById = async (req, res, next) => {
  try {
    const subreddit = req.params.subreddit;
    const postId = req.params.postId;

    const post = await Post.findOne({ _id: postId });
    if (!post) {
      const error = new Error("Post does not exists!");
      error.statusCode = 404;
      throw error;
    }

    const comments = await Comment.find({ postId: postId });
    res.status(200).json({ post: post, post_comments: comments });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
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
      res.status(200).json({ post: post });
      return;
    }
    res.status(401).json({ message: "user dont own post!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};
