  import {useState, useEffect } from 'react'
  import { IconAnchor , IconBell , IconSettings } from '@tabler/icons-react';
  import { Avatar , Indicator, Button, useMantineTheme } from '@mantine/core';
import NotifiMenu from "./NotifiMenu";
  import NavLinks from './NavLinks';
  import {useLocation} from "react-router-dom";
  import ProfileMenu from "./ProfieMenu";
  import {Link} from "react-router-dom";
  import {useSelector, useDispatch} from "react-redux";
  import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slice/ProfileSlice";

const Header = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  
 // const select = fields;
  const [addExp, setAddExp] = useState(false);

  useEffect(() => {
    // console.log(profile);
    getProfile(user?.id)
      .then((data) => {
        dispatch(setProfile(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  const location = useLocation();
  const theme = useMantineTheme();
   //const colorHex = theme.colors.brightSun[4];
  return (
    location.pathname != "/signup" && 
    location.pathname != "/login" && 
    <div className='w-full bg-mine-shaft-950 h-20 text-white flex
    justify-between px-6 items-center '>

      {/* logo */}
      <div className=' flex gap-1 items-center text-bright-sun-400'>
        <IconAnchor className='h-10 w-8 ' stroke={2.25} />
        <div className='text-3xl font-semibold'>
          Find Job
        </div>
      </div>
      
      
      {/* links */}
      {NavLinks()}

      {/* profile section */}
      <div className='flex gap-2 items-center'>

        { user ? <ProfileMenu/> : <Link to="/login">
          <Button variant='subtle' color={theme.colors.brightSun[4]} className='!border !border-mine-shaft-400' >
              Login
          </Button>
        </Link>}

        {/* <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
          <IconSettings stroke={1.5} />
        </div> */}

         {/* <div className='bg-mine-shaft-900 p-1.5 rounded-full'>
          <Indicator color={theme.colors.brightSun[4]} size={6} offset={6} processing>
              <IconBell stroke={1.5} />
          </Indicator>
          </div> */}

          {user ?<NotifiMenu /> : <></>}

      </div>
    </div>
  )
}

export default Header
