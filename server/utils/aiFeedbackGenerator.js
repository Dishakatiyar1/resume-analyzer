const axios = require("axios");

async function generateAIFeedback(resumeText) {
  console.log("api", process.env.OPENAI_API_KEYy);
  try {
    console.log("ai feedback generator");
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a professional resume reviewer. Provide helpful, constructive feedback on resumes. Keep your response concise and actionable.",
          },
          {
            role: "user",
            content: `Please review this resume and provide feedback on:\n1. Overall structure and formatting\n2. Skills and experience presentation\n3. Areas for improvement\n4. Suggestions for better job matching\n\nResume text:\n${resumeText}`,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response ", response.data);

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Unable to generate AI feedback at this time. Please try again later.";
  }
}

module.exports = { generateAIFeedback };
