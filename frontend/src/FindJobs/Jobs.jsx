import React from 'react'
import Sort from "./Sort";
import JobCard from "./JobCard"
import {jobList} from "../assets/Data/JobsData";

const Jobs = () => {
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
