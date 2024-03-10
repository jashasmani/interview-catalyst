const express = require("express");
const Comments = require("../../models/comment.model");

async function GetCommentById(req, res) {
  try {
    const { comment_id } = req.query;

    const comment_data = await Comments.findOne({ _id: comment_id });

  

    res.status(201).json({ message: "EditComment Get successful", comment_data });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    // console.error("EditComment Get Error:", e);
  }
}

module.exports = GetCommentById;
