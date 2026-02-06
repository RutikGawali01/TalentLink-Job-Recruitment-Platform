import axios from "axios"
import axiosInstance from "../Interceptor/AxiosInterceptor";
// const base_url = "http://localhost:9090/users/"
// sign up 

const registerUser = async (user)=>{
    return axiosInstance.post(`/users/register`, user)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}
const loginUser = async (login)=>{
    return axiosInstance.post(`/users/login`, login)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}
const sendOtp = async (email) => {
    return axiosInstance.post(`/users/sendOTP/${email}`)
    .then(result => result.data)
    .catch(error => {throw error;});
}

const verifyOtp= async (email, otp)=> {
    return axiosInstance.get(`/users/verifyOTP/${email}/${otp}`)
    .then(result => result.data)
    .catch(error => {throw error;});
}

const changePassword = async(email, password) => {
    return axiosInstance.post(`/users/changePassword`, {email, password})
    .then(result => result.data)
    .catch(error => {throw error;});
}

export {registerUser, loginUser, sendOtp, verifyOtp, changePassword};