import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Find Jobs", url: "/find-jobs" },
  { name: "Post Jobs", url: "/employer/login" },
  { name: "Find Talents", url: "/find-talent" },
  { name: "About Us", url: "/about" },
];

const PublicNavLinks = () => {
  const location = useLocation();

  return (
    <div className="flex gap-5 h-full items-center text-primary">
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.url}
          className={`px-6 ${
            location.pathname === link.url
              ? "text-[var(--blue-600)]"
              : ""
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default PublicNavLinks;
