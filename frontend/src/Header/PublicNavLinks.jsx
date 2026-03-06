import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Find Jobs", url: "/login" },
  { name: "Post Jobs", url: "/login" },
  { name: "Find Talents", url: "/login" },
  { name: "About Us", url: "/about" },
];

const PublicNavLinks = (props) => {
  const location = useLocation();

  return (
    <div
      className={`flex h-full  items-center text-primary ${
        props.mobile ? "flex-col gap-5" : "gap-5 max-[930px]:hidden"
      }`}
    >
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.url}
          className={`px-6 ${
            location.pathname === link.url ? "text-[var(--blue-600)]" : ""
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default PublicNavLinks;
