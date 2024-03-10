const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    unique: true
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
    required: true
  },
  timestamp:{
    type:String,
    required: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
});

const Questions = mongoose.model('Questions', QuestionsSchema);

module.exports = Questions;