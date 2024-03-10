const express = require("express");
const Question = require("../../models/question.model");
const User = require("../../models/login.model");
const jwt = require("jsonwebtoken");

async function findQuestion(req, res) {
  jwt.verify(
    req.token,
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    async (err, authdata) => {
      if (err) {
        res.status(401).send({ result: "invalid token" });
      } else {
        try {
          const token = req.token;

          const user = await User.findOne({
            tokens: req.token,
          });

          if (!user) {
            console.error("User not found for token:", token);
            return res.status(401).json({ result: "user not found" });
          }

          const question = await Question.find({}).sort({ timestamp: -1 });
          // console.log(question);
          res.json({ question: question, cusername: user.username });
        } catch (error) {
          res.json({ message: "Error" });
        }
      }
    }
  );
}

module.exports = findQuestion;
