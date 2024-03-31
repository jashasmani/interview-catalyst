const express = require("express");
const EditAnswers = require("../../models/editAnswer.model");

async function insertAnswerQuestion(req, res) {
  try {
    const { editAnswers, cusername, question_id, comment_id, grant,outputData } = req.body;
    console.log(req.body)

    const currentTimeInIndia = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    if (grant === "none") {
      if (cusername) {
        const editanswer = new EditAnswers({
          cusername: cusername,
          edit_answer: editAnswers,
          question_id: question_id,
          comment_id: comment_id,
          timestamp: currentTimeInIndia,
          grant: grant,
          outputData:outputData
        });
        await editanswer.save();

        res
          .status(201)
          .json({ message: "Edit Request Successful", editanswer });
      }
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Question add Error:", e);
  }
}

module.exports = insertAnswerQuestion;
