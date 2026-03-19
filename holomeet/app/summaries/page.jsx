//app/summaries/page.jsx 
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SummaryListPage() {
  const [reports, setReports] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        // Use the absolute URL to your backend
        const res = await axios.get('http://localhost:5000/api/meetings?hasSummary=true');
        setReports(res.data);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }
    };
    fetchSummaries();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">📊 AI Meeting Reports</h1>
        <div className="grid gap-4">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div key={report._id} className="bg-[#1e293b] border border-gray-700 p-6 rounded-xl flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-blue-400">{report.title}</h2>
                  <p className="text-gray-400 text-sm">{new Date(report.date).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => router.push(`/summaries/${report._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
                >
                  View Analysis
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-20">No summaries found.</p>
          )}
        </div>
      </div>
    </div>
  );
}