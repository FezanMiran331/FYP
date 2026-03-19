// frontend/app/meeting/[id]/page.jsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useSocket } from '@/context/SocketContext'; // Adjust to your socket context path

export default function MeetingPage({ params }) {
  const { id } = params; // Meeting ID from URL
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  // 1. Logic to call the Backend API
  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      // Calls the POST route in summaryController.js
      const response = await axios.post(`http://localhost:5000/api/summaries/generate/${id}`);
      
      if (response.data.success) {
        setSummaryData(response.data.summary);
        alert("Meeting Summary Generated Successfully!");
      }
    } catch (error) {
      console.error("Summary Generation Error:", error);
      alert(error.response?.data?.error || "Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* --- Other Meeting Components (Video, Chat, etc.) --- */}

      {/* 2. The Button Section (Add this at the bottom of your UI) */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg w-full max-w-2xl text-center">
        <h3 className="text-lg font-bold mb-4">Post-Meeting AI Summary</h3>
        
        {/* Only show this button if the meeting is finished */}
        <button
          onClick={generateSummary}
          disabled={isGenerating}
          className={`px-8 py-3 rounded-full font-semibold text-white transition-all ${
            isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg'
          }`}
        >
          {isGenerating ? "AI is Analyzing Transcript..." : "Generate Meeting Summary"}
        </button>

        {/* 3. Logic to display the Summary once generated */}
        {summaryData && (
          <div className="mt-8 bg-white p-6 rounded shadow text-left border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-gray-800">{summaryData.mainTopic}</h2>
            <p className="text-gray-600 mt-2 italic">{summaryData.shortOverview}</p>
            
            <h4 className="font-bold mt-4 text-blue-700 underline">Key Decisions:</h4>
            <ul className="list-disc ml-5">
              {summaryData.importantDecisions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}