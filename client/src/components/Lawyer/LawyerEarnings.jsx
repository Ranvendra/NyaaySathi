import React, { useState, useEffect } from "react";
import {
  IndianRupee,
  TrendingUp,
  PieChart,
  Wallet,
  ArrowRight,
  Download,
  Eye,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";
import LawyerLayout from "./LawyerLayout";

const LawyerEarnings = () => {
  // Mock Data
  const initialInvoices = [
    {
      id: "INV-00125",
      client: "John Doe",
      case: "Case #102-B v. Acme",
      date: "2023-10-25",
      amount: 5250.0,
      status: "Paid",
    },
    {
      id: "INV-00124",
      client: "Jane Smith",
      case: "Case #231-C v. Globex",
      date: "2023-10-22",
      amount: 8200.0,
      status: "Pending",
    },
    {
      id: "INV-00123",
      client: "Robert Johnson",
      case: "Case #102-B v. Acme",
      date: "2023-10-15",
      amount: 3500.0,
      status: "Paid",
    },
    {
      id: "INV-00122",
      client: "Emily White",
      case: "Case #198-A v. Stark",
      date: "2023-10-10",
      amount: 12000.0,
      status: "Overdue",
    },
    {
      id: "INV-00121",
      client: "Michael Brown",
      case: "Case #342-A v. TechSol",
      date: "2023-10-05",
      amount: 1500.0,
      status: "Paid",
    },
    {
      id: "INV-00120",
      client: "Sarah Davis",
      case: "Case #231-C v. Globex",
      date: "2023-10-01",
      amount: 4500.0,
      status: "Pending",
    },
    {
      id: "INV-00119",
      client: "David Wilson",
      case: "Family Law Matter",
      date: "2023-09-28",
      amount: 2200.0,
      status: "Paid",
    },
    {
      id: "INV-00118",
      client: "Jennifer Lee",
      case: "Estate Planning",
      date: "2023-09-25",
      amount: 1800.0,
      status: "Paid",
    },
    {
      id: "INV-00117",
      client: "James Miller",
      case: "Property Dispute",
      date: "2023-09-20",
      amount: 6000.0,
      status: "Overdue",
    },
    {
      id: "INV-00116",
      client: "Robert Taylor",
      case: "Traffic Violation",
      date: "2023-09-15",
      amount: 500.0,
      status: "Paid",
    },
    {
      id: "INV-00115",
      client: "Mary Anderson",
      case: "Divorce Settlement",
      date: "2023-09-10",
      amount: 3500.0,
      status: "Paid",
    },
    {
      id: "INV-00114",
      client: "Patricia Thomas",
      case: "Child Custody",
      date: "2023-09-05",
      amount: 2800.0,
      status: "Pending",
    },
  ];

  const [invoices, setInvoices] = useState(initialInvoices);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = invoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Overdue":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
                Earnings
              </h1>
              <p className="text-slate-500 font-medium mt-2 text-lg">
                Track your income and manage your finances.
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
              <FileText size={20} />
              <span>Generate Report</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 flex-shrink-0">
            {/* Total Revenue */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-slate-500 font-semibold mb-2">
                  Total Revenue
                </p>
                <h3 className="text-4xl font-bold text-slate-900">
                  $256,789.50
                </h3>
              </div>
              <div className="absolute right-[-20px] top-[-20px] bg-blue-50 w-32 h-32 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
            </div>

            {/* This Month */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-slate-500 font-semibold mb-2">This Month</p>
                <h3 className="text-4xl font-bold text-slate-900">
                  $15,430.00
                </h3>
              </div>
              <div className="absolute right-[-20px] top-[-20px] bg-emerald-50 w-32 h-32 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
            </div>

            {/* Pending Payments */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-slate-500 font-semibold mb-2">
                  Pending Payments
                </p>
                <h3 className="text-4xl font-bold text-slate-900">$8,200.00</h3>
              </div>
              <div className="absolute right-[-20px] top-[-20px] bg-amber-50 w-32 h-32 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* Billing History Section */}
          <div className="flex-1 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-0">
            <div className="p-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                Billing History
              </h2>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[1.5fr_2fr_2.5fr_1.5fr_1.5fr_1.5fr_1fr] gap-4 p-6 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider sticky top-0 z-10">
              <div>Invoice ID</div>
              <div>Client Name</div>
              <div>Case</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="divide-y divide-slate-50">
                {currentInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="grid grid-cols-[1.5fr_2fr_2.5fr_1.5fr_1.5fr_1.5fr_1fr] gap-4 p-5 items-center hover:bg-slate-50 transition-colors group"
                  >
                    <div className="font-semibold text-slate-900">{inv.id}</div>
                    <div className="text-slate-600 font-medium">
                      {inv.client}
                    </div>
                    <div className="text-slate-500 truncate">{inv.case}</div>
                    <div className="text-slate-500 font-medium">{inv.date}</div>
                    <div className="font-bold text-slate-700">
                      {formatCurrency(inv.amount)}
                    </div>
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(
                          inv.status
                        )}`}
                      >
                        {inv.status}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <Download size={18} />
                      </button>
                      <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium">
                Showing{" "}
                <span className="text-slate-900 font-bold">
                  {indexOfFirstItem + 1}-
                  {Math.min(indexOfLastItem, invoices.length)}
                </span>{" "}
                of{" "}
                <span className="text-slate-900 font-bold">
                  {invoices.length}
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

export default LawyerEarnings;
