// controllers/genreController.js
const Genre = require('../models/genre.model');

// Controller to get all genres
exports.findAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving genres", error: error.message });
    }
};
