const express = require("express");
const Comments = require("../../models/comment.model");

async function sommentsubmit(req, res) {
  try {
    const { cusername, commentData ,question_id,like} = req.body;
    // console.log(like);
    // const currentTimeInIndia = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    if (cusername !== "") {
      if(commentData!=='')
      {

        const comments = new Comments({
          username: cusername,
          comment: commentData,
          question_id:question_id,
          like:like,
        })
        
        await comments.save();
      }
      else{
        const comments = new Comments({
          like:like,
        })
        await comments.save();
      }
    }
    const question_comment=await Comments.find({'$or':[
        {'question_id': question_id}
    ]})



    res.status(201).json({ message: "Comment add successful",question_comment  });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Comment add Error:", e);
  }
}

module.exports = sommentsubmit;
