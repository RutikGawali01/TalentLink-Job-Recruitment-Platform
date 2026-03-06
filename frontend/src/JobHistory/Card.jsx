import React from "react";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconClockHour3,
  IconCalendarMonth,
} from "@tabler/icons-react";
import { Text, Divider, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { formatInterviewTime } from "../Services/Utilities";

const Card = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  const handleSaveJob = async () => {
    let savedJobs = profile?.savedJobs || [];

    if (savedJobs.includes(props.id)) {
      savedJobs = savedJobs.filter((id) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }

    let updatedProfile = { ...profile, savedJobs };
    await dispatch(changeProfile(updatedProfile)).unwrap();
  };

  const interviewTime = props.applicants?.[0]?.interviewTime;

  return (
    <div
      className="
        bg-secondary
        border-default
        flex flex-col gap-4
        rounded-xl
        p-4
        w-full
        hover:shadow-[0_0_5px_1px_blue]/20
        transition
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="p-2 rounded-md bg-[var(--blue-100)] shrink-0">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>

          <div>
            <div className="font-semibold text-sm sm:text-base">
              {props.jobTitle}
            </div>
            <div className="text-xs text-tertiary">
              {props.company} • {props.applicants ? props.applicants.length : 0}{" "}
              Applicants
            </div>
          </div>
        </div>

        {profile?.savedJobs?.includes(props.id) ? (
          <IconBookmarkFilled
            onClick={handleSaveJob}
            className="text-[var(--blue-600)] cursor-pointer"
          />
        ) : (
          <IconBookmark
            onClick={handleSaveJob}
            className="text-tertiary cursor-pointer hover:text-[var(--blue-600)]"
          />
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-xs">
        <div className="px-2 py-1 border border-[var(--blue-600)] rounded-lg">
          {props.experience}
        </div>
        <div className="px-2 py-1 border border-[var(--blue-600)] rounded-lg">
          {props.jobType}
        </div>
        <div className="px-2 py-1 border border-[var(--blue-600)] rounded-lg">
          {props.location}
        </div>
      </div>

      {/* About */}
      <Text className="!text-xs text-justify text-tertiary" lineClamp={3}>
        {props.about}
      </Text>

      <Divider size="xs" />

      {/* Salary + Time */}
      <div className="flex justify-between items-center text-sm">
        <div className="font-semibold text-[var(--blue-600)]">
          ₹ {props.packageOffered} LPA
        </div>

        <div className="flex gap-1 text-xs items-center text-tertiary">
          <IconClockHour3 stroke={1.5} className="h-4 w-4" />
          {props.applied || props.interviewing
            ? "Applied"
            : props.offered
              ? "Interviewed"
              : "Posted"}{" "}
          {timeAgo(props.postTime)}
        </div>
      </div>

      {props.offered && (
        <>
          <Divider size="xs" />
          <div className="flex gap-3">
            <Button color="brand" fullWidth variant="outline">
              Accept
            </Button>
            <Button color="brand" fullWidth variant="light">
              Reject
            </Button>
          </div>
        </>
      )}

      
      {props.interviewing && interviewTime && (
        <div className="flex gap-2 text-sm items-center">
          <IconCalendarMonth
            className="text-[var(--blue-600)] w-4 h-4"
            stroke={1.5}
          />

          <span className="text-[var(--blue-600)]">
            {formatInterviewTime(interviewTime)}
          </span>
        </div>
      )}

      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brand" variant="filled">
          View Job
        </Button>
      </Link>
    </div>
  );
};

export default Card;
