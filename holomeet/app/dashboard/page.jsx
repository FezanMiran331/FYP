"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"; 
import { generateRoomId } from '@/lib/client-utils';
import axios from "axios";

export default function Dashboard() {
  const { data: session } = useSession(); 
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [summaryCount, setSummaryCount] = useState(0); // State for dynamic count

  const router = useRouter();

  // Fetch count of meetings with summaries
  useEffect(() => {
    const fetchSummaryCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/meetings?hasSummary=true");
        setSummaryCount(res.data.length);
      } catch (err) {
        console.error("Error fetching summary count:", err);
      }
    };
    fetchSummaryCount();
  }, []);

  const getInitials = (name) => {
    if (!name) return "??";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const startMeeting = () => {
    const roomId = generateRoomId();
    router.push(`/rooms/${roomId}`);
  };

  const join = () => router.push(`/join`);
  const goToProfile = () => router.push('/profile');
  const goToDashboard = () => router.push('/dashboard');
  const goToSchedule = () => router.push('/schedule');
  const goToFeatures = () => router.push('/features');
  const goToSummaries = () => router.push('/summaries'); // New Navigation

  const Save_Meeting_info = async () => {
    if (!title.trim() || !date.trim() || !description.trim()) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          date, 
          description,
          organizerEmail: session?.user?.email 
        }),
      });

      const data = await res.json();
      if (res.ok) {
        startMeeting();
      } else {
        alert("Error saving meeting: " + data.error);
      }
    } catch (err) {
      alert("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen text-white" style={{ background: "linear-gradient(to bottom right, #0a0f2c, #081a3a)" }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 p-6 bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_50%,#0f3460_100%)]" style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 className="text-xl font-bold mb-1">Virtual Classroom</h2>
        <p className="text-sm text-gray-400 mb-8">AI-POWERED PLATFORM</p>

        <nav className="space-y-6 mt-7">
          <button onClick={goToDashboard} className="flex items-center text-blue-400 font-semibold w-full text-left">
            <span className="mr-2">📊</span> Dashboard
          </button>
          <button onClick={() => setOpenModal(true)} className="flex items-center hover:text-blue-400 w-full text-left">
            <span className="mr-2">➕</span> Create Meeting 
          </button>
          <button onClick={goToSummaries} className="flex items-center hover:text-blue-400 w-full text-left">
            <span className="mr-2">📝</span> AI Summaries
          </button>
          <button onClick={goToSchedule} className="flex items-center hover:text-blue-400 w-full text-left">
            <span className="mr-2">⭐</span> Schedule
          </button>
          <button onClick={goToProfile} className="flex items-center hover:text-blue-400 w-full text-left">
            <span className="mr-2">👤</span> Profile
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_50%,#0f3460_100%)]">
        <div className="flex mt-4 flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">Welcome back, {session?.user?.name?.split(" ")[0] || "User"}!</h1>
            <p className="text-gray-300 text-sm mt-2">Ready to start your virtual classroom experience?</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="text-right">
              <p className="font-semibold text-white">{session?.user?.name || "Loading..."}</p>
              <p className="text-gray-400 text-sm">{session?.user?.email}</p>
            </div>
            <div onClick={goToProfile} className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold cursor-pointer hover:opacity-80 transition">
              {getInitials(session?.user?.name)}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-[#121e3d] to-[#0f2a52] min-h-[220px]">
            <h3 className="text-5xl font-bold text-blue-400 mb-2">3</h3>
            <h3 className="text-lg font-semibold">No of Meetings Today</h3>
            <p className="text-gray-400 text-sm mt-1">Active sessions scheduled for today</p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-[#121e3d] to-[#0f2a52] min-h-[220px]">
            <h3 className="text-5xl font-bold text-blue-400 mb-2">12</h3>
            <h3 className="text-lg font-semibold">Monthly Schedule</h3>
            <p className="text-gray-400 text-sm mt-1">Upcoming sessions this month</p>
          </div>

          {/* AI SUMMARY CARD - CLICKABLE */}
          <div 
            onClick={goToSummaries}
            className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-[#121e3d] to-[#0f2a52] min-h-[220px] cursor-pointer hover:scale-[1.02] transition-transform border border-transparent hover:border-blue-500"
          >
            <h3 className="text-5xl font-bold text-blue-400 mb-2">{summaryCount}</h3>
            <h3 className="text-lg font-semibold">AI Summary Reports</h3>
            <p className="text-gray-400 text-sm mt-1">Click to view all generated summaries</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button onClick={() => setOpenModal(true)} className="font-semibold px-8 py-3 rounded-xl shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition w-full sm:w-auto">
            Create Meeting
          </button>
          <button onClick={join} className="font-semibold px-8 py-3 rounded-xl shadow-lg border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition w-full sm:w-auto">
            Join Meeting
          </button>
        </div>
      </main>

      {/* Modal remains same as your original logic */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-blue-600 rounded-2xl p-6 w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Create New Meeting</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Meeting Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 rounded-md border border-blue-700 bg-transparent text-white" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 rounded-md border border-blue-700 bg-transparent text-white" />
              <textarea placeholder="Description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 rounded-md border border-blue-700 bg-transparent text-white focus:ring-2 focus:ring-blue-500"></textarea>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setOpenModal(false)} className="px-4 py-2 rounded-md text-gray-400 border border-gray-600">Cancel</button>
                <button type="button" onClick={Save_Meeting_info} className="px-8 py-2 rounded-md text-white bg-gradient-to-right from-blue-600 to-blue-400" disabled={loading}>
                  {loading ? "Saving..." : "Start"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}