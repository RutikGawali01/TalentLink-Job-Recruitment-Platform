import React from "react";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconClockHour3,
} from "@tabler/icons-react";
import { Text } from "@mantine/core";
import { Divider, useMantineTheme, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";

const JobCard = (props) => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const profile = useSelector((state) => state.profile.data);

  const handleSaveJob = async () => {
    /* ---------- Ensure profile loaded ---------- */
    if (!profile || !profile.id) {
      // console.log("Profile not ready ❌");
      return;
    }

    const jobId = Number(props.id); // 🔥 IMPORTANT

    let savedJobs = profile.savedJobs || [];

    /* ---------- Toggle bookmark ---------- */
    if (savedJobs.includes(jobId)) {
      savedJobs = savedJobs.filter((id) => id !== jobId);
    } else {
      savedJobs = [...savedJobs, jobId];
    }

    const updatedProfile = {
      ...profile, // must contain id
      savedJobs,
    };

    //console.log("Sending profile 👉", updatedProfile);

    try {
      await dispatch(changeProfile(updatedProfile)).unwrap();
    } catch (err) {
      console.log("ERROR 👉", err);
    }
  };

  return (
    <div className="w-80 max-[640px]:w-full bg-primary cursor-pointer flex flex-col gap-3 rounded-xl p-4 hover:shadow-[0_0_5px_1px_blue] !shadow-[var(--shadow-blue)]">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center ">
          <div className="p-2 rounded-md  bg-[var(--blue-100)] ">
            <img className="h-7 " src={`/Icons/${props.company}.png`} alt="" />
          </div>

          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-secondary">
              {props.company} &#x2022;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>

        {profile?.savedJobs?.includes(Number(props.id)) ? (
          <IconBookmarkFilled
            onClick={handleSaveJob}
            className="text-[var(--blue-600)] cursor-pointer "
          />
        ) : (
          <IconBookmark
            onClick={handleSaveJob}
            className="text-secondary cursor-pointer hover:text-[var(--blue-600)]"
          />
        )}
      </div>

      <div
        className="flex gap-5 [&>div]:py-1 [&>div]:px-2 [&>div]:border [&>div]:border-accent
       = [&>div]:text-[var(--blue-600)]  [&>div]:rounded-lg text-xs "
      >
        <div className="bg-[var(--blue-100)]">{props.experience}</div>
        <div className="bg-[var(--blue-100)]">{props.jobType}</div>
        <div className="bg-[var(--blue-100)]">{props.location}</div>
      </div>

      <Text className="!text-xs text-justify text-tertiary " lineClamp={3}>
        {props.about}
      </Text>

      <Divider size="xs" color="gray.7" />

      <div className="flex justify-between ">
        <div className="font-semibold text-[var(--blue-600)]  ">
          &#8377; {props.packageOffered} LPA
        </div>
        <div className="flex gap-1 text-xs items-center text-secondary">
          <IconClockHour3 stroke={1.5} className="h-5 w-5" /> Posted{" "}
          {timeAgo(props.postTime)}
        </div>
      </div>
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brand" variant="filled">
          View Job
        </Button>
      </Link>
    </div>
  );
};

export default JobCard;
