const Account = require("../models/account");
const Subreddit = require("../models/subreddit");

exports.getUserProfile = async (req, res, next) => {
  try {
    const username = req.params.username;

    const user = await Account.findOne({ username: username });
    if (!user) {
      const error = new Error("User does not exists!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      karma: user.karma,
      posts: user.posts,
      created_date: user.created_date,
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

exports.suscribe = async (req, res, next) => {
  try {
    const subreddit = req.params.subreddit;
    const result = await Subreddit.findOne({ name: subreddit });
    if (!result) {
      const error = new Error("That Subreddit does not exists!");
      error.statusCode = 409;
      throw error;
    }

    const updateResult = await Account.updateOne(
      { username: req.username },
      { $push: { suscribed: subreddit } }
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

exports.unSuscribe = async (req, res, next) => {
  try {
    const subreddit = req.params.subreddit;

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
