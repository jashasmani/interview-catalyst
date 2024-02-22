const express = require("express");
const EditAnswers = require("../../models/editAnswer.model");
const Comments = require("../../models/comment.model");

async function updateGrant(req, res) {
  try {
    const { _id, grant, edited_answer, comment_id } = req.body;
    console.log(req.body);

    if (grant === "false") {
      await EditAnswers.deleteOne({ _id: _id });
      res.status(201).json({ message: "Request Cancel Successful" });
    } else {
      const previousans = await Comments.findOne({
        _id: comment_id,
      });

      // if (previousans.edited_comment === "none") {
        await Comments.updateOne(
          { _id: comment_id },
          {
            $set: { edited_comment: edited_answer },
          }
        );

        // await EditAnswers.deleteMany({ comment_id: comment_id, grant: "true" });
        await EditAnswers.updateOne(
          { comment_id: comment_id },
          {
            $set: { grant: "setTrue" },
          }
        );
      // } else {
        // await Comments.updateOne(
        //   { _id: comment_id },
        //   {
        //     $set: {
        //       comment: previousans.edited_comment,
        //       edited_comment: edited_answer,
        //     },
        //   }
        // );
        // await EditAnswers.deleteMany({grant:"true"});
        // await EditAnswers.updateOne(
        //   { comment_id: comment_id },
        //   {
        //     $set: { grant: "setTrue" },
        //   }
        // );
      // }

      await EditAnswers.updateOne(
        { _id },
        {
          $set: { grant: grant },
        }
      );
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Editanswer Grant Error:", e);
  }
}

module.exports = updateGrant;
