const mongoose = require("mongoose");

// Define a subdocument schema for similar questions
const SimilarQuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    // required: true
  }
});

const QuestionsSchema = new mongoose.Schema({
  question: {
    type: String,
    // required: true,
    // unique: true,
  },
  question_html: {
    type: String,
    // required: true,
    // unique: true,
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
    // required: true,
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
    // required: true,
  },
  embedding: [{
    type:Number
  }],
  similar_questions:  [SimilarQuestionSchema] // Use the subdocument schema here
});

const Questions = mongoose.model("Questions", QuestionsSchema);

module.exports = Questions;
