const express = require("express");
const { check } = require("express-validator");
const authcontroller = require("../controllers/auth");
const validation_result = require("../middlewares/validation-result");
const router = express.Router();

router.post(
  "/signup",
  [
    check("username").exists(),
    check("password").exists(),
  ],
  validation_result,
  authcontroller.signup
);
router.post(
  "/login",
  [
    check("username").exists(),
    check("password").exists(),
  ],
  validation_result,
  authcontroller.login
);

module.exports = router;
