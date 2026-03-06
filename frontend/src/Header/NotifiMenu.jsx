import {
  Menu,
  Notification,
  Indicator,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { IconCheck, IconBell } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNotifications, readNotification } from "../Services/NotiService";

const NotifiMenu = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const user = useSelector((state) => state.user);

  const [opened, setOpened] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // ✅ Load notifications
  useEffect(() => {
    if (!user || !user.profileId) return;

    console.log("NotifiMenu profileId:", user.profileId);

    getNotifications()
      .then((res) => {
        setNotifications(res);   // 🔥 missing line
      })
      .catch((err) => console.log(err));

  }, [user]);

  // ✅ Mark as read
  const unread = (index) => {
    const noti = notifications[index];

    setNotifications((prev) =>
      prev.filter((_, i) => i !== index)
    );

    readNotification(noti.id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="bg-secondary p-1.5 rounded-full">
          <Indicator
            disabled={notifications.length <= 0}
            color="brand"
            size={6}
            offset={6}
            processing
          >
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <div className="flex flex-col gap-1">
          {notifications.length > 0 ? (
            notifications.map((noti, index) => (
              <Notification
                key={noti.id || index}
                onClose={() => unread(index)}
                onClick={() => {
                  navigate(noti.route);
                  unread(index);
                  setOpened(false);
                }}
                className="hover:!bg-tertiary cursor-pointer"
                icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
                color="teal"
                title={noti.action}
                mt="md"
              >
                {noti.message}
              </Notification>
            ))
          ) : (
            <div className="text-center text-secondary">
              No Notifications
            </div>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotifiMenu;
