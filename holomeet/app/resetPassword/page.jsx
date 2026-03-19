"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"; // ✅ FIXED
import { Lock } from "lucide-react";
export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(""); // ✅ FIXED (added missing state)

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/password/request-reset",
        { email }
      );

      setMsg(res.data.message);

      // Save email for next page
      localStorage.setItem("resetEmail", email);

      // Redirect correctly
      router.push("/SetNewPassword"); // ✅ FIXED route
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };
  return (

    <div className="min-h-screen flex from-[#0f172a] to-[#1e3a8a] text-white">
      {/*✅ Left Section */}
      <div className=" hidden md:block w-1/4 bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_50%,#0f3460_100%)] flex flex-col justify-center px-10 border-r border-gray-700">
        <div className="mb-10">
          <div className="mb-4">
          </div>
        
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
      <div className="flex-1 flex justify-center items-center px-16 py-8">
        <div className=" backdrop-blur-md border-2 border-blue-700 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center text-white relative">
                  
         {/* Lock Icon */}
           <div className="flex justify-center mb-5">
             <div className="bg-blue-600/20 p-4 rounded-2xl">
               <Lock size={25} className="text-blue-400" />
             </div>
           </div>

         {/* Title */}
           <h1 className="text-2xl font-semibold  mb-2">
            Reset Password
           </h1>
           <p className="text-gray-300 text-sm mb-8">
             Enter your email address and we’ll send you instructions to reset your password.
           </p>

         {/* Form */}
            <form className="space-y-6 text-left">
             <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                 <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                </div>
              </div>

              <button
                type="button" onClick={handleSubmit}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md"
                >
                 Reset Password
              </button>
            </form>

          {/* Security Note */}
           <div className=" mt-8 text-left bg-white/5 p-3 rounded-lg border border-white/10">
              <p className="text-sm">
                <span className="text-blue-400 font-semibold">Security Note:</span> <br />
                For your security, reset links expire after 24 hours. If you don’t receive an email within a few minutes, please check your spam folder or contact support.
              </p>
            </div>

          {/* Divider */}
             <div className="flex items-center my-6">
                <hr className="flex-grow border-white/10" />
                <span className="mx-2 text-gray-400 text-sm">or</span>
                <hr className="flex-grow border-white/10" />
              </div>

          {/* Back to Login */}
           <button
             onClick={() => router.push("/login")}
             className="text-blue-400 hover:underline text-sm"
             >
             ← Back to Login
           </button>
        </div>
      </div>
    </div>
  );
}


