import { Divider, Button } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import JobDescr from "../JobDesc/JobDescr";
import RecommendedJobs from "../JobDesc/RecommendedJobs";
import { useState, useEffect } from "react";
import { getJob } from "../Services/JobService";

const JobDescriptionPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJob(id)
      .then((res) => setJob(res))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="min-h-screen bg-primary font-['poppins'] pt-20 pb-24 px-5 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* ── Back Button ── */}
        <div className="mb-8">
          <Link to="/find-jobs">
            <Button
              leftSection={<IconArrowLeft size={16} />}
              color="brand"
              variant="subtle"
              size="sm"
              radius="xl"
              className="!font-medium !tracking-wide"
            >
              Back to Jobs
            </Button>
          </Link>
        </div>

        {/* ── Layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── Main Card ── */}
          <div className="w-full lg:w-[68%]">
            <div className="bg-[var(--white)] rounded-2xl shadow-sm border border-[var(--blue-100)] p-6 sm:p-8 md:p-10">
              {job && <JobDescr {...job} />}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="w-full lg:w-[32%] lg:sticky lg:top-24">
            <div className="bg-[var(--white)] rounded-2xl shadow-sm border border-[var(--blue-100)] p-5 sm:p-6">
              <RecommendedJobs />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDescriptionPage;