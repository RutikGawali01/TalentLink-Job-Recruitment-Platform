import {
  Menu,
  Notification,
  Stack,
  Indicator,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { IconCheck, IconBell } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, readNotification } from "../Services/NotiService";

const NotifiMenu = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const user = useSelector((state) => state.user);
  const [opened, setOpened] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications(user.userId)
      .then((res) => {
        console.log(res);
        setNotifications(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const unread = (index)=>{
    let notis =[...notifications];
    notis.filter((noti, i)=>i !=ind);
    setNotifications(notis);
    readNotification(notifications[index].id).then((res)=>
      console.log(res))
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator disabled={notifications.length <=0}
            color={theme.colors.brightSun[4]}
            size={6}
            offset={6}
            processing
          >
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <div className="flex flex-col gap-1">
          { 
            notifications.map((noti, index) => {
              <Notification key={index} onClose={()=>unread(index)}  
                onClick={()=>{
                  navigate(noti.route) ;
                  unread(index);
                  setOpened(false);
                }}
                className="hover:!bg-mine-shaft-900 cursor-pointer"
                icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
                color="teal"
                title={noti.action}
                mt={"md"}
              >
                {noti.message}
              </Notification>;
            })
          }

          {
            notifications.length == 0 && <div className="text-center text-mine-shaft-300">No Notifications</div>
          }
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotifiMenu;
