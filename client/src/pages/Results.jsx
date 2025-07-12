import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

const Results = () => {
  const { id: resumeId } = useParams();
  const [feedback, setFeedback] = useState("");
  const [jobs, setJobs] = useState([]);
  const [parsedResume, setParsedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/results/${resumeId}`
        );
        const { parsedResume, aiFeedback, jobRecommendations } = response.data;

        setParsedResume(parsedResume);
        setFeedback(aiFeedback);
        setJobs(jobRecommendations);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Unable to fetch results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) fetchResults();
  }, [resumeId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircle className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-lg font-medium text-gray-700">
          Analyzing your resume...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-6 bg-red-100 text-red-800 rounded-lg border border-red-200 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Resume Analysis Result
      </h2>

      <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Candidate Summary
        </h3>
        {parsedResume ? (
          <ul className="text-gray-700 list-disc list-inside space-y-1">
            <li>
              <strong>Name:</strong> {parsedResume.name || "N/A"}
            </li>
            <li>
              <strong>Email:</strong> {parsedResume.email || "N/A"}
            </li>
            <li>
              <strong>Skills:</strong>{" "}
              {parsedResume.skills?.join(", ") || "N/A"}
            </li>
            <li>
              <strong>Experience:</strong>{" "}
              {parsedResume.experience?.length || 0} entries
            </li>
          </ul>
        ) : (
          <p className="text-gray-500">Resume data not available.</p>
        )}
      </div>

      <div className="bg-gray-50 border rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          AI Feedback
        </h3>
        <p className="text-gray-700 whitespace-pre-line">{feedback}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Job Recommendations
        </h3>
        {jobs?.length > 0 ? (
          <ul className="space-y-4">
            {jobs?.map((job, index) => (
              <li key={index} className="bg-white border rounded-lg shadow p-5">
                <h4 className="text-lg font-bold text-blue-700">{job.title}</h4>
                <p className="text-gray-700">
                  {job.company} – {job.location}
                </p>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 font-medium hover:underline"
                >
                  Apply Now →
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No job recommendations found.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
