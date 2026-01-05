import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Privacy from "./Privacy";
import Footer from "./Footer";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <Hero />

      {/* Floating Chatbot Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-colors cursor-pointer group"
        onClick={() => navigate("/user/chatbot")}
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <MessageCircle size={28} />
        {/* Tooltip */}
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-800 px-3 py-1 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ask AI Assistant
        </span>
      </motion.button>

      <Features />
      <Privacy />
      <Footer />
    </div>
  );
};

export default LandingPage;
