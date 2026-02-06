import React from 'react'
import Sidebar from '../EmployerDashboard/Sidebar';
import TopBar from '../EmployerDashboard/TopBar';
import StatsCards from '../EmployerDashboard/StatsCards';
import JobsSection from '../EmployerDashboard/JobsSection';
import RecentApplications from '../EmployerDashboard/RecentApplications';

const EmployerDashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="p-6 space-y-6 overflow-y-auto">
          <StatsCards />
          <JobsSection />
          <RecentApplications />
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboardPage