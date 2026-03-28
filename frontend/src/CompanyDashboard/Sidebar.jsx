import { useState } from "react";
import {
  IconLayoutDashboard,
  IconBriefcase,
  IconUsers,
  IconClipboardList,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard Overview", icon: IconLayoutDashboard },
  { id: "post-job", label: "Post Job", icon: IconBriefcase },
  { id: "recruiter", label: "Recruiter Requests", icon: IconUsers },
  { id: "posted-jobs", label: "Posted Jobs", icon: IconClipboardList },
];

export default function Sidebar({
  activeNav,
  onNavChange,
  mobileOpen,
  onMobileClose,
}) {
  const [collapsed, setCollapsed] = useState(false);

  const handleNav = (id) => {
    onNavChange(id);
    onMobileClose && onMobileClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
  ${collapsed ? "w-[72px]" : "w-60"}
  bg-gradient-to-b from-blue-900 via-blue-700 to-blue-600
  text-white
  flex flex-col
  transition-all duration-300
  lg:sticky
  top-20
  h-[calc(100vh-80px)]
  fixed
  ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0
  z-40
`}
      >
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-[10px] text-white/40 uppercase px-2">Main Menu</p>

          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`flex items-center gap-3 w-full rounded-lg px-3 py-2 transition
                ${
                  activeNav === id
                    ? "bg-white/20 font-semibold"
                    : "hover:bg-white/10 text-white/80"
                }`}
            >
              <Icon size={18} />
              {!collapsed && <span className="text-sm">{label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="border-t border-white/10 p-2 hidden lg:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full gap-2 text-xs hover:bg-white/10 rounded-lg py-2"
          >
            {collapsed ? (
              <IconChevronRight size={16} />
            ) : (
              <>
                <IconChevronLeft size={16} />
                Collapse
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
