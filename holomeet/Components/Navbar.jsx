"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const path= usePathname();
  const Landing_page = path ==="/"
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);  
const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "contact", label: "Contact Us" },
    { id: "pricing", label: "Pricing" },
    { id: "faqs", label: "FAQs" },
  ];
  // detect current section while scrolling
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      if (isScrolling) return;
      let current = "home";
      sections.forEach((section) => {
        const top = section.offsetTop - 150;
        const height = section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  // smooth scroll handler
  

  const handleClick = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    setIsScrolling(true);
    setActiveSection(id);

    const target = section.offsetTop - 70;
    const start = window.scrollY;
    const distance = target - start;
    const duration = 900;
    let startTime = null;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const eased = easeInOutQuad(percent);
      window.scrollTo(0, start + distance * eased);
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => setIsScrolling(false), 150);
      }
    };

    requestAnimationFrame(animate);
    setMenuOpen(false); // close menu on click
  };

  

  return (
    <nav className="sticky top-0 z-50 bg-[linear-gradient(135deg,#1a1a2e_0%,#16213e_50%,#0f3460_100%)] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-1 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3">
          <img
            src="/holomeetlogo.png"
            alt="HoloMeet Logo"
            className="object-contain hover:scale-105 transition-transform duration-300 w-[180px] h-[60px]"
          />
        </a>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Menu */}
        {Landing_page&&
          <ul className="hidden md:flex space-x-6 lg:space-x-8 text-white font-medium text-md items-center">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="transition-transform duration-200 hover:scale-110"
            >
              <button
                onClick={() => handleClick(item.id)}
                className={`relative py-2 px-3 focus:outline-none transition-all 
                  ${
                    activeSection === item.id
                      ? "font-bold text-blue-400 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-blue-700 after:rounded-full"
                      : "hover:text-blue-200"
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        }
        
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {
          Landing_page&&
          <ul className="hidden md:flex space-x-6 lg:space-x-8 text-white font-medium text-md items-center">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="transition-transform duration-200 hover:scale-110"
            >
              <button
                onClick={() => handleClick(item.id)}
                className={`relative py-2 px-3 focus:outline-none transition-all 
                  ${
                    activeSection === item.id
                      ? "font-bold text-blue-400 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-blue-700 after:rounded-full"
                      : "hover:text-blue-200"
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        }
      </div>
    </nav>
  );
};

export default Navbar;