const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subredditShema = new Schema({
  name: { type: String, unique: true },
  description: String,
});

module.exports = mongoose.model("Subreddit", subredditShema);
