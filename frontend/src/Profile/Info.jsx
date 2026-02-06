import {
  ActionIcon,
  Avatar,
  NumberInput,
  Overlay,
  FileInput,
  useMantineTheme,
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
  /* ================= REDUX ================= */
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const theme = useMantineTheme();
  const select = fields;

  /* ================= STATE ================= */
  const [edit, setEdit] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* ================= FORM ================= */
  const form = useForm({
    mode: "controlled",
    initialValues: {
      jobTitle: "",
      company: "",
      location: "",
      totalExp: 0,
    },
  });

  /* ================= HANDLERS ================= */
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExp: profile.totalExp,
      });
    } else {
      setEdit(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedProfile = {
        ...profile,
        ...form.getValues(),
      };

      await dispatch(changeProfile(updatedProfile));
      setEdit(false);
      successNotification("Success", "Recruiter profile updated successfully");
    } catch (err) {
      console.log(err);
      errorNotification("Error", "Profile update failed");
    }
  };

  /* ---------- PROFILE PICTURE UPLOAD ---------- */
  const handleFileChange = async (image) => {
    if (!image) return;

    let picture = await getBase64(image);

    let updatedProfile = {
      ...profile,
      picture: picture.split(",")[1],
    };

    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile Picture updated successfully");
  };

  /* ---------- BANNER UPLOAD ---------- */
  const handleBannerChange = async (image) => {
    if (!image) return;

    let banner = await getBase64(image);

    let updatedProfile = {
      ...profile,
      banner: banner.split(",")[1],
    };

    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Banner updated successfully");
  };

  /* ================= UI ================= */
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
          className="rounded-t-2xl w-full h-[200px] object-cover"
        />

        {/* ===== Edit Banner ===== */}
        <div className="absolute top-4 right-4 z-20">
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
        <div className="absolute flex items-center justify-center -bottom-1/3 left-6">
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar
              className="!w-48 !h-48 border-mine-shaft-950 border-8 rounded-full"
              src={
                profile.picture
                  ? `data:image/jpeg;base64,${profile.picture}`
                  : "/avatar.png"
              }
            />

            {hovered && (
              <>
                <Overlay
                  className="!rounded-full"
                  color="#000"
                  backgroundOpacity={0.75}
                />
                <IconEdit className="absolute z-[300] !h-16 !w-16 text-white" />
                <FileInput
                  onChange={handleFileChange}
                  className="absolute bottom-2 right-2 z-[301] 
                    [&_*]:!rounded-full [&_*]:!h-full !h-full w-full"
                  accept="image/png, image/jpeg"
                  variant="transparent"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= Content ================= */}
      <div className="px-6 pt-28 pb-8 relative">
        {/* ===== Edit / Save Buttons ===== */}
        <div className="absolute top-4 right-6 flex gap-2">
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

        {/* ================= Name ================= */}
        <h1 className="text-3xl font-semibold">{user?.name}</h1>

        {/* ================= View Mode ================= */}
        {!edit && (
          <div className="mt-3 space-y-1">
            <div className="flex items-center gap-2 text-lg">
              <IconBriefcase size={18} />
              {profile.jobTitle} • {profile.company}
            </div>

            <div className="flex items-center gap-2 text-mine-shaft-300">
              <IconMapPin size={18} />
              {profile.location}
            </div>

            <div className="text-mine-shaft-300">
              Experience: {profile.totalExp} Years
            </div>
          </div>
        )}

        {/* ================= Edit Mode ================= */}
        {edit && (
          <div className="mt-6 space-y-4 max-w-3xl">
            <div className="flex gap-6">
              <SelectInput form={form} name="jobTitle" {...select[0]} />
              <SelectInput form={form} name="company" {...select[1]} />
            </div>

            <div className="flex gap-6">
              <SelectInput form={form} name="location" {...select[2]} />
              <NumberInput
                withAsterisk
                label="Experience"
                hideControls
                min={0}
                max={40}
                {...form.getInputProps("totalExp")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
