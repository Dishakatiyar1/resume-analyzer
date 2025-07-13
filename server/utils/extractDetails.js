function extractDetails(resumeText) {
  if (!resumeText || typeof resumeText !== "string") {
    return getEmptyResult();
  }

  const text = resumeText.toLowerCase();
  const lines = resumeText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  return {
    name: extractName(lines, resumeText),
    email: extractEmail(resumeText),
    phone: extractPhone(resumeText),
    skills: extractSkills(text),
    experience: extractExperience(text, resumeText),
    education: extractEducation(text, resumeText),
  };
}

// Helper function for empty results
function getEmptyResult() {
  return {
    name: "Not found",
    email: "Not found",
    phone: "Not found",
    skills: ["Not specified"],
    experience: "Not specified",
    education: ["Not specified"],
  };
}

function extractName(lines, originalText) {
  // Common section headers to avoid
  const sectionHeaders = [
    "resume",
    "cv",
    "curriculum vitae",
    "profile",
    "summary",
    "objective",
    "contact",
    "personal information",
    "about",
    "skills",
    "experience",
    "education",
    "projects",
    "achievements",
    "certifications",
  ];

  // Try first few lines
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i].trim();

    // Skip empty lines or very short lines
    if (line.length < 2 || line.length > 60) continue;

    // Skip lines that are clearly section headers
    if (sectionHeaders.some((header) => line.toLowerCase().includes(header))) {
      continue;
    }

    // Skip lines with too many numbers or special characters
    if (/\d/.test(line) && line.match(/\d/g).length > 2) continue;
    if (/[^\w\s\-\.]/.test(line)) continue;

    // Check if it looks like a name (2-4 words, mostly alphabetic)
    const words = line.split(/\s+/);
    if (words.length >= 2 && words.length <= 4) {
      const isValidName = words.every(
        (word) => /^[a-zA-Z][a-zA-Z\-'\.]*$/.test(word) && word.length > 1
      );

      if (isValidName) {
        return line;
      }
    }
  }

  // Fallback: Look for patterns like "Name: John Doe"
  const namePatterns = [
    /name\s*:?\s*([a-zA-Z\s\-\.]{2,50})/i,
    /^([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*$/m,
  ];

  for (const pattern of namePatterns) {
    const match = originalText.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return "Not found";
}

function extractEmail(resumeText) {
  const emailRegex = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
  const matches = resumeText.match(emailRegex);

  if (matches) {
    // Filter out obviously fake emails
    const validEmails = matches.filter(
      (email) =>
        !email.includes("example.com") &&
        !email.includes("test.com") &&
        email.length > 5
    );
    return validEmails[0] || matches[0];
  }

  return "Not found";
}

function extractPhone(resumeText) {
  const phonePatterns = [
    /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    /(\+\d{1,3}[-.\s]?)?\d{10}/g,
    /(\+\d{1,3}[-.\s]?)?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g,
  ];

  for (const pattern of phonePatterns) {
    const matches = resumeText.match(pattern);
    if (matches) {
      // Clean up the phone number
      const cleaned = matches[0].replace(/[^\d+]/g, "");
      if (cleaned.length >= 10) {
        return matches[0];
      }
    }
  }

  return "Not found";
}

function extractSkills(text) {
  const skillKeywords = [
    // Programming Languages
    "javascript",
    "python",
    "java",
    "c++",
    "c#",
    "php",
    "ruby",
    "go",
    "rust",
    "kotlin",
    "swift",
    "typescript",
    "scala",
    "r",
    "matlab",
    "perl",

    // Frontend Technologies
    "react",
    "angular",
    "vue",
    "html",
    "css",
    "sass",
    "scss",
    "bootstrap",
    "tailwind",
    "jquery",
    "webpack",
    "vite",
    "redux",
    "next.js",
    "nuxt.js",

    // Backend Technologies
    "node.js",
    "express",
    "django",
    "flask",
    "spring",
    "laravel",
    "rails",
    "asp.net",
    "fastapi",
    "nestjs",

    // Databases
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "redis",
    "sqlite",
    "oracle",
    "cassandra",
    "elasticsearch",

    // Cloud & DevOps
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "jenkins",
    "ci/cd",
    "terraform",
    "ansible",
    "git",
    "github",
    "gitlab",
    "bitbucket",

    // Tools & Others
    "linux",
    "windows",
    "macos",
    "agile",
    "scrum",
    "jira",
    "confluence",
    "photoshop",
    "illustrator",
    "figma",
    "sketch",
  ];

  const foundSkills = [];
  const skillsSection = extractSkillsSection(text);

  skillKeywords.forEach((skill) => {
    // Check in skills section first, then in entire text
    if (skillsSection.includes(skill) || text.includes(skill)) {
      foundSkills.push(skill);
    }
  });

  // Remove duplicates and return
  const uniqueSkills = [...new Set(foundSkills)];
  return uniqueSkills.length > 0 ? uniqueSkills : ["Not specified"];
}

function extractSkillsSection(text) {
  const skillsSectionRegex =
    /(?:skills|technologies|technical skills|core competencies)[:\s]+([\s\S]*?)(?=\n\s*(?:experience|education|projects|work|employment|certifications|achievements)|$)/i;
  const match = text.match(skillsSectionRegex);
  return match ? match[1].toLowerCase() : text;
}

function extractExperience(text, originalText) {
  // Method 1: Look for explicit experience statements
  const expPatterns = [
    /(\d+\.?\d*)\s*\+?\s*(years?|yrs?)\s*(of\s*)?(experience|exp)/gi,
    /(\d+\.?\d*)\s*\+?\s*(years?|yrs?)\s*(in|with|of)/gi,
    /over\s+(\d+)\s+(years?|yrs?)/gi,
    /(\d+)\+\s*(years?|yrs?)/gi,
  ];

  for (const pattern of expPatterns) {
    const matches = originalText.match(pattern);
    if (matches) {
      return matches[0];
    }
  }

  // Method 2: Calculate from work history dates
  const experience = calculateExperienceFromDates(originalText);
  if (experience) {
    return experience;
  }

  // Method 3: Look for job titles and count positions
  const jobCount = countJobPositions(text);
  if (jobCount > 0) {
    return `${jobCount} position${jobCount > 1 ? "s" : ""} found`;
  }

  return "Not specified";
}

function calculateExperienceFromDates(text) {
  const datePatterns = [
    /(\d{4})\s*[-–]\s*(\d{4}|present|current)/gi,
    /(\d{1,2}\/\d{4})\s*[-–]\s*(\d{1,2}\/\d{4}|present|current)/gi,
    /(\w+\s+\d{4})\s*[-–]\s*(\w+\s+\d{4}|present|current)/gi,
  ];

  const dateRanges = [];

  for (const pattern of datePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const startYear = extractYear(match[1]);
      const endYear =
        match[2].toLowerCase().includes("present") ||
        match[2].toLowerCase().includes("current")
          ? new Date().getFullYear()
          : extractYear(match[2]);

      if (startYear && endYear && endYear >= startYear) {
        dateRanges.push({ start: startYear, end: endYear });
      }
    }
  }

  if (dateRanges.length > 0) {
    const totalYears = dateRanges.reduce(
      (sum, range) => sum + (range.end - range.start),
      0
    );
    return totalYears > 0
      ? `${totalYears} years (calculated)`
      : "Less than 1 year";
  }

  return null;
}

// Helper to extract year from various date formats
function extractYear(dateStr) {
  const yearMatch = dateStr.match(/\d{4}/);
  return yearMatch ? parseInt(yearMatch[0]) : null;
}

// Count job positions
function countJobPositions(text) {
  const jobTitles = [
    "developer",
    "engineer",
    "programmer",
    "analyst",
    "manager",
    "lead",
    "senior",
    "junior",
    "intern",
    "consultant",
    "specialist",
    "architect",
    "designer",
    "coordinator",
    "supervisor",
    "director",
    "officer",
  ];

  let count = 0;
  jobTitles.forEach((title) => {
    const regex = new RegExp(`\\b${title}\\b`, "gi");
    const matches = text.match(regex);
    if (matches) count += matches.length;
  });

  return Math.min(count, 10); // Cap at 10 to avoid false positives
}

// Enhanced education extraction
function extractEducation(text, originalText) {
  const eduKeywords = [
    "bachelor",
    "master",
    "phd",
    "doctorate",
    "diploma",
    "degree",
    "b.tech",
    "b.e.",
    "m.tech",
    "m.e.",
    "mba",
    "bca",
    "mca",
    "bsc",
    "msc",
    "ba",
    "ma",
    "bs",
    "ms",
    "be",
    "me",
    "bcom",
    "mcom",
    "llb",
    "llm",
    "certification",
    "certificate",
    "associate",
    "graduation",
  ];

  const foundEducation = [];

  // Look for degree patterns
  const degreePatterns = [
    /\b(bachelor|master|phd|doctorate|diploma|degree|b\.tech|m\.tech|mba|bca|mca|bsc|msc|ba|ma|bs|ms|be|me|bcom|mcom|llb|llm)\b[^\n]*/gi,
    /\b(certification|certificate)\s+in\s+[^\n]*/gi,
  ];

  for (const pattern of degreePatterns) {
    const matches = originalText.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        if (match.trim().length > 2) {
          foundEducation.push(match.trim());
        }
      });
    }
  }

  // Fallback: just look for keywords
  if (foundEducation.length === 0) {
    eduKeywords.forEach((edu) => {
      if (text.includes(edu)) {
        foundEducation.push(edu);
      }
    });
  }

  // Remove duplicates
  const uniqueEducation = [...new Set(foundEducation)];
  return uniqueEducation.length > 0 ? uniqueEducation : ["Not specified"];
}

module.exports = { extractDetails };
