const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    // required: true,
    // unique: true
  },
  answer: {
    type: String,
    // required: true
  },
  username: {
    type: String,
    required: true,
  },
  grant: {
    type: String,
  },
  timestamp: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  embedding: [{
    type:Number
  }],
  similar_questions:  [{
    type: String
  }]
});

const Questions = mongoose.model("Questions", QuestionsSchema);

module.exports = Questions;
