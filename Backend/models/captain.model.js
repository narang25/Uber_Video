const mongoose= require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
        type: String,
        required: true,
        minlength: [3, "Full name must be at least 3 characters"],
    },
    lastname: {
        type: String,
        minlength: [3, "Full name must be at least 3 characters"],
    }},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicle:{
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters"]
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, "Plate must be at least 3 characters"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            enum: ["car", "motorcycle", "auto"],
            required: true,
        }
    },
    location: {
        lat:{
            type: Number,
        },
        log:{
            type: Number,
        }}
})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

captainSchema.statics.hashPassword = async function (password) {
    
    return await bcrypt.hash(password, 10);
}




const captainModel = mongoose.model("Captain", captainSchema);

module.exports = captainModel;