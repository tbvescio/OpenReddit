const express = require("express");
const { check } = require("express-validator");
const subredditcontroller = require("../controllers/subreddit");
const isAuth = require("../middlewares/is-auth");
const validation_result = require("../middlewares/validation-result");

const router = express.Router();

router.post(
  "/create-subreddit",
  isAuth,
  [check("name").isString(), check("description").isString()],
  validation_result,
  subredditcontroller.createSubreddit
);
router.get("/r/:subreddit", subredditcontroller.getSubreddit);
router.get("/frontpage", isAuth, subredditcontroller.getFrontPage);
router.get("/frontpage-public", subredditcontroller.getFrontPagePublic);

module.exports = router;
