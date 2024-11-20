// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

// Route to get all movies with optional filters
router.get('/movies', movieController.findAllMovies);

// Route to get details of a specific movie by ID
router.get('/movies/:movieId', movieController.findOne);

// Route to get show details for a specific movie by ID
router.get('/movies/:movieId/shows', movieController.findShows);

module.exports = router;
