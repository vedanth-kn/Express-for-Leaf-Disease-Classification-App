const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, phone, email, password, language_preference } = req.body; // Include phone

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            phone, // Add phone here
            email,
            password: hashedPassword,
            language_preference: language_preference || 'English',
        });
        await newUser.save();

        res.status(201).json({
            message: 'Signup successful!',
            username: newUser.username,
            languagePreference: newUser.language_preference,
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with userId, token, username, and language preference
        res.status(200).json({
            userId: user._id,  // Include MongoDB userId
            username: user.username,
            email: user.email,
            phone: user.phone,
            token,
            languagePreference: user.language_preference
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
