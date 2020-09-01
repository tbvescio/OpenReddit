const Account = require("../models/account");
const Subreddit = require("../models/subreddit");
const Post = require("../models/post");


exports.createSubreddit = async (req, res, next) => {
  try {
    const name = req.body.name;
    const description = req.body.description;

    const fetchedSubreddit = await Subreddit.findOne({ name: name });
    if (fetchedSubreddit) {
      const error = new Error("Subreddit already exists!");
      error.statusCode = 409;
      throw error;
    }

    const subreddit = new Subreddit({ name: name, description: description });
    await subreddit.save();
    await Account.updateOne(
      { username: req.username },
      { $push: { owned_subreddit: name } }
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

exports.getSubreddit = async (req, res, next) => {
  try {
    const subreddit = req.params.subreddit;
    const fetchedSubreddit = await Subreddit.findOne({ name: subreddit });
    if (!fetchedSubreddit) {
      const error = new Error("That Subreddit does not exists!");
      error.statusCode = 404;
      throw error;
    }
    const subredditPosts = await Post.find({ subreddit: subreddit });
    res.status(200).json({
      subreddit: subreddit,
      subreddit_description: fetchedSubreddit.description,
      subreddit_posts: subredditPosts,
    });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};

exports.getFrontPage = async (req, res, next) => {
  try {
    const suscribedSubs = await Account.find(
      { username: req.username },
      "suscribed"
    );
    const posts = await Post.find({
      subreddit: { $in: suscribedSubs[0].suscribed },
    });
    res.status(200).json({
      status: "success!",
      posts: posts,
    });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};

exports.getFrontPagePublic = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ time: -1 }).limit(30);
    res.status(200).json({
      status: "success!",
      posts: posts,
    });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};
