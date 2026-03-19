"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function SummaryDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/meetings/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/summary/${id}/generate`);
      
      // Updated: Syncing with your new backend fields
      setData(prev => ({ 
        ...prev, 
        summary: res.data.summary, 
        transcription: res.data.summary.transcriptText 
      }));
      
      alert("AI Summary Generated Successfully!");
    } catch (err) {
      // REMOVED: Old recording alert is gone now
      const errorMsg = err.response?.data?.error || "AI Processing failed. Check backend console.";
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-white">Loading Analysis...</div>;

  return (
    <div className="min-h-screen bg-[#0a0f2c] text-white p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-blue-400">🤖 AI Meeting Summary</h1>
        <div className="flex gap-4">
          <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm">● Live Processing</span>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Words Transcribed", val: "2,600", icon: "💬" },
          { label: "Key Points Identified", val: "12", icon: "🎯" },
          { label: "Active Speakers", val: "5", icon: "👥" },
          { label: "Accuracy", val: "98%", icon: "📊" },
        ].map((item, i) => (
          <div key={i} className="bg-[#16213e] p-4 rounded-xl border border-white/5">
            <p className="text-gray-400 text-sm">{item.label}</p>
            <h3 className="text-2xl font-bold mt-1 text-blue-300">{item.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Transcription */}
        <div className="lg:col-span-2 bg-[#16213e] rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">📑 Live Transcription</h2>
          {/* <div className="h-[400px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {data?.transcription || data?.transcriptText ? (
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {data.transcription || data.transcriptText}
              </p>
            ) : (
              <div className="text-center py-20 text-gray-500 italic">No transcription available. Click generate.</div>
            )}
          </div> */}
<div className="h-[400px] overflow-y-auto bg-black/20 p-4 rounded-lg">
  {/* Dono possible fields check karein */}
  {data?.transcriptText || data?.transcription ? (
    <p className="text-gray-300 whitespace-pre-wrap">
      {data.transcriptText || data.transcription}
    </p>
  ) : (
    <div className="text-center py-20 text-gray-500 italic">
      No transcription found. Run test-data.js first!
    </div>
  )}
</div>
          <div className="mt-6 flex gap-3">
            <button onClick={handleGenerate} className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700">
              Generate AI Summary
            </button>
          </div>
        </div>
        

        {/* Right Column: AI Summary Cards */}
        <div className="bg-[#16213e] rounded-2xl p-6 border border-white/5">
          <h2 className="text-lg font-bold mb-4 text-yellow-400">✨ AI Summary</h2>
          {data?.summary ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-blue-400 font-bold text-sm mb-2 uppercase">Main Topic</h4>
                <p className="text-gray-200">{data.summary.mainTopic}</p>
              </div>
              <div>
                <h4 className="text-blue-400 font-bold text-sm mb-2 uppercase">Action Items</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                  {data.summary.actionItems?.map((item, i) => (
                    <li key={i}>{typeof item === 'string' ? item : `${item.task} (${item.assignedTo})`}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Summary will appear after processing.</p>
          )}
        </div>
      </div>

      {/* Export Section */}
      <div className="mt-8 bg-[#16213e] rounded-2xl p-8 border border-white/5">
        <h2 className="text-lg font-bold mb-6">📥 Export Summary & Transcript</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button onClick={() => window.open(`http://localhost:5000/api/summary/${id}/download/pdf`)} className="flex flex-col items-center p-4 hover:bg-white/5 rounded-xl transition">
            <span className="text-2xl mb-2">📄</span> <span className="text-xs">Export PDF</span>
          </button>
          <button onClick={() => window.open(`http://localhost:5000/api/summary/${id}/download/docx`)} className="flex flex-col items-center p-4 hover:bg-white/5 rounded-xl transition">
            <span className="text-2xl mb-2">📝</span> <span className="text-xs">Export DOCX</span>
          </button>
        </div>
      </div>
    </div>
  );
}