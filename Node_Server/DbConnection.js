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


let questionsCollection = null;
connectDB()
  .then(() => {
    let db = mongoose.connection;
    questionsCollection = db.collection("questions");
  })
  .catch((err) => {
    console.error("Error:", err);
  });

module.exports = connectDB;
