function generateJobQuery(resumeDetails) {
  const { skills, experience, education } = resumeDetails;

  // Main job categories based on skills
  const jobCategories = {
    javascript: "JavaScript Developer",
    react: "React Developer",
    "node.js": "Node.js Developer",
    python: "Python Developer",
    java: "Java Developer",
    php: "PHP Developer",
    angular: "Angular Developer",
    vue: "Vue.js Developer",
    html: "Frontend Developer",
    css: "Frontend Developer",
    sql: "Backend Developer",
    mongodb: "Full Stack Developer",
    aws: "Cloud Developer",
    docker: "DevOps Engineer",
  };

  // Find the best matching job category
  let jobTitle = "Software Developer";
  let maxMatches = 0;

  for (const [skill, category] of Object.entries(jobCategories)) {
    const matches = skills.filter((s) =>
      s.toLowerCase().includes(skill.toLowerCase())
    ).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      jobTitle = category;
    }
  }

  // Add experience level
  let experienceLevel = "";
  if (typeof experience === "string") {
    if (experience.includes("0") || experience.includes("fresher")) {
      experienceLevel = "Entry Level ";
    } else if (experience.includes("1") || experience.includes("2")) {
      experienceLevel = "Junior ";
    } else if (
      experience.includes("3") ||
      experience.includes("4") ||
      experience.includes("5")
    ) {
      experienceLevel = "Mid Level ";
    } else {
      experienceLevel = "Senior ";
    }
  }

  // Generate location-based query
  const locations = [
    "India",
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Chennai",
  ];
  const randomLocation =
    locations[Math.floor(Math.random() * locations.length)];

  const query = `${experienceLevel}${jobTitle} jobs in ${randomLocation}`;

  return query;
}

module.exports = { generateJobQuery };
