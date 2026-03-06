// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

// const NavLinks = () => {
//   const location = useLocation();
//   const user = useSelector((state) => state.user);

//   const applicantLinks = [
//     { name: "Find Jobs", URL: "find-jobs" },
//     { name: "Job History", URL: "job-history" },
//     { name: "Companies", URL: "all-company"}
//   ];

//   const employerLinks = [
//     { name: "Find Talent", URL: "find-talent" },
//     { name: "Post Job", URL: "post-job/0" },
//     { name: "Posted Jobs", URL: "posted-jobs/0" },
//   ];

//   const links =
//     user?.accountType === "EMPLOYER" ? employerLinks : applicantLinks;

//   return (
//     <div className="flex gap-5 h-full items-center text-mine-shaft-300">
//       {links.map((link, index) => {
//         const isActive = location.pathname === `/${link.URL}`;

//         return (
//           <div
//             key={index}
//             className={`
//               border-t-[3px] h-full flex items-center
//               ${isActive
//                 ? "border-bright-sun-400 text-bright-sun-400"
//                 : "border-transparent"}
//             `}
//           >
//             <Link to={`/${link.URL}`} className="border m-4 px-6 rounded-sm">
//               {link.name}
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// };  
// // 
// export default NavLinks;
