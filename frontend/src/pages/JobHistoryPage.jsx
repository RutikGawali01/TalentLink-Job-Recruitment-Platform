import JobHistoryComp from "../JobHistory/JobHistoryComp";

const JobHistoryPage = () => {
  return (
    <div className="min-h-screen bg-primary font-['poppins'] pt-16 pb-24 px-5 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <JobHistoryComp />
      </div>
    </div>
  );
};

export default JobHistoryPage;