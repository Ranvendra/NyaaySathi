import React from "react";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          User Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to your dashboard. Here you can find lawyers and manage your
          cases.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Find a Lawyer
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
