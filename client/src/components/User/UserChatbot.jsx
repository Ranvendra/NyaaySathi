import React, { useState, useRef, useEffect } from "react";
import UserLayout from "./UserLayout";
import {
  Bot,
  User,
  Paperclip,
  Mic,
  Sparkles,
  MoreVertical,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Send,
} from "lucide-react";

const UserChatbot = () => {
  const mockUser = { name: "Jane Doe" };
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello Jane! I am your AI Legal Assistant. I can help you understand legal terms, draft documents, or answer questions about your ongoing case. How can I assist you today?",
      timestamp: "10:30 AM",
    },
  ]);

  const quickPrompts = [
    {
      text: "What are my rights in this case?",
      color: "bg-blue-50 border-blue-100 hover:bg-blue-100",
    },
    {
      text: "Draft a request for adjournment",
      color: "bg-purple-50 border-purple-100 hover:bg-purple-100",
    },
    {
      text: "Explain 'Anticipatory Bail'",
      color: "bg-emerald-50 border-emerald-100 hover:bg-emerald-100",
    },
    {
      text: "Summarize my last hearing",
      color: "bg-amber-50 border-amber-100 hover:bg-amber-100",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const newAiMsg = {
        id: messages.length + 2,
        sender: "ai",
        text: "I understand your query. Based on the current Indian Penal Code sections relevant to your case, here is a preliminary analysis...",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <UserLayout user={mockUser}>
      {/* Background - Elegant Light Theme */}
      <div className="absolute inset-0 -z-10 bg-[#F8FAFC]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px]" />
      </div>

      <div className="flex flex-col h-[calc(100dvh-8rem)] lg:h-[calc(100vh-6rem)] gap-6 font-sans relative">
        {/* Header Area */}
        <div className="flex items-center justify-between shrink-0 mb-2">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              Legal AI Assistant
              <span className="px-3 py-1 bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/20">
                PRO ver.
              </span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              24/7 Instant legal support and drafting.
            </p>
          </div>
          <button className="w-10 h-10 bg-white hover:bg-slate-50 rounded-full flex items-center justify-center text-slate-400 transition-colors shadow-sm border border-slate-200">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Chat Container - Light Glass */}
        <div className="flex-1 bg-white/70 backdrop-blur-2xl border border-white/60 shadow-xl rounded-[32px] overflow-hidden flex flex-col relative isolate transform-gpu ring-1 ring-slate-900/5">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                } group animate-fade-in-up`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ring-2 ring-white ${
                    msg.sender === "ai"
                      ? "bg-linear-to-br from-blue-600 to-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {msg.sender === "ai" ? <Bot size={20} /> : <User size={20} />}
                </div>

                {/* Bubble */}
                <div
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`p-5 rounded-2xl shadow-sm text-sm leading-relaxed relative border ${
                      msg.sender === "ai"
                        ? "bg-white text-slate-800 rounded-tl-none border-gray-100"
                        : "bg-[#d9fdd3] text-slate-800 rounded-tr-none shadow-sm border-transparent"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Meta */}
                    <div
                      className={`flex items-center gap-2 mt-2 text-[10px] font-bold opacity-70 ${
                        msg.sender === "user"
                          ? "text-slate-600 justify-end"
                          : "text-slate-400"
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {msg.sender === "ai" && (
                        <Sparkles size={10} className="text-blue-500" />
                      )}
                    </div>
                  </div>

                  {/* Actions (AI) */}
                  {msg.sender === "ai" && (
                    <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2">
                      <ActionButton icon={Copy} />
                      <ActionButton icon={ThumbsUp} />
                      <ActionButton icon={ThumbsDown} />
                      <ActionButton icon={RefreshCw} />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 animate-fade-in-up">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md ring-2 ring-white">
                  <Bot size={20} />
                </div>
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 h-14 w-24 shadow-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-75" />
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - NO BORDER/FOCUS RING */}
          <div className="p-4 bg-white/60 backdrop-blur-xl border-t border-white/50">
            {/* Quick Prompts */}
            {messages.length < 3 && (
              <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(prompt.text)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border shadow-sm transition-all whitespace-nowrap active:scale-95 ${prompt.color}`}
                  >
                    {prompt.text}
                  </button>
                ))}
              </div>
            )}

            <div className="relative flex items-end gap-2 bg-white rounded-3xl p-2 shadow-lg ring-1 ring-slate-100 transition-all focus-within:shadow-xl focus-within:ring-slate-200">
              <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors shrink-0">
                <Paperclip size={20} />
              </button>

              {/* TEXTAREA: Focus Outline Removed completely */}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  (e.preventDefault(), handleSend())
                }
                placeholder="Ask anything..."
                className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-slate-700 placeholder:text-slate-400 resize-none py-3 max-h-32 min-h-[48px] scrollbar-hide text-sm font-medium"
                rows={1}
              />

              <div className="flex items-center gap-1 shrink-0 pb-0.5">
                {!input.trim() && (
                  <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                    <Mic size={20} />
                  </button>
                )}
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`p-3 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center ${
                    input.trim()
                      ? "bg-slate-900 text-white hover:bg-black hover:scale-105 active:scale-95 shadow-slate-900/30"
                      : "bg-slate-100 text-slate-300 cursor-not-allowed"
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 4px;
        }
        @keyframes fadeInUp {
           from { opacity: 0; transform: translateY(10px); }
           to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
           animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </UserLayout>
  );
};

const ActionButton = ({ icon: Icon }) => (
  <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
    <Icon size={14} />
  </button>
);

export default UserChatbot;
