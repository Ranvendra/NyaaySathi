import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Filter,
  Download,
  Trash2,
  Share2,
  MoreVertical,
  Plus,
  HardDrive,
  Clock,
  File,
  Image as ImageIcon,
  FileSpreadsheet,
  CheckCircle2,
  Shield,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LawyerLayout from "./LawyerLayout";

const LawyerDocuments = () => {
  // Mock Data - Expanded for better pagination demo
  const initialDocs = [
    {
      id: 1,
      name: "Client_Agreement_Final.pdf",
      case: "Case #102-B v. Acme Corp",
      type: "Contract",
      size: "2.4 MB",
      date: "Oct 24, 2024",
      fileType: "pdf",
    },
    {
      id: 2,
      name: "Pleading_Motion_to_Dismiss.docx",
      case: "Case #231-C v. Globex Inc.",
      type: "Pleading",
      size: "1.8 MB",
      date: "Oct 22, 2024",
      fileType: "docx",
    },
    {
      id: 3,
      name: "Exhibit_A_Security_Footage.png",
      case: "Case #102-B v. Acme Corp",
      type: "Evidence",
      size: "15.2 MB",
      date: "Oct 20, 2024",
      fileType: "image",
    },
    {
      id: 4,
      name: "Discovery_Requests_Log.xlsx",
      case: "Case #231-C v. Globex Inc.",
      type: "Discovery",
      size: "450 KB",
      date: "Oct 18, 2024",
      fileType: "xls",
    },
    {
      id: 5,
      name: "Witness_Statement_JohnDoe.pdf",
      case: "Case #102-B v. Acme Corp",
      type: "Statement",
      size: "1.2 MB",
      date: "Oct 15, 2024",
      fileType: "pdf",
    },
    {
      id: 6,
      name: "Financial_Report_Q3.pdf",
      case: "Case #342-A v. TechSol",
      type: "Financial",
      size: "3.5 MB",
      date: "Oct 12, 2024",
      fileType: "pdf",
    },
    {
      id: 7,
      name: "Settlement_Offer_v1.docx",
      case: "Case #342-A v. TechSol",
      type: "Offer",
      size: "1.1 MB",
      date: "Oct 10, 2024",
      fileType: "docx",
    },
    {
      id: 8,
      name: "Judgement_Summary.pdf",
      case: "Case #102-B v. Acme Corp",
      type: "Legal",
      size: "4.2 MB",
      date: "Oct 08, 2024",
      fileType: "pdf",
    },
    {
      id: 9,
      name: "Invoice_OCT_2024.pdf",
      case: "Case #231-C v. Globex Inc.",
      type: "Financial",
      size: "150 KB",
      date: "Oct 05, 2024",
      fileType: "pdf",
    },
    {
      id: 10,
      name: "Site_Photos_Compressed.zip",
      case: "Case #342-A v. TechSol",
      type: "Evidence",
      size: "25.0 MB",
      date: "Oct 01, 2024",
      fileType: "zip",
    },
    {
      id: 11,
      name: "Email_Correspondence_Batch1.pdf",
      case: "Case #102-B v. Acme Corp",
      type: "Communication",
      size: "5.5 MB",
      date: "Sep 28, 2024",
      fileType: "pdf",
    },
    {
      id: 12,
      name: "Expert_Witness_CV.docx",
      case: "Case #231-C v. Globex Inc.",
      type: "Profile",
      size: "85 KB",
      date: "Sep 25, 2024",
      fileType: "docx",
    },
  ];

  const [documents, setDocuments] = useState(initialDocs);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCase, setFilterCase] = useState("All Cases");
  const [filterType, setFilterType] = useState("All Types");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter Logic
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.case.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCase = filterCase === "All Cases" || doc.case === filterCase;
    const matchesType = filterType === "All Types" || doc.type === filterType;
    return matchesSearch && matchesCase && matchesType;
  });

  // Calculate Pagination
  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDocs.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCase, filterType]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Selection Logic
  const toggleSelectAll = () => {
    // Select only visible items on the current page for clearer UX, or all filtered items?
    // Let's select all FILTERED items to be more powerful.
    if (selectedDocs.length === filteredDocs.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(filteredDocs.map((doc) => doc.id));
    }
  };

  // Helper to check if current page items are all selected
  const areAllCurrentPageSelected =
    currentItems.length > 0 &&
    currentItems.every((item) => selectedDocs.includes(item.id));
  const isIndeterminate =
    currentItems.some((item) => selectedDocs.includes(item.id)) &&
    !areAllCurrentPageSelected;

  const toggleSelectPage = () => {
    const currentPageIds = currentItems.map((item) => item.id);
    if (areAllCurrentPageSelected) {
      // Deselect current page items
      setSelectedDocs((prev) =>
        prev.filter((id) => !currentPageIds.includes(id))
      );
    } else {
      // Select all current page items
      // Add IDs that aren't already selected
      const newIds = currentPageIds.filter((id) => !selectedDocs.includes(id));
      setSelectedDocs((prev) => [...prev, ...newIds]);
    }
  };

  const toggleSelectDoc = (id) => {
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter((docId) => docId !== id));
    } else {
      setSelectedDocs([...selectedDocs, id]);
    }
  };

  const handleDelete = () => {
    setDocuments(documents.filter((doc) => !selectedDocs.includes(doc.id)));
    setSelectedDocs([]);
    setCurrentPage(1); // Reset to page 1 to prevent getting stuck on empty page
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="text-red-500" size={24} />;
      case "docx":
        return <FileText className="text-blue-500" size={24} />;
      case "xls":
        return <FileSpreadsheet className="text-green-500" size={24} />;
      case "image":
        return <ImageIcon className="text-purple-500" size={24} />;
      default:
        return <File className="text-slate-400" size={24} />;
    }
  };

  const mockLawyer = {
    name: "Lawyer",
    lawyerProfile: { specialization: ["General"] },
  };

  return (
    <LawyerLayout lawyer={mockLawyer}>
      <div className="h-screen bg-[#F8FAFC] flex flex-col overflow-hidden font-sans">
        {/* Subtle Background Mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] opacity-60" />
        </div>

        <div className="flex-1 flex flex-col p-6 sm:p-8 max-w-[1600px] mx-auto w-full relative z-10 h-full overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 flex-shrink-0 animate-fade-in-up">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                Document Management
              </h1>
              <div className="flex items-center gap-2 mt-2 text-emerald-600 font-medium text-sm">
                <Shield size={16} />
                <span>End-to-end encrypted vault</span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
              <Upload size={20} />
              <span>Upload Document</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 flex-shrink-0">
            {[
              {
                title: "Total Documents",
                value: documents.length.toLocaleString(),
                icon: FileText,
                color: "bg-blue-500",
                text: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                title: "Storage Used",
                value: "15.2 GB / 50 GB",
                icon: HardDrive,
                color: "bg-purple-500",
                text: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                title: "Recent Uploads",
                value: "12",
                icon: Clock,
                color: "bg-emerald-500",
                text: "text-emerald-600",
                bg: "bg-emerald-50",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`${stat.bg} p-4 rounded-2xl group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className={stat.text} size={28} />
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium text-xs uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">
                      {stat.value}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls Bar */}
          <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-4 mb-6 flex flex-col md:flex-row items-center gap-4 flex-shrink-0 relative z-20">
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search documents by name, case, or content..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all outline-none font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative group flex-1 md:flex-none">
                <select
                  className="w-full md:w-48 appearance-none pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none cursor-pointer"
                  value={filterCase}
                  onChange={(e) => setFilterCase(e.target.value)}
                >
                  <option>All Cases</option>
                  <option>Case #102-B v. Acme Corp</option>
                  <option>Case #231-C v. Globex Inc.</option>
                  <option>Case #342-A v. TechSol</option>
                </select>
                <Filter
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={16}
                />
              </div>

              <div className="relative group flex-1 md:flex-none">
                <select
                  className="w-full md:w-48 appearance-none pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none cursor-pointer"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Contract</option>
                  <option>Pleading</option>
                  <option>Evidence</option>
                  <option>Discovery</option>
                  <option>Statement</option>
                  <option>Financial</option>
                </select>
                <Filter
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          {/* Action Bar (Conditional) */}
          {selectedDocs.length > 0 && (
            <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 text-indigo-900 px-6 py-3 rounded-2xl mb-4 animate-fade-in shadow-sm">
              <span className="font-semibold flex items-center gap-2">
                <CheckCircle2 size={20} className="text-indigo-600" />
                {selectedDocs.length} items selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-white/50 rounded-lg text-indigo-700 transition-colors"
                  title="Download"
                >
                  <Download size={20} />
                </button>
                <button
                  className="p-2 hover:bg-white/50 rounded-lg text-indigo-700 transition-colors"
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
                <div className="h-4 w-[1px] bg-indigo-200 mx-2" />
                <button
                  className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                  title="Delete"
                  onClick={handleDelete}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Document List */}
          <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-0">
            {/* Table Header */}
            <div className="grid grid-cols-[auto_2.5fr_1.5fr_1fr_1fr_1fr_auto] gap-4 p-6 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider sticky top-0 z-10">
              <div className="flex items-center justify-center w-6">
                <div
                  className={`w-5 h-5 rounded-md border-2 cursor-pointer flex items-center justify-center transition-all ${
                    areAllCurrentPageSelected
                      ? "bg-blue-600 border-blue-600"
                      : isIndeterminate
                      ? "bg-blue-600 border-blue-600"
                      : "border-slate-300 hover:border-blue-400"
                  }`}
                  onClick={toggleSelectPage}
                >
                  {(areAllCurrentPageSelected || isIndeterminate) && (
                    <span className="text-white text-xs leading-none">
                      {areAllCurrentPageSelected ? "✓" : "-"}
                    </span>
                  )}
                </div>
              </div>
              <div>Document Name</div>
              <div>Associated Case</div>
              <div>Type</div>
              <div>Date</div>
              <div>Size</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {currentItems.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {currentItems.map((doc) => (
                    <div
                      key={doc.id}
                      className={`grid grid-cols-[auto_2.5fr_1.5fr_1fr_1fr_1fr_auto] gap-4 p-5 items-center hover:bg-slate-50 transition-colors group cursor-pointer ${
                        selectedDocs.includes(doc.id)
                          ? "bg-blue-50/50 hover:bg-blue-50"
                          : ""
                      }`}
                      onClick={() => toggleSelectDoc(doc.id)}
                    >
                      <div
                        className="flex items-center justify-center w-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border-2 cursor-pointer flex items-center justify-center transition-all ${
                            selectedDocs.includes(doc.id)
                              ? "bg-blue-600 border-blue-600"
                              : "border-slate-300 group-hover:border-blue-300"
                          }`}
                          onClick={() => toggleSelectDoc(doc.id)}
                        >
                          {selectedDocs.includes(doc.id) && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 bg-slate-100 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                          {getFileIcon(doc.fileType)}
                        </div>
                        <span className="font-semibold text-slate-900 truncate">
                          {doc.name}
                        </span>
                      </div>

                      <div className="text-slate-600 font-medium truncate">
                        {doc.case}
                      </div>

                      <div>
                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                          {doc.type}
                        </span>
                      </div>

                      <div className="text-slate-500 text-sm font-medium">
                        {doc.date}
                      </div>

                      <div className="text-slate-500 text-sm font-medium">
                        {doc.size}
                      </div>

                      <div
                        className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                          <Download size={18} />
                        </button>
                        <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors ml-1">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-12">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Search size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    No documents found
                  </h3>
                  <p className="text-slate-500">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium">
                Showing{" "}
                <span className="text-slate-900 font-bold">
                  {filteredDocs.length > 0 ? indexOfFirstItem + 1 : 0}-
                  {Math.min(indexOfLastItem, filteredDocs.length)}
                </span>{" "}
                of{" "}
                <span className="text-slate-900 font-bold">
                  {filteredDocs.length}
                </span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LawyerLayout>
  );
};

export default LawyerDocuments;
