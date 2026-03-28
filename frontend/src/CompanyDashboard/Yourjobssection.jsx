// YourJobsSection.jsx
// Uses React Router's useNavigate. If not using React Router, replace with window.location.href or <a href>.
import { IconArrowRight } from "@tabler/icons-react";
import JobTabs from "./Jobtabs";

export default function YourJobsSection({ onNavigate }) {
  const handleViewAll = () => {
    // Replace with useNavigate("/posted-jobs/all") if inside a Router context
    if (onNavigate) onNavigate("posted-jobs");
  };

  return (
    <div className="bg-white border border-blue-100 rounded-2xl shadow-sm shadow-blue-50 p-5 sm:p-6 mb-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h2 className="text-blue-900 text-[17px] font-extrabold tracking-tight leading-tight">
            Your Jobs
          </h2>
          <p className="text-slate-400 text-xs font-medium mt-0.5">
            Manage your active, draft and closed listings
          </p>
        </div>
        <button
          onClick={handleViewAll}
          className="
            self-start sm:self-auto
            flex items-center gap-1.5 px-4 py-2 rounded-xl
            bg-blue-50 text-blue-700 border border-blue-200
            hover:bg-blue-700 hover:text-white hover:border-blue-700
            text-xs font-bold transition-all duration-150 flex-shrink-0
          "
        >
          View All Jobs
          <IconArrowRight size={13} />
        </button>
      </div>

      <JobTabs />
    </div>
  );
}