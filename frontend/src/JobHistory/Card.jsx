import React from "react";
import { IconBookmark,IconBookmarkFilled, IconClockHour3, IconCalendarMonth } from "@tabler/icons-react";
import { Text } from "@mantine/core";
import { Divider, useMantineTheme, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import {timeAgo} from "../Services/Utilities";
import {useSelector, useDispatch} from "react-redux"
import {changeProfile} from "../Slice/ProfileSlice";


const Card = (props) => {
const dispatch = useDispatch();
const profile = useSelector((state)=>state.profile);
  const theme = useMantineTheme();
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
    <div
      className="bg-secondary border-default cursor-pointer  flex flex-col gap-3 rounded-xl p-4 w-80 hover:shadow-[0_0_5px_1px_blue]/20  "
    >
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center ">
          <div className="p-2 rounded-md  bg-[var(--blue-100)] ">
            <img className="h-7 " src={`/Icons/${props.company}.png`} alt="" />
          </div>

          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-tertiary">
              {props.company} &#x2022; {props.applicants ? props.applicants.length:0} Applicants
            </div>
          </div>
        </div>

        { profile.savedJobs?.includes(props.id)? 
                    <IconBookmarkFilled onClick={handleSaveJob} className='text-[var(--blue-600)] cursor-pointer ' /> :
                    <IconBookmark onClick={handleSaveJob} className='text-tertiary cursor-pointer hover:text-[var(--blue-600)]/20 hover:opacity-70' />}
      </div>

      <div
        className="flex gap-5 [&>div]:py-1 [&>div]:px-2 [&>div]:border [&>div]:border-[var(--blue-600)] 
       = [&>div]:text-secondary [&>div]:rounded-lg text-xs "
      >
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>

      <Text
        className="!text-xs text-justify text-tertiary "
        lineClamp={3}
      >
        {props.about}
      </Text>

      <Divider size="xs" color="" />

      <div className="flex justify-between ">
        <div className="font-semibold text-[var(--blue-600)] ">
          &#8377; {props.packageOffered} LPA
        </div>
        <div className="flex gap-1 text-xs items-center text-tertiary">
          <IconClockHour3 stroke={1.5} className="h-5 w-5" />
          {props.applied || props.interviewing?"Applied":props.offered?"Interviewed":"Posted"}
           {timeAgo(props.postTime)}
        </div>
      </div>
      {
        (props.offered || props.interviewing) && <Divider size="xs" color="gray.7" />

      }
      {
        props.offered && <div className="flex gap-2">
            <Button color="brand" fullWidth variant="outline"> Accept </Button>
            <Button color="brand" fullWidth variant="light"> Reject </Button>
        </div>
      }
      {
        props.interviewing && <div className="flex gap-1  text-sm items-center">
            <IconCalendarMonth className="text-[var(--blue-600)] w-5 h-5" stroke={1.5} />
            Sunday, 23 December &bull; <span className="text-[var(--blue-600)]">10:00 AM</span>
          </div>
      }
      <Link to={`/jobs/${props.id}`}> 
                <Button fullWidth  color="brand" variant='filled'  >
                View Job
              </Button>
            </Link>
    </div>
  );
};

export default Card;
