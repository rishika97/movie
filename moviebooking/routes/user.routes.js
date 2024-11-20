// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route for user signup
router.post('/signup', userController.signUp);

// Route for user login
router.post('/login', userController.login);

// Route for user logout
router.post('/logout', userController.logout);

module.exports = router;
