import React from "react";
import UserLayout from "./UserLayout";
import {
  Search,
  Bot,
  Shield,
  FileText,
  Mic,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const UserConsultation = () => {
  const mockUser = { name: "Jane Doe" };

  const recommendedLawyers = [
    {
      id: 1,
      name: "Johnathan Doe",
      specialization: "Corporate Law",
      exp: "12+",
      cases: "350+",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      id: 2,
      name: "Alicia Garcia",
      specialization: "Family Law",
      exp: "8+",
      cases: "190+",
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      id: 3,
      name: "David Chen",
      specialization: "Criminal Defense",
      exp: "15+",
      cases: "500+",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    },
  ];

  return (
    <UserLayout user={mockUser}>
      <div className="flex flex-col gap-10 font-sans">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Legal Consultation
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Secure and confidential access to expert legal advice. Choose your
            preferred way to connect.
          </p>
        </div>

        {/* Hero Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Direct Consultation */}
          <div className="group relative bg-white rounded-[40px] p-2 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 transform-gpu will-change-transform">
            <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-64 rounded-[32px] overflow-hidden mb-6 transform-gpu">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000"
                alt="Direct Consultation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-white">
                  <Search size={24} />
                </div>
              </div>
            </div>
            <div className="relative z-10 px-6 pb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Direct Consultation
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                Browse our directory of vetted lawyers. Filter by
                specialization, experience, and location to find your perfect
                match.
              </p>
              <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-slate-900/20">
                Find a Lawyer
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="group relative bg-slate-900 rounded-[40px] p-2 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 transform-gpu will-change-transform">
            <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 h-64 rounded-[32px] overflow-hidden mb-6 transform-gpu">
              <img
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000"
                alt="AI Recommendation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 will-change-transform"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-white animate-pulse">
                  <Sparkles size={24} />
                </div>
              </div>
            </div>
            <div className="relative z-10 px-6 pb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                AI-Powered Recommendation
              </h3>
              <p className="text-slate-400 font-medium leading-relaxed mb-6">
                Answer a few questions and let our advanced AI match you with
                the best lawyer for your specific case instantly.
              </p>
              <button className="w-full py-4 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40">
                Start Matching
                <Bot size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: "End-to-End Encrypted",
              desc: "Your privacy is guaranteed. No recordings, ever.",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              icon: FileText,
              title: "PDF Transcripts",
              desc: "Receive a searchable PDF transcript of your call.",
              color: "text-indigo-600",
              bg: "bg-indigo-50",
            },
            {
              icon: Mic,
              title: "Voice Assistant",
              desc: "Easily navigate and control your call with voice.",
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-[32px] p-8 text-center hover:bg-white/80 transition-all duration-200 cursor-default hover:-translate-y-1 transform-gpu"
            >
              <div
                className={`w-14 h-14 ${feature.bg} ${feature.color} mx-auto rounded-2xl flex items-center justify-center mb-4`}
              >
                <feature.icon size={28} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-slate-500 text-sm font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Find Your Lawyer Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Top Rated Lawyers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white rounded-[32px] p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-200 group hover:-translate-y-1 transform-gpu"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {lawyer.name}
                    </h3>
                    <p className="text-indigo-600 font-medium text-sm">
                      {lawyer.specialization}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                  <div className="bg-slate-50 rounded-2xl p-3">
                    <p className="font-bold text-slate-900">{lawyer.exp}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Years
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3">
                    <p className="font-bold text-slate-900">{lawyer.cases}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Cases
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3">
                    <div className="flex items-center justify-center gap-1 font-bold text-slate-900">
                      {lawyer.rating}{" "}
                      <Star
                        size={12}
                        className="text-amber-400 fill-amber-400"
                      />
                    </div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Rating
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 active:scale-95">
                    Book Consultation
                  </button>
                  <button className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all duration-200">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserConsultation;
