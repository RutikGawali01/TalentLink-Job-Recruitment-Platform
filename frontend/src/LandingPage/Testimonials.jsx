import React from "react";
import { Avatar, Rating } from "@mantine/core";
import avatar from "/avatar.png";
import { testimonials } from "../assets/Data/Data";

const Testimonials = () => {
  return (
    <div className=" p-5 py-10 bg-[var(--blue-100)]">
      <div className="text-4xl mb-3 text-center font-semibold text-primary">
        What <span className="text-[var(--blue-600)]">Users </span> says about us?
      </div>

      <div className="flex justify-evenly">
        {
                testimonials.map((card, index) => 
                    <div key={index} className="flex flex-col gap-3 w-[23%] border border-accent p-3 rounded-xl mt-10 bg-primary ">
                        <div className="flex gap-2 items-center ">
                            <Avatar className="!h-14 !w-14" src={avatar} alt="it's me" />
                            <div>
                            <div className="text-lg text-primary font-semibold ">
                                {card.name}
                            </div>
                            <Rating value={card.rating} color="brand" fraction={2} readOnly />
                            </div>
                        </div>
                        <div className="text-xs text-secondary ">
                            {card.testimonial}
                        </div>
                    </div>
                )
            }
        </div>

        
    </div>
  );
};

export default Testimonials;
