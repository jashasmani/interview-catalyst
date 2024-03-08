const express = require("express");
const Question = require("../../models/question.model");

async function insertQuestion(req, res) {
  try {
    const { question, username,title } = req.body;
    // console.log(req.body)
    const currentTimeInIndia = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    if (username != "") {
      const question_main = new Question({
        username: username,
        question: question,
        title: title,
        timestamp: currentTimeInIndia,
      });

      await question_main.save();
      res
        .status(201)
        .json({ message: "Question add successful", question_main });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Question add Error:", e);
  }
}

module.exports = insertQuestion;
