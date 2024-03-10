const express = require("express");
const getAdminData = require("../controllers/Admin-Controllers/GetAdminData.controller");
const getToken = require("../controllers/Admin-Controllers/AdminGetToken.controller");
const findQuestion = require("../controllers/Admin-Controllers/FindquestionAdmin.controller");
const verifyToken = require("../middlewares/Question.middleware");
// const getRegisterData = require('../controllers/User-Login-Controllers/Register.controller');
// const cheackConfirm = require('../controllers/User-Login-Controllers/Confrim_Password.controller');
// const getForgotPassword = require('../controllers/User-Login-Controllers/Forgot_Password.controller');

const router = express.Router();

router.route("/adminlogin").post(getAdminData).get(verifyToken, getToken);

router.route("/question").get(verifyToken, findQuestion);
// router
//     .route('/register')
//     .post(getRegisterData);

// router
//     .route('/forgot-password')
//     .post(getForgotPassword);

// router
//     .route('/confirm/:userId/:token')
//     .post(cheackConfirm);

module.exports = router;
