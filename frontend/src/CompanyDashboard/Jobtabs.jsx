// JobTabs.jsx
import { useState } from "react";
import { IconMapPin, IconBriefcase, IconEye } from "@tabler/icons-react";

const JOBS = {
  active: [
    { title: "Senior Frontend Developer", location: "San Francisco, CA", exp: "5+ years",  status: "Active" },
    { title: "Product Manager",            location: "Remote",            exp: "3–5 years", status: "Active" },
  ],
  draft: [
    { title: "UX Designer",  location: "Austin, TX",  exp: "2–4 years", status: "Draft" },
    { title: "Data Analyst", location: "Chicago, IL", exp: "1–3 years", status: "Draft" },
  ],
  closed: [
    { title: "Backend Engineer",     location: "Seattle, WA", exp: "3+ years", status: "Closed" },
    { title: "Marketing Specialist", location: "Boston, MA",  exp: "2–3 years", status: "Closed" },
  ],
};

const STATUS_STYLE = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Draft:  "bg-amber-100  text-amber-700  border-amber-200",
  Closed: "bg-slate-100  text-slate-500  border-slate-200",
};

const TABS = [
  { key: "active", label: "Active Jobs" },
  { key: "draft",  label: "Draft Jobs"  },
  { key: "closed", label: "Closed Jobs" },
];

function JobCard({ job }) {
  return (
    <div className="
      group bg-gradient-to-br from-slate-50 to-blue-50/60
      border border-blue-100 rounded-2xl p-4
      hover:shadow-md hover:shadow-blue-100 hover:-translate-y-0.5
      transition-all duration-200 flex items-start justify-between gap-3
    ">
      <div className="flex-1 min-w-0">
        <h4 className="text-blue-900 font-bold text-[13.5px] leading-snug mb-2 truncate">
          {job.title}
        </h4>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
          <span className="flex items-center gap-1 text-slate-500 text-[11.5px]">
            <IconMapPin size={12} className="text-blue-400 flex-shrink-0" />
            {job.location}
          </span>
          <span className="flex items-center gap-1 text-slate-500 text-[11.5px]">
            <IconBriefcase size={12} className="text-blue-400 flex-shrink-0" />
            {job.exp}
          </span>
        </div>
        <span className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border
          ${STATUS_STYLE[job.status]}
        `}>
          {job.status}
        </span>
      </div>

      <button className="
        flex items-center gap-1.5 px-3 py-1.5 rounded-xl
        bg-blue-50 text-blue-600 border border-blue-200
        hover:bg-blue-600 hover:text-white hover:border-blue-600
        text-[11.5px] font-bold flex-shrink-0
        transition-all duration-150
      ">
        <IconEye size={13} />
        View
      </button>
    </div>
  );
}

export default function JobTabs() {
  const [active, setActive] = useState("active");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-2 mb-4 border-b border-blue-100 pb-3 overflow-x-auto scrollbar-none">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`
              flex-shrink-0 px-4 py-1.5 rounded-lg text-[12.5px] font-semibold
              transition-all duration-150 whitespace-nowrap
              ${active === key
                ? "bg-blue-700 text-white shadow-md shadow-blue-200"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"}
            `}
          >
            {label}
            <span className={`
              ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold
              ${active === key ? "bg-white/20 text-white" : "bg-blue-100 text-blue-500"}
            `}>
              {JOBS[key].length}
            </span>
          </button>
        ))}
      </div>

      {/* Job cards */}
      <div className="flex flex-col gap-3">
        {JOBS[active].map((job) => (
          <JobCard key={job.title} job={job} />
        ))}
      </div>
    </div>
  );
}