import React, { useState, useEffect } from "react";

const jobCategory = [
  {
    icon: "💻",
    name: "Technology",
    desc: "Software, data, cloud, and cutting-edge tech roles for the digital age.",
    jobs: 240,
  },
  {
    icon: "🎨",
    name: "Design",
    desc: "UI/UX, brand, motion, and product design positions for creatives.",
    jobs: 89,
  },
  {
    icon: "📊",
    name: "Finance",
    desc: "Accounting, investment, fintech, and banking career opportunities.",
    jobs: 120,
  },
  {
    icon: "📣",
    name: "Marketing",
    desc: "Growth, content, SEO, and performance marketing roles.",
    jobs: 150,
  },
  {
    icon: "🏥",
    name: "Healthcare",
    desc: "Clinical, research, and health-tech positions making a real difference.",
    jobs: 98,
  },
  {
    icon: "🔧",
    name: "Engineering",
    desc: "Mechanical, civil, electrical, and systems engineering opportunities.",
    jobs: 180,
  },
  {
    icon: "🎓",
    name: "Education",
    desc: "Teaching, e-learning, curriculum design and EdTech roles.",
    jobs: 67,
  },
  {
    icon: "⚖️",
    name: "Legal",
    desc: "Corporate law, compliance, IP, and contract specialist positions.",
    jobs: 45,
  },
  {
    icon: "🚀",
    name: "Startups",
    desc: "Exciting early-stage roles with equity, impact, and rapid growth.",
    jobs: 310,
  },
  {
    icon: "🛒",
    name: "E-Commerce",
    desc: "Operations, logistics, marketplace, and retail tech roles.",
    jobs: 73,
  },
];

const JobCategoryCarousel = () => {
  const [idx, setIdx] = useState(0);

  const visible = 4;
  const total = jobCategory.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % total);
    }, 2500);

    return () => clearInterval(timer);
  }, [total]);

  const getSlides = () => {
    const slides = [];
    for (let i = 0; i < visible; i++) {
      slides.push(jobCategory[(idx + i) % total]);
    }
    return slides;
  };

  return (
    <section className="py-20 px-4 sm:px-8 lg:px-10 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-4 py-1 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4">
              Explore Categories
            </span>

            <h2 className="serif text-3xl sm:text-4xl text-slate-900 leading-tight">
              Browse <em className="text-blue-600">job</em> by category
            </h2>

            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md">
              Explore diverse opportunities tailored to your skills. Start your
              career journey today!
            </p>
          </div>
        </div>

        {/* Carousel container */}
        <div className="relative flex items-center">
          {/* Left Button */}
          <button
            onClick={() => setIdx((p) => (p - 1 + total) % total)}
            className="absolute left-0 z-10 -translate-x-1/2 w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md shadow-blue-200 hover:shadow-blue-300 transition-all"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {getSlides().map((cat, i) => (
              <div
                key={`${cat.name}-${i}`}
                className="flex flex-col items-center justify-between bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:-translate-y-2 hover:shadow-xl group min-h-[240px]"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>

                {/* Name */}
                <div className="text-lg font-bold text-slate-900 text-center mt-3">
                  {cat.name}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 text-center leading-relaxed mt-2 line-clamp-3">
                  {cat.desc}
                </p>

                {/* Jobs badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-600">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {cat.jobs}+ new jobs
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => setIdx((p) => (p + 1) % total)}
            className="absolute right-0 z-10 translate-x-1/2 w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md shadow-blue-200 hover:shadow-blue-300 transition-all"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button> 
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {jobCategory.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`rounded-full transition-all duration-300 ${
                i === idx % total
                  ? "w-6 h-2 bg-blue-600"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategoryCarousel;
