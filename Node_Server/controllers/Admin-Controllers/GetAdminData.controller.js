const express = require("express");
// const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin.model");

async function getAdminData(req, res) {
  try {
    const { email, password } = req.body;

    // console.log(email,password)
    // console.log(req.body)
    const admin = await Admin.findOne({
      $or: [{ name: email }, { password: password }],
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (admin) {
      const token = jwt.sign(
        { id: admin._id, name: admin.name },
        process.env.TOKEN1,
        { expiresIn: "10h" }
      );

      admin.token = token;
      await admin.save();

      res.json({
        message: "Admin Login successful",
        token: token,
        username: admin.name,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = getAdminData;
