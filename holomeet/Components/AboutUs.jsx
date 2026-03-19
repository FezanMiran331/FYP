export default function AboutUs() {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Institutions" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Innovation First",
      description: "Pushing boundaries with cutting-edge AI and real-time communication technology."
    },
    {
      icon: "🔒",
      title: "Security Focused",
      description: "Enterprise-grade encryption and privacy controls to protect your institution's data."
    },
    {
      icon: "🌐",
      title: "Globally Accessible",
      description: "Seamless connectivity across the world, bringing classrooms together anywhere."
    },
    {
      icon: "💡",
      title: "User-Centric Design",
      description: "Intuitive interfaces designed for educators and students of all tech levels."
    }
  ];

  return (
    <section 
      className="relative py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="w-[95%] max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-12 py-2 bg-blue-700/30 text-blue-300 rounded-full text-xl font-semibold mb-6 border border-blue-600/40 backdrop-blur-sm">
            About HoloMeet
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Revolutionizing Virtual Education
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            HoloMeet is a professional virtual classroom platform combining 
            <span className="text-blue-300 font-semibold"> AI-powered insights</span>, 
            <span className="text-blue-300 font-semibold"> real-time collaboration</span>, and 
            <span className="text-blue-300 font-semibold"> intelligent monitoring</span> to create meaningful learning experiences.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-300 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Story */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white">Our Story</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Born during the global shift to remote learning, HoloMeet was created by educators and technologists 
              who recognized the need for a truly intelligent virtual classroom solution. We witnessed firsthand the 
              challenges of online education—disconnected students, ineffective monitoring, and the loss of 
              valuable classroom interactions.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Today, HoloMeet serves thousands of educational institutions worldwide, transforming how teachers 
              teach and students learn. Our AI-powered platform doesn't just facilitate meetings—it creates 
              engaging, trackable, and insightful learning experiences that bridge the gap between physical 
              and virtual classrooms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn More
              </button>
              <button className="px-8 py-3 bg-transparent hover:bg-white/5 text-white rounded-lg font-semibold border border-white/20 hover:border-blue-500/50 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right: Professional Visual */}
          <div className="relative h-96 rounded-2xl overflow-hidden group shadow-2xl">
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)'
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center px-6">
                <div className="text-7xl mb-6 filter drop-shadow-lg">🎓</div>
                <p className="text-white text-2xl font-bold mb-2">Empowering Education</p>
                <p className="text-blue-100 text-sm">Through Innovation & Technology</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/20 transition-all duration-300"></div>
          </div>
        </div>

        {/* Our Values */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Values</h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            The principles that guide everything we build and every decision we make
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                {value.title}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-700/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-12 backdrop-blur-md shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Virtual Classroom?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of institutions already using HoloMeet to create engaging, 
            intelligent, and effective online learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-transparent hover:bg-white/5 text-white rounded-lg font-bold text-lg border-2 border-white/30 hover:border-blue-500/50 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}