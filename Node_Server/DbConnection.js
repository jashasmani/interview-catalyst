const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.URI;
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (e) {
    console.error("Error connecting to MongoDB Atlas", e);
  }
};

module.exports = connectDB;
