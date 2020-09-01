const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentShema = new Schema({
  body: String,
  time: {
    type: Date,
    default: Date.now(),
  },
  username: String,
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  votes: {
    type: Number,
    default: 0,
  },
});

commentShema.methods.upvote = function () {
  this.votes++;
  return this.save();
};

commentShema.methods.downvote = function () {
  this.votes--;
  return this.save();
};

module.exports = mongoose.model("Comment", commentShema);
