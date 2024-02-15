const express = require("express");
// const verifyToken = require('../middlewares/Question.middleware');
const router = express.Router();
const addEditcomment=require('../controllers/EditComment-Controllers/CheackEditQuestion.controller')
const findEditedAnswer=require('../controllers/EditComment-Controllers/GetEditComment.controller')
const updateGrant=require('../controllers/EditComment-Controllers/UpdateGrant.controller')
const getEditedAnswerById=require('../controllers/EditComment-Controllers/GetEditedCommentByID.controller')

router.route("/cheackeditanswer").post(addEditcomment);

// verfication ???
router
    .route('/findEditedAnswer')
    .get(findEditedAnswer);
router
    .route('/geteditedanswerbyid')
    .get(getEditedAnswerById);

router
    .route('/updategrant')
    .post(updateGrant);

module.exports = router;
