import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LoaderCircle,
  User,
  Mail,
  Code,
  Briefcase,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

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
        const { data } = response.data;

        setParsedResume(data?.resume);
        setFeedback(data?.aiFeedback);
        setJobs(data?.jobs);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4">
          <div className="relative">
            <LoaderCircle className="w-12 h-12 text-blue-600 animate-spin" />
            <div className="absolute inset-0 w-12 h-12 rounded-full bg-blue-600 opacity-20 animate-pulse"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Analyzing your resume...
            </h3>
            <p className="text-gray-600">
              This might take a moment while we process your information
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Resume Analysis Complete
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here's your personalized analysis and job recommendations based on
            your resume
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Candidate Info & Feedback */}
          <div className="lg:col-span-2 space-y-8">
            {/* Candidate Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Candidate Profile
                </h2>
              </div>

              {parsedResume ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Name
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {parsedResume?.name === "SUMMARY"
                            ? "Not provided"
                            : parsedResume?.name || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Email
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {parsedResume?.email || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p>{parsedResume?.experience || "NA"}</p>

                  <div className="flex items-start space-x-3">
                    <Code className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Skills
                      </p>
                      {parsedResume?.skills?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {parsedResume.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No skills listed</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Resume data not available</p>
                </div>
              )}
            </div>

            {/* AI Feedback */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  AI Insights & Recommendations
                </h2>
              </div>

              <div className="prose max-w-none">
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {feedback || "No feedback available at this time."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Job Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 sticky top-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Job Matches
                </h2>
              </div>

              {jobs?.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job, index) => (
                    <div
                      key={index}
                      className="group border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="text-gray-600 mb-3">
                        <p className="font-medium">{job.company}</p>
                        <p className="text-sm">{job.location}</p>
                      </div>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-2">
                    No job recommendations found
                  </p>
                  <p className="text-sm text-gray-400">
                    Try updating your resume or check back later
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
