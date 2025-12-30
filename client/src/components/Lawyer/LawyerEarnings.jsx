import React from "react";
import {
  IndianRupee,
  TrendingUp,
  PieChart,
  Wallet,
  ArrowRight,
} from "lucide-react";
import LawyerLayout from "./LawyerLayout";

const LawyerEarnings = () => {
  const mockLawyer = {
    name: "Lawyer",
    lawyerProfile: { specialization: ["General"] },
  };

  return (
    <LawyerLayout lawyer={mockLawyer}>
      <div className="h-[calc(100vh-64px)] lg:h-screen flex flex-col bg-slate-50 overflow-hidden relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] right-[20%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-blue-100/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
          <div className="max-w-2xl w-full text-center">
            {/* Animated Icon Container */}
            <div className="relative mb-10 group cursor-pointer inline-block">
              <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-100 border-4 border-white group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full opacity-50" />
                <IndianRupee
                  size={48}
                  className="text-emerald-600 relative z-10 group-hover:scale-110 transition-transform duration-500"
                />

                {/* Floating Elements */}
                <div className="absolute -right-4 top-0 bg-white p-2 rounded-xl shadow-lg border border-slate-100 animate-bounce delay-100">
                  <TrendingUp size={20} className="text-blue-500" />
                </div>
                <div className="absolute -left-2 bottom-4 bg-white p-2 rounded-xl shadow-lg border border-slate-100 animate-bounce delay-300">
                  <PieChart size={20} className="text-purple-500" />
                </div>
              </div>
            </div>

            {/* Content */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Financial Insights
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Coming Soon
              </span>
            </h1>

            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg mx-auto">
              Track your earnings, generate invoices, and analyze your
              practice's growth. A comprehensive financial dashboard tailored
              for legal professionals is on its way.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              {[
                { icon: Wallet, text: "Seamless Payments" },
                { icon: TrendingUp, text: "Growth Analytics" },
                { icon: IndianRupee, text: "Automated Invoicing" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm text-sm font-medium text-slate-600"
                >
                  <feature.icon size={16} className="text-emerald-500" />
                  {feature.text}
                </div>
              ))}
            </div>

            {/* Notify Button */}
            <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-semibold transition-all hover:bg-black hover:scale-105 hover:shadow-2xl shadow-xl shadow-emerald-900/10">
              <span>Notify Me When Ready</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </LawyerLayout>
  );
};

export default LawyerEarnings;
