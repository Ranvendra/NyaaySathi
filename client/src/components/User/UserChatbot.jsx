import React, { useState, useRef, useEffect } from "react";
import UserLayout from "./UserLayout";
import { sendChatMessage } from "../../services/chatbotApi";
import toast from "react-hot-toast";
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

// Simple markdown-like text renderer
const formatText = (text) => {
  // Convert **bold** to <strong>
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');
  
  // Convert bullet points • to proper list items
  formatted = formatted.replace(/^• (.*?)$/gm, '<div class="flex gap-2 ml-2"><span class="text-blue-600">•</span><span>$1</span></div>');
  
  return formatted;
};

const UserChatbot = () => {
  const mockUser = { name: "Jane Doe" };
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCopying, setIsCopying] = useState(null);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `Welcome to NyaaySathi Legal AI Assistant. I am here to provide you with comprehensive legal support powered by advanced AI technology.

**My Capabilities:**

• **Legal Rights & Procedures** - Understand your rights under Indian law
• **Document Drafting** - Create petitions, applications, and legal letters  
• **Case Analysis** - Get strategic insights for your legal matters
• **Legal Terms** - Explain complex legal concepts simply
• **Quick Answers** - Instant responses to common legal questions

How may I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const quickPrompts = [
    {
      text: "What are my rights in this case?",
      icon: "⚖️",
      type: "rights",
      color: "bg-blue-50 border-blue-100 hover:bg-blue-100 hover:border-blue-200",
    },
    {
      text: "Draft adjournment application",
      icon: "📋",
      type: "adjournment",
      color: "bg-purple-50 border-purple-100 hover:bg-purple-100 hover:border-purple-200",
    },
    {
      text: "Explain 'Anticipatory Bail'",
      icon: "🔍",
      type: "bail",
      color: "bg-emerald-50 border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200",
    },
    {
      text: "First hearing preparation",
      icon: "✓",
      type: "hearing",
      color: "bg-amber-50 border-amber-100 hover:bg-amber-100 hover:border-amber-200",
    },
    {
      text: "How to file FIR?",
      icon: "📝",
      type: "fir",
      color: "bg-rose-50 border-rose-100 hover:bg-rose-100 hover:border-rose-200",
    },
    {
      text: "Consumer complaint guide",
      icon: "👤",
      type: "complaint",
      color: "bg-indigo-50 border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    try {
      // Send message to AI backend with conversation history
      const response = await sendChatMessage(userInput, messages);

      const newAiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: response.message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      
      setMessages((prev) => [...prev, newAiMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      
      const errorMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: "⚠️ I apologize, but I'm having trouble processing your request right now. This could be due to:\n\n• High server load\n• Temporary connectivity issues\n• Service maintenance\n\nPlease try again in a moment. If the issue persists, contact support.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      
      setMessages((prev) => [...prev, errorMsg]);
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = async (prompt) => {
    const newUserMsg = {
      id: Date.now(),
      sender: "user",
      text: prompt.text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);

    try {
      const response = await sendChatMessage(prompt.text, messages, "general");
      
      const newAiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: response.message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      
      setMessages((prev) => [...prev, newAiMsg]);
    } catch (error) {
      console.error("Quick Prompt Error:", error);
      toast.error("Failed to process quick prompt");
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyMessage = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopying(messageId);
      toast.success("Copied to clipboard!");
      setTimeout(() => setIsCopying(null), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  const handleRegenerateResponse = async (messageIndex) => {
    // Find the last user message before this AI message
    const userMessageIndex = messageIndex - 1;
    if (userMessageIndex >= 0 && messages[userMessageIndex].sender === "user") {
      setIsTyping(true);
      try {
        const userMessage = messages[userMessageIndex].text;
        const historyBeforeRegenerate = messages.slice(0, userMessageIndex);
        
        const response = await sendChatMessage(userMessage, historyBeforeRegenerate);
        
        // Update the AI message
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[messageIndex] = {
            ...newMessages[messageIndex],
            text: response.message,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          return newMessages;
        });
        
        toast.success("Response regenerated!");
      } catch (error) {
        toast.error("Failed to regenerate");
      } finally {
        setIsTyping(false);
      }
    }
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
            {messages.map((msg, index) => (
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
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: msg.sender === "ai" ? formatText(msg.text) : msg.text 
                      }}
                    />

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
                      <button
                        onClick={() => handleCopyMessage(msg.text, msg.id)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                        title="Copy message"
                      >
                        {isCopying === msg.id ? (
                          <span className="text-green-500">✓</span>
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                      <button
                        onClick={() => handleRegenerateResponse(index)}
                        disabled={isTyping}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
                        title="Regenerate response"
                      >
                        <RefreshCw size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-green-600 transition-colors" title="Good response">
                        <ThumbsUp size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors" title="Poor response">
                        <ThumbsDown size={14} />
                      </button>
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pb-4">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickPrompt(prompt)}
                    disabled={isTyping}
                    className={`px-4 py-3 rounded-xl text-xs font-bold border shadow-sm transition-all hover:shadow-md active:scale-95 flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed ${prompt.color}`}
                  >
                    <span className="text-base">{prompt.icon}</span>
                    <span className="text-left">{prompt.text}</span>
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
