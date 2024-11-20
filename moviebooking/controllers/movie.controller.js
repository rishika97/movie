// controllers/movieController.js
const mongoose = require('mongoose');
const Movie = require('../models/movie.model');
const Artist = require('../models/artist.model');
const Genre = require('../models/genre.model');

exports.findAllMovies = async (req, res) => {
    const { status, title, genres, artists, start_date, end_date } = req.query;
    const query = {};

    try {
        // Apply basic filters
        if (status) query.status = status;
        if (title) query.title = new RegExp(title, 'i'); // case-insensitive title search


        if (status === 'PUBLISHED') {
            query.published = true;
        } else if (status === 'RELEASED') {
            query.released = true;
        }


        // Handle genres (names to ObjectId conversion)
        if (genres) {
            const genreNames = genres.split(',');
            const genreDocs = await Genre.find({ name: { $in: genreNames } });
            query.genres = { $in: genreDocs.map(g => g._id) };
        }

        // Handle artists (names to ObjectId conversion)
        if (artists) {
            const artistNames = artists.split(',');
            const artistDocs = await Artist.find({ name: { $in: artistNames } });
            query.artists = { $in: artistDocs.map(a => a._id) };
        }

        // Handle release date range filter
        if (start_date && end_date) {
            query.releaseDate = {
                $gte: new Date(start_date),
                $lte: new Date(end_date),
            };
        }

        // Fetch movies based on the assembled query
        const movies = await Movie.find(query);
        res.status(200).json(movies);

    } catch (error) {
        res.status(500).json({ message: "Error retrieving movies", error: error.message });
    }
};

// Find a single movie by ID
exports.findOne = async (req, res) => {
    const { movieId } = req.params;
    console.log(typeof movieId, movieId, "Movie ID Type and Value"); // Debugging

    try {
        // Ensure movieId is a number
        const movie = await Movie.findOne().where('movieid').equals(Number(movieId));
        if (movie) {
            console.log({
                title: movie.title,
                poster_url: movie.poster_url,
                genres: movie.genres,
                artists: movie.artists,
                trailer_url: movie.trailer_url,
            });
            // Extract specific fields
            const mv = {
                title: movie.title,
                poster_url: movie.poster_url,
                genres: movie.genres,
                artists: movie.artists,
                trailer_url: movie.trailer_url,
            };
            console.log(mv, "MV");
            res.status(200).json(mv);
        }
        console.log(movie);

        console.log(movie, "Movie Document"); // Debugging

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }


    } catch (error) {
        console.error(error, "Crash");
        res.status(500).json({ message: "Error retrieving movie", error: error.message });
    }
};


// Find shows for a specific movie by ID
exports.findShows = async (req, res) => {
    const { movieId } = req.params;

    try {
        const movie = await Movie.findById(movieId).populate('shows'); // assuming 'shows' is a populated field in the movie model
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie.shows); // return only the show details
    } catch (error) {
        res.status(500).json({ message: "Error retrieving shows for the movie", error: error.message });
    }
};
