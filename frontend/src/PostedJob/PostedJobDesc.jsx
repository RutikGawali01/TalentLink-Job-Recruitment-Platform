import { Badge, useMantineTheme, Tabs } from "@mantine/core";
import JobDescr from "../JobDesc/JobDescr";
import TalentCards from "../FindTalent/TalentCards";
import { useState, useEffect } from "react";

const PostedJobDesc = (props) => {
  const theme = useMantineTheme();
  const [tab, setTab] = useState("overview");
  const [arr, setArr] = useState([]);
  
  const handleTabChange = (value) =>{
    setTab(value);
    if(value == "applicants"){
      setArr(props.applicants
                ?.filter((x) => x.applicationStatus == "APPLIED"));
    }else if(value == "invited"){
      setArr(props.applicants
                ?.filter((x) => x.applicationStatus == "INTERVIEWING"));
    }else if(value == "Offered"){
      setArr(props.applicants
                ?.filter((x) => x.applicationStatus == "OFFERED"));
    }else if(value == "Rejected"){
      setArr(props.applicants
                ?.filter((x) => x.applicationStatus == "REJECTED"));
    }
  }
  useEffect(() => {
    handleTabChange("overview");
  }, [props]);
  


  return (
  

    <div className="mt-5 w-3/4 px-5 ">
      {props.jobTitle? <>
        <div className="text-2xl font-semibold flex items-center ">
        {props.jobTitle}
        <Badge size="sm" variant="light" color={theme.colors.brightSun[4]}>
          {props.jobStatus}
        </Badge>
      </div>

      <div className="font-medium text-mine-shaft-300">{props.location}</div>
      <div>
        <Tabs value={tab} onChange={handleTabChange} variant="outline" radius="lg">
          <Tabs.List
            className="[&_button]:!text-lg font-semibold 
                    [&_button[data-active='true']]:!text-bright-sun-400 mb-5"
          >
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="applicants"> Applicants</Tabs.Tab>
            <Tabs.Tab value="invited"> Invited</Tabs.Tab>
            <Tabs.Tab value="Offered"> Offered</Tabs.Tab>
            <Tabs.Tab value="Rejected"> Rejected</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" className="[&>div]:w-full">
            <JobDescr edit={true} {...props} closed = {props.jobStatus == "CLOSED"} /> 
             
          </Tabs.Panel>
          <Tabs.Panel value="applicants">
            <div className="flex mt-10 flex-wrap gap-6 justify-around">
              {arr?.length?arr
                .map(
                  (talent, index) =>
                    index < 6 && <TalentCards key={index} {...talent} posted={true}/>
                ): <div className="text-2xl font-semibold"> No Applicants  </div> }
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="invited">
            <div className="flex mt-10 flex-wrap gap-6 justify-around">
              {arr?.length?arr
                .map(
                  (talent, index) =>
                  index < 6 && <TalentCards key={index} {...talent} invited={true} />
              ): <div className="text-2xl font-semibold"> No Invited Candidates </div>}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Offered">
            <div className="flex mt-10 flex-wrap gap-6 justify-around">
              {arr?.length?arr
                .map(
                  (talent, index) =>
                  index < 6 && <TalentCards key={index} {...talent} offered={true} />
              ): <div className="text-2xl font-semibold"> No Offered Candidates  </div>}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="Rejected">
            <div className="flex mt-10 flex-wrap gap-6 justify-around">
              {arr?.length?arr
                .map(
                  (talent, index) =>
                  index < 6 && <TalentCards key={index} {...talent} rejected ={true} />
              ): <div className="text-2xl font-semibold"> No Rejected Candidates  </div>
            }
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
      </>
      : <div className="text-2xl min-h-[70vh] font-semibold flex justify-center items-center"> No Job Selected </div>
      }
    </div>
  );
};

export default PostedJobDesc;
