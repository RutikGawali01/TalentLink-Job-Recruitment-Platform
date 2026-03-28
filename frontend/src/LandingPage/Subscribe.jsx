import React, { useState } from "react";

const BellIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const Subscribe = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="px-4 sm:px-8 lg:px-10 pb-20">

      <div
        className="
        max-w-6xl mx-auto
        bg-gradient-to-br from-slate-900 to-slate-800
        rounded-3xl
        p-8 sm:p-12 lg:p-16
        flex flex-col lg:flex-row
        items-center
        justify-between
        gap-10
        relative
        overflow-hidden
      "
      >

        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Left Content */}
        <div className="flex-1 max-w-lg text-center lg:text-left">

          <span className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-5">
            <BellIcon /> Job Alerts
          </span>

          <h2
            className="serif text-3xl sm:text-4xl text-white mb-3"
            style={{ fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.2 }}
          >
            Never miss a
            <br />
            <em className="text-blue-400">great opportunity</em>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Get personalized job alerts delivered to your inbox. Unsubscribe anytime.
          </p>

        </div>

        {/* Email Form */}
        <div className="w-full sm:w-[420px]">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Your Email Address
            </label>

            <input
              className="
              w-full
              bg-white/10
              border border-white/15
              rounded-xl
              px-4 py-3
              text-white
              text-sm
              outline-none
              placeholder-slate-500
              mb-4
            "
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="
              w-full
              py-3
              rounded-xl
              bg-gradient-to-r from-blue-600 to-blue-800
              text-white
              text-sm
              font-bold
              shadow-lg
              shadow-blue-900/40
              hover:shadow-blue-700/40
              transition-all
              hover:-translate-y-[1px]
            "
            >
              Get Job Alerts →
            </button>

            <p className="text-slate-500 text-xs text-center mt-3">
              No spam. Unsubscribe in one click.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Subscribe;