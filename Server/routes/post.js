const express = require("express");
const { check, validationResult } = require("express-validator");
const postcontroller = require("../controllers/posts");
const isAuth = require("../middlewares/is-auth");
const validation_result = require("../middlewares/validation-result");

const router = express.Router();

router.post(
  "/create-post",
  isAuth,
  [
    check("subreddit").exists(),
    check("title").exists(),
    check("body").exists(),
  ],
  validation_result,
  postcontroller.createPost
);

router.put(
  "/vote-post",
  isAuth,
  [check("postId").exists(), check("isUpvote").isBoolean()],
  validation_result,
  postcontroller.votePost
);

router.post(
  "/create-comment",
  isAuth,
  [
    check("postId").exists(),
    check("body").exists(),
    check("username").exists(),
  ],
  validation_result,
  postcontroller.commentPost
);

router.put(
  "/vote-comment",
  isAuth,
  [check("commentId").exists(), check("isUpvote").isBoolean()],
  validation_result,
  postcontroller.voteComment
);

router.delete(
  "/delete-post",
  isAuth,
  [check("username").exists(), check("postId").exists()],
  validation_result,
  postcontroller.deletePost
);

router.get("/r/:subreddit/:postId", postcontroller.postById);

module.exports = router;
