const express = require("express");
const multer = require('multer');
const setProfile = require("../controllers/Profile-controller/Profile.controller");
const getProfile = require("../controllers/Profile-controller/GetProfile.controller");

const router = express.Router();

router.post("/profile", setProfile)
router.get("/getprofile", getProfile);

module.exports = router;
