// models/movieModel.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieid: { type: Number, required: true, unique: true }, // Added movieid
    title: { type: String, required: true },
    release_date: String, // Kept as String to match the provided document
    publish_date: String,
    published: Boolean,
    released: Boolean,
    poster_url: String,
    wiki_url: String,
    story_line: String,
    genres: [String], // Array of strings instead of ObjectIds
    artists: [
        {
            artistid: Number,
            first_name: String,
            last_name: String,
            wiki_url: String,
            profile_url: String,
            movies: Array, // If movies is an array of other ObjectIds, adjust accordingly
        },
    ],
    duration: Number,
    critic_rating: Number,
    trailer_url: String,
    shows: [
        {
            id: Number,
            theatre: {
                name: String,
                city: String,
            },
            language: String,
            show_timing: String,
            available_seats: String,
            unit_price: Number,
        },
    ],
});

module.exports = mongoose.model('Movie', movieSchema);

