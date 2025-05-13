const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

router.post('/register', [
    body('fullName.firstName').isString().isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
    body('fullName.lastName').optional().isString().isLength({ min: 3 }).withMessage('Last name must be at least 3 characters'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isString().isLength({ min: 3 }).withMessage('Color must be at least 3 characters'),
    body('vehicle.plate').isString().isLength({ min: 3 }).withMessage('Plate must be at least 3 characters'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be car, motorcycle, or auto')
],
    captainController.registerCaptain
);


module.exports = router;
