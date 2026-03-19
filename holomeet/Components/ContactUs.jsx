"use client";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // 👇 handleChange function (you missed this)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("❌ Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Unable to connect to the server.");
    }
  };

  const contactInfo = [
    { icon: "📧", title: "Email", detail: "support@holomeet.com" },
    { icon: "📞", title: "Phone", detail: "+1 (555) 123-4567" },
    { icon: "📍", title: "Address", detail: "San Francisco, CA 94102" },
  ];

  return (
    <section
      className="relative py-20 px-4"
      style={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      }}
    >
      <div className="w-[95%] max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-12 py-2 bg-blue-700/30 text-blue-300 rounded-full text-xl font-semibold mb-6 border border-blue-600/40 backdrop-blur-sm">
            Contact HoloMeet
          </span>
          <h2 className="text-4xl mt-2 md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{info.icon}</div>
              <h3 className="text-white font-semibold mb-2">{info.title}</h3>
              <p className="text-gray-300 text-sm">{info.detail}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-lg mx-auto bg-white/5 border border-white/10 rounded-xl p-4 md:p-8">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Send us a Message
          </h3>
          <form className="space-y-5" onSubmit={handleSubmit}>

{/* Name */}
<div>
  <label
    htmlFor="name"
    className="block text-white font-medium mb-2 text-sm"
  >
    Name
  </label>
  <input
    type="text"
    id="name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    className="w-full !text-white px-4 py-2.5 bg-transparent border border-white/20 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
    placeholder="Your name"
  />
</div>

{/* Email */}
<div>
  <label
    htmlFor="email"
    className="block text-white font-medium mb-2 text-sm"
  >
    Email
  </label>
  <input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    className="w-full !text-white px-4 py-2.5 bg-transparent border border-white/20 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
    placeholder="your.email@example.com"
  />
</div>

{/* Subject */}
<div>
  <label
    htmlFor="subject"
    className="block text-white font-medium mb-2 text-sm"
  >
    Subject
  </label>
  <input
    type="text"
    id="subject"
    name="subject"
    value={formData.subject}
    onChange={handleChange}
    className="w-full !text-white px-4 py-2.5 bg-transparent border border-white/20 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
    placeholder="How can we help?"
  />
</div>

{/* Message */}
<div>
  <label
    htmlFor="message"
    className="block text-white font-medium mb-2 text-sm"
  >
    Message
  </label>
  <textarea
    id="message"
    name="message"
    value={formData.message}
    onChange={handleChange}
    rows={5}
    className="w-full !text-white px-4 py-2.5 bg-transparent border border-white/20 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none"
    placeholder="Your message..."
  />
</div>

{/* Submit Button */}
<button
  type="submit"
  className="w-full px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold text-base transition-all duration-300"
>
  Send Message
</button>

</form>

        </div>
      </div>
    </section>
  );
}
