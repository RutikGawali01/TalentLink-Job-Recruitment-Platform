import {
  IconLayoutDashboard,
  IconBriefcase,
  IconUsers,
  IconUserSearch,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="p-6 text-xl font-bold text-blue-600">
        JobFlow
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem icon={<IconLayoutDashboard />} label="Dashboard" active />
        <SidebarItem icon={<IconBriefcase />} label="My Jobs" />
        <SidebarItem icon={<IconUsers />} label="Applications" />
        <SidebarItem icon={<IconUserSearch />} label="Find Talent" />
        <SidebarItem icon={<IconUserSearch />} label="Profile" />
        <SidebarItem icon={<IconSettings />} label="Settings" />
      </nav>

      <div className="p-4">
        <SidebarItem icon={<IconLogout />} label="Logout" />
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer 
    ${active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;
