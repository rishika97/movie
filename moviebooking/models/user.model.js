// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Assuming these roles
        default: 'user'
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    uuid: { type: String, required: true },
    token: { type: String },
    favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

module.exports = mongoose.model('User', userSchema);
