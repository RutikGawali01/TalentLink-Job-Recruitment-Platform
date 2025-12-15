import React from "react";
import { Avatar, Rating } from "@mantine/core";
import avatar from "../assets/avatar.png";
import { testimonials } from "../assets/Data/Data";

const Testimonials = () => {
  return (
    <div className="mt-20 pb-5">
      <div className="text-4xl mb-3 text-center font-semibold text-mine-shaft-100">
        What <span className="text-bright-sun-400">User </span> says about us?
      </div>

      <div className="flex justify-evenly">
        {
                testimonials.map((card, index) => 
                    <div key={index} className="flex flex-col gap-3 w-[23%] border border-bright-sun-400 p-3 rounded-xl mt-10 ">
                        <div className="flex gap-2 items-center ">
                            <Avatar className="!h-14 !w-14" src={avatar} alt="it's me" />
                            <div>
                            <div className="text-lg text-mine-shaft-100 font-semibold ">
                                {card.name}
                            </div>
                            <Rating value={card.rating} fraction={2} readOnly />
                            </div>
                        </div>
                        <div className="text-xs text-mine-shaft-300 ">
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
