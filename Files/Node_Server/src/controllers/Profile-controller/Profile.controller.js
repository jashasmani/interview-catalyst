const express = require("express");
const Profile = require("../../models/profile.model");
const User = require("../../models/login.model");
const multer = require("multer");

async function setProfile(req, res) {
  const { cusername, name, collegename, bio, image } = req.body;

  console.log("SetProfile");
  console.log(req.body);

  try {
    const profile_check = await Profile.findOne({ username: cusername });
    // console.log(profile_check);
    if (profile_check != null) {
      const profile1 = await Profile.findOne({ username: cusername });
      if (name !== "" || collegename !== "" || bio !== "" || image !== "") {
        profile1.name = name;
        profile1.college_name = collegename;
        profile1.bio = bio;
        profile1.image = image;
      }
      await profile1.save();
      res.status(201).json({ message: "Profile Update Successful", profile1 });
    } else {
      const profile = new Profile({
        username: cusername,
        name: name,
        college_name: collegename,
        bio: bio,
        image: image,
      });
      await profile.save();
      res.status(201).json({ message: "Profile Add Successful", profile1 });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Profile Add Error:", e);
  }
}

module.exports = setProfile;
