"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    Firstname: "",
    Secondname: "",
    Email: "",
    Department: "",
    EmployeeID: "",
    Phonenumber: "",
    OfficeLocation: "",
    Usertype: "",     
    createdAt: ""
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
            setFormData({
              Firstname: res.data.Firstname || "",
              Secondname: res.data.Secondname || "",
              Email: res.data.Email || session.user.email, 
              Department: res.data.Department || "",
              EmployeeID: res.data.EmployeeID || "",
              Phonenumber: res.data.Phonenumber || "",
              OfficeLocation: res.data.OfficeLocation || "",
              Usertype: res.data.Usertype || "Teacher",
              createdAt: res.data.createdAt || ""
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Clean JSON request, NO multipart/form-data
      await axios.put(`http://localhost:5000/api/profile`, formData);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const formatMemberSince = (dateString) => {
    if (!dateString) return "January 2024";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const getInitials = () => {
    const first = formData.Firstname ? formData.Firstname.charAt(0).toUpperCase() : "J";
    const last = formData.Secondname ? formData.Secondname.charAt(0).toUpperCase() : "D";
    return `${first}${last}`;
  };

  if (loading) return <div className="text-white p-10 bg-[#0f172a] min-h-screen">Loading Profile...</div>;

  return (
    <div className="min-h-screen text-white bg-[#0f172a] font-sans p-6 md:p-10">
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">User Profile</h1>
        <p className="text-slate-300 text-sm">Manage your account settings and preferences</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          
          <div className="bg-[#1e293b] p-8 rounded-xl shadow-xl border border-slate-700/50 flex flex-col items-center">
            
            {/* Initials Circle */}
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg shadow-blue-500/20 overflow-hidden border-2 border-slate-600">
              {getInitials()}
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              {formData.Firstname || "John"} {formData.Secondname || "Doe"}
            </h3>
            <p className="text-sm text-slate-400 mb-6 capitalize">{formData.Usertype}</p>
            
            <div className="flex gap-2 w-full justify-center">
              <span className="px-3 py-1.5 bg-slate-700/40 rounded-lg text-xs text-blue-300 border border-slate-600/50 flex items-center">
                @uog.edu.pk
              </span>
            </div>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-xl shadow-xl border border-slate-700/50">
            <h2 className="text-lg font-semibold text-blue-400 mb-4">Quick Info</h2>
            <hr className="border-slate-700/50 mb-6" />

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-200">Email Verified</h3>
                  <p className="text-[11px] text-slate-400 mt-1">{formData.Email}</p>
                </div>
              </div>

              <hr className="border-slate-700/30" />

              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-200">Member Since</h3>
                  <p className="text-[11px] text-slate-400 mt-1">{formatMemberSince(formData.createdAt)}</p>
                </div>
              </div>

              <hr className="border-slate-700/30" />

              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-200">Role</h3>
                  <p className="text-[11px] text-slate-400 mt-1 capitalize">{formData.Usertype}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="bg-[#1e293b] p-8 rounded-xl shadow-xl border border-slate-700/50">
            <h2 className="text-lg font-semibold text-blue-400 mb-4">Personal Information</h2>
            <hr className="border-slate-700/50 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="block text-xs text-slate-200 mb-2 font-medium">First Name</label>
                <input name="Firstname" value={formData.Firstname} onChange={handleChange} className="w-full p-2.5 rounded-lg bg-[#27354f] border border-slate-600/50 focus:border-blue-500 outline-none text-sm text-slate-100 transition-colors" />
              </div>

              <div>
                <label className="block text-xs text-slate-200 mb-2 font-medium">Last Name</label>
                <input name="Secondname" value={formData.Secondname} onChange={handleChange} className="w-full p-2.5 rounded-lg bg-[#27354f] border border-slate-600/50 focus:border-blue-500 outline-none text-sm text-slate-100 transition-colors" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs text-slate-200 mb-2 font-medium">Email Address</label>
                <input name="Email" readOnly disabled value={formData.Email} className="w-full p-2.5 rounded-lg bg-[#27354f] border border-slate-600/50 text-sm text-slate-400 opacity-80 cursor-not-allowed" />
              </div>

              <div>
                <label className="block text-xs text-slate-200 mb-2 font-medium">Department</label>
                <input name="Department" value={formData.Department} onChange={handleChange} className="w-full p-2.5 rounded-lg bg-[#27354f] border border-slate-600/50 focus:border-blue-500 outline-none text-sm text-slate-100 transition-colors" />
              </div>

              <div>
                <label className="block text-xs text-slate-200 mb-2 font-medium">
                  {formData.Usertype === "Student" ? "Student Roll No." : "Employee ID"}
                </label>
                <input name="EmployeeID" value={formData.EmployeeID} onChange={handleChange} className="w-full p-2.5 rounded-lg bg-[#27354f] border border-slate-600/50 focus:border-blue-500 outline-none text-sm text-slate-100 transition-colors" />
              </div>

              {/* Layout span fix for Phone Number if user is Student */}
              <div className={formData.Usertype === "Student" ? "md:col-span-2" : ""}>
                <label className="block text-xs text-slate-200 mb-2 font-medium">Phone Number</label>
                <input name="Phonenumber" value={formData.Phonenumber} onChange={handleChange} className="w-full p-2.5 rounded-lg bg-[#27354f] border border-slate-600/50 focus:border-blue-500 outline-none text-sm text-slate-100 transition-colors" />
              </div>

              {formData.Usertype !== "Student" && (
                <div>
                  <label className="block text-xs text-slate-200 mb-2 font-medium">Office Location</label>
                  <input name="OfficeLocation" value={formData.OfficeLocation} onChange={handleChange} className="w-full p-2.5 rounded-lg bg-[#27354f] border border-slate-600/50 focus:border-blue-500 outline-none text-sm text-slate-100 transition-colors" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => window.location.reload()} 
                className="px-5 py-2 rounded-lg border border-slate-600/80 text-xs font-medium hover:bg-slate-700 transition-colors text-white"
              >
                Reset Changes
              </button>
              
              {/* Force button color here - Bright Blue matching User Profile Text */}
              <button 
                onClick={handleSave} 
                disabled={saving} 
                className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-colors text-xs shadow-lg shadow-blue-500/30 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}