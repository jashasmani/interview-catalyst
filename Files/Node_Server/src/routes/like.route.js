const express = require("express");
const likesubmit = require("../controllers/Like-Controllers/Like.controller");
const getLike = require("../controllers/Like-Controllers/getLike.controller");
const router = express.Router();

router.post("/likes", likesubmit).get("/likes", getLike);

module.exports = router;
