import { Link } from "react-router-dom";

const applicantLinks = [
  { name: "Find Jobs", url: "/find-jobs" },
  { name: "Job History", url: "/job-history" },
  { name: "Dashboard", url: "/applicant/dashboard" },
];

export default function ApplicantNavLinks() {
  return (
    <div className="flex gap-5 h-full items-center">
      {applicantLinks.map(link => (
        <Link key={link.name} to={link.url}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
