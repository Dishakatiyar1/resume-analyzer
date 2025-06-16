const multer = require("multer");
const express = require("express");
const fs = require("fs");
const pdf = require("pdf-parse");
const { extractDetails } = require("../utils/extractDetails");
const Resume = require("../models/Resume");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("resume"), async (req, res) => {
  let dataBuffer = fs.readFileSync(req.file.path);

  try {
    if (!req.file) {
      res.status(400).json({ message: "No File Uploaded!" });
    }
    const data = await pdf(dataBuffer);
    const { name, email, phone, skills } = extractDetails(data.text);
    const saved = await Resume.create({
      filename: req.file.originalname,
      text: data?.text,
      name,
      email,
      phone,
      skills,
    });
    res.status(200).json({ message: "Resume Saved!", resume: saved });
  } catch (err) {
    console.error("error: " + err.message);
    res.status(500).json({ message: "Failed to parse resume" });
  }
});

module.exports = router;
