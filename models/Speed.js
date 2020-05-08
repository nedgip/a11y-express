const mongoose = require("mongoose");

const speedSchema = new mongoose.Schema({
  speed: {
    type: Number,
    required: [true, 'Speed is missing']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Speed = mongoose.model("Speed", speedSchema);
module.exports = Speed;
