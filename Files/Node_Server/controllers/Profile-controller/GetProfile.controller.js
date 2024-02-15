const express = require("express");
const Profile = require("../../models/profile.model");

async function getProfile(req, res) {
  const { cusername } = req.query;
 

  try {
    const profile = await Profile.findOne({ username: cusername }).exec();

    // console.log('profile',profile)
    // console.log('profile',cusername)
  
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(201).json({ message: "Profile Get Successful", profile });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Profile Get Error:", e);
  }

  
}

module.exports = getProfile;
