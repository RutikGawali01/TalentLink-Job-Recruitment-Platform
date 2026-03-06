import { Link } from "react-router-dom";

const employerLinks = [
  { name: "Post Job", url: "/post-job/0" },
  { name: "Find Talents", url: "/find-talent" },
  { name: "Posted Jobs", url: "/posted-jobs/0" },
  { name: "Dashboard", url: "/employer/dashboard" },
];

export default function EmployerNavLinks(props) {
  return (
    <div
      className={`flex  h-full items-center text-primary ${
        props.mobile ? "flex-col gap-5" : "max-[930px]:hidden gap-5"
      }`}
    >
      {employerLinks.map((link) => (
        <Link key={link.name} to={link.url}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
