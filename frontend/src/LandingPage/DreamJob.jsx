import React from "react";
import boy from "../assets/Boy.png";
import { TextInput, Avatar } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import avatar from "/avatar.png";
import avatar1 from "/avatar1.png";
import avatar2 from "/avatar2.png";



const DreamJob = () => {
  return (
    <div className="flex  items-center px-16 bg-[var(--blue-100)] px-20 ">
      {/* left side text area */}
      <div className="flex flex-col w-[45%] gap-3 my-15 mx-5">
                  <div className="text-6xl font-semibold text-primary">
          Find Your{" "}
          <span className="bg-[linear-gradient(to_right,#2563eb,#9333ea)] bg-clip-text text-transparent">
            Dream
          </span>{" "}
          <span className="bg-[linear-gradient(to_right,#2563eb,#9333ea)] bg-clip-text text-transparent">
            Job
          </span>{" "}
          With Us
        </div>


        <div className="text-lg text-tertiary ">
          Good Life begins with a good company. start explore thousands of jobs
          in one place.
        </div>

        {/* job search box */}
        <div className="mt-5 bg-primary rounded-2xl p-6 shadow-md w-fit">
          {/* Inputs Row */}
          <div className="flex gap-6">
            
            {/* Job Title */}
            <div className="w-64 border border-[var(--border-default)] rounded-lg px-3 py-2 focus-within:border-[var(--border-accent)]">
              <TextInput
                variant="unstyled"
                label="Job Title"
                placeholder="Software Engineer"
                classNames={{
                  input: "p-0 text-gray-800",
                  label: "mb-1 text-sm font-medium text-gray-700",
                }}
              />
            </div>

            {/* Job Type */}
            <div className="w-64 border border-[var(--border-default)] rounded-lg px-3 py-2 focus-within:border-[var(--border-accent)]">
              <TextInput
                variant="unstyled"
                label="Job Type"
                placeholder="Full time"
                classNames={{
                  input: "p-0 text-gray-800",
                  label: "mb-1 text-sm font-medium text-gray-700",
                }}
              />
            </div>

          </div>

          {/* Search Button */}
          <div className="mt-6">
            <button className="flex items-center justify-center gap-2 w-full bg-[linear-gradient(to_right,#2563eb,#9333ea)]  text-white py-3 rounded-lg font-medium hover:opacity-90 transition">
              <IconSearch size={18} />
              Search Jobs
            </button>
          </div>
        </div>



      </div>

      {/* image section and cards */}
      <div className="w-[55%] flex items-center justify-center mx-5 my-15 ">
        <div className="w-[30rem] relative">
          <img src={boy} alt="boy" />
          {/* 10k+ got job card */}
          <div
            className="absolute -right-10 w-fit top-[50%]  
            border-accent border rounded-lg p-2 
            backdrop-blur-md  "
          >
            <div className="text-center font-black text-primary mb-1 text-sm">
              10K+ got job
            </div>
            <Avatar.Group>
              <Avatar src={avatar} />
              <Avatar src={avatar1} />
              <Avatar src={avatar2} />
              <Avatar>+9k</Avatar>
            </Avatar.Group>
          </div>

            {/*  */}
            <div className="absolute -left-5 w-fit top-[25%]  
                border-accent  rounded-lg p-2 
                backdrop-blur-md  flex flex-col gap-3">
                <div className="flex gap-2 items-center ">
                    <div className="w-12 h-10 p-1 bg-mine-shaft-900 rounded-lg ">
                        <img src="/Icons/Google.png" alt="" />
                    </div>
                    <div className="text-sm text-primary">
                        <div className="font-bold ">
                            Software Engineer
                        </div>
                        <div className="text-secondary text-xs
                        ">
                            New York
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 justify-around text-secondary text-xs">
                    <span>1 day ago</span>
                    <span>120 Applicants </span>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default DreamJob;
