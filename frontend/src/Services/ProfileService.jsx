import axiosInstance from "../Interceptor/AxiosInterceptor";


//const base_url = "http://localhost:9090/profiles/";


const getProfile = async (id)=>{
    return axiosInstance.get(`/profiles/get/${id}`)
    .then(res=> res.data)
    .catch(error=> {throw error;}); 
}

const updateProfile = async (profile)=>{
    return axiosInstance.put(`/profiles/update`, profile)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

const getAllProfile = async ()=>{
    return axiosInstance.get(`/profiles/getAll`)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

const getProfileCompletion = async (id)=>{
     return axiosInstance.get(`/profiles/check/${id}`)
    .then(res=> res.data)
    .catch(error=> {throw error;}); 
}

export {getProfile, updateProfile, getAllProfile, getProfileCompletion};