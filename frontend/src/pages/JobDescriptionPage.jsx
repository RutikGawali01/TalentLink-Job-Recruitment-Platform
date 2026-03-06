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
    <div className="min-h-screen bg-primary font-['poppins'] py-16 px-14 sm:px-6 lg:px-14">

      {/* ====== Container ====== */}
      <div className="max-w-7xl mx-auto">

        {/* ====== Back Button ====== */}
        <div className="mb-6">
          <Link to="/find-jobs">
            <Button
              leftSection={<IconArrowLeft size={18} />}
              color="brand"
              variant="light"
            >
              Back
            </Button>
          </Link>
        </div>

        {/* ====== Layout Section ====== */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ====== Main Job Description ====== */}
          <div className="w-full lg:w-[70%] mb-12">
            {job && <JobDescr {...job} />}
          </div>

          {/* ====== Sidebar (Recommended Jobs) ====== */}
          <div className="w-full lg:w-[30%]">
            <RecommendedJobs />
          </div>

        </div>

      </div>
    </div>
  );
};

export default JobDescriptionPage;