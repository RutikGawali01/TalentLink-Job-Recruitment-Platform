import PostedJobComp from "../PostedJob/PostedJobComp";
import PostedJobDesc from "../PostedJob/PostedJobDesc";
import {useParams, useNavigate} from "react-router-dom"
import {useState, useEffect} from "react";
import {getJobPostedBy} from "../Services/JobService";
import {useSelector} from "react-redux";

const PostedJobsPage = () => {
  const {id} = useParams();
  const user = useSelector((state)=> state.user);
  const [jobList, setJobList] = useState([]);
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    getJobPostedBy(user.id).then((res)=>{
      setJobList(res);
      if(res && res.length>0 && Number(id) == 0) navigate(`/posted-jobs/${res[0].id}`)
      setJob(res.find((item)=>item.id == id));
    }).catch((err)=>{
      console.log(err);
    })

  }, [id])
  

  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <div className="flex gap-5">
            <PostedJobComp job={job} jobList ={jobList}/>
            <PostedJobDesc {...job} />
      </div>
    </div>
  )
}

export default PostedJobsPage
