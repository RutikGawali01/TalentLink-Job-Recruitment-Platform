import { IconBookmark, IconMapPin } from "@tabler/icons-react";
import { Button, useMantineTheme, ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
import { Divider } from "@mantine/core";
import { card } from "../assets/Data/JobDescData";
import { skills, desc } from "../assets/Data/JobDescData";
import DOMPurify from "dompurify";

const JobDescr = () => {
  const theme = useMantineTheme();
  const data = DOMPurify.sanitize(desc); // protect script attack
  return (
    <div className="w-2/3 ">
      <div className="flex justify-between ">
        <div className="flex gap-2 items-center ">
          <div className="p-3 rounded-lg  bg-mine-shaft-800 ">
            <img className="h-14  " src={`/Icons/Google.png`} alt="" />
          </div>

          <div className="flex flex-col gap-1 ">
            <div className="font-semibold text-2xl ">software Engineer</div>
            <div className="text-lg text-mine-shaft-300">
              Google &#x2022; 3 days ago &#x2022; 48 Applicants
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2 items-center ">
          <Link to="/apply-job">
            <Button color={theme.colors.brightSun[4]} size="sm" variant="light">
              Apply{" "}
            </Button>
          </Link>

          <IconBookmark className="text-bright-sun-400 cursor-pointer" />
        </div>
      </div>
      <Divider size="xs" my="xl" />
      <div className="flex justify-between ">
        {card.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 items-center">
            <ActionIcon
              color={theme.colors.brightSun[4]}
              className=" !h-12 !w-12 "
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              <item.icon
                className="h-4/5 w-4/5"
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
            <div className="text-sm teext-mine-shaft=300">{item.name}</div>
            <div className="font-semibold">{item.value}</div>
          </div>
        ))}
      </div>
      <Divider size="xs" my="xl" />

      <div>
        <div className="text-xl font-semibold mb-5">Required Skills:</div>
        <div className="flex gap-2 flex-wrap">
          {skills.map((skill, index) => (
            <ActionIcon
              key={index}
              p="xs"
              color={theme.colors.brightSun[4]}
              className=" !h-fit !w-fit !font-medium !text-sm "
              variant="light"
              radius="xl"
              aria-label="Settings"
            >
              {skill}
            </ActionIcon>
          ))}
        </div>
      </div>
      <Divider size="xs" my="xl" />
      <div
        className="[&_h4]:text-xl [&_h4]:my-5 [&_h4]:font-semibold  [&_h4]:text-mine-shaft-200
       [&_p]:text-justify  [&_*]:text-mine-shaft-300
          [&_li]:marker:text-bright-sun-400 [&_li]:mb-1 "
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
      <Divider size="xs" my="xl" />

      <div>
        <div className="text-xl font-semibold mb-5"> About Commpany:</div>

        <div className="flex justify-between mb-3 ">
          <div className="flex gap-2 items-center ">
            <div className="p-3 rounded-lg  bg-mine-shaft-800 ">
              <img className="h-8 " src={`/Icons/Google.png`} alt="" />
            </div>

            <div className="flex flex-col">
              <div className="font-medium text-lg ">Google</div>
              <div className=" text-mine-shaft-300">
                10k+ employees
              </div>
            </div>
          </div>
            <Link to="/company" >
              <Button
                color={theme.colors.brightSun[4]}
                variant="light"
              >
                Company Page
              </Button>
            </Link>
        </div>

        <div className="text-mine-shaft-300 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime illo iure in, corporis soluta ad, saepe a dolore modi itaque natus nesciunt eaque? Consequatur asperiores dicta provident ratione consectetur tempora culpa assumenda quas? Ipsam?
        </div>
            


      </div>


    </div>
  );
};

export default JobDescr;
