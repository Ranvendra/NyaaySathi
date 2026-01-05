import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span
              className={`text-xl font-bold tracking-tight transition-colors ${
                isScrolled ? "text-slate-800" : "text-slate-900"
              }`}
            >
              NyaaySathi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <button className="px-5 py-2.5 text-slate-600 font-medium hover:text-blue-600 transition-colors">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-full shadow-lg shadow-slate-900/10 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Get Started
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md">
                  Sign Up
                </button>
              </Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full py-3 text-slate-600 font-medium border border-gray-200 rounded-xl hover:bg-gray-50">
                  Log In
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
