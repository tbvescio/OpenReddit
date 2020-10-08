const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postShema = require("./postSchema");

postShema.methods.upvote = function () {
  this.votes++;
  return this.save();
};

postShema.methods.downvote = function () {
  this.votes--;
  return this.save();
};
module.exports = mongoose.model("Post", postShema);
