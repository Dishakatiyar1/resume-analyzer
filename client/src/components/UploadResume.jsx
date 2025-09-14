import React, { useState } from "react";
import { Upload, FileText, CheckCircle, Loader } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadResume = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (
      !selectedFile.name.toLowerCase().includes(".pdf") &&
      !selectedFile.name.toLowerCase().includes(".doc")
    ) {
      setMessage("Please upload a PDF or Word document");
      return;
    }

    // Check file size (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setMessage("File must be smaller than 5MB");
      return;
    }

    setFile(selectedFile);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setMessage("Uploading your resume...");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status == 200) {
        setMessage("Resume uploaded successfully!");
        navigate(`/results/${response.data?.resumeId}`);
      } else {
        setMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }

    setUploading(false);
  };

  const removeFile = () => {
    setFile(null);
    setMessage("");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Upload Resume</h2>
        <p className="text-gray-600">Get instant feedback on your resume</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
        {!file ? (
          <div>
            <p className="mb-6 text-gray-600 text-lg">
              Choose your resume file
            </p>
            <label className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors font-medium">
              Browse Files
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-4">
              PDF or Word documents only (Max 5MB)
            </p>
          </div>
        ) : (
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center justify-center mb-3">
              <FileText className="w-8 h-8 text-green-600 mr-2" />
              <span className="font-medium text-green-800">File Ready!</span>
            </div>
            <p className="text-green-700 mb-4 font-medium">{file.name}</p>
            <button
              onClick={removeFile}
              className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline"
            >
              Choose different file
            </button>
          </div>
        )}
      </div>

      {message && (
        <div
          className={`mt-6 p-4 rounded-lg text-center font-medium ${
            message.includes("success")
              ? "bg-green-100 text-green-800 border border-green-200"
              : message.includes("failed") || message.includes("Please")
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}
        >
          {message}
        </div>
      )}

      {file && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full mt-6 py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            uploading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 shadow-lg"
          }`}
        >
          {uploading ? (
            <span className="flex items-center justify-center">
              <Loader className="animate-spin mr-3 h-5 w-5 text-white" />
              Uploading...
            </span>
          ) : (
            "Analyze My Resume"
          )}
        </button>
      )}
    </div>
  );
};

export default UploadResume;
