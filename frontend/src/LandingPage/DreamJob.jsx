import React, { useState } from "react";
import { IconSearch, IconMapPin } from "@tabler/icons-react";

const DreamJob = () => {

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="pt-16 pb-16 px-6 sm:px-10 bg-gradient-to-b from-blue-50 to-slate-50 relative overflow-hidden text-center">

      {/* Background blobs */}

      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-16 -left-24 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-3xl mx-auto">

        {/* Badge */}

        <div className="anim-fade-up flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-dot" />
            50,000+ jobs live right now
          </span>
        </div>

        {/* Heading */}

        <h1
          className="anim-fade-up anim-delay-1 serif text-5xl sm:text-6xl text-slate-900 leading-tight mb-5"
          style={{ fontWeight: 400, letterSpacing: "-0.025em" }}
        >
          Find Work That
          <br />
          <em className="text-blue-600 italic">
            Actually Excites You
          </em>
        </h1>

        {/* Subtext */}

        <p className="anim-fade-up anim-delay-2 text-lg text-slate-500 leading-relaxed max-w-xl mx-auto mb-10">
          Discover opportunities at the world’s most innovative companies
          with full salary transparency, one-click applications, and zero spam.
        </p>

        {/* Search Bar */}

        <div className="anim-fade-up anim-delay-3 flex justify-center mb-5">

          <div className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-lg border border-slate-100 max-w-2xl w-full p-2 gap-2">

            {/* Job Title */}

            <div className="flex items-center gap-2 px-4 py-2 flex-1 border-b sm:border-b-0 sm:border-r border-slate-200 w-full">

              <IconSearch size={16} className="text-slate-400" />

              <div className="flex-1 text-left">

                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                  Job Title
                </span>

                <input
                  className="w-full border-none outline-none text-sm text-slate-900 bg-transparent placeholder-slate-400"
                  placeholder="e.g. Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />

              </div>

            </div>

            {/* Location */}

            <div className="flex items-center gap-2 px-4 py-2 flex-1 w-full">

              <IconMapPin size={16} className="text-slate-400" />

              <div className="flex-1 text-left">

                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                  Location
                </span>

                <input
                  className="w-full border-none outline-none text-sm text-slate-900 bg-transparent placeholder-slate-400"
                  placeholder="City or Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

              </div>

            </div>

            {/* Button */}

            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-bold shadow-md shadow-blue-200 btn-hover transition-all w-full sm:w-auto">
              Search
            </button>

          </div>

        </div>

        {/* Popular Tags */}

        <div className="anim-fade-up anim-delay-4 flex gap-2 justify-center flex-wrap items-center mb-14">

          <span className="text-xs text-slate-400 font-medium">
            Popular:
          </span>

          {["Engineering","Design","Marketing","Remote","Startups","Finance"].map(tag => (

            <button
              key={tag}
              className="bg-white border border-slate-200 rounded-full px-4 py-1 text-xs font-medium text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              {tag}
            </button>

          ))}

        </div>

      </div>

      {/* Stats Bar */}

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl flex flex-col sm:flex-row shadow border border-slate-100 overflow-hidden">

          {[
            { num: "50K+", label: "Active Jobs", icon: "💼" },
            { num: "12K+", label: "Hiring Companies", icon: "🏢" },
            { num: "2M+", label: "Candidates Placed", icon: "🎯" },
            { num: "98%", label: "Satisfaction Rate", icon: "⭐" },
          ].map((s, i) => (

            <div
              key={i}
              className={`flex-1 text-center py-8 px-6 ${
                i < 3 ? "sm:border-r border-slate-100" : ""
              }`}
            >

              <div className="text-xl mb-1.5">
                {s.icon}
              </div>

              <div
                className="serif text-3xl text-slate-900"
                style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
              >
                {s.num}
              </div>

              <div className="text-sm text-slate-500 font-medium mt-1">
                {s.label}
              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default DreamJob;