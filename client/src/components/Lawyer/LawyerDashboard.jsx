import React, { useState, useEffect } from "react";
import {
  Video,
  Phone,
  Users,
  Loader2,
  Briefcase,
  Clock,
  IndianRupee,
  Plus,
  Search,
  Calendar,
  FileText,
  UserPlus,
  ArrowUpRight,
  MoreHorizontal,
  Bell,
  CheckCircle2,
  Shield,
  Cloud,
  PieChart,
  User,
  Gavel,
  AlertCircle,
} from "lucide-react";
import LawyerLayout from "./LawyerLayout";
import { getDashboardData } from "../../services/lawyerApi";

// Custom CSS for smooth animations
const customStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
    to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
  }
  @keyframes orbit-reverse {
    from { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
    to { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-orbit {
    animation: orbit 15s linear infinite;
  }
  .animate-orbit-reverse {
    animation: orbit-reverse 12s linear infinite;
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const PremiumStatCard = ({
  title,
  value,
  subtitle,
  icon: MainIcon,
  satelliteIcons = [],
  colorTheme,
  delay,
}) => (
  <div
    className="relative group bg-white/60 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:bg-white/80"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Background Soft Glow */}
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 ${colorTheme.bg} opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity duration-700`}
    />

    <div className="relative z-10 flex flex-row items-center justify-between gap-6">
      {/* Animated Icon Composition */}
      <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
        {/* Orbiting Track (Visual Only) */}
        <div className="absolute inset-0 border border-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-125" />

        {/* Central Floating Icon */}
        <div className="relative z-20 w-16 h-16 bg-white rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center animate-float">
          <MainIcon size={32} className={colorTheme.text} />
        </div>

        {/* Satellite Icons */}
        {satelliteIcons.map((SatIcon, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 z-10 m-auto w-8 h-8 flex items-center justify-center ${
              idx === 0 ? "animate-orbit" : "animate-orbit-reverse"
            }`}
          >
            <div className="w-8 h-8 bg-white rounded-full shadow-sm border border-slate-50 flex items-center justify-center">
              <SatIcon size={14} className={colorTheme.subText} />
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 text-right sm:text-left">
        <p className="text-slate-500 font-semibold text-xs tracking-wider uppercase mb-2">
          {title}
        </p>
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          {value}
        </h3>
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${colorTheme.badgeBg} ${colorTheme.badgeText}`}
        >
          {subtitle}
          <ArrowUpRight size={12} />
        </div>
      </div>
    </div>
  </div>
);

const LawyerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      // Mock data remains same as before
      setDashboardData({
        lawyer: {
          name: "Sarah",
          lawyerProfile: { specialization: ["Corporate Law"] },
        },
        stats: {
          activeCases: 12,
          newCasesThisWeek: 2,
          pendingQueries: 4,
          todayConsultations: 3,
          monthlyEarnings: 8500,
          earningsChange: 1200,
        },
        upcomingConsultations: [
          {
            _id: "1",
            clientName: "Jane Smith",
            caseName: "Family Law Matter",
            consultationType: "video",
            scheduledAt: new Date(
              Date.now() + 2 * 60 * 60 * 1000
            ).toISOString(),
            timeUntil: "in 2 hours",
          },
          {
            _id: "2",
            clientName: "Robert Johnson",
            caseName: "Corporate Contract",
            consultationType: "call",
            scheduledAt: new Date(
              Date.now() + 5 * 60 * 60 * 1000
            ).toISOString(),
            timeUntil: "Today",
          },
          {
            _id: "3",
            clientName: "Davis & Co.",
            caseName: "Merger & Acquisition",
            consultationType: "in-person",
            scheduledAt: new Date(
              Date.now() + 24 * 60 * 60 * 1000
            ).toISOString(),
            timeUntil: "Tomorrow",
          },
          {
            _id: "4",
            clientName: "Tech Solutions Inc.",
            caseName: "IP Dispute",
            consultationType: "video",
            scheduledAt: new Date(
              Date.now() + 28 * 60 * 60 * 1000
            ).toISOString(),
            timeUntil: "Tomorrow",
          },
          {
            _id: "5",
            clientName: "Estate Planning",
            caseName: "Will Drafting",
            consultationType: "in-person",
            scheduledAt: new Date(
              Date.now() + 48 * 60 * 60 * 1000
            ).toISOString(),
            timeUntil: "Wed",
          },
        ],
        recentMessages: [
          {
            _id: "1",
            senderName: "Michael Chen",
            preview: "Hi Sarah, I've uploaded the documents we discussed...",
            isEncrypted: true,
            createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          },
          {
            _id: "2",
            senderName: "Emily Rodriguez",
            preview: "Thanks for the update. I'll review and get back...",
            isEncrypted: true,
            createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          },
          {
            _id: "3",
            senderName: "David Lee",
            preview: "Quick question about the upcoming deposit...",
            isEncrypted: true,
            createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          },
          {
            _id: "4",
            senderName: "Sarah Connor",
            preview: "Can we reschedule our meeting to next week?",
            isEncrypted: true,
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          },
          {
            _id: "5",
            senderName: "John Doe",
            preview: "I sent the signed contract.",
            isEncrypted: true,
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getConsultationIcon = (type) => {
    switch (type) {
      case "video":
        return Video;
      case "call":
        return Phone;
      default:
        return Users;
    }
  };

  if (loading) {
    return (
      <LawyerLayout lawyer={null}>
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      </LawyerLayout>
    );
  }

  const { lawyer, stats, upcomingConsultations, recentMessages } =
    dashboardData || {};

  return (
    <LawyerLayout lawyer={lawyer}>
      <style>{customStyles}</style>
      {/* 
         Fixed Height Container: h-[calc(100vh)] or similar to prevent window scroll. 
         Using h-screen and overflow-hidden on the main wrapper.
      */}
      <div className="h-screen bg-[#F8FAFC] relative overflow-hidden font-sans flex flex-col">
        {/* Subtle Background Mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="flex-1 flex flex-col p-4 sm:p-8 max-w-[1600px] mx-auto w-full relative z-10 h-full overflow-hidden">
          {/* Header Section - Fixed at Top */}
          <div className="flex-shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 animate-fade-in-up">
            <div>
              <p className="text-slate-500 font-medium mb-2 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                Good Morning, <br className="md:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Lawyer
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all">
                <Search size={20} />
              </button>
              <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all relative">
                <Bell size={20} />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border border-white" />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-2xl font-semibold shadow-xl shadow-slate-900/10 transition-all hover:scale-105 active:scale-95">
                <Plus size={20} />
                <span>New Case</span>
              </button>
            </div>
          </div>

          {/* Premium Stats Grid - Fixed at Top */}
          <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <PremiumStatCard
              title="Active Cases"
              value={stats?.activeCases || 12}
              subtitle="+2 New"
              icon={Briefcase}
              satelliteIcons={[Gavel, FileText]}
              colorTheme={{
                bg: "bg-blue-500",
                text: "text-blue-600",
                subText: "text-blue-400",
                badgeBg: "bg-blue-50",
                badgeText: "text-blue-700",
              }}
              delay={0}
            />
            <PremiumStatCard
              title="Pending Actions"
              value={stats?.pendingQueries || 4}
              subtitle="Urgent"
              icon={Clock}
              satelliteIcons={[AlertCircle, User]}
              colorTheme={{
                bg: "bg-amber-500",
                text: "text-amber-600",
                subText: "text-amber-400",
                badgeBg: "bg-amber-50",
                badgeText: "text-amber-700",
              }}
              delay={100}
            />
            <PremiumStatCard
              title="Total Earnings"
              value={formatCurrency(stats?.monthlyEarnings || 8500)}
              subtitle="+15% Growth"
              icon={IndianRupee}
              satelliteIcons={[PieChart, ArrowUpRight]}
              colorTheme={{
                bg: "bg-emerald-500",
                text: "text-emerald-600",
                subText: "text-emerald-400",
                badgeBg: "bg-emerald-50",
                badgeText: "text-emerald-700",
              }}
              delay={200}
            />
          </div>

          {/* Bottom Section - Scrollable Containers */}
          {/* Use flex-1 to take up remaining height, and min-h-0 to allow scrolling inside flex children */}
          <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-12 gap-8 h-full overflow-hidden footer-margin-fix pb-6">
            {/* Left Column: Timeline (Quick Actions REMOVED) */}
            <div className="xl:col-span-8 flex flex-col gap-6 h-full min-h-0">
              {/* Upcoming Consultations Timeline - SCROLLABLE & COMPACT */}
              <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0 relative z-10 bg-white">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Today's Schedule
                    </h2>
                    <p className="text-slate-500 mt-0.5 font-medium text-sm">
                      You have {upcomingConsultations?.length} sessions
                      remaining today
                    </p>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-blue-600">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto pl-4 pr-2 pb-6 custom-scrollbar">
                  <div className="pt-2">
                    {upcomingConsultations?.map((consultation, index) => {
                      const Icon = getConsultationIcon(
                        consultation.consultationType
                      );
                      return (
                        <div
                          key={consultation._id}
                          className="relative pl-8 pb-6 last:pb-0 border-l-[2px] border-slate-100 last:border-0 border-dashed"
                        >
                          {/* Timeline Dot */}
                          <div
                            className={`absolute -left-[7px] top-0 w-[12px] h-[12px] rounded-full border-[2px] border-white shadow-sm box-content ${
                              index === 0
                                ? "bg-blue-600 ring-4 ring-blue-50"
                                : "bg-slate-300"
                            }`}
                          />

                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 group/item -mt-2 pr-4">
                            <div className="min-w-[80px]">
                              <p
                                className={`font-bold text-lg ${
                                  index === 0
                                    ? "text-slate-900"
                                    : "text-slate-500"
                                }`}
                              >
                                {formatTime(consultation.scheduledAt)}
                              </p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded-md inline-block mt-1">
                                {consultation.timeUntil}
                              </p>
                            </div>

                            <div className="flex-1 p-3 rounded-2xl bg-[#F8FAFC] border border-transparent group-hover/item:border-blue-100 group-hover/item:bg-white group-hover/item:shadow-lg transition-all cursor-pointer flex items-center gap-4">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-105 ${
                                  index === 0
                                    ? "bg-white text-blue-600 shadow-md"
                                    : "bg-white text-slate-400 border border-slate-100"
                                }`}
                              >
                                <Icon size={18} />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-slate-900 text-base">
                                  {consultation.clientName}
                                </h3>
                                <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                                  {consultation.caseName}
                                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                                  <span className="capitalize text-blue-600">
                                    {consultation.consultationType}
                                  </span>
                                </p>
                              </div>
                              <div className="hidden sm:block opacity-0 group-hover/item:opacity-100 transition-opacity">
                                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700">
                                  Join
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Recent Messages - SCROLLABLE */}
            <div className="xl:col-span-4 h-full min-h-0 flex flex-col">
              <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0 border-b border-transparent">
                  <h2 className="text-xl font-bold text-slate-900">Messages</h2>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                    <Search size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
                  {recentMessages?.map((message, i) => (
                    <div
                      key={message._id}
                      className="group p-4 rounded-3xl hover:bg-[#F8FAFC] transition-colors cursor-pointer border border-transparent hover:border-slate-100 relative overflow-hidden"
                    >
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="relative">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm ${
                              [
                                "bg-blue-100 text-blue-600",
                                "bg-purple-100 text-purple-600",
                                "bg-amber-100 text-amber-600",
                              ][i % 3]
                            }`}
                          >
                            {message.senderName?.charAt(0)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-[3px] border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-slate-900 text-sm">
                              {message.senderName}
                            </h4>
                            <span className="text-[11px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full shadow-sm group-hover:text-blue-600 transition-colors">
                              12m
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">
                            {message.preview}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 pt-4 flex-shrink-0 border-t border-slate-50">
                  <button className="w-full py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/10">
                    <span>View All Messages</span>
                    <ArrowUpRight
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LawyerLayout>
  );
};

export default LawyerDashboard;
