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
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {removeUser} from "../Slice/UserSlice"

const ProfileMenu = () => {

  const dispatch = useDispatch();
  // for state look up in userSLices
  const user = useSelector((state)=> state.user);
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const handleLogOut = ()=> {
      dispatch(removeUser());
  }
  const profile = useSelector((state) => state.profile);
  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="cursor-pointer flex items-center gap-2">
          <div>{user.name}</div>
          <Avatar src={profile.picture ? `data:image/jpeg;base64,${profile.picture}`:"/avatar.png"} alt="it's me" />
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <Link to="/profile">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>

        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />}>Resume</Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              size="md"
              color="dark.4"
              onLabel={
                <IconSun
                  size={16}
                  stroke={2.5}
                  color="var(--mantine-color-yellow-4)"
                />
              }
              offLabel={
                <IconMoonStars
                  size={16}
                  stroke={2.5}
                  color="var(--mantine-color-blue-6)"
                />
              }
            />
          }
        >
          Dark mode
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item onClick={handleLogOut} color="red" leftSection={<IconLogout2 size={14} />}>
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default ProfileMenu;
