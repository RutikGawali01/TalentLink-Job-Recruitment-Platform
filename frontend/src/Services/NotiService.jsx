import axios from "axios";
const base_url = "http://localhost:9090/notification/";

const getNotifications = async (id)=>{
    return axios.get(`${base_url}get/${id}`)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

const readNotification = async (id)=>{
 return axios.get(`${base_url}read/${id}`)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

export {getNotifications, readNotification};