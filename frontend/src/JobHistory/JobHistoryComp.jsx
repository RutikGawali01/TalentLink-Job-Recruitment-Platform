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
    <div className="px-4 sm:px-6 lg:px-12 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-xl sm:text-2xl font-semibold mb-6">
          Jobs History
        </div>

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          variant="outline"
          radius="lg"
        >
          {/* Scrollable Tabs for Mobile */}
          <Tabs.List
            className="
              overflow-x-auto
              whitespace-nowrap
              [&_button]:!text-sm sm:[&_button]:!text-lg
              font-semibold
              [&_button[data-active='true']]:!text-[var(--blue-600)]
              mb-6
            "
          >
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            {showList.length === 0 ? (
              <div className="text-gray-500 mt-10 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl px-4">
                No jobs found
              </div>
            ) : (
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-6
                "
              >
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
