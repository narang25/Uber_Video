const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Optional chaining for safety
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        if (!process.env.SECRET_KEY) {
            throw new Error('SECRET_KEY not defined in environment variables');
        }

        // Decode the token
        console.log('Token received:', token);  // Log token for debugging
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded token:', decoded);  // Log decoded token for debugging

        // Find the user based on the decoded token's ID
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user object to the request
        req.user = user;
        next();  // Move to the next middleware/route handler
    } catch (error) {
        console.error('Token verification failed:', error.message);  // Log the error message
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
