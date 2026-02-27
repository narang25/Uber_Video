const captainModel= require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model");
const rideModel = require("../models/ride.model");

module.exports.registerCaptain = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ error: "Captain already exists" });}
    
    const hashedPassword = await captainModel.hashPassword(password);
    
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });


}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    res.cookie('captainToken',token);

    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.captainToken || req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({ token });
    res.clearCookie('captainToken');

    res.status(200).json({ message: "Logged out successfully" });
}

module.exports.getCaptainStats = async (req, res, next) => {
    try {
        const captainId = req.captain._id;

        const stats = await rideModel.aggregate([
            { $match: { captain: captainId, status: 'completed' } },
            {
                $group: {
                    _id: null,
                    totalRides: { $sum: 1 },
                    totalEarnings: { $sum: '$fare' },
                    totalDistance: { $sum: '$distance' },
                    totalDuration: { $sum: '$duration' },
                }
            }
        ]);

        const result = stats[0] || { totalRides: 0, totalEarnings: 0, totalDistance: 0, totalDuration: 0 };

        res.status(200).json({
            totalRides: result.totalRides,
            totalEarnings: Math.round(result.totalEarnings),
            totalDistance: +(result.totalDistance / 1000).toFixed(1), // meters → km
            totalHours: +(result.totalDuration / 3600).toFixed(1),   // seconds → hours
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch stats' });
    }
}