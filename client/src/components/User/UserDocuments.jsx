import React, { useState } from "react";
import UserLayout from "./UserLayout";
import {
  FileText,
  Upload,
  Search,
  Filter,
  MoreVertical,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  File,
  Image as ImageIcon,
  MoreHorizontal,
} from "lucide-react";

const UserDocuments = () => {
  const mockUser = { name: "Jane Doe" };
  const [activeTab, setActiveTab] = useState("all");

  const documents = [
    {
      id: 1,
      name: "Case_Brief_v1.pdf",
      type: "pdf",
      date: "Oct 24, 2024",
      size: "2.4 MB",
      status: "verified",
      category: "case",
    },
    {
      id: 2,
      name: "Identity_Proof.jpg",
      type: "image",
      date: "Oct 20, 2024",
      size: "1.8 MB",
      status: "verified",
      category: "id",
    },
    {
      id: 3,
      name: "Previous_Hearing_Transcript.pdf",
      type: "pdf",
      date: "Sep 28, 2024",
      size: "4.1 MB",
      status: "pending",
      category: "case",
    },
    {
      id: 4,
      name: "Affidavit_Draft.docx",
      type: "doc",
      date: "Sep 25, 2024",
      size: "0.5 MB",
      status: "action_required",
      category: "legal",
    },
    {
      id: 5,
      name: "Evidence_Photo_01.png",
      type: "image",
      date: "Sep 22, 2024",
      size: "3.2 MB",
      status: "verified",
      category: "evidence",
    },
  ];

  const filteredDocs =
    activeTab === "all"
      ? documents
      : documents.filter((d) => d.category === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "action_required":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="text-red-500" size={24} />;
      case "image":
        return <ImageIcon className="text-blue-500" size={24} />;
      case "doc":
        return <FileText className="text-blue-600" size={24} />;
      default:
        return <File className="text-slate-500" size={24} />;
    }
  };

  return (
    <UserLayout user={mockUser}>
      <div className="flex flex-col gap-8 font-sans">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Document Vault
            </h1>
            <p className="text-slate-500 font-medium">
              Securely manage and share your legal documents.
            </p>
          </div>
          <button className="px-6 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-lg shadow-slate-900/20 transition-all flex items-center gap-2 active:scale-95">
            <Upload size={18} />
            Upload New
          </button>
        </div>

        {/* Upload Zone */}
        <div className="w-full h-48 border-2 border-dashed border-slate-300 rounded-[32px] bg-white/40 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-white/60 transition-all group relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform z-10">
            <Upload size={28} className="text-indigo-600" />
          </div>
          <p className="text-slate-900 font-bold text-lg z-10">
            Click to upload or drag and drop
          </p>
          <p className="text-slate-500 text-sm font-medium z-10">
            PDF, JPG, PNG, DOCX (Max 10MB)
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-xl p-2 rounded-2xl border border-white/40 shadow-sm">
          <div className="flex bg-slate-100/50 p-1 rounded-xl w-full md:w-auto">
            {["all", "case", "id", "evidence"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-white text-slate-900 shadow-md"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === "all" ? "All Files" : tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/50 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-slate-700 placeholder:text-slate-400 font-medium text-sm"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="group bg-white/70 backdrop-blur-xl border border-white/50 rounded-[28px] p-5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative transform-gpu"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  {getFileIcon(doc.type)}
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wide flex items-center gap-1 ${getStatusColor(
                      doc.status
                    )}`}
                  >
                    {doc.status === "verified" && <CheckCircle2 size={10} />}
                    {doc.status === "pending" && <Clock size={10} />}
                    {doc.status === "action_required" && (
                      <AlertCircle size={10} />
                    )}
                    {doc.status.replace("_", " ")}
                  </span>
                  <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              <h3
                className="font-bold text-slate-900 truncate mb-1"
                title={doc.name}
              >
                {doc.name}
              </h3>
              <p className="text-slate-500 text-xs font-semibold mb-6 flex items-center gap-2">
                {doc.size} • {doc.date}
              </p>

              <div className="grid grid-cols-2 gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pt-4 border-t border-slate-100">
                <button className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors">
                  <Eye size={14} /> Preview
                </button>
                <button className="py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors">
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          ))}

          {/* Add New Placeholder Card */}
          <button className="border-2 border-dashed border-slate-200 rounded-[28px] flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all min-h-[200px] group">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-white group-hover:shadow-md">
              <Upload size={20} />
            </div>
            <span className="font-bold text-sm">Upload New Document</span>
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDocuments;
