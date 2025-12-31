import { IconMapPin, IconBriefcase } from "@tabler/icons-react";
import { Divider, Avatar, useMantineTheme, Tabs } from "@mantine/core";
import Card from "./Card";
import { getAllJobs } from "../Services/JobService";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const JobHistoryComp = () => {
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("APPLIED");
  const [jobList, setJobList] = useState([]);
  const [showList, setShowList] = useState([]);

  useEffect(() => {

    getAllJobs()
      .then((res) => {

        setJobList(res);
        setShowList(res.filter((job)=>{
        let found = false;
        job.applicants?.forEach((applicant)=>{
          if(applicant.applicantId == user.id && applicant.applicationStatus == "APPLIED"){
            found = true;
          }
        })
        return found;
      }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value == "SAVED") {
      setShowList(jobList.filter((job) => profile.savedJobs?.includes(job.id)));
    } else {
      setShowList(jobList.filter((job)=>{
        let found = false;
        job.applicants?.forEach((applicant)=>{
          if(applicant.applicantId == user.id && applicant.applicationStatus == value){
            found = true;
          }
        })
        return found;
      }));
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-5 "> Jobs history</div>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="outline"
        radius="lg"
      >
        <Tabs.List
          className="[&_button]:!text-lg font-semibold 
                    [&_button[data-active='true']]:!text-bright-sun-400 mb-5"
        >
          <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
          <Tabs.Tab value="SAVED"> Saved</Tabs.Tab>
          <Tabs.Tab value="OFFERED"> offered</Tabs.Tab>
          <Tabs.Tab value="INTERVIEWING"> Interviewing</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={activeTab}>
          <div className="flex mt-10 flex-wrap gap-5 justify-center">
            {showList.map((job, index) => (
              <Card key={index} {...job} {...{[activeTab.toLowerCase()]:true}} />
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default JobHistoryComp;
