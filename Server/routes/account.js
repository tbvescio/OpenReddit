const express = require("express");
const accountcontroller = require("../controllers/account");
const isAuth = require("../middlewares/is-auth");
const router = express.Router();

router.put("/u/suscribe/:subreddit", isAuth, accountcontroller.suscribe);
router.put("/u/unsuscribe/:subreddit", isAuth, accountcontroller.unSuscribe);
router.get("/u/:username/:subreddit", accountcontroller.isSuscribed);
router.get("/u/:username", accountcontroller.getUserProfile);

module.exports = router;
