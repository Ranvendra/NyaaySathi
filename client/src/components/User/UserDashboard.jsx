import React from "react";
import UserLayout from "./UserLayout";
import {
  Calendar,
  CheckCircle2,
  Hourglass,
  FileText,
  MapPin,
  Clock,
  ArrowRight,
  Circle,
  AlertCircle,
} from "lucide-react";

const UserDashboard = () => {
  const mockUser = { name: "Jane Doe" };

  return (
    <UserLayout user={mockUser}>
      <div className="flex flex-col gap-6 font-sans">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              Your Legal Dashboard
            </h1>
            <p className="text-slate-500 font-medium">
              A summary of your case progress and next steps.
            </p>
          </div>

          {/* Case Overview Card */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg shadow-purple-500/5 rounded-2xl p-4 flex items-center gap-4 min-w-[300px] hover:bg-white/80 transition-colors duration-200">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                Case Overview
              </p>
              <h3 className="text-lg font-bold text-slate-900">Jane Doe</h3>
              <p className="text-xs text-slate-500 font-semibold">
                Lawyer: John Smith
              </p>
            </div>
            <span className="ml-auto px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
              Civil Case
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Countdown & Video Section - Merged Visuals */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-[32px] p-5 lg:p-8 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 transform-gpu">
              {/* Video Placeholder */}
              <div className="aspect-video bg-slate-900 rounded-2xl mb-6 relative overflow-hidden shadow-inner flex items-center justify-center group-hover:shadow-2xl transition-shadow duration-500 transform-gpu">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 to-purple-500/20 mix-blend-overlay" />
                <div className="relative z-10 text-center p-6">
                  <Calendar size={64} className="text-white/20 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-2">
                    October 26, 2024
                  </h2>
                  <p className="text-indigo-200 font-medium tracking-wide">
                    Next Hearing Date
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Upcoming Event
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Court Hearing
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Mark your calendar and prepare necessary documents.
                  </p>
                </div>
                <div className="shrink-0 bg-red-50 border border-red-100 rounded-2xl p-6 text-center min-w-[200px] flex flex-col items-center justify-center transform-gpu group-hover:scale-105 transition-transform duration-300">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <Hourglass size={24} className="text-red-500" />
                  </div>
                  <p className="text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
                    Urgent
                  </p>
                  <h3 className="text-4xl font-extrabold text-slate-900 mb-1">
                    28 Days
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Bail Days Remaining
                  </p>
                </div>
              </div>
            </div>

            {/* Action Items & Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Documents Required */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-md rounded-[32px] p-5 md:p-8 hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 transform-gpu will-change-transform">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText size={20} className="text-blue-500" />
                  Documents Required
                </h3>
                <div className="space-y-4">
                  {[
                    { text: "Identification Proof", done: true },
                    { text: "Address Verification", done: true },
                    { text: "Signed Affidavits", done: true },
                    { text: "Witness Statements", done: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 group/item cursor-pointer"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                          item.done
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-slate-300 group-hover/item:border-blue-400"
                        }`}
                      >
                        {item.done && <CheckCircle2 size={14} />}
                      </div>
                      <span
                        className={`font-medium transition-colors duration-200 ${
                          item.done
                            ? "text-slate-500 line-through"
                            : "text-slate-900"
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Court Location Card */}
              <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-md rounded-[32px] p-5 md:p-8 hover:bg-white/80 transition-all duration-300 flex flex-col hover:-translate-y-1 transform-gpu will-change-transform">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-indigo-500" />
                  Court You Must Report To
                </h3>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-lg mb-1">
                    City Central Courthouse
                  </h4>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                    123 Justice Avenue, Metropolis,
                    <br />
                    ZIP 10001
                  </p>
                </div>
                <button className="w-full py-3 bg-[#C2A065] hover:bg-[#b08e55] text-white font-bold rounded-xl shadow-lg shadow-[#C2A065]/20 flex items-center justify-center gap-2 transition-transform active:scale-95 group transform-gpu">
                  <MapPin size={18} className="group-hover:animate-bounce" />
                  View Location
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline & Summary */}
          <div className="flex flex-col gap-8">
            {/* Discussion Summary */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-[32px] p-8 hover:bg-white/90 transition-colors duration-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Discussion Summary
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6 text-sm">
                The initial consultation covered the case background, key
                evidence, and established the preliminary legal strategy moving
                forward...
              </p>
              <button className="text-purple-700 font-bold text-sm hover:text-purple-900 flex items-center gap-1 group">
                View Full Summary
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </div>

            {/* Case Timeline */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-[32px] p-8 flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Case Timeline
              </h3>
              <div className="relative pl-2 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                {[
                  {
                    title: "Next hearing date scheduled",
                    date: "Sep 30, 2024",
                    status: "upcoming",
                  },
                  {
                    title: "Court discussion summary added",
                    date: "Sep 28, 2024",
                    status: "completed",
                  },
                  {
                    title: "Consultation completed",
                    date: "Sep 25, 2024",
                    status: "completed",
                  },
                  {
                    title: "Case filed",
                    date: "Sep 20, 2024",
                    status: "completed",
                  },
                ].map((item, i) => (
                  <div key={i} className="relative pl-8 group transform-gpu">
                    <div
                      className={`absolute left-0 top-1 w-6 h-6 rounded-full border-[3px] bg-white z-10 box-content transition-colors duration-300 ${
                        item.status === "upcoming"
                          ? "border-purple-600"
                          : "border-slate-800 group-hover:border-purple-600"
                      }`}
                    >
                      {item.status === "upcoming" && (
                        <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-purple-600 rounded-full animate-pulse" />
                      )}
                    </div>
                    <h4
                      className={`font-bold text-sm ${
                        item.status === "upcoming"
                          ? "text-purple-700"
                          : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">
                      {item.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Card */}
            <div className="bg-linear-to-br from-[#2D2B42] to-[#1A1929] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 transform-gpu will-change-transform">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-300" />
              <h3 className="text-lg font-bold mb-2">
                Consultation Transcript
              </h3>
              <p className="text-slate-400 text-xs mb-6 font-medium">
                Access your encrypted consultation records.
              </p>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg shadow-purple-900/40">
                  <FileText size={16} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
