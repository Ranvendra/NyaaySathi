import React, { useState } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Archive,
  Filter,
  ArrowUpRight,
  Shield,
  FileText,
  User,
  Gavel,
  AlertCircle,
  PieChart,
} from "lucide-react";
import LawyerLayout from "./LawyerLayout";

// Custom CSS for smooth animations (Same as Dashboard)
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
    className="relative group bg-white/60 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:bg-white/80"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 ${colorTheme.bg} opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity duration-700`}
    />
    <div className="relative z-10 flex flex-row items-center justify-between gap-4">
      <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
        <div className="absolute inset-0 border border-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-125" />
        <div className="relative z-20 w-14 h-14 bg-white rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center animate-float">
          <MainIcon size={28} className={colorTheme.text} />
        </div>
      </div>
      <div className="flex-1 min-w-0 text-right">
        <p className="text-slate-500 font-semibold text-xs tracking-wider uppercase mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-slate-900 mb-1">{value}</h3>
        <div
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${colorTheme.badgeBg} ${colorTheme.badgeText}`}
        >
          {subtitle}
        </div>
      </div>
    </div>
  </div>
);

const LawyerCases = () => {
  // Expanded mock data to test pagination
  const [allCases] = useState(
    Array.from({ length: 24 }).map((_, i) => ({
      id: i + 1,
      caseName:
        [
          "Johnson v. Acme Corp",
          "Smith Family Trust",
          "Chen Real Estate",
          "Lee v. Innovate Inc.",
          "State v. Davis",
          "Patel Partition Suit",
          "Wilson Contract Breach",
          "Garcia Custody Battle",
        ][i % 8] + ` ${Math.floor(i / 8) + 1}`,
      client: [
        "Robert Johnson",
        "Jane Smith",
        "Michael Chen",
        "David Lee",
        "Sarah Davis",
        "Amit Patel",
        "Emma Wilson",
        "Maria Garcia",
      ][i % 8],
      type: [
        "Corporate Law",
        "Family Law",
        "Real Estate",
        "Intellectual Property",
        "Criminal Defense",
        "Civil Litigation",
        "Contract Law",
        "Family Law",
      ][i % 8],
      lastActivity: [
        "2 hours ago",
        "Yesterday",
        "3 days ago",
        "June 5, 2023",
        "1 week ago",
        "2 weeks ago",
        "1 month ago",
        "2 months ago",
      ][i % 8],
      status: [
        "Active",
        "Active",
        "Pending",
        "Closed",
        "Active",
        "Pending",
        "Active",
        "Closed",
      ][i % 8],
    }))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = allCases.filter(
    (c) =>
      c.caseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCases = filteredCases.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700 ring-emerald-600/20";
      case "Pending":
        return "bg-amber-100 text-amber-700 ring-amber-600/20";
      case "Closed":
        return "bg-slate-100 text-slate-600 ring-slate-500/20";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const MockLawyer = {
    name: "Lawyer",
    lawyerProfile: { specialization: ["General"] },
  };

  return (
    <LawyerLayout lawyer={MockLawyer}>
      <style>{customStyles}</style>
      <div className="h-screen bg-[#F8FAFC] relative overflow-hidden font-sans flex flex-col">
        {/* Subtle Background Mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="flex-1 flex flex-col p-4 sm:p-8 max-w-[1600px] mx-auto w-full relative z-10 h-full overflow-hidden">
          {/* Header Area */}
          <div className="shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 animate-fade-in-up">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                Case Management
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Track your active cases, clients, and legal proceedings.
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-2xl font-semibold shadow-xl shadow-slate-900/10 transition-all hover:scale-105 active:scale-95">
              <Plus size={20} />
              <span>New Case</span>
            </button>
          </div>

          {/* Premium Stats Grid - Fixed at Top */}
          <div className="shrink-0 grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <PremiumStatCard
              title="Total Cases"
              value="124"
              subtitle="All Time"
              icon={Briefcase}
              satelliteIcons={[FileText, Gavel]}
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
              title="Active"
              value="12"
              subtitle="Current"
              icon={CheckCircle2}
              satelliteIcons={[Shield, User]}
              colorTheme={{
                bg: "bg-emerald-500",
                text: "text-emerald-600",
                subText: "text-emerald-400",
                badgeBg: "bg-emerald-50",
                badgeText: "text-emerald-700",
              }}
              delay={100}
            />
            <PremiumStatCard
              title="Pending"
              value="8"
              subtitle="Needs Action"
              icon={Clock}
              satelliteIcons={[AlertCircle, FileText]}
              colorTheme={{
                bg: "bg-amber-500",
                text: "text-amber-600",
                subText: "text-amber-400",
                badgeBg: "bg-amber-50",
                badgeText: "text-amber-700",
              }}
              delay={200}
            />
            <PremiumStatCard
              title="Archived"
              value="104"
              subtitle="Closed"
              icon={Archive}
              satelliteIcons={[Briefcase, PieChart]}
              colorTheme={{
                bg: "bg-slate-500",
                text: "text-slate-600",
                subText: "text-slate-400",
                badgeBg: "bg-slate-100",
                badgeText: "text-slate-700",
              }}
              delay={300}
            />
          </div>

          {/* Main Content Card - Glassmorphic */}
          <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[32px] border border-white shadow-sm flex flex-col overflow-hidden relative">
            {/* Table Filters */}
            <div className="p-6 border-b border-slate-100 flex flex-col xl:flex-row gap-4 justify-between items-center bg-white/50">
              <div className="relative w-full xl:w-96 group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search cases, clients..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-slate-400"
                />
              </div>
              <div className="flex gap-3 w-full xl:w-auto overflow-x-auto pb-1 xl:pb-0">
                <button className="whitespace-nowrap flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-bold transition-all shadow-sm">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
                <button className="whitespace-nowrap flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-bold transition-all shadow-sm">
                  <span>Sort by Date</span>
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Content Container - Responsive */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-0">
              {/* Mobile Card View (md:hidden) */}
              <div className="md:hidden space-y-4">
                {currentCases.length > 0 ? (
                  currentCases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                      <div className="flex justify-between items-start mb-3 pl-3">
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">
                            {caseItem.caseName}
                          </h3>
                          <p className="text-sm text-slate-500 font-medium flex items-center gap-2 mt-1">
                            <User size={14} />
                            {caseItem.client}
                          </p>
                        </div>
                        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg">
                          <MoreVertical size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4 pl-3">
                        <div className="bg-slate-50 rounded-xl p-2.5">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                            Type
                          </p>
                          <span className="font-semibold text-slate-700 text-sm">
                            {caseItem.type}
                          </span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-2.5">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                            Activity
                          </p>
                          <span className="font-semibold text-slate-700 text-sm">
                            {caseItem.lastActivity}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pl-3 border-t border-slate-50 pt-3 mt-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${getStatusColor(
                            caseItem.status
                          )}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              caseItem.status === "Active"
                                ? "bg-emerald-500"
                                : caseItem.status === "Pending"
                                ? "bg-amber-500"
                                : "bg-slate-500"
                            }`}
                          ></span>
                          {caseItem.status}
                        </span>
                        <button className="text-blue-600 text-sm font-bold flex items-center gap-1">
                          View Details <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 text-slate-500 font-medium">
                    No cases found.
                  </div>
                )}
              </div>

              {/* Desktop Table View (hidden md:block) */}
              <table className="w-full hidden md:table">
                <thead className="sticky top-0 bg-white/90 backdrop-blur-md z-10 shadow-sm">
                  <tr>
                    <th className="text-left py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Case Details
                    </th>
                    <th className="text-left py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                      Type
                    </th>
                    <th className="text-left py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                      Activity
                    </th>
                    <th className="text-left py-5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right py-5 px-8 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentCases.length > 0 ? (
                    currentCases.map((caseItem) => (
                      <tr
                        key={caseItem.id}
                        className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                      >
                        <td className="py-5 px-8">
                          <div>
                            <p className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">
                              {caseItem.caseName}
                            </p>
                            <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                              <User size={14} />
                              {caseItem.client}
                            </p>
                          </div>
                        </td>
                        <td className="py-5 px-6 hidden sm:table-cell">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                            {caseItem.type}
                          </span>
                        </td>
                        <td className="py-5 px-6 hidden lg:table-cell">
                          <span className="text-slate-500 font-medium text-sm">
                            {caseItem.lastActivity}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${getStatusColor(
                              caseItem.status
                            )}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                caseItem.status === "Active"
                                  ? "bg-emerald-500"
                                  : caseItem.status === "Pending"
                                  ? "bg-amber-500"
                                  : "bg-slate-500"
                              }`}
                            ></span>
                            {caseItem.status}
                          </span>
                        </td>
                        <td className="py-5 px-8 text-right">
                          <button className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-blue-600 border border-transparent hover:border-slate-100">
                            <MoreVertical size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-20 text-center text-slate-500 font-medium"
                      >
                        No cases found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/50">
              <p className="text-sm font-medium text-slate-500">
                Showing{" "}
                <span className="text-slate-900 font-bold">
                  {filteredCases.length > 0 ? indexOfFirstItem + 1 : 0}
                </span>{" "}
                to{" "}
                <span className="text-slate-900 font-bold">
                  {Math.min(indexOfLastItem, filteredCases.length)}
                </span>{" "}
                of{" "}
                <span className="text-slate-900 font-bold">
                  {filteredCases.length}
                </span>{" "}
                cases
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-white/50"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = currentPage - 2 + i;
                      if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
                          currentPage === pageNum
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                            : "text-slate-600 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-white/50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LawyerLayout>
  );
};

export default LawyerCases;
