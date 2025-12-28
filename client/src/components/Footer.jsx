import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-[60px] pb-[40px] bg-white border-t border-border-color max-md:py-[48px] max-md:pb-[32px] max-sm:py-[40px] max-sm:pb-[24px]">
      <div className="container-custom">
        <div className="flex flex-col items-center gap-6 animate-[fadeIn_0.8s_ease-out] max-sm:gap-5">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="32"
                  height="32"
                  rx="6"
                  fill="url(#footer-gradient)"
                />
                <path d="M12 8H20V10H18V22H14V10H12V8Z" fill="white" />
                <defs>
                  <linearGradient
                    id="footer-gradient"
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
            <span className="text-xl font-bold text-text-dark tracking-tighter max-md:text-lg">
              NyaaySaathi
            </span>
          </div>

          {/* Links */}
          <nav className="flex gap-8 flex-wrap justify-center max-md:gap-6 max-sm:flex-col max-sm:gap-5 max-sm:items-center">
            {["Terms", "Privacy Policy", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-[15px] text-text-gray no-underline transition-all duration-150 relative hover:text-primary-blue group max-md:text-sm"
              >
                {item}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-primary-blue transition-[width] duration-300 group-hover:w-full max-sm:hidden"></span>
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-text-light text-center m-0">
            © {currentYear} NyaaySaathi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
