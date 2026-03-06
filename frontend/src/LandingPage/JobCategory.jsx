import React, { useRef } from "react";
import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import { jobCategory } from "../assets/Data/Data";

const JobCategory = () => {
  const autoplay = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <div className="w-full bg-[var(--blue-100)] py-16">
      {/* Heading */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary">
          Browse <span className="text-[var(--blue-600)]">job </span> Category
        </h2>
      </div>

      {/* Subheading */}
      <div className="text-sm sm:text-base md:text-lg mb-12 text-secondary text-center max-w-2xl mx-auto px-4">
        Explore diverse job opportunities tailored to your skills. Start your
        career journey today!
      </div>

      {/* Carousel */}
      <Carousel
        plugins={[autoplay.current]}
        align="start"
        loop
        slideGap="lg"
        slideSize="25%" // Default for large screens (4 cards)
        breakpoints={[
          { maxWidth: 1024, slideSize: "33.333%" }, // ≤1024px → 3 cards
          { maxWidth: 768, slideSize: "50%" }, // ≤768px → 2 cards
          { maxWidth: 640, slideSize: "100%" }, // ≤640px → 1 card
        ]}
        className="px-4 sm:px-8 lg:px-20"
      >
        {jobCategory.map((category, index) => (
          <Carousel.Slide key={index}>
            <div
              className="
                  flex flex-col items-center justify-between
                  rounded-xl max-w-[280px]
                  border border-default
                  bg-primary
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                  hover:border-accent
                  cursor-pointer
                  min-w-[200px]

                  h-[220px]           /* Mobile height */
                  sm:h-[260px]        /* Tablet */
                  lg:h-[280px]        /* Desktop */

                  p-4                 /* Mobile padding */
                  sm:p-6              /* Larger screens */
                  "
            >
              <div className="p-4 rounded-full bg-[var(--blue-500)] shadow-md">
                <img
                  className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                  src={`/Category/${category.name}.png`}
                  alt={category.name}
                />
              </div>

              <div className="text-lg font-semibold text-primary text-center">
                {category.name}
              </div>

              <div className="text-sm text-center text-secondary line-clamp-3">
                {category.desc}
              </div>

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
