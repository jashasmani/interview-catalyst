const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://jashasmani:jashasmani@cluster0.mf0pimy.mongodb.net/Interview-Catalyst', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB Atlas");

    } catch (e) {
        console.error("Error connecting to MongoDB Atlas", e);
    }
}

module.exports = connectDB;
