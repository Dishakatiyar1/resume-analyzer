const multer = require("multer");
const express = require("express");
const fs = require("fs");
const pdf = require("pdf-parse");
const { extractDetails } = require("../utils/extractDetails");
const { generateAIFeedback } = require("../utils/aiFeedbackGenerator");
const Resume = require("../models/Resume");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

console.log("yes");

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // Read and parse PDF
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(dataBuffer);
    const resumeText = pdfData.text;

    // Extract details from resume text
    const extractedDetails = extractDetails(resumeText);

    // Generate AI feedback
    const aiFeedback = await generateAIFeedback(resumeText);

    // Save resume to database
    const savedResume = await Resume.create({
      filename: req.file.originalname,
      text: resumeText,
      name: extractedDetails.name,
      email: extractedDetails.email,
      phone: extractedDetails.phone,
      skills: extractedDetails.skills,
      experience: extractedDetails.experience,
      education: extractedDetails.education,
      aiFeedback: aiFeedback,
    });

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "Resume uploaded successfully!",
      resumeId: savedResume._id,
      details: extractedDetails,
      aiFeedback: aiFeedback,
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ message: "Failed to process resume" });
  }
});

module.exports = router;
