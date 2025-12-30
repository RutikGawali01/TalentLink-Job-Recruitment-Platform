import {useState, useEffect} from 'react'
import Sort from "./Sort";
import JobCard from "./JobCard"
import {jobList} from "../assets/Data/JobsData";
import {getAllJobs} from "../Services/JobService";


const Jobs = () => {
  const [jobList, setJobList] = useState([{}]);
  useEffect(() => {
    getAllJobs().then((res) => {
      setJobList(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  
  return (
    <div className='p-5 '>
      <div className='flex justify-between'>
        <div className='text-2xl font-semibold '>Recommended Jobs</div>
        <div>
            <Sort />
        </div>
      </div>

      <div className='flex mt-10 flex-wrap gap-5 justify-center'>
          {
            jobList.map((job, index) => 
                < JobCard key={index} {...job}  />
            )
          }
      </div>
      

      
    </div>
  )
}

export default Jobs
