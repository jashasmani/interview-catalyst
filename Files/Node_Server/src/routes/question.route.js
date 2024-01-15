const express=require('express');
const insertQuestion=require('../controllers/Question-Controllers/Question.controller');
const findQuestion=require('../controllers/Question-Controllers/FindQuestion.controller');

const router = express.Router();

router
    .route('/question')
    .post(insertQuestion)
    .get(findQuestion);

module.exports = router;



