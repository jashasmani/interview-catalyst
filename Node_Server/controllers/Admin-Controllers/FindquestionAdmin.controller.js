const express = require("express");
const Question = require("../../models/question.model");
const Admin = require("../../models/admin.model");
const jwt = require("jsonwebtoken");

async function findQuestion(req, res) {
  jwt.verify(req.token, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", async (err, authdata) => {
    if (err) {
      res.status(401).send({ result: "invalid token" });
    } else {
      try {
        const token = req.token;

        const admin = await Admin.findOne({
          token: req.token,
        });

        const admin_id = admin._id;
        // console.log(name);

        const question = await Question.find({ admin: admin_id }).sort({
          timestamp: -1,
        });

        res.json({ question: question, cusername: admin.username });
      } catch (error) {
        res.json({ message: "Error" });
      }
    }
  });
}

module.exports = findQuestion;
