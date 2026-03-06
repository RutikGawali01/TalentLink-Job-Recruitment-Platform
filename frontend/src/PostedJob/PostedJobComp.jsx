import { Tabs } from "@mantine/core";
import PostedJobCard from "./PostedJobCard";
import { useState, useEffect } from "react";

const PostedJobComp = (props) => {
  const [activeTab, setActiveTab] = useState("ACTIVE");

  useEffect(() => {
    setActiveTab(props.job?.jobStatus || "ACTIVE");
  }, [props.job]);

  return (
    <div>
      <div className="text-xl sm:text-2xl font-semibold mb-6">
        Posted Jobs
      </div>

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="pills"
      >
        <Tabs.List className="overflow-x-auto whitespace-nowrap font-medium mb-6">
          <Tabs.Tab value="ACTIVE">
            Active [
            {props.jobList?.filter((j) => j.jobStatus == "ACTIVE").length}
            ]
          </Tabs.Tab>

          <Tabs.Tab value="DRAFT">
            Drafts [
            {props.jobList?.filter((j) => j.jobStatus == "DRAFT").length}
            ]
          </Tabs.Tab>

          <Tabs.Tab value="CLOSED">
            Closed [
            {props.jobList?.filter((j) => j.jobStatus == "CLOSED").length}
            ]
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <div className="flex flex-col gap-4">
        {props.jobList
          ?.filter((job) => job.jobStatus == activeTab)
          .map((item) => (
            <PostedJobCard key={item.id} {...item} />
          ))}
      </div>
    </div>
  );
};

export default PostedJobComp;