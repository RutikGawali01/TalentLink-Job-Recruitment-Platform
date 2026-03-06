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
    <div className="min-h-screen bg-white font-['poppins'] bg-[var(--blue-100)]">

      {/* ===== Page Container ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col lg:flex-row gap-10">

          {/* ===== Sidebar ===== */}
          <div className="
            w-full 
            lg:w-[28%] 
            xl:w-[25%]
            lg:sticky 
            lg:top-24 
            h-fit
          ">
            <PostedJobComp job={job} id={id} jobList={jobList} />
          </div>

          {/* ===== Main Content ===== */}
          <div className="
            w-full 
            lg:w-[72%] 
            xl:w-[75%]
          ">
            <PostedJobDesc {...job} id={id} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostedJobsPage;