import React from 'react'
import Sidebar from '../ApplicantDashboard/Sidebar';
import TopBar from '../ApplicantDashboard/TopBar';
import StatsCards from '../ApplicantDashboard/StatsCards';
import MyApplications from '../ApplicantDashboard/MyApplications';
import SavedJobs from '../ApplicantDashboard/SavedJobs';
import RecommendedJobs from '../ApplicantDashboard/RecommendedJobs';

const ApplicantDashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="p-6 space-y-6 ">
          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MyApplications />
            <SavedJobs />
          </div>

          <RecommendedJobs />
        </main>
      </div>
    </div>
  );
};

export default ApplicantDashboardPage