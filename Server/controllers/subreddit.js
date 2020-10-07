const createError = require("http-errors");

const Account = require("../models/account");
const Subreddit = require("../models/subreddit");
const Post = require("../models/post");

exports.createSubreddit = async (req, res, next) => {
  try {
    const { name, description } = req.body;

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
    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
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
    return res.status(200).json({
      subreddit: subreddit,
      subreddit_description: fetchedSubreddit.description,
      subreddit_posts: subredditPosts,
    });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.getFrontPage = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const suscribedSubs = await Account.find(
      { username: req.username },
      "suscribed"
    );

    const posts = await Post.find({
      subreddit: { $in: suscribedSubs[0].suscribed },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    let totalPages = await Post.countDocuments({
      subreddit: { $in: suscribedSubs[0].suscribed },
    });
    totalPages = Math.ceil(totalPages / 10);

    return res.status(200).json({
      status: "success!",
      totalPages,
      posts: posts,
    });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.getFrontPagePublic = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const posts = await Post.find()
      .sort({ time: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    let totalPages = await Post.estimatedDocumentCount();
    totalPages = Math.ceil(totalPages / 10);

    return res.status(200).json({
      status: "success!",
      totalPages,
      posts: posts,
    });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};
