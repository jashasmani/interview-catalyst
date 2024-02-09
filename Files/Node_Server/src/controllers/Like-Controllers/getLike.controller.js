const express = require("express");
const Likes = require("../../models/likes.model");

async function getLike(req, res) {
  try {
    const get_like = await Likes.find();

    res.status(201).json({ message: "Like Get successful", get_like });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Like Get Error:", e);
  }
}

module.exports = getLike;
