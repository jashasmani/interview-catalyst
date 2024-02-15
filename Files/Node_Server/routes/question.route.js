const express = require('express');
const insertQuestion = require('../controllers/Question-Controllers/Question.controller');
const findQuestion = require('../controllers/Question-Controllers/FindQuestion.controller');
const searchQuestion = require('../controllers/Question-Controllers/SearchQuestion.controller');
const questionById = require('../controllers/Question-Controllers/GetQuestionByID.controller');
const verifyToken = require('../middlewares/Question.middleware');
const router = express.Router();

router
    .route('/question')
    .post(insertQuestion)

router
    .route('/question')
    .get(verifyToken,findQuestion);

router
    .route('/search/:key')
    .get(searchQuestion);
router
    .route('/questionbyid')
    .get(questionById);





module.exports = router;



