import axios from "axios"
import { removeUser } from "../Slice/UserSlice";
// const base_url = "https://job-portal-full-stack-project.onrender.com/auth/"
const base_url = 'http://localhost:9090/auth/';

const loginUser = async (login)=>{
    return axios.post(`${base_url}login`, login)
    .then(res=> res.data)
    .catch(error=> {throw error;});
}

const navigateToLogin =(navigate)=> {
    localStorage.removeItem('token');
    removeUser();
    //localStorage.removeItem('user');
    navigate("/login");
}
export {loginUser, navigateToLogin};
