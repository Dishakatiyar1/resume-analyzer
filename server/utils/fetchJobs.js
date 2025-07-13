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
    console.log(`✅ Jobs fetched successfully for query: "${query}"`);

    // Return simplified job data
    const jobs =
      response.data.data?.map((job) => ({
        id: job.job_id,
        title: job.job_title,
        company: job.employer_name,
        location: job.job_city || job.job_country,
        description: job.job_description,
        url: job.job_apply_link,
        salary: job.job_salary_range,
        type: job.job_employment_type,
        posted: job.job_posted_at_datetime_utc,
      })) || [];

    return jobs;
  } catch (error) {
    console.error("❌ Job fetch error:", error.response?.data || error.message);
    return [];
  }
}

module.exports = { fetchJobs };
