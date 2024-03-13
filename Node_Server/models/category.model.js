const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    value: {
      type: String,
    },  
    label: {
      type: String,
    },  
      
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
