import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Facebook, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                NyaaySathi
              </span>
            </Link>
            <p className="text-slate-500 mb-6 max-w-sm leading-relaxed">
              Democratizing legal access through AI technology. Secure,
              efficient, and accessible justice for everyone.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Linkedin} />
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Github} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-3">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/signup" text="Find a Lawyer" />
              <FooterLink to="/signup" text="For Lawyers" />
              <FooterLink to="/login" text="Login" />
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <FooterLink to="#privacy" text="Privacy Policy" />
              <FooterLink to="#terms" text="Terms of Service" />
              <FooterLink to="#contact" text="Contact Us" />
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} NyaaySathi. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-slate-500 font-medium">
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon: Icon }) => (
  <a
    href="#"
    className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
  >
    <Icon size={18} />
  </a>
);

const FooterLink = ({ to, text }) => (
  <li>
    <Link
      to={to}
      className="text-slate-500 hover:text-blue-600 transition-colors"
    >
      {text}
    </Link>
  </li>
);

export default Footer;
