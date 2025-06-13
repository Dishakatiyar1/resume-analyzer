# 📄 Resume Analyzer

A MERN-based web app to upload resumes, extract skills, and match them with suitable job roles.

## 🚀 Features

- Upload PDF resumes
- Extract key skills using backend parsing
- Match skills with job categories
- Built with React, Tailwind, Node.js, Express

## 🔧 Getting Started

### 🖥️ Client Setup

```bash
cd client
npm install
npm run dev

```

1. Parse the PDF (backend)
   Extract raw text from the resume using a library like pdf-parse.

✅ 2. Extract Skills
From the raw text, extract skills using:

A predefined skill set (array or JSON list)

Text matching or fuzzy logic

✅ 3. Send Extracted Skills to Frontend
Return the matched skills in the response.

✅ 4. Frontend: Display the Extracted Skills
Show them in a styled list with badges or tags.
