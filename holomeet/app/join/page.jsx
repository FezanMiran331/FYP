'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinPage() {
  const router = useRouter();
  const [meetingLink, setMeetingLink] = useState("");

  const handleJoin = () => {
    try {
      const url = new URL(meetingLink);
      const segments = url.pathname.split('/');
      const roomId = segments[segments.length - 1];
      router.push(`/rooms/${roomId}`);
    } catch (err) {
      alert("Invalid meeting link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200">

        <h2 className="text-3xl font-bold text-white text-center">
          Join a Meeting
        </h2>

        <p className="text-white text-center mt-1 mb-6">
          Enter your meeting link below
        </p>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Paste meeting link here"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          className="
            w-full p-3 rounded-lg 
            border border-gray-300 
            text-black 
            placeholder-gray-400
            focus:ring-2 focus:ring-indigo-500 focus:outline-none
          "
          style={{ color: "black" }} // ensures text stays black
        />

        {/* Join Button */}
        <button
          onClick={handleJoin}
          className="
            w-full mt-5 py-3 rounded-lg 
            bg-blue-700 hover:bg-indigo-700 
            text-white font-semibold 
            shadow-md transition-all
          "
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
}
