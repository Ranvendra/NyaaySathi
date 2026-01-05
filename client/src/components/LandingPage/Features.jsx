import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Video, ShieldCheck } from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: MessageSquare,
      title: "AI ChatBot",
      description:
        "Instantly get case summaries, trial time estimates, bail information, and next steps. All chats are end-to-end encrypted.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      icon: Video,
      title: "Expert Consulting",
      description:
        "Connect with a lawyer directly or get an AI recommendation. All video calls are encrypted and secure.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: 3,
      icon: ShieldCheck, // Changed from custom svg for cleaner look
      title: "Personal Dashboard",
      description:
        "Track your next hearing date, manage documents, view discussion summaries, and stay updated on your case status.",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Designed for <span className="text-blue-600">Peace of Mind</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Get instant answers, connect with experts, and manage your case—all
            in one secure platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-blue-100 transition-all group relative overflow-hidden"
            >
              {/* Restored Gradient Top Border Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-purple-600 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></div>

              {/* Restored Icon Animation */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-300`}
              >
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
