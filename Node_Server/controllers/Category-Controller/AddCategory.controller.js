const express = require("express");
const Category = require("../../models/category.model");

async function AddCategory(req, res) {
  try {
    const { title } = req.body;
    const category = new Category({ value: title, label: title });
    category.save();

    res.status(201).json({ message: "Category Add successful", category });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Category Add Error:", e);
  }
}

module.exports = AddCategory;
