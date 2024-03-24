const express = require("express");
const Comments = require("../../models/comment.model");

async function commentsubmit(req, res) {
  try {
    const { cusername, commentData,grant, question_id, likeCount,edited_comment } = req.body;
    console.log(req.body);
    const currentTimeInIndia = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    if (cusername && commentData) {
      const comments = new Comments({
        username: cusername,
        comment: commentData,
        question_id: question_id,
        timestamp: currentTimeInIndia,
        edited_comment:edited_comment,
        grant:grant
      }); 

      await comments.save();
    }
    
    const question_comment = await Comments.find({
      $or: [{ question_id: question_id }],
    });
    
    if (!commentData) {
      const comment_id = await Comments.findOne({ _id: question_id });
      
      comment_id.likeCount = likeCount;
      
      await comment_id.save();
     
    }
    
    res
      .status(201)
      .json({ message: "Comment add successful", question_comment });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Comment add Error:", e);
  }
}

module.exports = commentsubmit;
