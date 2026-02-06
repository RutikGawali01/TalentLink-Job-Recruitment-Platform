import { useState, useEffect } from 'react'
import { IconAnchor, IconBell, IconSettings } from '@tabler/icons-react';
import { Avatar, Indicator, Button, useMantineTheme } from '@mantine/core';
import NotifiMenu from "./NotifiMenu";
import NavLinks from './NavLinks';
import { useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfieMenu";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slice/ProfileSlice";
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../Slice/UserSlice';
import axiosInstance from "../Interceptor/AxiosInterceptor";

import { setupResponseInterceptor } from '../Interceptor/AxiosInterceptor';
import { navigateToLogin } from "../Services/AuthService";
import NavLinksController from './NavLinksController';
import { getEmployerProfile } from '../Services/EmployerProfileService';
import { setEmployerProfile } from '../Slice/EmployerProfileSlice';
const Header = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  // const select = fields;
  const [addExp, setAddExp] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    setupResponseInterceptor(navigate);

    const token = localStorage.getItem("token");
    if (!token) return; // 👈 prevent unnecessary 401

    axiosInstance.get("/auth/me")
      .then(res => {
        dispatch(setUser(res.data));
      })
      .catch(() => {
        localStorage.removeItem("token");
      });

  }, [navigate]);




  useEffect(() => {
  if (!user || !user.profileId) return; // 🔥 guard clause

  console.log("ProfileId:", user.profileId);
  console.log("AccountType:", user.accountType);

  const fetchProfile = async () => {
    try {
      if (user.accountType === "APPLICANT") {
        const data = await getProfile(user.profileId);
        dispatch(setProfile(data));
      }

      if (user.accountType === "EMPLOYER") {
        const data = await getEmployerProfile(user.profileId);
        const updatedData = {...data, companyName: user.name};
        //console.log(data);
        //console.log(updatedData);
        dispatch(setEmployerProfile(updatedData));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  fetchProfile();
}, [user, dispatch]);



  const location = useLocation();
  const theme = useMantineTheme();
  //const colorHex = theme.colors.brightSun[4];
  return (
    location.pathname != "/applicant/signup" && location.pathname != "/employer/signup" &&
    location.pathname != "/applicant/login" && location.pathname != "/employer/login" &&
    <div className='w-full bg-secondary h-20 text-primary flex
    justify-between px-6 items-center  bg-[rgba(255, 255, 255, 0.9)]'>

      {/* logo */}
      <Link to="/" className="flex gap-1 items-center text-[var(--blue-600)]">
        <IconAnchor className="h-10 w-8"  color = 'var(--blue-600)' stroke={2.25} />
        <div className=" text-3xl font-semibold bg-[var(--gradient-primary)]">
          Find Job
        </div>
      </Link>


      {/* links */}
      {/* {NavLinks()} */}
      <NavLinksController />


      {/* profile section */}
      <div className='flex gap-2 items-center'>

        {user ? <ProfileMenu /> : <div className='flex gap-3'>
          <Link to="/applicant/login">
            <div className="inline-block p-[2px] rounded-lg bg-[var(--gradient-primary)]">
              <Button
                variant="outline"
                className="bg-primary text-primary border-0"
              >
                Login as Applicant
              </Button>
            </div>

        </Link>
        <Link to="/employer/login">
          <div className="inline-block p-[2px] rounded-lg bg-[var(--gradient-primary)]">  
          <Button variant='filled' color="var(--gradient-primary)"  className='!border !border-default' >
            Login as Employer
          </Button>
          </div>
        </Link>

        </div> 
        
        }

        {/* <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
          <IconSettings stroke={1.5} />
        </div> */}

        {/* <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
          <Indicator color={theme.colors.brightSun[4]} size={6} offset={6} processing>
              <IconBell stroke={1.5} />
          </Indicator>
          </div> */}

        {user ? <NotifiMenu /> : <></>}

      </div>
    </div>
  )
}

export default Header
