import axiosInstance from "../Interceptor/AxiosInterceptor";


//const base_url = "http://localhost:9090/profiles/";


const getEmployerProfile = async (id)=>{
    return axiosInstance.get(`/employer/profile/get/${id}`)
    .then(res=> res.data)
    .catch(error=> {throw error;}); 
}

const updateProfile = async (profile)=>{
    return axiosInstance.put(`/employer/profile/update`, profile)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

const getAllProfile = async ()=>{
    return axiosInstance.get(`/employer/profile/getAll`)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

const getProfileCompletion = async (id)=>{
     return axiosInstance.get(`/employer/profile/check/${id}`)
    .then(res=> res.data)
    .catch(error=> {throw error;}); 
}

export {getEmployerProfile, updateProfile, getAllProfile, getProfileCompletion};