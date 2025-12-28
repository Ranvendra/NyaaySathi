import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Privacy from "./Privacy";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-bg-light">
      <Header />
      <Hero />
      <Features />
      <Privacy />
      <Footer />
    </div>
  );
};

export default LandingPage;
