import React from "react";

const Privacy = () => {
  return (
    <section className="py-[80px] bg-gradient-to-b from-bg-light to-white max-md:py-[60px]">
      <div className="container-custom">
        <div className="max-w-[800px] mx-auto text-center animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-block mb-8 animate-[scaleIn_0.8s_ease-out,float_3s_ease-in-out_infinite_1s] max-md:mb-6">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-md:w-12 max-md:h-12"
            >
              <circle
                cx="32"
                cy="32"
                r="32"
                fill="url(#shield-gradient)"
                opacity="0.1"
              />
              <circle
                cx="32"
                cy="32"
                r="24"
                fill="url(#shield-gradient)"
                opacity="0.2"
              />
              <path
                d="M32 12L18 18V28C18 37 24 45 32 48C40 45 46 37 46 28V18L32 12ZM32 31H44C43.5 37.5 39.5 43 32 45.5V31H20V20L32 15.5V31Z"
                fill="url(#shield-gradient)"
              />
              <defs>
                <linearGradient
                  id="shield-gradient"
                  x1="18"
                  y1="12"
                  x2="46"
                  y2="48"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 className="text-4xl font-extrabold text-text-dark mb-6 tracking-tighter animate-[fadeInUp_0.8s_ease-out_0.2s_both] max-md:text-[28px] max-md:mb-5 max-sm:text-2xl">
            Your Privacy is Our Priority
          </h2>

          <p className="text-[17px] leading-[1.8] text-text-gray max-w-[700px] mx-auto animate-[fadeInUp_0.8s_ease-out_0.4s_both] max-md:text-base max-sm:text-[15px]">
            We are committed to protecting your sensitive information. All
            communications on our platform, from chat messages to video calls,
            are secured with end-to-end encryption. We never record or store
            your consultations, ensuring your legal matters remain completely
            confidential.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
