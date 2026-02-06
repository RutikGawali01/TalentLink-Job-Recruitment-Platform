
import axiosInstance from "../Interceptor/AxiosInterceptor";

const postJob = async (job)=>{
    return axiosInstance.post(`/jobs/post`,job)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}
const getAllJobs = async()=>{
    return axiosInstance.get(`/jobs/getAll`)
    .then(result => result.data)
    .catch(error => {throw error;});   
}

const getJob = (id)=>{
    return axiosInstance.get(`/jobs/get/${id}`)
    .then(result => result.data)
    .catch(error => {throw error;});
}

const applyJob = async (id, applicant) =>{
    return axiosInstance.post(`/jobs/apply/${id}`, applicant)
    .then(result => result.data)
    .catch(error => {throw error;}); 

}
const getJobPostedBy= async (id)=>{
    return axiaxiosInstanceos.get(`/jobs/postedBy/${id}`)
    .then(result => result.data)
    .catch(error => {throw error});
}

// change application status
const changeAppliStatus = async (application)=>{
    return axiosInstance.post(`/jobs/changeAppliStatus`, application)
    .then(result => result.data)
    .catch(error => {throw error});
}

export {postJob, getAllJobs, getJob , applyJob, getJobPostedBy , changeAppliStatus};