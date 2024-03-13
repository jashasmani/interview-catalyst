const express = require("express");
const addCategory = require("../controllers/Category-Controller/AddCategory.controller");
const getCategory = require("../controllers/Category-Controller/GetController.controller");
const router = express.Router();

router.post("/addcategory", addCategory).get("/getcategory", getCategory);

module.exports = router;
