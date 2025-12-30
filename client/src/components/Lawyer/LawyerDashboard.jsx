import React from "react";

const LawyerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Lawyer Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to your workspace. Manage your profile and connect with
          clients.
        </p>
        <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          View Cases
        </button>
      </div>
    </div>
  );
};

export default LawyerDashboard;
