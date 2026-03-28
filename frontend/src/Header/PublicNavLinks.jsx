import { Link, useLocation } from "react-router-dom";


// ─── PublicNavLinks.jsx ───────────────────────────────────────────────────────
const links = [
  { name: "Find Jobs",    url: "/find-jobs" },
  { name: "Post Jobs",    url: "/post-job/0" },
  { name: "Find Talents", url: "/find-talent" },
  { name: "About Us",     url: "/about" },
];

const PublicNavLinks = (props) => {
  const location = useLocation();

  return (
    <div
      className={`flex h-full items-center font-medium text-sm ${
        props.mobile ? "flex-col gap-6 items-start" : "gap-1 max-[930px]:hidden"
      }`}
    >
      {links.map((link) => {
        const active = location.pathname === link.url;
        return (
          <Link
            key={link.name}
            to={link.url}
            className={`
              relative px-4 py-2 rounded-xl transition-all duration-200
              ${
                active
                  ? "text-blue-600 bg-blue-50 font-semibold"
                  : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              }
              ${props.mobile ? "w-full text-base" : ""}
            `}
          >
            {link.name}
            {active && !props.mobile && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default PublicNavLinks;
