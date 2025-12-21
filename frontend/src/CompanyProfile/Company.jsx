import { IconMapPin, IconBriefcase } from "@tabler/icons-react";
import { Divider, Avatar, useMantineTheme, Tabs } from "@mantine/core";
import {useState} from 'react';
import About from "../CompanyProfile/About"
import CompanyJobs from "../CompanyProfile/CompanyJobs";
import CompanyEmployee from "../CompanyProfile/CompanyEmployee";

const Company = () => {
  const theme = useMantineTheme();
  
  return (
    <div className="w-3/4">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <img
          className="h-36 w-36 absolute -bottom-1/4 left-5 p-2  rounded-3xl bg-mine-shaft-950 border-mine-shaft-950 border-8 "
          src="/Icons/Google.png"
          alt=""
        />
      </div>

      <div className="px-3 mt-12  ">
        <div className="text-3xl font-semibold flex justify-between ">
          {" "}
          Google
          <Avatar.Group>
            <Avatar src="avatar.png" />
            <Avatar src="avatar1.png" />
            <Avatar src="avatar2.png" />
            <Avatar>+10k</Avatar>
          </Avatar.Group>
        </div>
        <div className="text-lg flex gap-1 items-center text-mine-shaft-300 ">
          <IconMapPin className="h-5 w-5" stroke={1.5} /> Pune
        </div>
        <Divider mx="xs" my="xl" />
        <div>
            <Tabs defaultValue="about" variant="outline" radius="lg" >
                <Tabs.List className="[&_button]:!text-lg font-semibold 
                    [&_button[data-active='true']]:!text-bright-sun-400 mb-5">
                    <Tabs.Tab value="about">about</Tabs.Tab>
                    <Tabs.Tab value="jobs"> Jobs</Tabs.Tab>
                    <Tabs.Tab value="employees"> employees</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="about"> < About/> </Tabs.Panel>
                <Tabs.Panel value="jobs">< CompanyJobs /></Tabs.Panel>
                <Tabs.Panel value="employees"><CompanyEmployee/></Tabs.Panel>
            </Tabs>
        </div>
      </div>
      
    </div>
  );
};

export default Company;
