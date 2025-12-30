import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./components/LandingPage/LandingPage";
import Signup from "./components/LandingPage/Signup";
import Login from "./components/LandingPage/Login";
import UserDashboard from "./components/User/UserDashboard";
import LawyerDashboard from "./components/Lawyer/LawyerDashboard";

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#1f2937",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            fontWeight: "500",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
