import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Scale, Shield, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients & Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-70"></div>
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        ></motion.div>
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
          className="absolute top-1/2 -left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            AI-Powered Legal Assistance
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-tight"
          >
            Justice{" "}
            <span className="text-blue-600 relative inline-block">
              Simplified
              <svg
                className="absolute w-full h-3 -bottom-2 left-0 text-blue-200 -z-10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z"
                  fill="currentColor"
                />
              </svg>
            </span>{" "}
            for Everyone
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Your one-stop platform for all legal needs. Connect with verified
            lawyers, get instant AI insights, and manage documents with
            bank-grade security.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all hover:scale-105 flex items-center justify-center gap-2 group">
                Find a Lawyer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
                Register as Lawyer
              </button>
            </Link>
          </motion.div>

          {/* Stats / Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-3 gap-8 text-center"
          >
            <TrustItem count="500+" label="Verified Lawyers" />
            <TrustItem count="24/7" label="AI Legal Support" />
            <TrustItem count="100%" label="Secure & Private" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustItem = ({ count, label }) => (
  <div className="space-y-1">
    <div className="text-2xl md:text-3xl font-bold text-slate-900">{count}</div>
    <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">
      {label}
    </div>
  </div>
);

export default Hero;
