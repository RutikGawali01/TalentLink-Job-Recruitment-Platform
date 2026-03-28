import JobCard from "../FindJobs/JobCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllJobs } from "../Services/JobService";
import { Divider } from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";

const RecommendedJobs = (props) => {
  const { id } = useParams();
  const [jobList, setJobList] = useState([{}]);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobList(res.filter((job) => job.jobStatus == "ACTIVE"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* ── Section Header ── */}
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-[var(--blue-100)]">
          <IconBriefcase size={16} className="text-[var(--blue-600)]" />
        </div>
        <div className="text-base font-semibold text-[var(--color-text-primary)]">
          Recommended Jobs
        </div>
      </div>

      <Divider size="xs" mb="md" color="var(--blue-100)" />

      {/* ── Job Cards ── */}
      <div className="flex flex-col gap-4">
        {jobList.map(
          (job, index) =>
            index < 6 &&
            id != job.id && (
              <div
                key={index}
                className="rounded-xl border border-[var(--blue-100)] bg-primary hover:border-[var(--blue-300)] hover:shadow-sm transition-all duration-200"
              >
                <JobCard {...job} />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;