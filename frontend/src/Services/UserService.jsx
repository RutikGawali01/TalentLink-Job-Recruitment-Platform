import axios from "axios"
const base_url = "http://localhost:9090/users/"
// sign up 
const registerUser = async (user)=>{
    return axios.post(`${base_url}register`, user)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}
const loginUser = async (login)=>{
    return axios.post(`${base_url}login`, login)
    .then(res=> res.data)
    .catch(error=> {throw error;});
    
}
const sendOtp = async (email) => {
    return axios.post(`${base_url}sendOTP/${email}`)
    .then(result => result.data)
    .catch(error => {throw error;});
}

const verifyOtp= async (email, otp)=> {
    return axios.get(`${base_url}verifyOTP/${email}/${otp}`)
    .then(result => result.data)
    .catch(error => {throw error;});
}

const changePassword = async(email, password) => {
    return axios.post(`${base_url}changePassword`, {email, password})
    .then(result => result.data)
    .catch(error => {throw error;});
}

export {registerUser, loginUser, sendOtp, verifyOtp, changePassword};