import React from "react";
import { Carousel } from "@mantine/carousel";
import {IconArrowRight , IconArrowLeft} from "@tabler/icons-react"
import { jobCategory } from "../assets/Data/Data";

const JobCategory = () => {
  return (
    <div className="mt-20 py-10 bg-[var(--blue-100)]">
      <div className="text-4xl mb-3 text-center font-semibold text-primary">
        Browse <span className="text-[var(--blue-600)]">job </span> Category
      </div>
      <div className="text-lg mb-10 mx-auto text-secondary text-center w-1/2 ">
        Explore diverse job opportunities tailored to your skills. Start your
        career journey today!
      </div>

      <Carousel slideSize="22%" slideGap="md" loop={true} 
        className="focus-visible:[&_button]:!outline-none  
            [&_button]:!bg-[var(--blue-600)] [&_button]:!border-none 
            [&_button]:hover:opacity-75 [&_button]:opacity-0
            hover:[&_button]:opacity-100   "
          nextControlIcon={<IconArrowRight className="h-8 w-8" />}
          previousControlIcon={<IconArrowLeft className="h-8 w-8 " />}
      >
        {
          jobCategory.map((category, index) => (
          <Carousel.Slide key={index}>

            <div
              className="
                flex flex-col items-center w-64 gap-3 p-5 my-5
                rounded-xl border-default bg-primary
                shadow-sm transition-all duration-300 ease-in-out
                hover:-translate-y-1 
                hover:!shadow-blue hover:!border-accent
                cursor-pointer"
            >
                {/* Icon */}
                <div className="p-3 rounded-full bg-[var(--blue-500)] hover:opacity-85 shadow-md">
                  <img
                    className="h-8 w-8"
                    src={`/Category/${category.name}.png`}
                    alt={category.name}
                  />
                </div>

                {/* Title */}
                <div className="text-xl font-semibold text-primary">
                  {category.name}
                </div>

                {/* Description */}
                <div className="text-sm text-center text-secondary leading-relaxed">
                  {category.desc}
                </div>

                {/* Jobs Count */}
                <div className="text-accent text-sm font-medium">
                  {category.jobs}+ new jobs posted
                </div>
        </div>


          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default JobCategory;
