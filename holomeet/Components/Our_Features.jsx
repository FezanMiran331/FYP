export default function OurFeatures() {
  const features = [
    {
      icon: "📚",
      title: "Real-Time Communication",
      description: "Seamless video conferencing with professional-grade quality and interactive features.",
      points: [
        "HD Video Calls (1-to-many broadcast)",
        "Crystal Clear Audio Communication",
        "Screen Sharing with Annotation Tools",
        "Live Chatbox (Group & Private Chat)",
        "WebRTC-powered Real-time Connection"
      ]
    },
    {
      icon: "📊",
      title: "Smart Attendance Monitoring",
      description: "Automated attendance tracking with customizable participation requirements and real-time activity monitoring.",
      points: [
        "Host-defined Attendance Duration",
        "Real-time Activity Tracking",
        "Active Participation Time Analysis",
        "Automated Attendance Reports",
        "Session-end Summary Generation"
      ]
    },
    {
      icon: "🎓",
      title: "AI-Powered Meeting Summarizer",
      description: "Advanced AI technology that converts meetings into actionable insights and comprehensive summaries.",
      points: [
        "Complete Meeting Audio Capture",
        "Speech-to-Text Transcription",
        "AI/NLP-based Summary Generation",
        "Downloadable Summary Reports",
        "Key Points & Action Items Extraction"
      ]
    },
    {
      icon: "🔗",
      title: "Secure Link Generation & Access",
      description: "Enterprise-grade security with flexible access controls and institutional domain restrictions.",
      points: [
        "Unique Meeting Links",
        "Password Protection",
        "Domain-based Access Control",
        "Time-limited Session URLs",
        "Institutional Email Verification"
      ]
    },
    {
      icon: "💡",
      title: "Interactive Reactions & Controls",
      description: "Comprehensive interaction tools for structured classroom engagement and host management controls.",
      points: [
        "Emoji Reactions & Feedback",
        "Virtual Hand Raise System",
        "Poll & Quiz Integration",
        "Breakout Room Management",
        "Mute/Unmute Controls"
      ]
    },
    {
      icon: "👥",
      title: "User Management System",
      description: "Robust authentication system with secure password encryption and seamless user experience.",
      points: [
        "User Registration & Profile Management",
        "Role-based Access Control",
        "Secure Authentication",
        "Multi-institution Support",
        "Activity Dashboard"
      ]
    }
  ];

  return (
    <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 px-4 min-h-screen">
      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-300 mb-6">
            AI-Powered Virtual Classroom
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Professional web-based virtual classroom solution with real-time communication, smart monitoring, and AI-powered meeting summarization for educational institutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              {/* Icon */}
              <div className="bg-blue-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <span className="text-3xl">{feature.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Feature Points */}
              <ul className="space-y-2">
                {feature.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start text-gray-300 text-sm">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
