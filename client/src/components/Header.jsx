import React, { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 animate-[fadeIn_0.5s_ease-out]
      ${
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-5 animate-[slideInFromLeft_0.6s_ease-out]">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group transition-transform duration-150 hover:-translate-y-0.5">
            <div className="flex items-center justify-center animate-[scaleIn_0.5s_ease-out_0.2s_both]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="6" fill="url(#gradient)" />
                <path d="M12 8H20V10H18V22H14V10H12V8Z" fill="white" />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0"
                    y1="0"
                    x2="32"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-xl font-bold text-text-dark tracking-tighter">
              NyaaySaathi
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-3">
            <button className="btn-base bg-gradient-to-br from-primary-blue to-primary-blue-dark text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(37,99,235,0.4)] active:translate-y-0">
              Consult a Lawyer
            </button>
            <button className="btn-base bg-transparent text-text-dark border-2 border-border-color hover:bg-bg-light hover:border-primary-blue hover:text-primary-blue hover:-translate-y-0.5">
              Login
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
