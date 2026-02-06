import { Divider, FileInput, TextInput, NumberInput, Textarea, Notification } from "@mantine/core";
import { IconPaperclip, IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { Button, useMantineTheme, rem, LoadingOverlay } from "@mantine/core";
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../Services/Utilities";

const ApplyJobComp = (props) => {
  const theme = useMantineTheme();
  const [preview, setPreiew] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [sec, setSec] = useState(5);
  const navigate = useNavigate();


  return (
    <>
      <div className="w-2/3 mx-auto ">
        <div className="flex justify-between ">
          <div className="flex gap-2 items-center ">
            <div className="p-3 rounded-lg  bg-mine-shaft-800 ">
              <img className="h-14  " src={`/Icons/${props.company}.png`} alt="" />
            </div>

            <div className="flex flex-col gap-1 ">
              <div className="font-semibold text-2xl ">{props.jobTitle} </div>
              <div className="text-lg text-mine-shaft-300">
                {props.company} &#x2022; {timeAgo(props.postTime)} &#x2022;
                {props.applicants ? props.applicants.length : 0} Applicants
              </div>
            </div>
          </div>
        </div>
        <Divider my="xl" />
        <ApplicationForm />

      </div>

      <Notification withBorder className={`!border-bright-sun-400 -translate-y-20 !fixed 
    top-0 left-[35%] z-[1001] transition duration-200 ease-in-out 
    ${submit ? "translate-y-0" : "-translate-y-20"}`}
        icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
        color="teal" title="Application Submitted!" mt="md" withCloseButton={false}>
        Redirecting to find jobs in {sec} seconds...
      </Notification>
    </>
  );
};

export default ApplyJobComp;
