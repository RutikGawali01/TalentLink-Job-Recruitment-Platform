import { TextInput, PasswordInput,Button, Anchor, LoadingOverlay } from "@mantine/core";
import { IconAt, IconLock, IconX , IconCheck } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import {useState} from "react"
import {loginUser} from "../Services/UserService";
import {loginValidation} from "../Services/FormValidation";
import {notifications} from "@mantine/notifications"
import ResetPassword from "./ResetPassword";
import {useDisclosure} from "@mantine/hooks";
import {useDispatch} from "react-redux";
import {successNotification, errorNotification} from "../Services/NotificationService";
import {setUser} from "../Slice/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(false);

  const form={
  email:"",
  password:""
}

  const [formError, setFormError] = useState(form);
  const [data, setData] = useState(form);
  const [opened, {open, close}] = useDisclosure(false);

  const navigate= useNavigate();
  

  const handleChange = (event)=>{
      setFormError({...formError, [event.target.name]:""})
     setData({...data, [event.target.name]:event.target.value});
  }

  const handleSubmit=()=>{
    
    let valid = true, newFormError={};
    for(let key in data){
      newFormError[key]=loginValidation(key, data[key]);
      if(newFormError[key]) valid= false;
    }
    setFormError(newFormError);

    if(valid){
      setLoading(true);
        loginUser(data).then((res)=>{
      console.log(res);
      successNotification("Login Successful", "Redirecting to home page...");
        setTimeout(()=>{
          setLoading(false);
          dispatch(setUser(res));
            navigate("/");
        }, 4000);

    }).catch((err)=>{
       setLoading(false);
      console.log(err.response.data)
      const errorMsg = err?.response?.data?.errorMessage || "Something went wrong";
      errorNotification("Login Failed",errorMsg)
    
    });
    }

    
  }

  return (
    <> 
    <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius:"sm", blur:2}} 
        loaderProps={{color:"yellow", type:"bars"}}
    />

    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className=" text-2xl font-semibold">Create Account</div>
      <TextInput  onChange={handleChange} name="email" value={data.email}
      withAsterisk error={formError.email}
        leftSection={<IconAt size={16} />}
        label=" Email"
        placeholder="Your email"
      />
      <PasswordInput error={formError.password} value={data.password} name="password"
        withAsterisk onChange={handleChange} leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
      <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Login</Button>
      <div className="mx-auto">
       Don't have an account? <span onClick={()=> {navigate("/signup"); setFormError(form); setData(form)}} 
       className="text-bright-sun-400 hover:underline cursor-pointer">
        Sign up
        </span>
      </div>

      <div onClick={open} className="text-bright-sun-400 text-center hover:underline cursor-pointer">Forget Password?</div>

    </div>

    <ResetPassword opened={opened} close={close} />
    </> 
  )
}

export default Login
