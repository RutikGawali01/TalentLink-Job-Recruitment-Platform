import axios from "axios";
const base_url = "http://localhost:9090/jobs/";

const postJob = async (job)=>{
    return axios.post(`${base_url}post`,job)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}
const getAllJobs = async()=>{
    return axios.get(`${base_url}getAll`)
    .then(result => result.data)
    .catch(error => {throw error;});   
}

const getJob = (id)=>{
    return axios.get(`${base_url}get/${id}`)
    .then(result => result.data)
    .catch(error => {throw error;});
}

export {postJob, getAllJobs, getJob  };