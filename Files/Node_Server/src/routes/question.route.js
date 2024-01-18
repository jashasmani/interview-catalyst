const express = require('express');
const insertQuestion = require('../controllers/Question-Controllers/Question.controller');
const findQuestion = require('../controllers/Question-Controllers/FindQuestion.controller');
const searchQuestion = require('../controllers/Question-Controllers/SearchQuestion.controller');

const router = express.Router();

router
    .route('/question')
    .post(insertQuestion)

router
    .route('/question')
    .get(findQuestion);

router
    .route('/search/:key')
    .get(searchQuestion);

module.exports = router;



