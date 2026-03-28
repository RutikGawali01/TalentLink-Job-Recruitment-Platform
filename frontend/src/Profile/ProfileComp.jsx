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
import { useLocation } from "react-router-dom";
import Education from "./Education";
import PortfolioLinks from "./PortfolioLinks";
import Resume from "./Resume";



/* ─────────────── ProfileComp ─────────────── */
const ProfileComp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    if (!user?.profileId) return;
    getProfile(user.profileId)
      .then((data) => dispatch(setProfile(data)))
      .catch((error) => console.log(error));
  }, [user?.profileId]);

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-4/5 mx-auto pb-10 pt-6 sm:pt-10">

      {/* Subtle page background gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50/60 via-white to-slate-50 pointer-events-none" />

      <div className="flex flex-col gap-6">

        {/* Info */}
        <Info />

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        {/* About */}
        <About />

        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        {/* Resume */}
        <Resume />

        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        {/* Education */}
        <Education />

        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        {/* Skills */}
        <div className="w-full md:w-3/4 lg:w-[70%]">
          <Skills />
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        {/* Experience */}
        <Experience />

        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        {/* Certification */}
        <Certification />

        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        {/* Portfolio */}
        <PortfolioLinks />
      </div>
    </div>
  );
};

export default ProfileComp;
