const express = require('express');
const cheackConfirm = require('../controllers/User-Login-Controllers/Confrim_Password.controller');
const getUserData = require('../controllers/User-Login-Controllers/Login.controller');
const getRegisterData = require('../controllers/User-Login-Controllers/Register.controller')
const getForgotPassword = require('../controllers/User-Login-Controllers/Forgot_Password.controller')

const router = express.Router();


router
    .route('/login')
    .post(getUserData);


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
