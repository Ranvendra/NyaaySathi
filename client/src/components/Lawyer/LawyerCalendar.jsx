import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  CheckCircle,
  Clock,
  Briefcase,
  User,
  Calendar as CalendarIcon,
  Trash,
  Edit2,
  X,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react";
import LawyerLayout from "./LawyerLayout";
import toast from "react-hot-toast";

// Custom CSS for animations
const customStyles = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

const LawyerCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1)); // October 2024
  const [view, setView] = useState("Month");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Filters
  const [activeFilters, setActiveFilters] = useState({
    Consultations: true,
    CourtDates: true,
    Deadlines: true,
  });

  // Events State
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Deadline: Motion to Compel Discovery",
      type: "Deadline",
      date: new Date(2024, 9, 4),
      time: "17:00",
      caseName: "ACME Corp v. Globex Inc.",
      client: "ACME Corporation",
    },
    {
      id: 2,
      title: "Court: Hearing",
      type: "Court Date",
      date: new Date(2024, 9, 9),
      time: "10:00",
      caseName: "State v. Davis",
    },
    {
      id: 3,
      title: "Consultation",
      type: "Consultation",
      date: new Date(2024, 9, 14),
      time: "14:00",
      client: "Robert Johnson",
    },
    {
      id: 4,
      title: "Consultation",
      type: "Consultation",
      date: new Date(2024, 9, 14),
      time: "15:30",
      client: "Jane Smith",
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    type: "Consultation",
    caseName: "",
    client: "",
  });

  // Calculate days for the calendar grid
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentDate);

  // Helper: Get color styles based on event type
  const getEventColor = (type) => {
    switch (type) {
      case "Consultation":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 ring-emerald-500/20";
      case "Court Date":
        return "bg-rose-100 text-rose-700 border-rose-200 ring-rose-500/20";
      case "Deadline":
        return "bg-amber-100 text-amber-700 border-amber-200 ring-amber-500/20";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200 ring-blue-500/20";
    }
  };

  // Helper: Format date for input
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  // Handlers
  const handleDateClick = (day) => {
    if (!day) return;
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(clickedDate);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      date: selectedDate
        ? formatDateForInput(selectedDate)
        : formatDateForInput(new Date()),
      time: "09:00",
      type: "Consultation",
      caseName: "",
      client: "",
    });
    setShowEventModal(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: formatDateForInput(event.date),
      time: event.time,
      type: event.type,
      caseName: event.caseName || "",
      client: event.client || "",
    });
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== eventId));
      toast.success("Event deleted successfully");
    }
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    const eventData = {
      title: formData.title,
      type: formData.type,
      date: new Date(formData.date),
      time: formData.time,
      caseName: formData.caseName,
      client: formData.client,
    };

    if (editingEvent) {
      setEvents(
        events.map((e) =>
          e.id === editingEvent.id ? { ...eventData, id: e.id } : e
        )
      );
      toast.success("Event updated successfully");
    } else {
      setEvents([...events, { ...eventData, id: Date.now() }]);
      toast.success("Event created successfully");
    }
    setShowEventModal(false);
  };

  // Computed: Events for selected date
  const selectedDateEvents = selectedDate
    ? events.filter(
        (e) => e.date.toDateString() === selectedDate.toDateString()
      )
    : [];

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

        <div className="flex-1 flex overflow-hidden p-4 max-w-[1600px] mx-auto w-full relative z-10 gap-4">
          {/* Main content - Calendar Grid */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-end mb-4 flex-shrink-0 animate-fade-in-up">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                  My Schedule
                </h1>
                <p className="text-slate-500 mt-1 font-medium text-sm">
                  Manage all your appointments, court dates, and deadlines.
                </p>
              </div>
              <button
                onClick={handleCreateEvent}
                className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-2xl font-semibold transition-all shadow-xl shadow-slate-900/10 hover:scale-105 active:scale-95"
              >
                <Plus size={18} strokeWidth={2.5} />
                <span>Add Event</span>
              </button>
            </div>

            {/* Calendar Container */}
            <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-[24px] border border-white shadow-sm overflow-hidden flex flex-col relative">
              {/* Controls */}
              <div className="p-4 border-b border-slate-100 flex justify-between items-center flex-shrink-0 bg-white/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
                    <button
                      onClick={prevMonth}
                      className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextMonth}
                      className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {currentDate.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>
                  <button
                    onClick={() => {
                      setCurrentDate(new Date());
                      setSelectedDate(new Date());
                    }}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
                  >
                    Today
                  </button>
                </div>

                <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                  {["Month", "Week", "Day"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        view === v
                          ? "bg-white text-slate-900 shadow-sm scale-100"
                          : "text-slate-500 hover:text-slate-700 scale-95"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="flex-1 overflow-hidden relative">
                {view === "Month" && (
                  <div className="h-full flex flex-col">
                    <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day, i) => (
                          <div
                            key={i}
                            className="py-3 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          className="border-r border-b border-slate-100 bg-slate-50/20"
                        />
                      ))}
                      {Array.from({ length: days }).map((_, i) => {
                        const day = i + 1;
                        const date = new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day
                        );
                        const isToday =
                          new Date().toDateString() === date.toDateString();
                        const isSelected =
                          selectedDate?.toDateString() === date.toDateString();
                        const dayEvents = events.filter(
                          (e) => e.date.toDateString() === date.toDateString()
                        );

                        return (
                          <div
                            key={day}
                            onClick={() => handleDateClick(day)}
                            className={`border-r border-b border-slate-100 p-1 relative group hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col ${
                              isSelected ? "bg-blue-50/50 shadow-inner" : ""
                            }`}
                          >
                            <div
                              className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-lg mb-1 transition-all ${
                                isToday
                                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                  : isSelected
                                  ? "bg-blue-200 text-blue-800"
                                  : "text-slate-700 group-hover:bg-white group-hover:shadow-sm"
                              }`}
                            >
                              {day}
                            </div>
                            <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                              {dayEvents.map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-[9px] px-1.5 py-1 rounded-md truncate font-bold border-l-2 shadow-sm transition-transform hover:scale-105 ${getEventColor(
                                    event.type
                                  )}`}
                                >
                                  {event.title}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                      {Array.from({ length: 42 - (days + firstDay) }).map(
                        (_, i) => (
                          <div
                            key={`end-empty-${i}`}
                            className="border-r border-b border-slate-100 bg-slate-50/20 hidden lg:block"
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
                {(view === "Week" || view === "Day") && (
                  <div className="flex-1 flex items-center justify-center bg-slate-50/50">
                    <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100 animate-float">
                      <CalendarIcon
                        size={64}
                        className="mx-auto text-blue-200 mb-6"
                      />
                      <h3 className="text-xl font-bold text-slate-900">
                        Coming Soon
                      </h3>
                      <p className="text-slate-500 mt-2 font-medium">
                        We are working on the {view} view.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Filters & Details (Floating Panel) */}
          <div className="w-80 flex flex-col gap-4 h-full overflow-hidden hidden xl:flex">
            {/* Filters Card */}
            <div className="bg-white/80 backdrop-blur-xl p-5 rounded-[24px] border border-white shadow-sm flex-shrink-0">
              <h3 className="font-bold text-slate-900 mb-4 text-base flex items-center gap-2">
                <MoreHorizontal className="text-slate-400" size={18} />
                Filters
              </h3>
              <div className="space-y-3">
                {["Consultations", "Court Dates", "Deadlines"].map((filter) => (
                  <label
                    key={filter}
                    className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center border-2 transition-all ${
                        activeFilters[filter.replace(" ", "")]
                          ? "bg-slate-900 border-slate-900 scale-100"
                          : "border-slate-300 bg-white scale-90"
                      }`}
                    >
                      {activeFilters[filter.replace(" ", "")] && (
                        <CheckCircle size={12} className="text-white" />
                      )}
                    </div>
                    <span className="text-slate-700 font-bold group-hover:text-slate-900 flex-1 text-sm">
                      {filter}
                    </span>
                    <div
                      className={`w-2.5 h-2.5 rounded-full ring-4 ring-opacity-20 ${
                        filter === "Consultations"
                          ? "bg-emerald-500 ring-emerald-500"
                          : filter === "Court Dates"
                          ? "bg-rose-500 ring-rose-500"
                          : "bg-amber-500 ring-amber-500"
                      }`}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Event Details Card */}
            <div className="bg-white/80 backdrop-blur-xl p-5 rounded-[24px] border border-white shadow-sm flex-1 flex flex-col min-h-0 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h3 className="font-bold text-slate-900 text-base">
                  Event Details
                </h3>
                <span className="text-[10px] text-slate-500 font-bold px-2 py-1 bg-slate-100 rounded-full uppercase tracking-wider">
                  {selectedDate
                    ? selectedDate.toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })
                    : "Select date"}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className="animate-fade-in-up bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span
                          className={`${getEventColor(
                            event.type
                          )} text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border ring-1 ring-inset`}
                        >
                          {event.type}
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h2>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center text-slate-400">
                            <CalendarIcon size={12} />
                          </div>
                          <span className="text-xs font-bold">
                            {event.date.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center text-slate-400">
                            <Clock size={12} />
                          </div>
                          <span className="text-xs font-bold">
                            {event.time}
                          </span>
                        </div>
                        {event.caseName && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center text-slate-400">
                              <Briefcase size={12} />
                            </div>
                            <span className="text-xs font-medium line-clamp-1">
                              {event.caseName}
                            </span>
                          </div>
                        )}
                        {event.client && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center text-slate-400">
                              <User size={12} />
                            </div>
                            <span className="text-xs font-medium line-clamp-1">
                              {event.client}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 pt-3 border-t border-slate-50">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="flex-1 py-1.5 rounded-lg text-[10px] font-bold bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="flex-1 py-1.5 rounded-lg text-[10px] font-bold bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Trash size={12} /> Cancel
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 py-6">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                      <CalendarIcon
                        size={24}
                        className="opacity-20 text-slate-900"
                      />
                    </div>
                    <p className="font-bold text-slate-900 text-sm mb-0.5">
                      No Events
                    </p>
                    <p className="text-xs text-slate-400 max-w-[150px]">
                      Select a date or click 'Add Event'
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Event Modal - SAME, just keeping it here */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl p-8 animate-fade-in-up border border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900">
                {editingEvent ? "Edit Event" : "New Event"}
              </h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-900"
                  placeholder="e.g., Client Meeting"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Consultation", "Court Date", "Deadline"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                        formData.type === type
                          ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20"
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Client
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-900"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Case Ref
                  </label>
                  <input
                    type="text"
                    value={formData.caseName}
                    onChange={(e) =>
                      setFormData({ ...formData, caseName: e.target.value })
                    }
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-900"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold mt-4 transition-all shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] text-lg"
              >
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
            </form>
          </div>
        </div>
      )}
    </LawyerLayout>
  );
};

export default LawyerCalendar;
