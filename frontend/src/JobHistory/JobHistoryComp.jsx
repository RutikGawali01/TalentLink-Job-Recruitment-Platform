import { IconMapPin, IconBriefcase } from "@tabler/icons-react";
import { Divider, Avatar, useMantineTheme, Tabs } from "@mantine/core";
import Card from "./Card"
import {jobList} from "../assets/Data/JobsData";

const JobHistoryComp = () => {
  return (
    <div>
      <div className="text-2xl font-semibold mb-5 "> Jobs history</div>
      <Tabs defaultValue="applied" variant="outline" radius="lg">
        <Tabs.List
          className="[&_button]:!text-lg font-semibold 
                    [&_button[data-active='true']]:!text-bright-sun-400 mb-5"
        >
          <Tabs.Tab value="applied">Applied</Tabs.Tab>
          <Tabs.Tab value="saved"> Saved</Tabs.Tab>
          <Tabs.Tab value="offfered"> offfered</Tabs.Tab>
          <Tabs.Tab value="Interviewing"> Interviewing</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="applied">
          <div className="flex mt-10 flex-wrap gap-5 justify-center">
            {jobList.map((job, index) => (
              <Card key={index} {...job} applied/>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="saved">
          <div className="flex mt-10 flex-wrap gap-5 justify-center">
            {jobList.map((job, index) => (
              <Card key={index} {...job} saved />
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="offfered">
          <div className="flex mt-10 flex-wrap gap-5 justify-center">
            {jobList.map((job, index) => (
              <Card key={index} {...job} offered />
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="Interviewing">
          <div className="flex mt-10 flex-wrap gap-5 justify-center">
            {jobList.map((job, index) => (
              <Card key={index} {...job} interviewing />
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default JobHistoryComp;
