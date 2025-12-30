import React, { useState } from "react";
import { User, Scale, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
      showWarningToast("Please select a role first (User or Lawyer)");
      return;
    }

    setLoading(true);

    try {
      // Prepare data based on role
      const payload = {
        ...formData,
        role: role,
        // Only include lawyerProfile if role is LAWYER
        ...(role === "LAWYER" && {
          lawyerProfile: {
            barCouncilId: formData.barCouncilId,
            specialization: formData.specialization
              .split(",")
              .map((s) => s.trim()), // Simple comma separation
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

      // Small delay to let user see the success toast
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Welcome & Role Selection */}
        <div className="md:w-1/3 bg-blue-600 p-8 text-white flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <h2 className="text-3xl font-bold mb-6 text-center relative z-10">
            Join NyaaySathi
          </h2>
          <p className="text-blue-100 text-center mb-8 relative z-10">
            Choose your role to get started
          </p>

          <div className="flex flex-col gap-6 w-full relative z-10">
            {/* User Role Button */}
            <div
              onClick={() => setRole("USER")}
              className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-300 transform 
                ${
                  role === "USER"
                    ? "bg-white text-blue-600 scale-105 shadow-lg"
                    : "bg-blue-700 text-blue-100 hover:bg-blue-800"
                }`}
            >
              <div className="p-3 bg-opacity-20 rounded-full mb-2 bg-current">
                <User size={32} />
              </div>
              <span className="font-semibold">I am a User</span>
            </div>

            {/* Lawyer Role Button */}
            <div
              onClick={() => setRole("LAWYER")}
              className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-300 transform 
                ${
                  role === "LAWYER"
                    ? "bg-white text-blue-600 scale-105 shadow-lg"
                    : "bg-blue-700 text-blue-100 hover:bg-blue-800"
                }`}
            >
              <div className="p-3 bg-opacity-20 rounded-full mb-2 bg-current">
                <Scale size={32} />
              </div>
              <span className="font-semibold">I am a Lawyer</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-2/3 p-8 md:p-12">
          {role ? (
            <>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Create your {role === "USER" ? "User" : "Lawyer"} Account
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {role === "LAWYER" && (
                  <div className="border-t border-gray-100 pt-4 mt-4 animate-fadeIn">
                    <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                      Professional Info
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="text"
                        name="barCouncilId"
                        placeholder="Bar Council ID"
                        value={formData.barCouncilId}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="specialization"
                          placeholder="Specialization (comma separated)"
                          value={formData.specialization}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                        <input
                          type="number"
                          name="experienceYears"
                          placeholder="Years of Experience"
                          value={formData.experienceYears}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-6"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Sign Up <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <User size={48} className="text-gray-400" />
              </div>
              <p className="text-xl text-gray-500">
                Select your role from the left to continue
              </p>
            </div>
          )}

          <div className="mt-8 text-center text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
