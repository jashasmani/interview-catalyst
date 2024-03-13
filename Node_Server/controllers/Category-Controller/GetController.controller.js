const express = require("express");
const Category = require("../../models/category.model");

async function GetCategory(req, res) {
  try {
    const category = await Category.find();
    console.log(category);
    res.status(201).json({ message: "Category Get successful", category });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Category Get Error:", e);
  }
}

module.exports = GetCategory;
