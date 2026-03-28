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
    <div className="flex flex-col gap-4 rounded-2xl p-5 w-full bg-[var(--white)] border border-[var(--blue-100)] hover:border-[var(--blue-300)] hover:shadow-md transition-all duration-200">

      {/* ── Header ── */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="p-2.5 rounded-xl bg-[var(--blue-100)] shrink-0">
            <img className="h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>

          <div>
            <div className="font-semibold text-sm sm:text-base text-[var(--color-text-primary)]">
              {props.jobTitle}
            </div>
            <div className="text-xs text-tertiary mt-0.5">
              {props.company} • {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>

        <div className="p-1.5 rounded-lg hover:bg-[var(--blue-50)] transition-colors cursor-pointer">
          {profile?.savedJobs?.includes(props.id) ? (
            <IconBookmarkFilled
              onClick={handleSaveJob}
              size={18}
              className="text-[var(--blue-600)]"
            />
          ) : (
            <IconBookmark
              onClick={handleSaveJob}
              size={18}
              className="text-tertiary hover:text-[var(--blue-600)] transition-colors"
            />
          )}
        </div>
      </div>

      {/* ── Tags ── */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[props.experience, props.jobType, props.location].map((tag, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-full bg-[var(--blue-50)] border border-[var(--blue-200)] text-[var(--blue-600)] font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── About ── */}
      <Text className="!text-xs text-justify !text-tertiary leading-relaxed" lineClamp={3}>
        {props.about}
      </Text>

      <Divider size="xs" color="var(--blue-100)" />

      {/* ── Salary + Time ── */}
      <div className="flex justify-between items-center">
        <div className="font-bold text-sm text-[var(--blue-600)]">
          ₹ {props.packageOffered} LPA
        </div>

        <div className="flex gap-1 text-xs items-center text-tertiary">
          <IconClockHour3 stroke={1.5} className="h-3.5 w-3.5" />
          <span>
            {props.applied || props.interviewing
              ? "Applied"
              : props.offered
                ? "Interviewed"
                : "Posted"}{" "}
            {timeAgo(props.postTime)}
          </span>
        </div>
      </div>

      {/* ── Offer Actions ── */}
      {props.offered && (
        <>
          <Divider size="xs" color="var(--blue-100)" />
          <div className="flex gap-3">
            <Button color="brand" fullWidth variant="outline" radius="xl">
              Accept
            </Button>
            <Button color="brand" fullWidth variant="light" radius="xl">
              Reject
            </Button>
          </div>
        </>
      )}

      {/* ── Interview Time ── */}
      {props.interviewing && interviewTime && (
        <div className="flex gap-2 items-center px-3 py-2 rounded-xl bg-[var(--blue-50)] border border-[var(--blue-100)]">
          <IconCalendarMonth
            className="text-[var(--blue-600)] w-4 h-4 shrink-0"
            stroke={1.5}
          />
          <span className="text-xs font-medium text-[var(--blue-600)]">
            {formatInterviewTime(interviewTime)}
          </span>
        </div>
      )}

      {/* ── CTA ── */}
      <Link to={`/jobs/${props.id}`}>
        <Button fullWidth color="brand" variant="filled" radius="xl">
          View Job
        </Button>
      </Link>

    </div>
  );
};

export default Card;