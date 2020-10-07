const createError = require("http-errors");

const Subreddit = require("../models/subreddit");
const Account = require("../models/account");

exports.search = async (req, res, next) => {
  try {
    const { query } = req.query;
    const accounts = await Account.find({
      username: { $regex: ".*" + query + ".*" },
    }).select("username");

    const subreddits = await Subreddit.find({
      name: { $regex: ".*" + query + ".*" },
    }).select("name");

    return res
      .status(200)
      .json({ message: "Success!", data: { accounts, subreddits } });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};
