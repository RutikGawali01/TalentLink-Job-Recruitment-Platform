import React from "react";
import { work } from "../assets/Data/Data";
import { Avatar } from "@mantine/core";
import avatar1 from "/avatar1.png";

const Working = () => {
  return (
    <div className="py-16">

      {/* Heading */}
      <div className="text-center mb-4 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary">
          How it <span className="text-[var(--blue-600)]">works</span>
        </h2>
      </div>

      {/* Subheading */}
      <div className="text-sm sm:text-base md:text-lg mb-12 text-secondary text-center max-w-xl mx-auto px-4">
        Effortlessly navigate through the process and land your dream job.
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 px-6 sm:px-10 lg:px-20">

        {/* IMAGE SECTION */}
        <div className="relative flex justify-center w-full lg:w-1/2">

          <img
            className="w-[16rem] sm:w-[20rem] md:w-[24rem] lg:w-[30rem]"
            src="/Working/Girl.png"
            alt="girl"
          />

          {/* Floating Card */}
          <div
            className="
            absolute
            top-[8%]
            right-[8%]
            w-28 sm:w-32
            flex flex-col items-center
            border border-accent
            rounded-xl
            py-3 px-2
            bg-white/90
            backdrop-blur-md
            shadow-md
            "
          >
            <Avatar
              className="!h-10 !w-10 sm:!h-14 sm:!w-14"
              src={avatar1}
              alt="profile"
            />

            <div className="text-xs sm:text-sm font-semibold text-secondary text-center mt-2">
              Complete Your Profile
            </div>

            <div className="text-[10px] sm:text-xs text-[var(--blue-600)]">
              70% Completed
            </div>
          </div>
          
        </div>

        {/* STEPS SECTION */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">

          {work.map((item, index) => (
            <div
              key={index}
              className="
              flex flex-col sm:flex-row
              items-center sm:items-start
              text-center sm:text-left
              gap-4
              p-4
              rounded-lg
              bg-[var(--blue-100)]
              border border-default
              shadow-sm
              "
            >
              {/* Icon */}
              <div className="p-2.5 bg-[var(--blue-400)] rounded-full flex items-center justify-center">
                <img
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  src={`/Working/${item.name}.png`}
                  alt={item.name}
                />
              </div>

              {/* Text */}
              <div>
                <div className="text-base sm:text-xl text-primary font-semibold">
                  {item.name}
                </div>
                <div className="text-sm sm:text-base text-secondary">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Working;