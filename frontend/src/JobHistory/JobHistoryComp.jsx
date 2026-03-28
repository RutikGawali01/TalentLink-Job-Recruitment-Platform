import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllJobs } from "../Slice/JobSlice";

const JobHistoryComp = () => {
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.jobs.data);
  const profile = useSelector((state) => state.profile.data);
  const user = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("APPLIED");
  const [showList, setShowList] = useState([]);

  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      dispatch(fetchAllJobs());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      setShowList([]);
      return;
    }

    if (activeTab === "SAVED") {
      const saved = jobs.filter((job) =>
        profile?.savedJobs?.includes(Number(job?.id)),
      );
      setShowList(saved);
      return;
    }

    const filtered = jobs.filter((job) =>
      job.applicants?.some(
        (applicant) =>
          Number(applicant.userId) === Number(user?.id) &&
          applicant.applicationStatus === activeTab,
      ),
    );

    setShowList(filtered);
  }, [jobs, activeTab, profile, user]);

  return (
    <div className="py-6">

      {/* ── Page Header ── */}
      <div className="mb-8">
        <div className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
          Job History
        </div>
        <div className="text-sm text-secondary mt-1">
          Track your applications, interviews and saved jobs
        </div>
      </div>

      {/* ── Tabs Container ── */}
      <div className="bg-[var(--white)] rounded-2xl border border-[var(--blue-100)] shadow-sm p-5 sm:p-7">
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          variant="outline"
          radius="lg"
        >
          <Tabs.List
            className="
              overflow-x-auto
              whitespace-nowrap
              [&_button]:!text-sm
              sm:[&_button]:!text-base
              [&_button]:!font-semibold
              [&_button]:!text-secondary
              [&_button]:!px-5
              [&_button]:!py-2.5
              [&_button]:!rounded-xl
              [&_button:hover]:!bg-[var(--blue-50)]
              [&_button[data-active]]:!text-[var(--blue-600)]
              [&_button[data-active]]:!border-[var(--blue-600)]
              [&_button[data-active]]:!bg-[var(--blue-50)]
              mb-7
              gap-1
            "
          >
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            {showList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <div className="p-5 rounded-full bg-[var(--blue-50)] border border-[var(--blue-100)]">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--blue-300)" strokeWidth="1.5">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                    <rect x="9" y="3" width="6" height="4" rx="1"/>
                  </svg>
                </div>
                <div className="text-secondary font-medium text-base sm:text-lg">
                  No jobs found
                </div>
                <div className="text-xs text-tertiary">
                  Nothing here yet for this category
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {showList.map((job) => (
                  <Card
                    key={job.id}
                    {...job}
                    {...{ [activeTab.toLowerCase()]: true }}
                  />
                ))}
              </div>
            )}
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default JobHistoryComp;