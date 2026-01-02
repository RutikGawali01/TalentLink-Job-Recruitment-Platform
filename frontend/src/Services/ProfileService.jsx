import axios from "axios";
const base_url = "http://localhost:9090/profiles/";

const getProfile = async (id)=>{
    return axios.get(`${base_url}get/${id}`)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

const updateProfile = async (profile)=>{
    return axios.put(`${base_url}update`, profile)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

const getAllProfile = async ()=>{
    return axios.get(`${base_url}getAll`)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

export {getProfile, updateProfile, getAllProfile};