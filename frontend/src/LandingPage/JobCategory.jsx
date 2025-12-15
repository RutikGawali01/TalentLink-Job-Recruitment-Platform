import React from "react";
import { Carousel } from "@mantine/carousel";
import {IconArrowRight , IconArrowLeft} from "@tabler/icons-react"
import { jobCategory } from "../assets/Data/Data";

const JobCategory = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl mb-3 text-center font-semibold text-mine-shaft-100">
        Browse <span className="text-bright-sun-400">job </span> Category
      </div>
      <div className="text-lg mb-10 mx-auto text-mine-shaft-300 text-center w-1/2 ">
        Explore diverse job opportunities tailored to your skills. Start your
        career journey today!
      </div>

      <Carousel slideSize="22%" slideGap="md" loop={true} 
      className="focus-visible:[&_button]:!outline-none
      [&_button]:!bg-bright-sun-400 [&_button]:!border-none 
      [&_button]:hover:opacity-75 [&_button]:opacity-0
      hover:[&_button]:opacity-100   "
        nextControlIcon={<IconArrowRight className="h-8 w-8" />}
        previousControlIcon={<IconArrowLeft className="h-8 w-8 " />}
      
      >
        {
          jobCategory.map((category, index) => (
          <Carousel.Slide key={index}>

            <div className="flex flex-col items-center w-64 gap-2 border border-bright-sun-400
            p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_1px_black] my-5 transition duration-300 ease-in-out ! shadow-bright-sun-400">
              <div className="p-2 bg-bright-sun-300 rounded-full ">
                <img
                  className="h-8 w-8 "
                  src={`/Category/${category.name}.png`}
                  alt={category.name}
                />
              </div>
              <div className="text-xl font-semibold text-mine-shaft-100 ">
                {category.name}
              </div>
              <div className="text-sm text-center text-mine-shaft-300 ">
                {category.desc}
              </div>
              <div className="text-bright-sun-300 text-lg ">
                {category.jobs} + new job posted
              </div>
            </div>

          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default JobCategory;
