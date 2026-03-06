import React from "react";
import Marquee from "react-fast-marquee";
import { companies } from "../assets/Data/Data";

const CompaniesPage = () => {
  return (
    <div className="py-12 sm:py-16 bg-primary">

      {/* Heading */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary">
          Trusted by{" "}
          <span className="text-[var(--blue-600)]">1000+</span> companies
        </h2>
      </div>

      {/* Marquee */}
      <Marquee
        pauseOnHover={true}
        speed={40}
        gradient={false}
      >
        {companies.map((company, index) => (
          <div
            key={index}
            className="
            mx-4 sm:mx-8
            px-3 py-2
            hover:bg-mine-shaft-900
            rounded-xl
            transition
            cursor-pointer
            "
          >
            <img
              className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain"
              src={`/Companies/${company}.png`}
              alt={company}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CompaniesPage;