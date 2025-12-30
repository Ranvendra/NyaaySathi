import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Scale,
  LayoutDashboard,
  Briefcase,
  Calendar,
  MessageSquare,
  FileText,
  IndianRupee,
  User,
  Settings,
  LogOut,
  Plus,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  HelpCircle,
} from "lucide-react";

const LawyerLayout = ({ children, lawyer }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/lawyer/dashboard", icon: LayoutDashboard },
    { name: "Cases", path: "/lawyer/cases", icon: Briefcase },
    { name: "Calendar", path: "/lawyer/calendar", icon: Calendar },
    { name: "Messages", path: "/lawyer/messages", icon: MessageSquare },
    { name: "Documents", path: "/lawyer/documents", icon: FileText },
    { name: "Earnings", path: "/lawyer/earnings", icon: IndianRupee },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  const NavItem = ({ item, mobile = false }) => {
    const isActive = location.pathname === item.path;

    return (
      <NavLink
        to={item.path}
        onClick={() => mobile && setIsMobileMenuOpen(false)}
        className={`relative flex items-center gap-3 px-4 py-3.5 my-1 rounded-2xl transition-all duration-300 group overflow-hidden
        ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
            : "text-slate-400 hover:text-white hover:bg-white/5"
        }`}
      >
        {/* Active Indicator Glow */}
        {isActive && (
          <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full" />
        )}

        <item.icon
          size={22}
          className={`relative z-10 transition-transform duration-300 ${
            isActive ? "scale-100" : "group-hover:scale-110"
          }`}
          strokeWidth={isActive ? 2.5 : 2}
        />

        <span
          className={`font-medium relative z-10 transition-all duration-300 ${
            !isSidebarOpen && !mobile
              ? "opacity-0 w-0 overflow-hidden"
              : "opacity-100"
          }`}
        >
          {item.name}
        </span>

        {/* Hover Effect Line */}
        {!isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-500 rounded-r-full transition-all duration-300 group-hover:h-1/2 opacity-0 group-hover:opacity-100" />
        )}
      </NavLink>
    );
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Desktop Sidebar with Glassmorphism */}
      <aside
        className={`hidden lg:flex flex-col h-full bg-[#0f172a] text-white z-50 transition-all duration-500 ease-in-out relative shadow-2xl
          ${isSidebarOpen ? "w-72" : "w-24"}
        `}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-12 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 border-2 border-[#F8FAFC]"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={14} />
          ) : (
            <ChevronRight size={14} />
          )}
        </button>

        {/* Logo Section */}
        <div
          className={`flex items-center gap-4 px-6 py-8 flex-shrink-0 ${
            !isSidebarOpen && "justify-center px-4"
          }`}
        >
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div
              className={`bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg ring-1 ring-white/10 transition-all duration-500 ${
                isSidebarOpen ? "w-12 h-12" : "w-10 h-10"
              }`}
            >
              <Scale size={isSidebarOpen ? 24 : 20} className="text-white" />
            </div>
          </div>

          <div
            className={`transition-all duration-500 overflow-hidden ${
              !isSidebarOpen ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            <h1 className="text-xl font-bold text-white tracking-tight">
              NyaaySathi
            </h1>
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
              Legal Partner
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto no-scrollbar">
          <p
            className={`px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 transition-opacity duration-300 ${
              !isSidebarOpen && "opacity-0 text-center"
            }`}
          >
            Menu
          </p>
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Actions Section */}
        <div className="px-4 pb-6 flex-shrink-0 space-y-4">
          {/* New Case Button */}
          <button
            className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-3.5 rounded-2xl font-bold shadow-lg shadow-blue-900/20 transition-all duration-300 hover:shadow-blue-900/40 hover:-translate-y-0.5 group overflow-hidden relative
             ${!isSidebarOpen && "px-0"}`}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Plus
              size={24}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            <span
              className={`transition-all duration-300 ${
                !isSidebarOpen ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
              }`}
            >
              New Case
            </span>
          </button>

          {/* User Profile Card */}
          <div
            className={`bg-slate-800/50 rounded-2xl p-3 border border-white/5 transition-all duration-300 hover:bg-slate-800 hover:border-white/10 group cursor-pointer ${
              !isSidebarOpen
                ? "flex-col items-center gap-2"
                : "flex items-center gap-3"
            }`}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-[#0f172a] group-hover:ring-blue-500/50 transition-all">
                {lawyer?.name?.charAt(0) || "L"}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f172a]" />
            </div>

            <div
              className={`flex-1 min-w-0 transition-all duration-300 ${
                !isSidebarOpen ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
              }`}
            >
              <p className="text-sm font-bold text-white truncate">
                {lawyer?.name || "Lawyer"}
              </p>
              <p className="text-[10px] font-medium text-slate-400 truncate">
                {lawyer?.lawyerProfile?.specialization?.[0] ||
                  "Attorney at Law"}
              </p>
            </div>

            <div
              className={`${
                !isSidebarOpen ? "w-full pt-2 border-t border-white/5" : "pl-2"
              }`}
            >
              <button
                onClick={handleLogout}
                className={`text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors ${
                  !isSidebarOpen && "w-full flex justify-center"
                }`}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header - Glassmorphism */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0f172a]/95 backdrop-blur-xl z-50 flex items-center justify-between px-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Scale size={18} className="text-white" />
          </div>
          <h1 className="text-lg font-bold text-white">NyaaySathi</h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="fixed left-0 top-16 bottom-0 w-80 bg-[#0f172a] overflow-y-auto animate-slideIn shadow-2xl border-r border-white/5">
            <div className="p-4 space-y-6">
              {/* User Info Mobile */}
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {lawyer?.name?.charAt(0) || "L"}
                </div>
                <div>
                  <p className="text-white font-bold">
                    {lawyer?.name || "Lawyer"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {lawyer?.lawyerProfile?.specialization?.[0] ||
                      "Attorney at Law"}
                  </p>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavItem key={item.path} item={item} mobile />
                ))}
              </nav>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-bold shadow-lg transition-transform active:scale-95">
                  <Plus size={20} />
                  <span>New Case</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area - Full Screen for layouts */}
      <main className="flex-1 overflow-hidden relative bg-[#F8FAFC] pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
};

export default LawyerLayout;
