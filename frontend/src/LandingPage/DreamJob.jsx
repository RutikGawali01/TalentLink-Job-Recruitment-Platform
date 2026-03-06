import React from "react";
import boy from "../assets/Boy.png";
import { TextInput, Avatar } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import avatar from "/avatar.png";
import avatar1 from "/avatar1.png";
import avatar2 from "/avatar2.png";

const DreamJob = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-[var(--blue-100)] px-6 sm:px-10 lg:px-20 py-12 overflow-hidden">

      {/* ================= LEFT SECTION ================= */}
      <div className="flex flex-col w-full lg:w-[45%] gap-6 text-center lg:text-left">

        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-primary leading-tight">
          Find Your{" "}
          <span className="bg-[linear-gradient(to_right,#2563eb,#9333ea)] bg-clip-text text-transparent">
            Dream Job
          </span>{" "}
          With Us
        </div>

        <div className="text-base sm:text-lg text-tertiary max-w-md mx-auto lg:mx-0">
          Good Life begins with a good company. Start exploring thousands of jobs in one place.
        </div>

        {/* Search Box */}
        <div className="mt-4 bg-primary rounded-2xl p-4 sm:p-6 shadow-md w-full max-w-md mx-auto lg:mx-0">

          <div className="flex flex-col sm:flex-row gap-4">

            <div className="w-full sm:w-1/2 border border-[var(--border-default)] rounded-lg px-3 py-2">
              <TextInput
                variant="unstyled"
                label="Job Title"
                placeholder="Software Engineer"
                classNames={{
                  input: "p-0 text-gray-800 text-sm",
                  label: "mb-1 text-xs sm:text-sm font-medium text-gray-700",
                }}
              />
            </div>

            <div className="w-full sm:w-1/2 border border-[var(--border-default)] rounded-lg px-3 py-2">
              <TextInput
                variant="unstyled"
                label="Job Type"
                placeholder="Full time"
                classNames={{
                  input: "p-0 text-gray-800 text-sm",
                  label: "mb-1 text-xs sm:text-sm font-medium text-gray-700",
                }}
              />
            </div>

          </div>

          <div className="mt-5">
            <button className="flex items-center justify-center gap-2 w-full bg-[linear-gradient(to_right,#2563eb,#9333ea)] text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition">
              <IconSearch size={18} />
              Search Jobs
            </button>
          </div>

        </div>
      </div>

      {/* ================= IMAGE SECTION ================= */}
      <div className="w-full lg:w-[55%] flex justify-center mt-12 lg:mt-0">

        <div className="relative w-[18rem] sm:w-[22rem] md:w-[26rem] lg:w-[30rem]">

          <img src={boy} alt="boy" className="w-full h-auto object-contain" />

          {/* 10K CARD */}
          <div
            className="
            absolute
            right-[-8%]
            top-[55%]
            bg-white/90
            border border-accent
            rounded-lg
            shadow-md
            px-2 py-1.5
            sm:px-3 sm:py-2
            text-[10px]
            sm:text-xs
            w-max
            "
          >
            <div className="text-center font-semibold text-primary mb-1 whitespace-nowrap">
              10K+ got job
            </div>

            <Avatar.Group spacing="xs">
              <Avatar size="xs" src={avatar} />
              <Avatar size="xs" src={avatar1} />
              <Avatar size="xs" src={avatar2} />
              <Avatar size="xs">+9k</Avatar>
            </Avatar.Group>
          </div>

          {/* GOOGLE CARD */}
          <div
            className="
            absolute
            left-[-8%]
            top-[28%]
            bg-white
            border border-accent
            rounded-lg
            shadow-md
            p-2
            sm:p-3
            w-[8rem]  
            sm:w-[11.5rem]
            text-[8px]
            sm:text-sm
            "
          >
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 p-1 bg-mine-shaft-900 rounded-md">
                <img
                  src="/Icons/Google.png"
                  alt="Google"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="font-semibold">Software Engineer</div>
                <div className="text-secondary text-[9px] sm:text-xs">
                  New York
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-1 text-secondary text-[9px] sm:text-xs">
              <span>1 day ago</span>
              <span>120 Applicants</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default DreamJob;