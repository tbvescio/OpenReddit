const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postShema = require("./postSchema");

const accountShema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_date: Date,
  karma: {
    type: Number,
    default: 0,
  },
  posts: [postShema],
  saved_posts: Array,
  suscribed: Array,
  owned_subreddit: Array,
});

accountShema.methods.upvote = function (postId) {
  this.karma++;
  this.posts.map((post) => {
    if (post._id == postId) {
      post.votes++;
      return post;
    }
    return post;
  });
  return this.save();
};

accountShema.methods.downvote = function (postId) {
  this.karma--;
  this.posts.map((post) => {
    if (post._id == postId) {
      console.log("truee")
      post.votes--;
      return post;
    }
    return post;
  });
  return this.save();
};

module.exports = mongoose.model("Account", accountShema);
