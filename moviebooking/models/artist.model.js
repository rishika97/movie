// models/artistModel.js
const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: String,
    dateOfBirth: Date,
    nationality: String,
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }] // Optional, if linked to movies
});

module.exports = mongoose.model('Artist', artistSchema);
