import React, { useState } from "react";
import {
  User,
  Scale,
  ArrowRight,
  Loader2,
  ChevronLeft,
  CheckCircle,
  Shield,
  Briefcase,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
} from "../../utils/toast";
import { signup } from "../../services/authService";

const Signup = () => {
  const [role, setRole] = useState(null); // 'USER' or 'LAWYER'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    barCouncilId: "", // For Lawyer
    specialization: "", // For Lawyer
    experienceYears: "", // For Lawyer
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      showWarningToast("Please select a role first");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        role: role,
        ...(role === "LAWYER" && {
          lawyerProfile: {
            barCouncilId: formData.barCouncilId,
            specialization: formData.specialization
              .split(",")
              .map((s) => s.trim()),
            experienceYears: Number(formData.experienceYears),
          },
        }),
      };

      await signup(payload);
      showSuccessToast(
        `Welcome! Your ${
          role === "LAWYER" ? "Lawyer" : "User"
        } account has been created successfully`,
        { icon: "🎉", duration: 5000 }
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const sideVariants = {
    initial: { width: "50%" },
    hover: { width: "55%", transition: { duration: 0.4, ease: "easeInOut" } },
    inactive: {
      width: "45%",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {!role ? (
          <SelectionScreen key="selection" setRole={setRole} />
        ) : (
          <motion.div
            key="form"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="min-h-screen flex items-center justify-center p-4 md:p-6"
          >
            <FormScreen
              role={role}
              setRole={setRole}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SelectionScreen = ({ setRole }) => {
  const [hoveredSide, setHoveredSide] = useState(null);

  const leftClasses =
    hoveredSide === "left"
      ? "w-[55%]"
      : hoveredSide === "right"
      ? "w-[45%]"
      : "w-1/2";
  const rightClasses =
    hoveredSide === "right"
      ? "w-[55%]"
      : hoveredSide === "left"
      ? "w-[45%]"
      : "w-1/2";

  return (
    <div className="flex h-screen w-full relative">
      {/* Left Side - User */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center cursor-pointer bg-linear-to-br from-blue-50 to-white overflow-hidden group"
        initial={{ width: "50%" }}
        animate={{
          width:
            hoveredSide === "left"
              ? "60%"
              : hoveredSide === "right"
              ? "40%"
              : "50%",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => setRole("USER")}
      >
        <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

        {/* Decorative Circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="z-10 text-center space-y-6 px-10 transform group-hover:scale-105 transition-transform duration-500">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-200 blur-xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div className="bg-white p-6 rounded-2xl shadow-xl relative ring-1 ring-blue-100">
              <User size={64} className="text-blue-600" />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
              I am a User
            </h2>
            <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
              Seeking legal advice? Connect with top-tier professionals
              seamlessly.
            </p>
          </div>
          <button className="px-8 py-3 rounded-full bg-white text-blue-600 font-semibold shadow-md border border-blue-100 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            Get Started &rarr;
          </button>
        </div>
      </motion.div>

      {/* Right Side - Lawyer */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center cursor-pointer bg-slate-900 border-l border-slate-800 overflow-hidden group"
        initial={{ width: "50%" }}
        animate={{
          width:
            hoveredSide === "right"
              ? "60%"
              : hoveredSide === "left"
              ? "40%"
              : "50%",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => setRole("LAWYER")}
      >
        {/* Background Image/Pattern */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 grayscale group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"></div>
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/90 to-slate-900/50"></div>

        <div className="z-10 text-center space-y-6 px-10 transform group-hover:scale-105 transition-transform duration-500">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-amber-500 blur-xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="bg-slate-800 p-6 rounded-2xl shadow-2xl relative border border-slate-700">
              <Scale size={64} className="text-amber-500" />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              I am a Lawyer
            </h2>
            <p className="text-lg text-slate-400 max-w-md mx-auto leading-relaxed">
              Join our network. Build your practice and reach clients
              effectively.
            </p>
          </div>
          <button className="px-8 py-3 rounded-full bg-amber-500 text-slate-900 font-bold shadow-lg shadow-amber-500/20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            Join Now &rarr;
          </button>
        </div>
      </motion.div>

      {/* Center Divider Visual (Optional) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:block">
        <div className="w-px h-32 bg-gray-300/50"></div>
      </div>
    </div>
  );
};

const FormScreen = ({
  role,
  setRole,
  formData,
  handleInputChange,
  handleSubmit,
  loading,
}) => {
  const isLawyer = role === "LAWYER";

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] animate-fadeIn">
      {/* Sidebar / Visual Area */}
      <div
        className={`md:w-1/3 p-10 text-white flex flex-col justify-between relative overflow-hidden ${
          isLawyer ? "bg-slate-900" : "bg-blue-600"
        }`}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        {isLawyer && (
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        )}

        <div className="relative z-10">
          <button
            onClick={() => setRole(null)}
            className="flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity mb-8 group"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Back to Selection
          </button>

          <div className="space-y-4">
            <div
              className={`p-4 rounded-2xl w-fit ${
                isLawyer ? "bg-white/10" : "bg-blue-500/50"
              }`}
            >
              {isLawyer ? (
                <Scale size={40} className="text-amber-500" />
              ) : (
                <User size={40} className="text-white" />
              )}
            </div>
            <h1 className="text-3xl font-bold leading-tight">
              {isLawyer
                ? "Empower Your Legal Practice"
                : "Your Journey to Justice Begins Here"}
            </h1>
            <p
              className={`text-sm ${
                isLawyer ? "text-slate-400" : "text-blue-100"
              }`}
            >
              {isLawyer
                ? "Create your professional profile to verify your credentials and start connecting with clients."
                : "Create an account to access legal consultations, document management, and AI assistance."}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-12 space-y-4">
          <FeatureItem
            icon={Shield}
            text="Secure & Confidential"
            isLawyer={isLawyer}
          />
          <FeatureItem
            icon={CheckCircle}
            text="Verified Professionals"
            isLawyer={isLawyer}
          />
          <FeatureItem
            icon={Briefcase}
            text="Smart Case Management"
            isLawyer={isLawyer}
          />
        </div>
      </div>

      {/* Form Area */}
      <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-8">
            Please fill in your details to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputGroup
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
              <InputGroup
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputGroup
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
              />
              <InputGroup
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                required={false}
              />
            </div>

            {isLawyer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={18} className="text-amber-600" />
                  <span className="font-semibold text-gray-700">
                    Professional Credentials
                  </span>
                </div>

                <InputGroup
                  label="Bar Council ID"
                  name="barCouncilId"
                  type="text"
                  value={formData.barCouncilId}
                  onChange={handleInputChange}
                  placeholder="BCI/XXXX/YYYY"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputGroup
                    label="Specialization"
                    name="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="Criminal, Civil, Corporate..."
                  />
                  <InputGroup
                    label="Years of Experience"
                    name="experienceYears"
                    type="number"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    placeholder="5"
                  />
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-[1.01] hover:shadow-xl flex items-center justify-center gap-2 mt-4 
                ${
                  isLawyer
                    ? "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20"
                }`}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className={`font-semibold hover:underline ${
                isLawyer ? "text-slate-900" : "text-blue-600"
              }`}
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = true,
}) => (
  <div className="space-y-1.5 container">
    <label className="text-sm font-semibold text-gray-700 block">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200"
    />
  </div>
);

const FeatureItem = ({ icon: Icon, text, isLawyer }) => (
  <div className="flex items-center gap-3 opacity-90">
    <div
      className={`p-2 rounded-lg ${isLawyer ? "bg-white/10" : "bg-white/20"}`}
    >
      <Icon size={18} />
    </div>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default Signup;
