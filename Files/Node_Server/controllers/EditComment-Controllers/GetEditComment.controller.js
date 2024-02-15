const express = require("express");
const Editanswer = require("../../models/editAnswer.model");

async function GetEditcomment(req, res) {
  try {

    const edit_answer_id = await Editanswer.find();


    res.status(201).json({ message: "EditComment Get successful", edit_answer_id });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("EditComment Get Error:", e);
  }
}

module.exports = GetEditcomment;
