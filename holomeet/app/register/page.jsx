"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";


export default function Register() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "",
    dob: "",
    password: "",
    confirmPassword: "",
    terms: false,
    privacy: false,
  });

  const [errors, setErrors] = useState({});

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Institutional email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 11 digits.";
    }

    if (!formData.userType) newErrors.userType = "Select user type.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!formData.terms)
      newErrors.terms = "You must agree to the Terms of Service and Privacy Policy.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return; // stop if validation fails

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Firstname: formData.firstName,
        Secondname: formData.lastName,
        Email: formData.email,
        Phonenumber: formData.phone,
        Usertype: formData.userType === "student" ? "Student" : "Teacher",
        DOB: formData.dob,
        Password: formData.password,
        Con_Password: formData.confirmPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        userType: "",
        dob: "",
        password: "",
        confirmPassword: "",
        terms: false,
        privacy: false,
      });
      setErrors({});
    } else {
      alert(data.message); // show backend error message
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("Server error. Please try again.");
  }
};

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white">
      
      {/* ✅ Left Section */}
<div className="flex w-1/4 hidden md:block bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_50%,#0f3460_100%)] flex-col justify-center px-10 border-r border-gray-700">

         <div className="mb-6">
           <p className="text-xl font-bold  text-gray-300 mt-8">
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
      <div className="flex-1 flex justify-center items-center px-16 py-6">
        <div className="w-full max-w-xl  border-2 border-blue-700 [@media(max-width:400px)]:border-none  backdrop-blur-md p-10 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Your Account
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Start your virtual learning journey today
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
  {/* Name Fields */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
      />
      {errors.firstName && (
        <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
      )}
    </div>
    <div>
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
      />
      {errors.lastName && (
        <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
      )}
    </div>
  </div>

  {/* Email */}
  <div>
    <input
      type="email"
      name="email"
      placeholder="Institutional Email Address"
      value={formData.email}
      onChange={handleChange}
      className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
    />
    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
  </div>

  {/* Phone */}
  <div>
    <input
      type="text"
      name="phone"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={handleChange}
      className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
    />
    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
  </div>

  {/* User Type + DOB */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <select
        name="userType"
        value={formData.userType}
        onChange={handleChange}
        className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-lg text-gray-400 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select user type</option>
        <option value="student" className="text-black">Student</option>
        <option value="teacher" className="text-black">Teacher</option>
      </select>
      {errors.userType && (
        <p className="text-red-400 text-sm mt-1">{errors.userType}</p>
      )}
    </div>

    <div>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-lg text-gray-400 focus:ring-2 focus:ring-blue-500"
      />
      {errors.dob && (
        <p className="text-red-400 text-sm mt-1">{errors.dob}</p>
      )}
    </div>
  </div>

  {/* Password Fields */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && (
        <p className="text-red-400 text-sm mt-1">{errors.password}</p>
      )}
    </div>
    <div>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
      />
      {errors.confirmPassword && (
        <p className="text-red-400 text-sm mt-1">
          {errors.confirmPassword}
        </p>
      )}
    </div>
  </div>

  {/* Checkboxes */}
  <div className="space-y-2 mt-4 text-sm text-gray-300">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="terms"
        checked={formData.terms}
        onChange={handleChange}
      />
      I agree to the Terms of Service and Privacy Policy
    </label>
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name="privacy"
        checked={formData.privacy}
        onChange={handleChange}
      />
      I understand my data will be used per Privacy Policy
    </label>
  </div>
  {errors.terms && (
    <p className="text-red-400 text-sm mt-1">{errors.terms}</p>
  )}

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-600 text-sm hover:bg-blue-700 transition-colors py-2 rounded-lg font-semibold shadow-md mt-4"
  >
    CREATE ACCOUNT
  </button>

  <p className="text-center text-sm text-gray-300 mt-3">
    Already have an account?{" "}
    <a href="/login" className="text-blue-400 hover:underline">
      Sign In
    </a>
  </p>
</form>

        </div>
      </div>
    </div>
  );
}
