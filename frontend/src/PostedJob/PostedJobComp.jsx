import { useMantineTheme, Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobCard";
import { activeJobs } from "../assets/Data/PostedJob";
import { useState, useEffect } from "react";
const PostedJobComp = (props) => {
  const [activeTab, setActiveTab] = useState("ACTIVE");
  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
  }, [props.job]);

  return (
    <div className="w-1/5 mt-5">
      <div className="text-2xl font-semibold mb-5 ">Posted Jobs</div>
      <div>
        <Tabs autoContrast value={activeTab} onChange={setActiveTab} variant="pills">
          <Tabs.List className="[&_button[aria-selected='false']]:!bg-mine-shaft-900 font-medium">
            <Tabs.Tab value="ACTIVE">Active [{props.jobList
          ?.filter((job) => job?.jobStatus == "ACTIVE").length}]</Tabs.Tab>
            <Tabs.Tab value="DRAFT"> Drafts [{props.jobList
          ?.filter((job) => job?.jobStatus == "DRAFT").length}]</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>

      <div className="flex flex-col flex-wrap mt-5 gap-5">
        {props.jobList
          ?.filter((job) => job?.jobStatus == activeTab)
          .map((item, index) => (
            <PostedJobCard key={index} {...item} />
          ))}
      </div>
    </div>
  );
};

export default PostedJobComp;
