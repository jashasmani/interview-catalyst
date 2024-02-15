const express = require("express");
const { default: mongoose } = require("mongoose");

const UserProfile = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  college_name: {
    type: String,
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
  
});

const Profile = mongoose.model("User_Profile", UserProfile);

module.exports = Profile;
