import React from "react";

const StatCard = ({
  title,
  value,
  subtitle,
  subtitleColor = "text-emerald-600",
  delay = 0,
}) => {
  return (
    <div
      className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-colors animate-fadeInUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-slate-600 text-sm font-medium mb-3">{title}</p>
      <h3 className="text-4xl font-bold text-slate-900 mb-3">{value}</h3>
      {subtitle && (
        <p className={`text-sm font-semibold ${subtitleColor}`}>{subtitle}</p>
      )}
    </div>
  );
};

export default StatCard;
