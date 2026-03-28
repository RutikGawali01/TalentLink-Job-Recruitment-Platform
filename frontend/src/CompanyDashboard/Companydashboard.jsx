import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";

import Sidebar from "./Sidebar";
import StatsCards from "./Statscards";
import YourJobsSection from "./Yourjobssection";
import RecruiterRequests from "./Recruiterrequests";

const PAGE_TITLES = {
  dashboard: { title: "Dashboard Overview", sub: "Welcome back, Admin 👋" },
  "post-job": { title: "Post a Job", sub: "Create a new job listing" },
  recruiter: { title: "Recruiter Requests", sub: "Review and manage requests" },
  "posted-jobs": { title: "Posted Jobs", sub: "All your job postings" },
};

function EmptyPage({ emoji, title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-blue-900 text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm max-w-xs">{desc}</p>
    </div>
  );
}

function DashboardOverview({ onNavigate }) {
  return (
    <>
      <StatsCards />
      <YourJobsSection onNavigate={onNavigate} />
      <RecruiterRequests />
    </>
  );
}

export default function CompanyDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { title, sub } = PAGE_TITLES[activeNav];

  const renderPage = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardOverview onNavigate={setActiveNav} />;
      case "post-job":
        return (
          <EmptyPage
            emoji="✏️"
            title="Post Job"
            desc="Create a new job listing here."
          />
        );
      case "recruiter":
        return <RecruiterRequests />;
      case "posted-jobs":
        return (
          <EmptyPage
            emoji="📋"
            title="Posted Jobs"
            desc="All your posted jobs will appear here."
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full bg-gradient-to-br from-sky-50 via-blue-50 to-white">

      {/* SIDEBAR */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* DASHBOARD HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 border-b bg-white">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-md bg-blue-50 border"
            >
              <IconMenu2 size={18} />
            </button>

            <div>
              <h1 className="font-bold text-blue-900 text-lg">{title}</h1>
              <p className="text-xs text-gray-500 hidden sm:block">{sub}</p>
            </div>
          </div>

          <div className="hidden sm:block text-xs font-semibold bg-blue-100 px-3 py-1 rounded-full">
            Acme Inc · Admin
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto w-full">
          {renderPage()}
        </main>

      </div>
    </div>
  );
}