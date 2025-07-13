const express = require("express");
const Resume = require("../models/Resume");
const { fetchJobs } = require("../utils/fetchJobs");
const { generateJobQuery } = require("../utils/jobQueryGenerator");

const router = express.Router();

router.get("/results/:id", async (req, res) => {
  try {
    const resumeId = req.params.id;

    if (!resumeId) {
      return res.status(400).json({ error: "Resume ID is required" });
    }

    // Get resume from database
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    // Generate job search query based on resume
    const jobQuery = generateJobQuery({
      skills: resume.skills,
      experience: resume.experience,
      education: resume.education,
    });

    // Fetch relevant jobs
    const jobs = await fetchJobs(jobQuery);

    // Return response
    res.json({
      success: true,
      data: {
        resume: {
          id: resume._id,
          name: resume.name,
          email: resume.email,
          phone: resume.phone,
          skills: resume.skills,
          experience: resume.experience,
          education: resume.education,
        },
        jobs: jobs,
        aiFeedback: resume.aiFeedback,
        searchQuery: jobQuery,
        totalJobs: jobs.length,
      },
    });
  } catch (error) {
    console.error("Results fetch error:", error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

module.exports = router;
