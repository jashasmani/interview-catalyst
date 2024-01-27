const express = require("express");
const Comments = require("../../models/comment.model");

async function getcomment(req, res) {
  try {
    const { question_id} = req.query;
    // console.log(req.body);
    

    
    const question_comment=await Comments.find({'$or':[
        {'question_id': question_id}
    ]})



    res.status(201).json({ message: "Comment Get successful",question_comment  });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Comment Get Error:", e);
  }
}

module.exports = getcomment;
