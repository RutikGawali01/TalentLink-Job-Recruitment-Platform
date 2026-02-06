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
import { useHover } from "@mantine/hooks";
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
import { changeProfile } from "../Slice/ProfileSlice"
import { successNotification } from "../Services/NotificationService";
import { getBase64 } from "../Services/Utilities";
import Education from "./Education";
import PortfolioLinks from "./PortfolioLinks";


const ProfileComp = (props) => {
  const dispatch = useDispatch();


  //const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const select = fields;
  const [addExp, setAddExp] = useState(false);

  // useEffect(() => {
  //   // console.log(profile);
  //   getProfile(user.id)
  //     .then((data) => {
  //       dispatch(setProfile(data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const handleFileChange = async (image) => {
    let picture = await getBase64(image);
    console.log(picture);
    let updatedProfile = { ...profile, picture: picture.split(',')[1] };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Picture  updated successfully");


  }

  const theme = useMantineTheme();

  const { hovered, ref } = useHover();
  return (
    <div className="w-4/5 mx-auto  pb-5">

      <div className="px-3 mt-19  ">
        <Info  {...props} />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      <div className="px-3 ">
        <About />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      <div className="px-3">
        <Education />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      <div className="px-3 w-1/2" >
        <Skills />
      </div>


      <Divider mx="xs" my="xl" color="brand" />

      <div className="px-3">
        <Experience />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      <div className="px-3">
        <Certification />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      <div className="px-3">
        < PortfolioLinks />
      </div>

    </div>
  );
};

export default ProfileComp;
