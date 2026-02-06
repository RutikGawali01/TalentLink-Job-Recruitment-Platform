// import axios from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";
// const base_url = "http://localhost:9090/notification/";

const getNotifications = async (id) => {
  if (!id) return Promise.resolve([]);   // ✅ stop undefined forever
  return axiosInstance.get(`/notification/get/${id}`)
    .then(res => res.data);
}


const readNotification = async (id)=>{
 return axiosInstance.get(`/notification/read/${id}`)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

export {getNotifications, readNotification};