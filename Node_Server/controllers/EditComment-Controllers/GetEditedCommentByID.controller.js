const express = require("express");
const EditAnswer = require("../../models/editAnswer.model");

async function GetEditCommentById(req, res) {
  try {
    const { comment_id } = req.query;
    // console.log(req.query);
    const editcomment_data = await EditAnswer.find({
      comment_id: comment_id,
    });

    // console.log(editcomment_data);
    res
      .status(201)
      .json({ message: "EditComment Get by ID successful", editcomment_data });
  } catch (e) {
    // res.status(500).json({ message: "Internal Server Error" });
    // console.error("EditComment Get By ID Error:", e);
  }
}

module.exports = GetEditCommentById;
