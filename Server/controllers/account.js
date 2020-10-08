const createError = require('http-errors')

const Account = require("../models/account");
const Subreddit = require("../models/subreddit");

exports.getUserProfile = async (req, res, next) => {
  try {
    const {username} = req.params;

    const user = await Account.findOne({ username: username });

    if (!user) {
      const error = new Error("User does not exists!");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({
      karma: user.karma,
      posts: user.posts,
      created_date: user.created_date,
    });
    
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.suscribe = async (req, res, next) => {
  try {
    const {subreddit} = req.params;

    const result = await Subreddit.findOne({ name: subreddit });

    if (!result) {
      const error = new Error("That Subreddit does not exists!");
      error.statusCode = 409;
      throw error;
    }

    await Account.updateOne(
      { username: req.username },
      { $push: { suscribed: subreddit } }
    );

    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.unSuscribe = async (req, res, next) => {
  try {
    const {subreddit} = req.params;

    const result = await Subreddit.findOne({ name: subreddit });

    if (!result) {
      const error = new Error("That Subreddit does not exists!");
      error.statusCode = 409;
      throw error;
    }

    await Account.updateOne(
      { username: req.username },
      { $pull: { suscribed: subreddit } }
    );

    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};

exports.isSuscribed = async (req, res, next) => {
  try {
    const {subreddit, username} = req.params;

    const fetchedUser = await Account.findOne({ username: username });

    if (!fetchedUser) {
      const error = new Error("That user does not exists!");
      error.statusCode = 409;
      throw error;
    }

    let result;

    fetchedUser.suscribed.forEach((sub) => {
      if (sub === subreddit) {
        result = true;
      }else{
        result = false;
      }
    });

    return res.status(200).json({ message: "Success!", "isSuscribed": result });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};
