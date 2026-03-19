import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_50%,#0f3460_100%)] text-gray-300 pt-12 pb-6 px-6 md:px-16 border-t border-slate-700/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <img src="holomeetlogo.png" alt="" />
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Experience seamless collaboration through crystal-clear video, 
            smart tools, and reliable connections — all in one place.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Overview</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Newsroom</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-4">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">
            Subscribe for the latest product updates and industry insights.
          </p>
          <form className="flex bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700/50">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 bg-transparent text-sm outline-none text-gray-200 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider & Bottom */}
      <div className="border-t border-slate-700/50 mt-10 pt-5 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} <span className="text-blue-400 font-medium">HoloMeet</span>.  
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
