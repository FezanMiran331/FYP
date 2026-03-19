"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Initial state exactly matching your Backend Schema
  const [formData, setFormData] = useState({
    Firstname: "",
    Secondname: "",
    Email: "",
    Department: "",
    EmployeeID: "",
    Phonenumber: "",
    OfficeLocation: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.email) {
        try {
          
          const res = await axios.get(`http://localhost:5000/api/profile`, {
            params: { email: session.user.email }
          });
          
          if (res.data) {
            // MAPPING: Ensure keys match your 
            setFormData({
              Firstname: res.data.Firstname || "",
              Secondname: res.data.Secondname || "",
              Email: res.data.Email || session.user.email, 
              Department: res.data.Department || "",
              EmployeeID: res.data.EmployeeID || "",
              Phonenumber: res.data.Phonenumber || "",
              OfficeLocation: res.data.OfficeLocation || ""
            });
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, [session]);

  const handleChange = (e) => { 
    console.log(e.target)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Sending 'Email'
      await axios.put(`http://localhost:5000/api/profile`, formData);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white p-10 bg-[#0a0f2c] min-h-screen">Loading Profile...</div>;

  return (
    <div className="flex min-h-screen text-white bg-[#0a0f2c] font-sans">
      {/* Sidebar - Matching your layout */}
      <aside className="w-64 p-6 border-r border-white/10 hidden md:block">
        <h2 className="text-xl font-bold mb-10">Virtual Classroom</h2>
        <nav className="space-y-6">
          <div onClick={() => router.push('/dashboard')} className="cursor-pointer text-gray-400 hover:text-white">📊 Dashboard</div>
          <div className="text-blue-500 font-semibold border-l-4 border-blue-500 pl-2">👤 Profile</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-400 mb-8">Personal Information</h1>

          {/* Form Container - Exactly as per your Image */}
          <div className="bg-[#16213e] p-8 rounded-3xl border border-white/5 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* First Name */}
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">First Name</label>
                <input
                  name="Firstname"
                  value={formData.Firstname}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#0a0f2c] border border-blue-900/40 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Last Name</label>
                <input
                  name="Secondname"
                  value={formData.Secondname}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#0a0f2c] border border-blue-900/40 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
                <input
                  name="Email"
                  onChange={handleChange}
                  value={formData.Email}
                  
                  className="w-full p-3 rounded-xl bg-[#111827] border border-white/5 text-gray-500"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Department</label>
                <input
                  name="Department"
                  value={formData.Department}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#0a0f2c] border border-blue-900/40 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Employee ID
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Employee / Student ID</label>
                <input
                  name="EmployeeID"
                  value={formData.EmployeeID}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#0a0f2c] border border-blue-900/40 focus:border-blue-500 outline-none"
                />
              </div> */}

              {/* Phone Number */}
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Phone Number</label>
                <input
                  name="Phonenumber"
                  value={formData.Phonenumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#0a0f2c] border border-blue-900/40 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Office Location
              <div>
                <label className="block text-xs text-gray-400 mb-2 uppercase tracking-wider">Office Location</label>
                <input
                  name="OfficeLocation"
                  value={formData.OfficeLocation}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-[#0a0f2c] border border-blue-900/40 focus:border-blue-500 outline-none"
                />
              </div> */}
            </div>

            {/* Action Buttons - Matching your Image */}
            <div className="flex justify-end gap-4 mt-10">
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-xl border border-gray-600 text-sm font-medium hover:bg-white/5 transition"
              >
                Reset Changes
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-2.5 rounded-xl bg-[#3b82f6] hover:bg-blue-600 text-white font-semibold transition shadow-lg shadow-blue-500/20 text-sm"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}