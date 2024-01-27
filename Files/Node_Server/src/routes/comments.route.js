const express = require("express");
const commentsubmit = require("../controllers/Comments-Controllers/CommentSubmit.controllers");
const getcomment = require("../controllers/Comments-Controllers/Getcomment.controller");

const router = express.Router();

router.post("/commentsubmit", commentsubmit).get("/getcomment",getcomment);

module.exports = router;
