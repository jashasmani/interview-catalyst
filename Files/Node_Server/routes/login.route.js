const express = require('express');
const cheackConfirm = require('../controllers/User-Login-Controllers/Confrim_Password.controller');
const getUserData = require('../controllers/User-Login-Controllers/Login.controller');
const getToken = require('../controllers/User-Login-Controllers/GetToken.controller');
const getRegisterData = require('../controllers/User-Login-Controllers/Register.controller');
const getForgotPassword = require('../controllers/User-Login-Controllers/Forgot_Password.controller');
const verifyToken = require('../middlewares/Question.middleware');

const router = express.Router();


router
    .route('/login')
    .post(getUserData)
    .get(verifyToken,getToken)


router
    .route('/register')
    .post(getRegisterData);

router
    .route('/forgot-password')
    .post(getForgotPassword);

router
    .route('/confirm/:userId/:token')
    .post(cheackConfirm);






module.exports = router;
