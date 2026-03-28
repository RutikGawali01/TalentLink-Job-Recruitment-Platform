import { Menu, Avatar, Switch } from "@mantine/core";
import {
  IconUserCircle,
  IconMoon,
  IconFileText,
  IconMessageCircle,
  IconLogout2,
  IconArrowsLeftRight,
  IconSun,
  IconMoonStars,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../Slice/UserSlice";
import { clearProfile } from "../Slice/ProfileSlice";

import { removeJwt } from "../Slice/JwtSlice";



// ─── ProfileMenu.jsx ──────────────────────────────────────────────────────────
const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleLogOut = () => {
    dispatch(removeJwt());
    dispatch(removeUser());
    dispatch(clearProfile());
    localStorage.clear();
    navigate("/");
  };

  const getProfileRoute = () => {
    if (user.accountType === "APPLICANT") return "/applicant/profile";
    if (user.accountType === "EMPLOYER") {
      return user.onboardingStep === 1
        ? `/employer/profile/${user.profileId}`
        : `/employer/company-profile/${user.profileId}`;
    }
    return "/";
  };

  return (
    <Menu
      shadow="lg"
      width={220}
      opened={opened}
      onChange={setOpened}
      radius="xl"
      offset={8}
    >
      <Menu.Target>
        <div className="
          flex items-center gap-2.5 cursor-pointer
          px-3 py-1.5 rounded-xl
          border border-slate-200 bg-white
          hover:border-blue-300 hover:bg-blue-50
          transition-all duration-200
          shadow-sm hover:shadow-md
        ">
          <span className="text-sm font-semibold text-slate-700 max-[476px]:hidden">
            {user.name}
          </span>
          <Avatar
            src={
              profile?.picture
                ? `data:image/jpeg;base64,${profile.picture}`
                : "/avatar.png"
            }
            size={32}
            radius="xl"
            className="ring-2 ring-blue-100"
            alt="profile"
          />
        </div>
      </Menu.Target>

      <Menu.Dropdown
        className="!rounded-2xl !border-slate-200 !shadow-xl !shadow-slate-100"
        styles={{ dropdown: { padding: "8px" } }}
      >
        <Link to={getProfileRoute()}>
          <Menu.Item
            leftSection={<IconUserCircle size={15} className="text-blue-500" />}
            className="!rounded-xl !text-slate-700 hover:!bg-blue-50 hover:!text-blue-600 !font-medium !text-sm"
          >
            Profile
          </Menu.Item>
        </Link>

        <Menu.Item
          leftSection={<IconMessageCircle size={15} className="text-blue-500" />}
          className="!rounded-xl !text-slate-700 hover:!bg-blue-50 hover:!text-blue-600 !font-medium !text-sm"
        >
          Messages
        </Menu.Item>

        {user?.accountType === "APPLICANT" && (
          <Link to="/applicant/profile#resume">
            <Menu.Item
              leftSection={<IconFileText size={15} className="text-blue-500" />}
              className="!rounded-xl !text-slate-700 hover:!bg-blue-50 hover:!text-blue-600 !font-medium !text-sm"
            >
              Resume
            </Menu.Item>
          </Link>
        )}

        <Menu.Item
          leftSection={<IconMoon size={15} className="text-slate-400" />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.currentTarget.checked)}
              size="sm"
              color="blue"
              onLabel={<IconSun size={14} stroke={2.5} />}
              offLabel={<IconMoonStars size={14} stroke={2.5} />}
            />
          }
          className="!rounded-xl !text-slate-700 hover:!bg-slate-50 !font-medium !text-sm"
        >
          Dark mode
        </Menu.Item>

        <Menu.Divider className="!border-slate-100 !my-1" />

        <Menu.Item
          onClick={handleLogOut}
          color="red"
          leftSection={<IconLogout2 size={15} />}
          className="!rounded-xl hover:!bg-red-50 !font-medium !text-sm"
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;