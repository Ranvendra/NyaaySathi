import React from "react";

const Hero = () => {
  return (
    <section className="relative pt-[140px] pb-[100px] mt-[72px] overflow-hidden">
      <div className="container-custom">
        <div className="relative z-10 max-w-[900px] mx-auto text-center bg-gradient-to-br from-[#ede9fe99] to-[#dbeafe99] px-[60px] py-[80px] rounded-[24px] shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-md border border-white/80 animate-[fadeInUp_0.8s_ease-out] max-md:p-[40px] max-md:max-w-full map-sm:p-[24px]">
          <h1 className="text-5xl font-extrabold leading-[1.2] text-text-dark mb-5 tracking-tight animate-[fadeInUp_0.8s_ease-out_0.2s_both] max-md:text-4xl max-sm:text-3xl">
            A One-Stop Platform for All Your Legal Needs
          </h1>
          <p className="text-lg leading-[1.7] text-text-gray mb-10 max-w-[700px] mx-auto animate-[fadeInUp_0.8s_ease-out_0.4s_both] max-md:text-base">
            Experience simplified legal processes with end-to-end encryption for
            complete privacy and immediate, reliable assistance.
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-[fadeInUp_0.8s_ease-out_0.6s_both] max-md:flex-col max-md:items-center">
            <button className="btn-base bg-gradient-to-br from-primary-blue to-primary-blue-dark text-white px-8 py-4 text-base rounded-[10px] shadow-[0_8px_20px_rgba(37,99,235,0.35)] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(37,99,235,0.45)] active:-translate-y-px max-md:w-full max-w-[300px]">
              Consult a Lawyer
            </button>
            <button className="btn-base bg-white text-text-dark border-2 border-border-color px-8 py-4 text-base rounded-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-bg-light hover:border-primary-blue hover:text-primary-blue hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] active:-translate-y-px max-md:w-full max-w-[300px]">
              Start ChatBot (No Login Required)
            </button>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full opacity-10 animate-[float_6s_ease-in-out_infinite] w-[400px] h-[400px] bg-gradient-to-br from-primary-blue to-accent-purple -top-[100px] -right-[100px]"></div>
        <div className="absolute rounded-full opacity-10 animate-[float_6s_ease-in-out_infinite_2s] w-[300px] h-[300px] bg-gradient-to-br from-accent-purple to-primary-blue-light -bottom-[80px] -left-[80px]"></div>
        <div className="absolute rounded-full opacity-10 animate-[float_6s_ease-in-out_infinite_4s] w-[200px] h-[200px] bg-gradient-to-br from-primary-blue-light to-primary-blue top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </section>
  );
};

export default Hero;
