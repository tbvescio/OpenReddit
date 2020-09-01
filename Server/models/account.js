const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountShema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  created_date: Date,
  karma: {
      type: Number,
      default: 0
  },
  saved_posts: Array,
  suscribed: Array,
  owned_subreddit: Array,
  posts: Array
});


accountShema.methods.upvote = function () {
  this.karma++;
  return this.save();
};

accountShema.methods.downvote = function () {
  this.karma--;
  return this.save();
};

module.exports = mongoose.model("Account", accountShema);
