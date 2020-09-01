const express = require("express");
const searchcontroller = require("../controllers/search");

const router = express.Router();


router.get("/:filter", searchcontroller.search);

module.exports = router;