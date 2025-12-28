import React from "react";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="url(#blue-gradient)" />
          <path
            d="M12 14H28V16H26V28H14V16H12V14Z M16 16V26H24V16H16Z M18 18H22V20H18V18Z M18 22H22V24H18V22Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="blue-gradient"
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: "AI ChatBot",
      description:
        "Instantly get case summaries, trial time estimates, bail information, and next steps. All chats are end-to-end encrypted.",
    },
    {
      id: 2,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="url(#blue-gradient2)" />
          <path
            d="M20 12C16.69 12 14 14.69 14 18C14 21.31 16.69 24 20 24C23.31 24 26 21.31 26 18C26 14.69 23.31 12 20 12ZM20 22C17.79 22 16 20.21 16 18C16 15.79 17.79 14 20 14C22.21 14 24 15.79 24 18C24 20.21 22.21 22 20 22ZM12 28V30H28V28C28 25.34 22.66 24 20 24C17.34 24 12 25.34 12 28Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="blue-gradient2"
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: "Expert Consulting",
      description:
        "Connect with a lawyer directly or get an AI recommendation. All video calls are encrypted, never recorded, and include a PDF transcript.",
    },
    {
      id: 3,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="url(#blue-gradient3)" />
          <path
            d="M14 12H26C27.1 12 28 12.9 28 14V26C28 27.1 27.1 28 26 28H14C12.9 28 12 27.1 12 26V14C12 12.9 12.9 12 14 12ZM14 14V18H26V14H14ZM14 20V26H26V20H14ZM16 22H18V24H16V22ZM20 22H24V24H20V22Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="blue-gradient3"
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: "Personal Dashboard",
      description:
        "Track your next hearing date, manage documents, view discussion summaries, and stay updated on your case status after your consultation.",
    },
  ];

  return (
    <section className="py-[80px] bg-bg-light max-md:py-[60px]">
      <div className="container-custom">
        <div className="text-center mb-[60px] animate-[fadeInUp_0.8s_ease-out] max-md:mb-[40px]">
          <h2 className="text-[40px] font-extrabold text-text-dark mb-4 tracking-tight max-md:text-[32px] max-sm:text-[28px]">
            Core Features Designed for You
          </h2>
          <p className="text-lg text-text-gray max-w-[700px] mx-auto leading-[1.7] max-md:text-base">
            Get instant answers, connect with experts, and manage your case—all
            in one secure platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-md:gap-6 max-md:mt-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="bg-white p-10 rounded-2xl shadow-md transition-all duration-300 border border-border-color animate-[fadeInUp_0.8s_ease-out_both] relative overflow-hidden group hover:-translate-y-2 hover:shadow-xl hover:border-primary-blue max-md:p-8 max-sm:p-6"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-blue to-accent-purple scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100"></div>
              <div className="mb-6 inline-block transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
                {feature.icon}
              </div>
              <h3 className="text-[22px] font-bold text-text-dark mb-3 max-sm:text-xl">
                {feature.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-text-gray m-0 max-sm:text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
