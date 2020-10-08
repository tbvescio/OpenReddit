const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: String,
  subreddit: String,
  title: String,
  body: String,
  votes: {
    type: Number,
    default: 0,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = postSchema;