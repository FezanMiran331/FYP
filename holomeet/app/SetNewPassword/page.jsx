"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SetNewPassword() {
  const router = useRouter();

  // ✅ States
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  // ✅ Get email from localStorage
  const email = localStorage.getItem("resetEmail");

  // ✅ Handle password update
  const handleClick = async () => {
    // ✅ Validation
    if (!newPassword || !confirmPassword) {
      setMsg("Both fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setMsg("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMsg("Passwords do not match.");
      return;
    }
    if (!email) {
      setMsg("No email found. Please restart the password reset process.");
      return;
    }

    try {
      // ✅ POST to backend
      const res = await axios.post(
        "http://localhost:5000/api/password/set-new-password",
        {
          email,
          newPassword,
          confirmPassword,
        }
      );

      setMsg(res.data.message); // show success
      localStorage.removeItem("resetEmail"); // clear stored email
      router.push("/login"); // redirect to login
    } catch (err) {
      setMsg(err.response?.data?.message || "Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center from-[#0f172a] to-[#1e3a8a] text-white">
      {/* ✅ Left Section */}
      <div className="hidden md:block w-1/4 overflow-hidden bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_50%,#0f3460_100%)] flex flex-col justify-center px-10 border-r border-gray-700">
        <div className="mb-10">
          <p className="text-sm text-gray-300 mt-2">
            Join the future of Virtual Learning
          </p>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Create your account to access AI-powered virtual classrooms with
          real-time collaboration and intelligent meeting summaries.
        </p>

        <ul className="space-y-2 text-sm text-gray-300">
          <li>✔️ AI Voice Conferencing & Screen Sharing</li>
          <li>✔️ Real-Time Attendance Tracking</li>
          <li>✔️ Intelligent Chat & Collaboration Tools</li>
          <li>✔️ Automated Meeting Summaries</li>
          <li>✔️ Smart Threshold Attendance</li>
          <li>✔️ Cross-Platform Compatibility</li>
        </ul>
      </div>

      {/* ✅ Right Section */}
      <div className="flex-1 flex justify-center items-center px-16 py-10">
        {/* Glass Container */}
        <div className="w-[90%] sm:w-[400px] md:w-[420px] lg:w-[450px] border-2 border-blue-700 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-2">Set New Password</h2>
          <p className="text-center text-gray-300 mb-8">
            Please enter your new password below.
          </p>

          {/* Form */}
          <form>
            <label className="block text-sm mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-blue-500"
            />

            <label className="block text-sm mt-4 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:border-blue-500"
            />

            {msg && (
              <p className={`text-sm mt-3 ${msg.includes("success") ? "text-green-500" : "text-red-500"}`}>
                {msg}
              </p>
            )}

            <button
              type="button"
              onClick={handleClick}
              className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
            >
              Save Password
            </button>
          </form>

          {/* Back to Login */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Go back to login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
