const express = require("express")
const router = express.Router();

const authRoutes = require("./auth");
const subredditRoutes = require("./subreddit");
const accountRoutes = require("./account");
const postRoutes = require("./post");
const searchRoutes = require("./search");

router.use("/api/", subredditRoutes);
router.use("/api/", accountRoutes);
router.use("/api/", postRoutes);
router.use("/api/", searchRoutes);
router.use("/api/auth", authRoutes);

module.exports = router;