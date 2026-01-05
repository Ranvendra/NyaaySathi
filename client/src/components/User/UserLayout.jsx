import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Bot,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

// Optimized NavItem with memoization implicitly handled by parent re-renders or React.memo if needed later
// For now, keeping it simple but efficiently styled
const NavItem = ({ item, isActive, isSidebarOpen, mobile, onClick }) => {
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`relative flex items-center gap-3 px-4 py-3.5 my-1.5 rounded-2xl transition-all duration-200 group overflow-hidden transform-gpu
      ${
        isActive
          ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
          : "text-slate-500 hover:text-slate-900 hover:bg-white/60"
      }`}
    >
      <item.icon
        size={22}
        className={`relative z-10 transition-transform duration-200 ${
          isActive ? "scale-100" : "group-hover:scale-110"
        }`}
        strokeWidth={isActive ? 2.5 : 2}
      />
      <span
        className={`font-medium relative z-10 transition-opacity duration-200 whitespace-nowrap ${
          !isSidebarOpen && !mobile
            ? "opacity-0 w-0 overflow-hidden"
            : "opacity-100"
        }`}
      >
        {item.label}
      </span>
    </Link>
  );
};

const UserLayout = ({ children, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/user/dashboard" },
    { icon: MessageSquare, label: "Consultation", path: "/user/consultation" },
    { icon: Bot, label: "ChatBot", path: "/user/chatbot" },
    { icon: FileText, label: "Documents", path: "/user/documents" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#F5F5F7] font-sans overflow-hidden relative isolate">
      {/* Optimized Fluid Background - GPU Accelerated */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-100/40 rounded-full blur-[80px] opacity-60 animate-blob transform-gpu will-change-transform backface-hidden" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-purple-100/40 rounded-full blur-[80px] opacity-50 animate-blob animation-delay-2000 transform-gpu will-change-transform backface-hidden" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-emerald-100/30 rounded-full blur-[80px] opacity-40 animate-blob animation-delay-4000 transform-gpu will-change-transform backface-hidden" />
      </div>

      {/* Desktop Sidebar - Optimized Glassmorphism */}
      <aside
        className={`hidden lg:flex flex-col h-full bg-white/40 border-r border-white/40 z-50 transition-[width] duration-300 ease-out relative shadow-lg backdrop-blur-xl transform-gpu will-change-[width]
          ${isSidebarOpen ? "w-72" : "w-24"}
        `}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-10 w-6 h-6 bg-white text-slate-600 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200 z-50 border border-slate-200"
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
          <div className="relative group cursor-pointer transition-transform duration-200 hover:scale-105">
            <div className="w-10 h-10 bg-linear-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
              N
            </div>
          </div>
          <div
            className={`transition-opacity duration-300 overflow-hidden whitespace-nowrap ${
              !isSidebarOpen ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              NyaaySathi
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
              isSidebarOpen={isSidebarOpen}
              mobile={false}
            />
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="px-4 pb-6 flex-shrink-0 space-y-4">
          <div
            className={`bg-white/50 rounded-2xl p-3 border border-white/40 transition-colors duration-200 hover:bg-white/80 group cursor-pointer ${
              !isSidebarOpen
                ? "flex-col items-center gap-2"
                : "flex items-center gap-3"
            }`}
          >
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            <div
              className={`flex-1 min-w-0 transition-opacity duration-300 ${
                !isSidebarOpen ? "w-0 opacity-0 hidden" : "w-auto opacity-100"
              }`}
            >
              <p className="text-sm font-bold text-slate-900 truncate">
                {user?.name || "User"}
              </p>
              <p className="text-[10px] font-medium text-slate-500 truncate">
                Client Account
              </p>
            </div>

            <div
              className={`${
                !isSidebarOpen
                  ? "w-full pt-2 border-t border-slate-200/50"
                  : "pl-2"
              }`}
            >
              <button
                onClick={handleLogout}
                className={`text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200 ${
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

      {/* Mobile Header - Optimized */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg z-50 flex items-center justify-between px-4 border-b border-white/20 shadow-sm transform-gpu">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
            N
          </div>
          <h1 className="text-lg font-bold text-slate-900">NyaaySathi</h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors duration-200"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in-down">
          <div className="fixed left-0 top-16 bottom-0 w-72 bg-[#F5F5F7] overflow-y-auto shadow-2xl border-r border-white/50 p-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                  mobile
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content Area - Scroll Performance */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto relative z-10 pt-20 lg:pt-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-full scroll-smooth transform-gpu">
        <div className="lg:py-8 max-w-6xl mx-auto">{children}</div>
      </main>

      {/* Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default UserLayout;
