import React from 'react'
import {IconBookmark,IconBookmarkFilled, IconClockHour3} from "@tabler/icons-react";
import {Text} from "@mantine/core";
 import {Divider, useMantineTheme, Button} from "@mantine/core"
import { Link } from "react-router-dom";
import {timeAgo} from "../Services/Utilities"
import {useSelector, useDispatch} from "react-redux"
import {changeProfile} from "../Slice/ProfileSlice";

const JobCard = (props) => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const profile = useSelector((state)=>state.profile);

  const handleSaveJob = () => {
  let savedJobs = profile?.savedJobs || [];   // <-- Default empty array

  if (savedJobs.includes(props.id)) {
    savedJobs = savedJobs.filter(id => id !== props.id);
  } else {
    savedJobs = [...savedJobs, props.id];
  }

  let updatedProfile = { ...profile, savedJobs };
  dispatch(changeProfile(updatedProfile));
};


  return (
    <div  className='bg-mine-shaft-900 cursor-pointer  flex flex-col gap-3 rounded-xl p-4 w-80 hover:shadow-[0_0_5px_1px_yellow] !shadow-mine-shaft-600 '>
       <div className='flex justify-between '>
          <div className='flex gap-2 items-center '>
              <div className='p-2 rounded-md  bg-mine-shaft-800 '> 
                <img className='h-7 ' src={`/Icons/${props.company}.png`} alt="" /> 
              </div>

              <div>
                 <div className='font-semibold'>{props.jobTitle}
                  </div>
                  <div className='text-xs text-mine-shaft-300'>
                      {props.company} &#x2022; {props.applicants ? props.applicants.length:0} Applicants
                  </div>
              </div>
          </div>

          { profile.savedJobs?.includes(props.id)? 
            <IconBookmarkFilled onClick={handleSaveJob} className='text-bright-sun-400 cursor-pointer ' /> :
            <IconBookmark onClick={handleSaveJob} className='text-mines-shaft-300 cursor-pointer hover:text-bright-sun-400' />}
       </div>

       <div className='flex gap-5 [&>div]:py-1 [&>div]:px-2 [&>div]:border [&>div]:border-mine-shaft-600 
       = [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs '>
          <div>{props.experience}</div>
          <div>{props.jobType}</div>
          <div>{props.location}</div>
       </div>

      <Text className='!text-xs text-justify text-mine-shaft-300 '
      lineClamp={3} >
           {props.about}
      </Text>

      <Divider  size="xs" color={theme.colors.mineShaft[7]} />

      <div className='flex justify-between '>
          <div className='font-semibold text-mine-shaft-200 '>
               &#8377; {props.packageOffered} LPA
          </div>
          <div className='flex gap-1 text-xs items-center text-mine-shaft-300'>
              <IconClockHour3 stroke={1.5} className='h-5 w-5' /> Posted {timeAgo(props.postTime)} 
             </div>
      </div>
      <Link to={`/jobs/${props.id}`}> 
          <Button fullWidth  color={theme.colors.brightSun[4]} variant='light'  >
          View Job
        </Button>
      </Link>

    </div>
  )
}

export default JobCard
