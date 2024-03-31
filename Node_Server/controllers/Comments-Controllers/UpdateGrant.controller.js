const express = require("express");
const Questions = require("../../models/question.model");
const Comment = require("../../models/comment.model");
const Mail = require("../../utils/email");
const User = require("../../models/login.model");

async function grantQuestions(req, res) {
  try {
    const { _id, grant, commentid } = req.body;
    // console.log(req.body);

    const question = await Questions.findById(_id);
    if (!question) {
      return res.status(404).json({ message: "Questions not found" });
    }
    if (grant === "true") {
      question.grant = grant;

      const q_html = question.question_html;
      const username = await User.find({ username: question.username });
      const email = username[0].email;
      await Mail(req, res, q_html, email);
      await question.save();

      return res
        .status(201)
        .json({ message: "Questions grant successful", grant });
    } else {
      await Comment.deleteOne({ _id: commentid });
      await Questions.deleteOne({ _id: _id });
      return res
        .status(400)
        .json({ message: "Questions ungrant successful", grant });
    }
  } catch (e) {
    console.error("Questions grant error:", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = grantQuestions;
