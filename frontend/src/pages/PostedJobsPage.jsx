import PostedJobComp from "../PostedJob/PostedJobComp";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJobPostedBy } from "../Services/JobService";
import { useSelector } from "react-redux";

const PostedJobsPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);

  const [jobList, setJobList] = useState([]);
  const [job, setJob] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

    window.scrollTo(0, 0);

    getJobPostedBy(user.id)
      .then((res) => {
        setJobList(res);

        if (res?.length > 0 && Number(id) === 0) {
          navigate(`/posted-jobs/${res[0].id}`);
        }

        setJob(res.find((item) => item.id == id));
      })
      .catch((err) => console.log(err));
  }, [id, user]);

  return (
    <div className="min-h-screen bg-[var(--blue-100)] font-['poppins']">

      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page heading */}
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--blue-700,#1d4ed8)]">
            Posted Jobs
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your listings, track applicants and hiring stages.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <div className="w-full lg:w-[28%] xl:w-[25%] lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-md border border-blue-100">
              <PostedJobComp job={job} id={id} jobList={jobList} />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-[72%] xl:w-[75%]">
            <div className="bg-white rounded-2xl shadow-md border border-blue-100">
              <PostedJobDesc {...job} id={id} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostedJobsPage;