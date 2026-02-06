import { Link } from "react-router-dom";

const employerLinks = [
  { name: "Post Job", url: "/post-job/0" },
  { name: "Find Talents", url: "/find-talent" },
  { name: "Posted Jobs", url: "/posted-jobs/0" },
  { name: "Dashboard", url: "/employer/dashboard" },
];

export default function EmployerNavLinks() {
  return (
    <div className="flex gap-5 h-full items-center">
      {employerLinks.map(link => (
        <Link key={link.name} to={link.url}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
