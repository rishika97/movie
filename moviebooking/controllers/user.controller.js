// controllers/userController.js
const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const TokenGenerator = require('uuid-token-generator');
const b2a = require('b2a');

// Initialize Token Generator
const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);

exports.signUp = async (req, res) => {
    try {
        const { first_name, last_name, password, email } = req.body;

        // Encrypt username and password
        const encodedPassword = b2a.btoa(password);

        if (!password) {
            res.status(404).json({ message: "Password is required" });
        }

        // Create new user with UUID and encoded credentials
        const newUser = new User({
            email: email,
            username: email,
            password: encodedPassword,
            uuid: uuidv4(),
        });

        console.log(email)


        // Save user in database
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error in user registration", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)

        // Encrypt provided username and password for comparison
        const encodedPassword = b2a.btoa(password);

        // Find user with matching credentials
        const user = await User.findOne({ username: username, password: encodedPassword });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate a token for the session
        const token = tokgen.generate();
        user.token = token;
        await user.save();

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const { uuid } = req.body;

        // Find user by UUID
        const user = await User.findOne({ uuid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Clear token to log out user
        user.token = null;
        await user.save();

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Error during logout", error: error.message });
    }
};
