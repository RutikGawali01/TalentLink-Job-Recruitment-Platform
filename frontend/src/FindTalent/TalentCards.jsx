import { useState, useRef } from "react";
import { IconHeart, IconMapPin, IconCalendarMonth } from "@tabler/icons-react";
import { Text, Modal, Divider, Avatar, useMantineTheme, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";

const TalentCards = (props) => {
  const [value, setValue] = useState(null);
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const ref = useRef(null); 

  return (
    <div className="bg-mine-shaft-900 cursor-pointer flex flex-col gap-3 rounded-xl p-4 w-96 hover:shadow-[0_0_5px_1px_yellow] !shadow-mine-shaft-600">
      
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 rounded-full bg-mine-shaft-800">
            <Avatar size="lg" src={`/${props.image}.png`} alt="" />
          </div>

          <div>
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.role} &#x2022; {props.company}
            </div>
          </div>
        </div>

        <IconHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>

      {/* Skills */}
      <div className="flex gap-5 [&>div]:py-1 [&>div]:px-2 [&>div]:border [&>div]:border-mine-shaft-600 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {props.topSkills?.map((skill, index) => (
          <div key={index}>{skill}</div>
        ))}
      </div>

      {/* About */}
      <Text className="!text-xs text-justify text-mine-shaft-300" lineClamp={3}>
        {props.about}
      </Text>

      <Divider size="xs" color={theme.colors.mineShaft[7]} />
        {
          props.invited?<div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
            <IconCalendarMonth className="" stroke={1.5} />
            Interview: December 23, 2025 10:00 AM
          </div>
          : <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          {props.expectedCtc}
        </div>
        <div className="flex gap-1 text-xs items-center text-mine-shaft-300">
          <IconMapPin stroke={1.5} className="h-5 w-5" />
          {props.location}
        </div>
      </div>
        }

      
     

      <Divider size="xs" color={theme.colors.mineShaft[7]} />

      {/* Actions */}
      <div className="flex [&>*]:w-1/2 [&>*]:p-2">
          {
            !props.invited && <>
              <Link to="/talent-profile">
                <Button color={theme.colors.brightSun[4]} fullWidth variant="outline"> Profile </Button>
              </Link>
              <div>
                {props.posted ? (
                  <Button  onClick={open}  rightSection={<IconCalendarMonth className="w-5 h-5" />}  color={theme.colors.brightSun[4]} fullWidth variant="light"> Schedule </Button>) : (
                  <Button color={theme.colors.brightSun[4]} fullWidth variant="light"> Message</Button>
                )}
              </div>
            </>
          }
          {
            props.invited && <>
              <div>
                  <Button color={theme.colors.brightSun[4]} fullWidth variant="outline"> Accept </Button>
              </div>
              <div>
                  <Button color={theme.colors.brightSun[4]} fullWidth variant="light"> Reject </Button>
              </div>
            </>
          }
        
        
      </div>

      {/* Modal */}
      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className="flex flex-col gap-3">
          {/* <DateInput
            minDate={new Date()}
            value={value}
            onChange={setValue}
            label="Date"
            placeholder="Enter Date"
          /> */}
          {/* <TimeInput
            label="Time"
            ref={ref}
            onClick={() => ref.current?.showPicker()}
          /> */}
          <Button color={theme.colors.brightSun[4]} fullWidth variant="light">
              Schedule
            </Button>

        </div>
      </Modal>
    </div>
  );
};

export default TalentCards;
