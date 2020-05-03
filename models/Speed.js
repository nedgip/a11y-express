const mongoose = require("mongoose");
const User = require(/models/User)

const speedSchema = new mongoose.Schema({
    speed: {
        type: Number,
        required: true,
    },
    date: {
        type: Date.toString,
        required: true,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const User = mongoose.model("Speed", speedSchema);
module.exports = Speed;