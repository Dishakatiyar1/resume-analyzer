function extractDetails(resumeText) {
  const text = resumeText.toLowerCase();

  // Extract name (usually first line or after certain keywords)
  const extractName = () => {
    const lines = resumeText.split("\n").filter((line) => line.trim());
    // Try to find name in first few lines
    for (let i = 0; i < Math.min(3, lines.length); i++) {
      const line = lines[i].trim();
      if (line.length > 2 && line.length < 50 && /^[a-zA-Z\s]+$/.test(line)) {
        return line;
      }
    }
    return "Not found";
  };

  // Extract email
  const extractEmail = () => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = resumeText.match(emailRegex);
    return matches ? matches[0] : "Not found";
  };

  // Extract phone number
  const extractPhone = () => {
    const phoneRegex =
      /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10}/g;
    const matches = resumeText.match(phoneRegex);
    return matches ? matches[0] : "Not found";
  };

  // Extract skills
  const extractSkills = () => {
    const skillKeywords = [
      "javascript",
      "python",
      "java",
      "react",
      "node.js",
      "html",
      "css",
      "sql",
      "mongodb",
      "express",
      "angular",
      "vue",
      "php",
      "c++",
      "c#",
      "git",
      "docker",
      "kubernetes",
      "aws",
      "azure",
      "mysql",
      "postgresql",
      "typescript",
      "bootstrap",
      "jquery",
      "sass",
      "webpack",
      "npm",
      "yarn",
    ];

    const foundSkills = [];
    skillKeywords.forEach((skill) => {
      if (text.includes(skill)) {
        foundSkills.push(skill);
      }
    });

    return foundSkills.length > 0 ? foundSkills : ["Not specified"];
  };

  // Extract experience
  const extractExperience = () => {
    const expRegex = /(\d+\.?\d*)\s*(years?|yrs?)\s*(of\s*)?(experience|exp)/gi;
    const matches = resumeText.match(expRegex);
    if (matches) {
      return matches[0];
    }

    // Look for company names and dates
    const dateRegex = /\b\d{4}\s*-\s*(\d{4}|present|current)\b/gi;
    const dateMatches = resumeText.match(dateRegex);
    return dateMatches
      ? `${dateMatches.length} work periods found`
      : "Not specified";
  };

  // Extract education
  const extractEducation = () => {
    const eduKeywords = [
      "bachelor",
      "master",
      "phd",
      "diploma",
      "degree",
      "b.tech",
      "m.tech",
      "mba",
      "bca",
      "mca",
    ];
    const foundEducation = [];

    eduKeywords.forEach((edu) => {
      if (text.includes(edu)) {
        foundEducation.push(edu);
      }
    });

    return foundEducation.length > 0 ? foundEducation : ["Not specified"];
  };

  return {
    name: extractName(),
    email: extractEmail(),
    phone: extractPhone(),
    skills: extractSkills(),
    experience: extractExperience(),
    education: extractEducation(),
  };
}

module.exports = { extractDetails };
