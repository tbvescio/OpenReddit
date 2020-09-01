const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postShema = new Schema({
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

postShema.methods.upvote = function () {
  this.votes++;
  return this.save();
};

postShema.methods.downvote = function () {
  this.votes--;
  return this.save();
};

module.exports = mongoose.model("Post", postShema);
