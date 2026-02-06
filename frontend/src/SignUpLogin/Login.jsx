import { TextInput, PasswordInput, Button, Anchor, LoadingOverlay } from "@mantine/core";
import { IconAt, IconLock, IconX, IconCheck } from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"
//import {loginUser} from "../Services/UserService";
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications"
import ResetPassword from "./ResetPassword";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { successNotification, errorNotification } from "../Services/NotificationService";
import { setUser } from "../Slice/UserSlice";
import { setJwt } from "../Slice/JwtSlice";
import { loginUser } from "../Services/AuthService";
import { jwtDecode } from "jwt-decode";
import { setEmployerProfile } from "../Slice/EmployerProfileSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const form = {
    email: "",
    password: ""
  }

  const [formError, setFormError] = useState(form);
  const [data, setData] = useState(form);// stores user i/p
  const [opened, { open, close }] = useDisclosure(false);// for reset password

  const navigate = useNavigate();// re-direct

  const handleChange = (event) => {
    setFormError({ ...formError, [event.target.name]: "" })//Clears previous error for that field
    setData({ ...data, [event.target.name]: event.target.value });//Updates input value
  }

  //   const handleSubmit = () => {
  //   // let valid = true, newFormError = {};

  //   // for (let key in data) {
  //   //   newFormError[key] = loginValidation(key, data[key]);
  //   //   if (newFormError[key]) valid = false;
  //   // }

  //   // setFormError(newFormError);

  //   // if (!valid) return;

  //   // setLoading(true);

  //   // loginUser(data)
  //   //   .then(async (res) => {
  //   //     const decoded = jwtDecode(res.jwt);

  //   //     dispatch(setUser({ ...decoded, email: decoded.sub }));
  //   //     dispatch(setJwt(res.jwt));

  //   //     const { id, role } = decoded;

  //   //     try {
  //   //       // 🔥 CHECK PROFILE COMPLETION
  //   //       const response = await isProfileCompleted(id, role);
  //   //       const isCompleted = response.data.completed;

  //   //       successNotification("Login Successful", "Redirecting...");

  //   //       setTimeout(() => {
  //   //         setLoading(false);

  //   //         // 🔀 ROLE + PROFILE BASED REDIRECT
  //   //         if (role === "APPLICANT") {
  //   //           navigate(
  //   //             isCompleted
  //   //               ? "/applicant/dashboard"
  //   //               : "/applicant/profile"
  //   //           );
  //   //         } else if (role === "EMPLOYER") {
  //   //           navigate(
  //   //             isCompleted
  //   //               ? "/employer/dashboard"
  //   //               : "/employer/profile"
  //   //           );
  //   //         } else {
  //   //           navigate("/");
  //   //         }

  //   //       }, 1500);

  //   //     } catch (error) {
  //   //       setLoading(false);
  //   //       errorNotification(
  //   //         "Profile Check Failed",
  //   //         "Unable to verify profile status"
  //   //       );
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     setLoading(false);
  //   //     const errorMsg =
  //   //       err?.response?.data?.errorMessage || "Invalid credentials";
  //   //     errorNotification("Login Failed", errorMsg);
  //   //   });
  // };


  const handleSubmit = () => {
    let valid = true,
      newFormError = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }


    setFormError(newFormError); if (valid) {
      setLoading(true); // login user - returns jwt 
      loginUser(data).then((res) => { //console.log(res); 
        successNotification("Login Successful", "Redirecting to home page...");
        const decoded = jwtDecode(res.jwt); // jwt contain sub, id, role, exp //console.log(decoded); 
        dispatch(setUser({ ...decoded, email: decoded.sub }));
        setTimeout(() => {
          setLoading(false);
          dispatch(setJwt(res.jwt));  
          console.log(decoded);
          //dispatch(setEmployerProfile(decoded));
          navigate("/");
        }, 4000);
      }).catch((err) => {
        setLoading(false);
        console.log(err.response.data)
        const errorMsg = err?.response?.data?.errorMessage || "Something went wrong"; errorNotification("Login Failed", errorMsg)
      });
    }
  }
  const location = useLocation();

  return (
    location.pathname === "/applicant/login" ?

      <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "blue", type: "bars" }}
        />

        <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
          <div className="text-2xl font-semibold">Login</div>
          <TextInput onChange={handleChange} name="email" value={data.email}
            withAsterisk error={formError.email}
            leftSection={<IconAt size={16} />}
            label=" Email"
            placeholder="Your email"
          />
          <PasswordInput error={formError.password} value={data.password} name="password"
            withAsterisk onChange={handleChange} leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
          <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Login</Button>
          <div className="mx-auto">
            Don't have an account? <span onClick={() => { navigate("/applicant/signup"); setFormError(form); setData(form) }}
              className="text-[var(--blue-600)] hover:underline cursor-pointer">
              Sign up
            </span>
          </div>

          <div onClick={open} className="text-[var(--blue-600)] text-center hover:underline cursor-pointer">Forget Password?</div>

        </div>

        <ResetPassword opened={opened} close={close} />
      </>

      :

      <>
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "blue", type: "bars" }}
        />

        <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
          <div className=" text-2xl font-semibold">Create Account</div>
          <TextInput onChange={handleChange} name="email" value={data.email}
            withAsterisk error={formError.email}
            leftSection={<IconAt size={16} />}
            label=" Company Email"
            placeholder="Company email"
          />
          <PasswordInput error={formError.password} value={data.password} name="password"
            withAsterisk onChange={handleChange} leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
          <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">Login</Button>
          <div className="mx-auto">
            Don't have an account? <span onClick={() => { navigate("/employer/signup"); setFormError(form); setData(form) }}
              className="text-[var(--blue-600)] hover:underline cursor-pointer">
              Sign up
            </span>
          </div>

          <div onClick={open} className="text-[var(--blue-600)] text-center hover:underline cursor-pointer">Forget Password?</div>

        </div>

        <ResetPassword opened={opened} close={close} />
      </>

  )
}

export default Login
