// config/dbconfig.js

const mongoose = require('mongoose');

const dbURL = "mongodb://localhost:27017/moviesdb"; // Replace with your actual MongoDB URL

const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToDatabase;
