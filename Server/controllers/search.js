const createError = require('http-errors')

const Subreddit = require("../models/subreddit");
const Account = require("../models/account");

exports.search = async (req, res, next) => {
  try {
    const filter = req.params.filter;
    let dataResponse = {
      accounts: null,
      subreddits: null,
    };

    const accounts = await Account.find({
      username: { $regex: ".*" + filter + ".*" },
    }).select("username");

    const subreddits = await Subreddit.find({
      name: { $regex: ".*" + filter + ".*" },
    }).select("name");
    
    dataResponse.accounts = accounts;
    dataResponse.subreddits = subreddits;
    return  res.status(200).json({ message: "Success!", data: dataResponse });
  } catch (error) {
    return next(createError(error.statusCode || 500, error));
  }
};
