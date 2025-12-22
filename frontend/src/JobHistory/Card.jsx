import React from "react";
import { IconBookmark,IconBookmarkFilled, IconClockHour3, IconCalendarMonth } from "@tabler/icons-react";
import { Text } from "@mantine/core";
import { Divider, useMantineTheme, Button } from "@mantine/core";
import { Link } from "react-router-dom";

const Card = (props) => {
  const theme = useMantineTheme();
  return (
    <Link
      to="/jobs"
      className="bg-mine-shaft-900 cursor-pointer  flex flex-col gap-3 rounded-xl p-4 w-80 hover:shadow-[0_0_5px_1px_yellow] !shadow-mine-shaft-600 "
    >
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center ">
          <div className="p-2 rounded-md  bg-mine-shaft-800 ">
            <img className="h-7 " src={`/Icons/${props.company}.png`} alt="" />
          </div>

          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">
              {props.company} &#x2022; {props.applicants} Applicants
            </div>
          </div>
        </div>

        {props.saved?<IconBookmarkFilled className="text-bright-sun-400 cursor-pointer" />:<IconBookmark className="text-mines-shaft-300 cursor-pointer" />}
      </div>

      <div
        className="flex gap-5 [&>div]:py-1 [&>div]:px-2 [&>div]:border [&>div]:border-mine-shaft-600 
       = [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs "
      >
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>

      <Text
        className="!text-xs text-justify text-mine-shaft-300 "
        lineClamp={3}
      >
        {props.description}
      </Text>

      <Divider size="xs" color={theme.colors.mineShaft[7]} />

      <div className="flex justify-between ">
        <div className="font-semibold text-mine-shaft-200 ">
          &#8377; {props.package}
        </div>
        <div className="flex gap-1 text-xs items-center text-mine-shaft-300">
          <IconClockHour3 stroke={1.5} className="h-5 w-5" />
          {props.applied || props.interviewing?"Applied":props.offered?"Interviewed":"Posted"}
          {props.postedDaysAgo} days ago
        </div>
      </div>
      {
        (props.offered || props.interviewing) && <Divider size="xs" color={theme.colors.mineShaft[7]} />

      }
      {
        props.offered && <div className="flex gap-2">
            <Button color={theme.colors.brightSun[4]} fullWidth variant="outline"> Accept </Button>
            <Button color={theme.colors.brightSun[4]} fullWidth variant="light"> Reject </Button>
        </div>
      }
      {
        props.interviewing && <div className="flex gap-1  text-sm items-center">
            <IconCalendarMonth className="text-bright-sun-400 w-5 h-5" stroke={1.5} />
            Sunday, 23 December &bull; <span className="text-mine-shaft-400">10:00 AM</span>
          </div>
      }
    </Link>
  );
};

export default Card;
