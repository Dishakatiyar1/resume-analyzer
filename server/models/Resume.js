const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "Not found",
  },
  email: {
    type: String,
    default: "Not found",
  },
  phone: {
    type: String,
    default: "Not found",
  },
  skills: {
    type: [String],
    default: [],
  },
  experience: {
    type: String,
    default: "Not specified",
  },
  education: {
    type: [String],
    default: [],
  },
  aiFeedback: {
    type: String,
    default: "No feedback available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
