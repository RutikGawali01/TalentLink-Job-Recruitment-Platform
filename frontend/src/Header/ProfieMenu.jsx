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

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // for state look up in userSLices
  const user = useSelector((state) => state.user);

  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleLogOut = () => {
    dispatch(removeJwt());
    dispatch(removeUser());
    dispatch(clearProfile()); // if exists
    localStorage.clear(); // optional but strong
    navigate("/");
  };

  const profile = useSelector((state) => state.profile);
  const employerProfile = useSelector((state) => state.employerProfile);
  const getProfileRoute = () => {
    if (user.accountType === "APPLICANT") {
      return "/applicant/profile";
    }

    if (user.accountType === "EMPLOYER") {
      if (user.onboardingStep === 1) {
        return `/employer/profile/${user.profileId}`;
      } else {
        return `/employer/company-profile/${user.profileId}`;
      }
    }

    return "/";
  };

  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="cursor-pointer flex items-center gap-2">
          <div className="max-[476px]:">{user.name}</div>
          <Avatar
            src={
              profile?.picture
                ? `data:image/jpeg;base64,${profile?.picture}`
                : "/avatar.png"
            }
            alt="it's me"
          />
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <Link to={getProfileRoute()}>
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        {user?.accountType === "APPLICANT" && (
          <Link to="/applicant/profile#resume">
            <Menu.Item leftSection={<IconFileText size={14} />}>
              Resume
            </Menu.Item>
          </Link>
        )}{" "}
        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              size="md"
              color="brand"
              onLabel={
                <IconSun size={16} stroke={2.5} color="var(--blue-500)" />
              }
              offLabel={
                <IconMoonStars
                  size={16}
                  stroke={2.5}
                  color="var(--bg-secondary)"
                />
              }
            />
          }
        >
          Dark mode
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={handleLogOut}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default ProfileMenu;
