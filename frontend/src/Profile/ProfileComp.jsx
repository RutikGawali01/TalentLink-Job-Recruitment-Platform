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
import { changeProfile } from "../Slice/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { getBase64 } from "../Services/Utilities";
import Education from "./Education";
import PortfolioLinks from "./PortfolioLinks";

const ProfileComp = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile.data);
  const select = fields;
  const [addExp, setAddExp] = useState(false);

  useEffect(() => {
    if (!user?.profileId) return;

    getProfile(user.profileId)
      .then((data) => {
        dispatch(setProfile(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?.profileId]);

  // const handleFileChange = async (image) => {
  //   let picture = await getBase64(image);
  //   console.log(picture);
  //   let updatedProfile = { ...profile, picture: picture.split(',')[1] };
  //   dispatch(changeProfile(updatedProfile));
  //   successNotification("Success", "Profile Picture  updated successfully");

  // }

  const theme = useMantineTheme();

  const { hovered, ref } = useHover();
  return (
    <div
      className="
    w-[95%] 
    sm:w-[90%] 
    md:w-[85%] 
    lg:w-4/5 
    mx-auto 
    pb-5
  "
    >
      {/* Info */}
      <div className="px-2 sm:px-3 mt-10 sm:mt-16">
        <Info {...props} />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      {/* About */}
      <div className="px-2 sm:px-3">
        <About />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      {/* Education */}
      <div className="px-2 sm:px-3">
        <Education />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      {/* Skills */}
      <div
        className="
          px-2 
          sm:px-3 
          w-full 
          md:w-3/4 
          lg:w-[70%]
    "
      >
        <Skills />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      {/* Experience */}
      <div className="px-2 sm:px-3">
        <Experience />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      {/* Certification */}
      <div className="px-2 sm:px-3">
        <Certification />
      </div>

      <Divider mx="xs" my="xl" color="brand" />

      {/* Portfolio */}
      <div className="px-2 sm:px-3">
        <PortfolioLinks />
      </div>
    </div>
  );
};

export default ProfileComp;
