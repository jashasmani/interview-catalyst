const express = require('express');
const Question = require('../../Database/Question_Schema');

const router = express.Router();

router.get('/search/:key', async (req, res) => {

    try {

        console.log(req.params.key);
        const question_main = await Question.find(
            {
                '$or': [
                    { 'question': { $regex: req.params.key } }
                ]
            }
        )

        res.send(question_main);



    }
    catch (e) {

        console.error('Registration Error:', e);
    }
})

module.exports = router;