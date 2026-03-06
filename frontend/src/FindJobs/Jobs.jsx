import { useState, useEffect } from "react";
import Sort from "./Sort";
import JobCard from "./JobCard";
import { resetFilter } from "../Slice/FilterSlice";
import {resetSort}  from "../Slice/SortSlice";
import { getAllJobs } from "../Services/JobService";
import { useSelector, useDispatch } from "react-redux";

const Jobs = () => {
  const dispatch = useDispatch();
  const [jobList, setJobList] = useState([{}]);

  const filter = useSelector((state) => state.filter);
  
  const sort = useSelector((state)=>state.sort);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    dispatch(resetFilter());
    dispatch(resetSort());
    getAllJobs()
      .then((res) => {
        setJobList(res.filter((job) => job.jobStatus == "ACTIVE"));
        console.log(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let filtered = jobList;

    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filtered = filtered?.filter((job) =>
        filter["Job Title"]?.some((title) =>
          job?.jobTitle?.toLowerCase().includes(title?.toLowerCase())
        )
      );
    }

    if (filter.Location && filter.Location.length > 0) {
      filtered = filtered?.filter((job) =>
        filter.Location?.some((location) =>
          job.location?.toLowerCase().includes(location?.toLowerCase())
        )
      );
    }

    if (filter.Experience && filter.Experience.length > 0) {
      filtered = filtered.filter((job) =>
        filter.Experience?.some((x) =>
          job.experience?.toLowerCase().includes(x.toLowerCase())
        )
      );
    }

    if (filter["Job Type"] && filter["Job Type"].length > 0) {
      filtered = filtered?.filter((job) =>
        filter["Job Type"]?.some((x) =>
          job?.jobType?.toLowerCase().includes(x?.toLowerCase())
        )
      );
    }

    if (filter.salary && filter.salary.length > 0) {
      filtered = filtered?.filter(
        (jobs) =>
          filter.salary[0] <= jobs.packageOffered && jobs.packageOffered <= filter.salary[1]
      );
    }

    setFilteredJobs(filtered);
  }, [filter, jobList]);


  useEffect(() => {
    if(sort == "Most Recent"){
      setJobList([...jobList].sort((a, b)=> new Date(b.postTime).getTime()-new Date(a.postTime).getTime()));
    }else if(sort == "Salary: Low to High"){
      setJobList([...jobList].sort((a, b)=>a.packageOffered-b.packageOffered));
    }else if(sort == "Salary: Hight to Low"){
      setJobList([...jobList].sort((a, b)=>b.packageOffered-a.packageOffered));
    }else{

    }
  }, [sort])
  

  return (
    <div className="p-5 ">

      <div className="mt-5 flex flex-wrap justify-between">

          <div className="text-2xl  max-[475px]:text-xl font-semibold ">Recommended Jobs</div>
            <Sort sort="job" />
        </div>

      <div className="flex mt-10 flex-wrap gap-5 ">
        {filteredJobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
