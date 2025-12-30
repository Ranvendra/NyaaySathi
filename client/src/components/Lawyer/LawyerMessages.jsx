import React, { useState } from "react";
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Send,
  Image as ImageIcon,
  Mic,
  ArrowLeft,
  Check,
  CheckCheck,
  Circle,
  Lock,
  User,
  MessageSquare,
  Shield,
  FileText,
} from "lucide-react";
import LawyerLayout from "./LawyerLayout";

// Custom CSS for animations
const customStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-slide-in {
    animation: slideIn 0.3s ease-out forwards;
  }
`;

const LawyerMessages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [mobileView, setMobileView] = useState("list"); // 'list' or 'chat'
  const [messageInput, setMessageInput] = useState("");

  // Mock Data
  const contacts = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      role: "Client",
      avatar: null, // text fallback
      status: "online",
      lastMessage: "I've uploaded the documents.",
      time: "10:42 AM",
      unread: 2,
      initials: "SJ",
      color: "bg-purple-100 text-purple-600 ring-purple-200",
    },
    {
      id: 2,
      name: "Vikram Singh",
      role: "Client",
      avatar: null,
      status: "offline",
      lastMessage: "Thanks for the update!",
      time: "Yesterday",
      unread: 0,
      initials: "VS",
      color: "bg-blue-100 text-blue-600 ring-blue-200",
    },
    {
      id: 3,
      name: "Neha Gupta",
      role: "Client",
      avatar: null,
      status: "online",
      lastMessage: "When is the next hearing?",
      time: "Yesterday",
      unread: 0,
      initials: "NG",
      color: "bg-emerald-100 text-emerald-600 ring-emerald-200",
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      role: "Client",
      avatar: null,
      status: "offline",
      lastMessage: "Please call me when free.",
      time: "Oct 24",
      unread: 0,
      initials: "RK",
      color: "bg-amber-100 text-amber-600 ring-amber-200",
    },
    {
      id: 5,
      name: "Amit Patel",
      role: "Opposing Counsel",
      avatar: null,
      status: "offline",
      lastMessage: "Settlement offer attached.",
      time: "Oct 22",
      unread: 0,
      initials: "AP",
      color: "bg-slate-100 text-slate-600 ring-slate-200",
    },
  ];

  const messages = {
    1: [
      {
        id: 1,
        sender: "them",
        text: "Hello, I have a question about the contract.",
        time: "10:30 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Hi Sarah, sure. What specifically?",
        time: "10:32 AM",
        status: "read",
      },
      {
        id: 3,
        sender: "them",
        text: "Clause 4 regarding termination.",
        time: "10:35 AM",
      },
      {
        id: 4,
        sender: "them",
        text: "I've uploaded the documents for you to check.",
        time: "10:42 AM",
        type: "file",
        fileName: "Contract_Draft_v2.pdf",
        fileSize: "2.4 MB",
      },
    ],
    // Empty fallbacks for others for demo
    2: [
      {
        id: 1,
        sender: "them",
        text: "Thanks for the update!",
        time: "Yesterday",
      },
    ],
    3: [
      {
        id: 1,
        sender: "them",
        text: "When is the next hearing?",
        time: "Yesterday",
      },
    ],
    4: [
      {
        id: 1,
        sender: "them",
        text: "Please call me when free.",
        time: "Oct 24",
      },
    ],
    5: [
      {
        id: 1,
        sender: "them",
        text: "Settlement offer attached.",
        time: "Oct 22",
      },
    ],
  };

  const handleChatSelect = (contact) => {
    setActiveChat(contact);
    setMobileView("chat");
  };

  const handleBackToList = () => {
    setMobileView("list");
    setActiveChat(null);
  };

  const currentMessages = activeChat ? messages[activeChat.id] || [] : [];

  // Mock Lawyer prop
  const mockLawyer = {
    name: "Lawyer",
    lawyerProfile: { specialization: ["General"] },
  };

  return (
    <LawyerLayout lawyer={mockLawyer}>
      <style>{customStyles}</style>
      <div className="h-screen bg-[#F8FAFC] flex flex-col overflow-hidden font-sans relative">
        {/* Background Mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] opacity-60" />
        </div>

        {/* Main Content Container - Floating Island Style */}
        <div className="flex-1 flex overflow-hidden p-4 sm:p-6 max-w-[1600px] mx-auto w-full relative z-10 gap-6">
          {/* Sidebar - Conversation List */}
          <div
            className={`${
              mobileView === "list" ? "flex" : "hidden"
            } lg:flex flex-col w-full lg:w-96 bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-sm overflow-hidden flex-shrink-0 animate-fade-in-up transition-all duration-300`}
          >
            {/* Sidebar Header */}
            <div className="px-6 py-6 border-b border-slate-100/50">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                  {contacts.length} Active
                </span>
              </div>
              <div className="relative group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-200 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 custom-scrollbar pt-2">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleChatSelect(contact)}
                  className={`relative p-4 rounded-2xl flex gap-4 cursor-pointer transition-all border ${
                    activeChat?.id === contact.id
                      ? "bg-white border-blue-100 shadow-lg shadow-blue-50 scale-[1.02]"
                      : "hover:bg-white/60 border-transparent hover:border-slate-100 hover:shadow-sm"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    {/* UPDATED: Rounded-full for circular profile images */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base shadow-sm ring-4 ring-opacity-20 ${contact.color}`}
                    >
                      {contact.initials}
                    </div>
                    {contact.status === "online" && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-[3px] border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3
                        className={`font-bold text-base truncate ${
                          activeChat?.id === contact.id
                            ? "text-slate-900"
                            : "text-slate-700"
                        }`}
                      >
                        {contact.name}
                      </h3>
                      <span
                        className={`text-[10px] font-bold ${
                          activeChat?.id === contact.id
                            ? "text-blue-600"
                            : "text-slate-400"
                        }`}
                      >
                        {contact.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-sm truncate font-medium ${
                          activeChat?.id === contact.id
                            ? "text-slate-600"
                            : "text-slate-400 group-hover:text-slate-500"
                        }`}
                      >
                        {contact.lastMessage}
                      </p>
                      {contact.unread > 0 && (
                        <div className="w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ml-2 shadow-sm">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div
            className={`${
              mobileView === "chat" ? "flex" : "hidden"
            } lg:flex flex-col flex-1 bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-sm relative overflow-hidden transition-all duration-300`}
          >
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-slate-100/50 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-20">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleBackToList}
                      className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <div className="relative">
                      {/* UPDATED: Rounded-full */}
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-opacity-20 ${activeChat.color}`}
                      >
                        {activeChat.initials}
                      </div>
                      {activeChat.status === "online" && (
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left">
                      <h2 className="font-bold text-slate-900 text-lg">
                        {activeChat.name}
                      </h2>
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Online Encrypted
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all shadow-sm border border-transparent hover:border-blue-100 hover:shadow-md">
                      <Phone size={20} strokeWidth={2.5} />
                    </button>
                    <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all shadow-sm border border-transparent hover:border-blue-100 hover:shadow-md">
                      <Video size={20} strokeWidth={2.5} />
                    </button>
                    <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all shadow-sm border border-transparent hover:border-slate-200 hover:shadow-md">
                      <MoreVertical size={20} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/10 scroll-smooth">
                  {currentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex w-full animate-slide-in ${
                        msg.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {/* UPDATED: items-start for top alignment */}
                      <div
                        className={`flex gap-4 max-w-[75%] items-start ${
                          msg.sender === "me" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {/* Avatar for Them - UPDATED SIZE & SHAPE */}
                        {msg.sender !== "me" && (
                          <div
                            className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${activeChat.color} shadow-sm ring-2 ring-white`}
                          >
                            {activeChat.initials}
                          </div>
                        )}

                        {/* Avatar for Me - UPDATED SIZE & SHAPE */}
                        {msg.sender === "me" && (
                          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-slate-900 text-white shadow-sm ring-2 ring-white">
                            <User size={16} />
                          </div>
                        )}

                        <div className="flex flex-col gap-1">
                          {msg.type === "file" ? (
                            <div className="p-4 rounded-[20px] rounded-tl-none bg-white border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors group">
                              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <FileText size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-sm">
                                  {msg.fileName}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {msg.fileSize}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`px-6 py-4 text-[15px] font-medium leading-relaxed shadow-sm transition-all hover:shadow-md ${
                                msg.sender === "me"
                                  ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-[24px] rounded-tr-none"
                                  : "bg-white text-slate-700 rounded-[24px] rounded-tl-none border border-slate-100"
                              }`}
                            >
                              {msg.text}
                            </div>
                          )}

                          <span
                            className={`text-[10px] font-bold uppercase tracking-wide opacity-70 ${
                              msg.sender === "me"
                                ? "text-right text-slate-500 mr-2"
                                : "text-left text-slate-400 ml-2"
                            }`}
                          >
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* End to End Encryption Notice - UPDATED COLOR */}
                  <div className="flex items-center justify-center gap-2 pt-8 pb-4">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                      Messages are end-to-end encrypted
                    </p>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-5 bg-white border-t border-slate-100 flex-shrink-0">
                  <div className="flex items-end gap-3 bg-slate-50 p-2 rounded-[24px] border border-slate-100 focus-within:bg-white focus-within:border-blue-200 focus-within:ring-4 focus-within:ring-blue-100 transition-all shadow-inner">
                    <button className="p-3 text-slate-400 hover:text-blue-600 bg-transparent hover:bg-indigo-50 rounded-2xl transition-all">
                      <Paperclip size={20} />
                    </button>
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your secure message..."
                      className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 resize-none py-3 max-h-32 min-h-[48px] text-sm font-medium"
                      rows="1"
                      style={{ height: "auto" }}
                    />

                    {/* UPDATED SEND BUTTON - Proper Button with Text */}
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mb-0.5 mr-0.5">
                      <span>Send</span>
                      <Send size={16} className="rotate-45" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Empty State
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                <div className="group relative w-32 h-32 mb-8">
                  <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-float z-10">
                    <MessageSquare
                      size={48}
                      className="text-blue-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce delay-100 z-20 border-2 border-white">
                    <Lock size={16} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                  Secure Messaging
                </h3>
                <p className="max-w-xs text-center text-slate-500 leading-relaxed font-medium">
                  Select a conversation to start chatting securely with your
                  clients or team members.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </LawyerLayout>
  );
};

export default LawyerMessages;
