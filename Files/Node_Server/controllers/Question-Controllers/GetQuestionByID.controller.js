const express = require("express");
const Question = require("../../models/question.model");

async function GetQuestioncomment(req, res) {
  try {
    const { question_id } = req.query;
    // console.log(req.query);

    const question_value = await Question.findOne({_id:question_id});

    // console.log("Question", question_value);

    res.status(201).json({ message: "Question Value Get successful", question_value });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Question Get Error:", e);
  }
}

module.exports = GetQuestioncomment;
