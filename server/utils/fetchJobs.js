const axios = require("axios");

async function fetchJobs(query = "developer jobs in india") {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query,
      page: "1",
      num_pages: "1",
      country: "in",
      date_posted: "all",
    },
    headers: {
      "X-RapidAPI-Key": "8eea86829cmsh282a9db88cca420p189cf6jsn81469d586b35",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("✅ Jobs fetched successfully");
    return response.data.data;
  } catch (err) {
    console.error("❌ API Error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { fetchJobs };
