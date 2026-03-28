import React from "react";

const steps = [
  {
    num: "01",
    icon: "👤",
    title: "Create Your Profile",
    desc: "Build a compelling profile that showcases your skills, experience, and what you're looking for.",
    perk: "Free forever",
  },
  {
    num: "02",
    icon: "🔍",
    title: "Discover Opportunities",
    desc: "Browse thousands of curated listings filtered by role, location, salary, and company culture.",
    perk: "100k+ listings",
  },
  {
    num: "03",
    icon: "🚀",
    title: "Apply with Confidence",
    desc: "One-click applications with your profile. Track every application in your personal dashboard.",
    perk: "Real-time updates",
  },
];

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10B981"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const Working = () => {
  return (
    <section className="py-20 px-4 sm:px-8 lg:px-10 bg-white">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-4 py-1 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">
            Simple Process
          </span>

          <h2
            className="serif text-3xl sm:text-4xl md:text-5xl text-slate-900"
            style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Get hired in <em className="text-blue-600">3 easy steps</em>
          </h2>

          <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-md mx-auto">
            From profile to offer letter — the simplest hiring experience you've ever had.
          </p>

        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {steps.map((step, i) => (

            <div
              key={i}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8 relative flex flex-col gap-4 hover:-translate-y-1 transition-all duration-200"
            >

              {/* Step Badge */}
              <div className="absolute -top-3 left-7 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full px-3 py-0.5 text-xs font-extrabold tracking-widest">
                STEP {step.num}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center text-2xl mt-2">
                {step.icon}
              </div>

              {/* Title */}
              <div className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                {step.title}
              </div>

              {/* Description */}
              <div className="text-sm text-slate-500 leading-relaxed">
                {step.desc}
              </div>

              {/* Perk */}
              <div className="flex items-center gap-2 mt-2">
                <CheckIcon />
                <span className="text-sm text-emerald-600 font-semibold">
                  {step.perk}
                </span>
              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Working;