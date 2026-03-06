import { Link } from "react-router-dom";

const applicantLinks = [
  { name: "Find Jobs", url: "/find-jobs" },
  { name: "Job History", url: "/job-history" },
  { name: "Dashboard", url: "/applicant/dashboard" },
];

export default function ApplicantNavLinks(props) {
  return (
    <div  className={`flex h-full items-center text-primary ${
        props.mobile ? "flex-col gap-5" : "gap-5  max-[930px]:hidden "
      }`}
    >

      {applicantLinks.map(link => (
        <Link key={link.name} to={link.url}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
