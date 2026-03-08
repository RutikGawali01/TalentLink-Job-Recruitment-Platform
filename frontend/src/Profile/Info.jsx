import {
  ActionIcon,
  Avatar,
  NumberInput,
  Overlay,
  FileInput,
} from "@mantine/core";
import {
  IconPencil,
  IconCheck,
  IconX,
  IconEdit,
  IconBriefcase,
  IconMapPin,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@mantine/form";
import { useState } from "react";
import SelectInput from "./SelectInput";
import { getBase64 } from "../Services/Utilities";
import { changeProfile } from "../Slice/ProfileSlice";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import fields from "../assets/Data/Profile";

const Info = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile.data);
  const select = fields;

  const [edit, setEdit] = useState(false);
  const [hovered, setHovered] = useState(false);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      headline:"",
      location: "",
      totalExp: 0,
    },
  });

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        headline: profile.headline,
        location: profile.location,
        totalExp: profile.totalExp,
      });
    } else {
      setEdit(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedProfile = { ...profile, ...form.getValues() };
      console.log(updatedProfile);
      await dispatch(changeProfile(updatedProfile)).unwrap();
      setEdit(false);
      successNotification("Success", "Profile updated successfully");
    } catch (err) {
      errorNotification("Error", "Profile update failed");
    }
  };

  const handleFileChange = async (image) => {
    if (!image) return;
    let picture = await getBase64(image);
    let updatedProfile = {
      ...profile,
      picture: picture.split(",")[1],
    };
    await dispatch(changeProfile(updatedProfile)).unwrap();
    successNotification("Success", "Profile Picture updated successfully");
  };

  const handleBannerChange = async (image) => {
    if (!image) return;
    let banner = await getBase64(image);
    let updatedProfile = {
      ...profile,
      banner: banner.split(",")[1],
    };
    await dispatch(changeProfile(updatedProfile)).unwrap();
    successNotification("Success", "Banner updated successfully");
  };

  if (!profile) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border-default">
      {/* ================= Banner ================= */}
      <div className="relative">
        <img
          src={
            profile.banner
              ? `data:image/jpeg;base64,${profile.banner}`
              : "/Profile/banner.jpg"
          }
          alt="Banner"
          className="w-full h-[140px] sm:h-[180px] md:h-[220px] object-cover"
        />

        {/* Edit Banner */}
        <div className="absolute top-3 right-3 z-20">
          <ActionIcon size="lg" variant="filled" color="dark">
            <IconEdit size={18} />
          </ActionIcon>
          <FileInput
            onChange={handleBannerChange}
            accept="image/png, image/jpeg"
            variant="transparent"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* ================= Avatar ================= */}
        <div
          className="
          absolute 
          -bottom-10 sm:-bottom-14 md:-bottom-20 
          left-1/2 -translate-x-1/2 
          sm:left-6 sm:translate-x-0
        "
        >
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar
              className="
                border-4 sm:border-6 md:border-8 
                border-mine-shaft-950 
                rounded-full
                !w-24 !h-24 
                sm:!w-32 sm:!h-32 
                md:!w-40 md:!h-40 
                lg:!w-48 lg:!h-48
              "
              src={
                profile.picture
                  ? `data:image/jpeg;base64,${profile.picture}`
                  : "/avatar.png"
              }
            />

            {hovered && (
              <>
                <Overlay
                  className="!rounded-full pointer-events-none"
                  color="#000"
                  backgroundOpacity={0.7}
                />
                <IconEdit className="absolute inset-0 m-auto text-white !w-8 !h-8 sm:!w-12 sm:!h-12" />
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="absolute inset-0 opacity-0 cursor-pointer z-30"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="px-4 sm:px-6 pt-16 sm:pt-24 md:pt-28 pb-8 relative">
        {/* Edit Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {edit && (
            <ActionIcon
              size="lg"
              variant="subtle"
              color="green.8"
              onClick={handleSave}
            >
              <IconCheck />
            </ActionIcon>
          )}
          <ActionIcon
            size="lg"
            variant="subtle"
            color={edit ? "red.8" : "brand"}
            onClick={handleClick}
          >
            {edit ? <IconX /> : <IconPencil />}
          </ActionIcon>
        </div>

        {/* Name */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center sm:text-left">
          {user?.name}
        </h1>

        {/* ================= View Mode ================= */}
        {!edit && (
          <div
            className="
            mt-4 
            flex 
            flex-col 
            gap-2 
            sm:gap-3 
            lg:flex-row 
            lg:items-center 
            lg:gap-8
          "
          >
            <div className="flex items-center gap-2">
              <IconBriefcase size={18} />
              {profile.headline} 
            </div>

            <div className="flex items-center gap-2 text-mine-shaft-300">
              <IconMapPin size={18} />
              {profile.location}
            </div>

            <div className="text-mine-shaft-300">
              {profile.totalExp} Years Experience
            </div>
          </div>
        )}

        {/* ================= Edit Mode ================= */}
        {edit && (
          <div
            className="
            mt-6 
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-4 
            gap-4
          "
          >
            <SelectInput form={form} name="headline" {...select[0]} />
            <SelectInput form={form} name="location" {...select[1]} />
            <NumberInput
              withAsterisk
              label="Experience"
              placeholder="Enter Current Experience"
              hideControls
              min={0}
              max={40}
              {...form.getInputProps("totalExp")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
