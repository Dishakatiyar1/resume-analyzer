const mongoose = require("mongoose");
const { Schema } = mongoose;

const resumeSchema = new Schema(
  {
    filename: String,
    name: String,
    text: String,
    email: String,
    phone: Number,
    skills: [String],
  },
  { timestamps: true }
);

const ResumeModel = mongoose.model("Resume", resumeSchema);

module.exports = ResumeModel;
