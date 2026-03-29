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

// ─── NotifiMenu.jsx ───────────────────────────────────────────────────────────
const NotifiMenu = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [opened, setOpened] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user || !user.profileId) return;
    getNotifications()
      .then((res) => setNotifications(res))
      .catch((err) => console.log(err));
  }, [user]);

  const unread = (index) => {
    const noti = notifications[index];
    setNotifications((prev) => prev.filter((_, i) => i !== index));
    readNotification(noti.id)
      .then((res) =>
         console.log(res)
    )
      .catch((err) => console.log(err));
  };

  return (
    <Menu
      shadow="lg"
      width={400}
      opened={opened}
      onChange={setOpened}
      radius="xl"
      offset={8}
    >
      <Menu.Target>
        <div
          className="
          relative p-2 rounded-xl cursor-pointer
          border border-slate-200 bg-white
          hover:border-blue-300 hover:bg-blue-50
          transition-all duration-200 shadow-sm hover:shadow-md
        "
        >
          <Indicator
            disabled={notifications.length <= 0}
            color="blue"
            size={7}
            offset={4}
            processing
          >
            <IconBell size={20} stroke={1.6} className="text-slate-600" />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown
        className="!rounded-2xl !border-slate-200 !shadow-xl !shadow-slate-100"
        styles={{ dropdown: { padding: "12px" } }}
      >
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-3">
          Notifications
        </div>
        <div className="flex flex-col gap-2">
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
                icon={<IconCheck style={{ width: rem(18), height: rem(18) }} />}
                color="blue"
                title={noti.action}
                radius="lg"
                className="
                  hover:!bg-blue-50 cursor-pointer
                  !border !border-slate-100
                  !shadow-none
                  !transition-all !duration-200
                "
                styles={{
                  root: { padding: "10px 14px" },
                  title: { fontWeight: 600, fontSize: 13, color: "#0F172A" },
                  description: { fontSize: 12, color: "#64748B" },
                }}
              >
                {noti.message}
              </Notification>
            ))
          ) : (
            <div className="text-center text-slate-400 text-sm py-6 flex flex-col items-center gap-2">
              <IconBell size={28} stroke={1.2} className="text-slate-300" />
              No notifications yet
            </div>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotifiMenu;
