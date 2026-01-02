import { useState, useRef, useEffect } from "react";
import { IconHeart, IconMapPin, IconCalendarMonth } from "@tabler/icons-react";
import {
  Text,
  Modal,
  Divider,
  Avatar,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";
import { getProfile } from "../Services/ProfileService";
import {changeAppliStatus} from "../Services/JobService";
import {successNotification, errorNotification } from "../Services/NotificationService";
import {formatInterviewTime, openBase64PDF} from "../Services/Utilities";

const TalentCards = (props) => {
  const [date, setDate] = useState(null);
  const [time , setTime] = useState(null);
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const ref = useRef(null);
  // this profile generally refers to the talents who is applying , interviewing , rejected  in posted-jobs component
  const [profile, setProfile] = useState({});
  const {id} = useParams();

  const [app, {open: openApp, close: closeApp}] = useDisclosure(false);

  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId)
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setProfile(props);
      console.log(props.interviewTime);
    }
  }, [props]);

    const handleOffer = (status)=>{
      let interview = {id, applicantId:profile?.id, applicationStatus:status};
      if(status == "INTERVIEWING"){
        const [hours, minutes] = time.split(":").map(Number);
        date?.setHours(hours, minutes);
        interview={...interview, interviewTime:date};
      }
        changeAppliStatus(interview).then((res)=>{
          if(status == "INTERVIEWING"){
              successNotification("Interview Scheduled", "Interview Scheduled Successfully");
          }else if(status == "OFFERED"){
            successNotification("Offered", "Offer had been Sent Successfully");
          }else{
            successNotification("Rejected", "applicant had been Rejected");
          }
          
          window.location.reload();
        }).then((err)=>{
          console.log(err);
          errorNotification("Error", err.response.data.errorMessage);
        })
  }

  return (
    <div className="bg-mine-shaft-900 cursor-pointer flex flex-col gap-3 rounded-xl p-4 w-96 hover:shadow-[0_0_5px_1px_yellow] !shadow-mine-shaft-600">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 rounded-full bg-mine-shaft-800">
            <Avatar
              size="lg"
              src={
                profile.picture
                  ? `data:image/jpeg;base64,${profile.picture}`
                  : "/avatar.png"
              }
              alt=""
            />
          </div>

          <div>
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300">
              {profile?.jobTitle} &#x2022; {profile?.company}
            </div>
          </div>
        </div>

        <IconHeart className="text-mine-shaft-300 cursor-pointer" />
      </div>

      {/* Skills */}
      <div className="flex gap-5 [&>div]:py-1 [&>div]:px-2 [&>div]:border [&>div]:border-mine-shaft-600 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {profile?.skills?.map((skill, index) => index < 4  &&  
          <div key={index}>{skill}</div>
        )}
      </div>

      {/* About */}
      <Text className="!text-xs text-justify text-mine-shaft-300" lineClamp={3}>
        {profile?.about}
      </Text>

      <Divider size="xs" color={theme.colors.mineShaft[7]} />
      {props.invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth className="" stroke={1.5} />
          Interview: {formatInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">
            23 LPA
          </div>
          <div className="flex gap-1 text-xs items-center text-mine-shaft-300">
            <IconMapPin stroke={1.5} className="h-5 w-5" />
            {profile.location}
          </div>
        </div>
      )}

      <Divider size="xs" color={theme.colors.mineShaft[7]} />

      {/* Actions */}
      <div className="flex [&>*]:w-1/2 [&>*]:p-2">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button
                color={theme.colors.brightSun[4]}
                fullWidth
                variant="outline"
              >
                {" "}
                Profile{" "}
              </Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  onClick={open}
                  rightSection={<IconCalendarMonth className="w-5 h-5" />}
                  color={theme.colors.brightSun[4]}
                  fullWidth
                  variant="light"
                >
                  {" "}
                  Schedule{" "}
                </Button>
              ) : (
                <Button
                  color={theme.colors.brightSun[4]}
                  fullWidth
                  variant="light"
                >
                  {" "}
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {props.invited && (
          <>
            <div>
              <Button onClick={()=> handleOffer("OFFERED")} 
              color={theme.colors.brightSun[4]} fullWidth variant="outline">                {" "}
                Accept
              </Button>
            </div>
            <div>
              <Button onClick={()=> handleOffer("REJECTED")} 
               color={theme.colors.brightSun[4]} fullWidth  variant="light">
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      { (props.invited || props.posted) &&
        <Button onClick={openApp} color={theme.colors.brightSun[4]} fullWidth autoContrast variant="filled">
           View Application 
        </Button>
      }

      {/* Modal */}
      <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
        <div className="flex flex-col gap-3">
          {/* <DateInput
            minDate={new Date()}
            value={date}
            onChange={setDate}
            label="Date"
            placeholder="Enter Date"
          /> */}
          {/* <TimeInput value = {time} onChange{(event)=> setTime(event.currentTarget.value)}
            label="Time"
            ref={ref}
            onClick={() => ref.current?.showPicker()}
          /> */}
          <Button onClick={()=> handleOffer("INTERVIEWING")} color={theme.colors.brightSun[4]} fullWidth variant="light">
            Schedule
          </Button>
        </div>
      </Modal>
            {/*  */}
      <Modal opened={app} onClose={closeApp} title="Application" centered>
        <div className="flex flex-col gap-3">
          <div>Email: &emsp; 
            <a href={`mailto:${props.email}`} className="text-bright-sun-400 text-center hover:underline cursor-pointer">
              {props.email}
            </a>
          </div>
          <div>website: &emsp; 
            <a target="_blank" href={props.website} className="text-bright-sun-400 text-center hover:underline cursor-pointer">
              {props.website}
            </a>
          </div>
          <div>Resume: &emsp; 
            <span onClick={()=>openBase64PDF(props.resume)} className="text-bright-sun-400 text-center hover:underline cursor-pointer">
              {props.name}
            </span>
          </div>
          <div>Cover Letter: &emsp; 
            <div>
              {props.coverLetter}
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default TalentCards;
