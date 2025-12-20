import React from 'react'
import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {

  const links = [
    { name: "Find jobs", URL: "find-jobs" },
    { name: "Find Talent", URL: "find-talent" },
    { name: "Post jobs", URL: "post-job" },
    { name: "About us", URL: "about" },
  ];

  const location = useLocation();

  return (
    <div className="flex gap-5 h-full items-center text-mine-shaft-300">
      {
        links.map((link, index) => {
        const isActive = location.pathname === `/${link.URL}`;

        return (
          <div
            key={index}
            className={`
              border-t-[3px] h-full flex items-center
              ${isActive
                ? "border-bright-sun-400 text-bright-sun-400"
                : "border-transparent"}
            `}
          >
            <Link to={`/${link.URL}`} className='border m-4 px-6 rounded-sm'
             >
              {link.name}
            </Link>
          </div>
        );
        })
      }
    </div>

    
  );
};

export default NavLinks;
