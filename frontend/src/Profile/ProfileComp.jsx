import { useState, useEffect } from "react";
import {
  Divider,
  Avatar,
  useMantineTheme,
  Indicator,
  FileInput,
  Overlay,
  TagsInput,
} from "@mantine/core";
import {useHover} from "@mantine/hooks";
import { IconPencil, IconEdit } from "@tabler/icons-react";
import fields from "../assets/Data/Profile";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import Info from "./Info";
import { setProfile } from "../Slice/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certification from "./Certification";
import {changeProfile} from "../Slice/ProfileSlice"
import {successNotification} from "../Services/NotificationService";


const ProfileComp = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const select = fields;
  const [addExp, setAddExp] = useState(false);

  const [edit, setEdit] = useState([
    "false",
    "false",
    "false",
    "false",
    "false",
  ]);

  useEffect(() => {
    // console.log(profile);
    getProfile(user.id)
      .then((data) => {
        dispatch(setProfile(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFileChange = async (image)=>{
    let picture = await getBase64(image);
    console.log(picture);
    let updatedProfile={...profile, picture: picture.split(',')[1]};
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Picture  updated successfully");


  }
  const getBase64 = (file)=>{
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>resolve(reader.result);
      reader.onerror= error=> reject(error);
    })

  }

  const theme = useMantineTheme();
  
  const {hovered, ref} = useHover();
  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner.jpg" alt="" />
        <div ref={ref} className="absolute  flex items-center justify-center -bottom-1/3 left-3">
          {/* <Indicator
            className="[&_.mantine-Indicator-indicator]:!border-4 [&_img]:hover:opacity-80"
            autoContrast
            inline
            offset={30}
            label={
              <IconPencil
                className="w-4/5
          h-4/5"
              />
            }
            size={45}
            position="bottom-end"
            color={theme.colors.brightSun[4]}
            withBorder
          > */}
            <Avatar
              className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full"
              src={profile.picture ? `data:image/jpeg;base64,${profile.picture}`:"/avatar.png"}
              alt=""
            />
            {hovered && <Overlay className="!rounded-full"    color="#000" backgroundOpacity={0.75} />}
            {hovered && <IconEdit className="absolute z-[300] !h-16 !w-16 "  /> }
            { hovered && <FileInput onChange={handleFileChange}
              className="absolute bottom-2 right-2 z-[301] [&_*]:!rounded-full [&_*]:!h-full !h-full w-full"
              accept="image/png, image/jpeg" variant="transparent"
            /> }
          {/* </Indicator> */}
        </div>
      </div>

      <div className="px-3 mt-19  ">
        <Info {...props} />
      </div>

      <Divider mx="xs" my="xl" />

      <About />

      <Divider mx="xs" my="xl" />

      <Skills />

      <Divider mx="xs" my="xl" />

      <Experience />

      <Divider mx="xs" my="xl" />
      <Certification />
    </div>
  );
};

export default ProfileComp;
