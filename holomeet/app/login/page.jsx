"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handle_click = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        router.push("/dashboard");
        alert("login done -----------")
      } else {
        setApiError(data.message || "Login failed.");
      }
    } catch (err) {
      setApiError("Server error. Please try again.");
    }
  };
  
 const handleSubmit = (e) => { e.preventDefault(); if (validate()) { alert("✅ Login Successfully")}}; // You can add API call or redirect logic here } };
  return (
    <div className="min-h-screen flex from-[#0f172a] to-[#1e3a8a] text-white">
      
     {/* ✅ Left Section */}
      <div className="w-1/4 bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_50%,#0f3460_100%)] flex flex-col justify-center px-10 border-r border-gray-700  hidden md:block">
        <div className="mb-10">
          <div className="mb-4">
            {/* <Image
              src="/holomeetlogo.png"
              alt="HoloMeet Logo"
              width={206}
              height={206}  
            /> */}
          </div>
          
          <p className="text-xl font-bold text-gray-300 mt-8">
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
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg mt-6 mb-6 border-2 border-blue-700  backdrop-blur-md p-10 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-center text-gray-300 mb-8 text-sm">
            Login to your Holo Meet  account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <a  href ="/resetPassword" className="flex justify-end text-sm text-blue-400 hover:text-blue-300 cursor-pointer">
              Forgot Password?
            </a>

            {/* Login Button */}
            <button
              type="submit"onClick={handle_click}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 text-md rounded-lg font-semibold shadow-md mt-4"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-white/20"></div>
            <span className="px-3 text-sm text-gray-400">or login with</span>
            <div className="flex-grow h-px bg-white/20"></div>
          </div>

          {/* Social Login Buttons */}
           <div className="flex justify-center space-x-6">
          {/* Google */}
           <button
      title="Login with Google"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-md transition-transform transform hover:scale-110"
    >
      <FaGoogle size={20} className="text-[#DB4437]" />
    </button>

          {/* Facebook */}
            <button 
              title="Login with Facebook"
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-md transition-transform transform hover:scale-110"
              >
              <FaFacebookF size={20} className="text-[#1877F2]" />
            </button>

          {/* GitHub */}
            <button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              title="Login with GitHub"
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-md transition-transform transform hover:scale-110"
              >
              <FaGithub size={20} className="text-white" />
            </button>
         </div>
         <p className="text-center text-gray-400 text-sm mt-6">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              >
              Create one
            </a>
          </p>
        </div>
      </div>
   </div>
  );
}
