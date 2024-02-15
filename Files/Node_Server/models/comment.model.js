const mongoose = require("mongoose");
const Question = require("./question.model");
const Schema = mongoose.Schema;

// comments
const CommentsSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    // require: true,
  },
  edited_comment: {
    type: String,
    // require: true,
  },
  question_id: {
    type: Schema.Types.ObjectId,
    ref: Question,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  likeCount:{
    type:Number,
    default:0
  }
});
const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
