import React from "react";
import { Avatar, Rating } from "@mantine/core";
import avatar from "/avatar.png";
import { testimonials } from "../assets/Data/Data";

const Testimonials = () => {
  return (
    <div className="p-7 sm:p-10 bg-[var(--blue-100)] px-3">
      
      {/* Heading */}
      <div className="text-2xl sm:text-3xl lg:text-4xl mb-8 text-center font-semibold text-primary">
        What <span className="text-[var(--blue-600)]">Users</span> say about us?
      </div>

      {/* Responsive Grid */}
      <div className="grid gap-6 
                      grid-cols-1 
                      sm:grid-cols-2 
                      lg:grid-cols-3 
                      xl:grid-cols-4">
        
        {testimonials.map((card, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border border-accent 
                       p-5 rounded-xl bg-primary 
                       shadow-sm hover:shadow-md transition"
          >
            
            {/* User Info */}
            <div className="flex gap-3 items-center">
              <Avatar
                className="!h-12 !w-12 sm:!h-14 sm:!w-14"
                src={avatar}
                alt="user avatar"
              />
              <div>
                <div className="text-base sm:text-lg text-primary font-semibold">
                  {card.name}
                </div>
                <Rating
                  value={card.rating}
                  color="brand"
                  fraction={2}
                  readOnly
                  size="sm"
                />
              </div>
            </div>

            {/* Testimonial Text */}
            <div className="text-sm text-secondary leading-relaxed">
              {card.testimonial}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;