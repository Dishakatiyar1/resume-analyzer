const express = require("express");
const Resume = require("../models/Resume");
const { fetchJobs } = require("../utils/fetchJobs");

const router = express.Router();

router.get("/results/:id", async (req, res) => {
  const resumeId = req.params?.id;
  if (!resumeId) {
    res.send({ error: "resume Id missing" });
  }
  const resume = await Resume.findById(resumeId);
  const jobList = await fetchJobs();
  res.send({ jobs: jobList });
});

module.exports = router;
