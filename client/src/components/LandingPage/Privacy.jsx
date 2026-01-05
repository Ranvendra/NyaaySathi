import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, FileKey, EyeOff, CheckCircle2 } from "lucide-react";

const Privacy = () => {
  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description:
        "All messages and calls are encrypted. Only you and your lawyer have access.",
      icon: Lock,
    },
    {
      title: "Zero-Knowledge Storage",
      description:
        "We cannot read your documents or listen to your calls. Your data is yours alone.",
      icon: EyeOff,
    },
    {
      title: "Bank-Grade Security",
      description:
        "We use 256-bit AES encryption to protect your sensitive legal documents.",
      icon: FileKey,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 rounded-l-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-indigo-50 rounded-r-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Visual Side */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative z-0">
              {/* Releasing Circular Waves - Optimized with CSS */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-blue-400/30 bg-blue-100/10 z-0 animate-ripple"
                  style={{ animationDelay: `${i * 1}s` }}
                />
              ))}

              {/* Inner Glow */}
              <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full z-0"></div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 bg-linear-to-br from-blue-600 to-indigo-700 p-0 rounded-full shadow-2xl shadow-blue-200 transform hover:scale-105 transition-transform duration-500 flex items-center justify-center w-64 h-64"
              >
                <Shield size={120} className="text-white drop-shadow-md" />
                <div className="absolute -top-6 -right-6 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg font-bold flex items-center gap-2 animate-bounce">
                  <CheckCircle2 size={20} /> Verified
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-slate-900"
            >
              Your Privacy is <br />
              <span className="text-blue-600">Non-Negotiable</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-600 text-lg mb-10 leading-relaxed"
            >
              We understand the sensitivity of legal matters. That's why we've
              built NyaaySathi with a security-first architecture.
            </motion.p>

            <div className="space-y-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-slate-900">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
