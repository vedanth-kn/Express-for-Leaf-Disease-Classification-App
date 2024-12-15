const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');

// Route to get user information
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user details
        res.json({ name: user.username, email: user.email });
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
