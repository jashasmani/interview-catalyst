const express = require("express");
const Likes = require("../../models/likes.model");

async function likesubmit(req, res) {
  try {
    const { question_id, comment_id, like ,cusername} = req.body;
    // console.log(req.body)
    let like_data = await Likes.findOne({
      question_id: question_id,
      comment_id: comment_id,
      cusername:cusername
    });

    if (like_data) {
      // Update existing like
      like_data.like = like;
      await like_data.save();
    } else {
      // Create a new like if it doesn't exist
      like_data = new Likes({
        question_id: question_id,
        comment_id: comment_id,
        cusername:cusername,
        like: like,
      });
      await like_data.save();
    }

    res.status(201).json({ message: "Like add successful", like_data });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error", error: e.message });
    console.error("Like add Error:", e);
  }
}

module.exports = likesubmit;
