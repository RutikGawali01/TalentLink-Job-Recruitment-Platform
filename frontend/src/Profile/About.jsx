import { ActionIcon, Textarea } from "@mantine/core";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeProfile } from "../Slice/ProfileSlice";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";

const About = () => {
  /* ---------------- REDUX ---------------- */
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  /* ---------------- STATE ---------------- */
  const [edit, setEdit] = useState(false);
  const [about, setAbout] = useState(profile?.about || "");

  /* ---------------- HANDLERS (SAME LOGIC) ---------------- */
  const handleEdit = () => {
    setEdit(true);
    setAbout(profile.about || "");
  };

  const handleCancel = () => {
    setEdit(false);
    setAbout(profile.about || "");
  };

  const handleSave = async () => {
    try {
      const updatedProfile = {
        ...profile,
        about,
      };

      await dispatch(changeProfile(updatedProfile)).unwrap();
      setEdit(false);
      successNotification("Success", "About section updated successfully");
    } catch (err) {
      console.log(err);
      errorNotification("Error", "Failed to update about section");
    }
  };

  if (!profile) {
    return (
      <div className="p-6 text-center text-gray-500">Loading profile...</div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
  <div
    className="
      bg-white 
      rounded-2xl 
      shadow-sm 
      border-default
      p-4 
      sm:p-6 
      md:p-8
    "
  >
    {/* ===== Header ===== */}
    <div
      className="
        flex 
        justify-between 
        items-center 
        mb-4 
        pb-3 
        border-b-2 
        border-slate-200
      "
    >
      <h2 className="
        text-lg 
        sm:text-xl 
        md:text-2xl 
        font-bold 
        text-slate-900
      ">
        About
      </h2>

      {!edit ? (
        <ActionIcon
          variant="subtle"
          color="brand"
          size="lg"
          onClick={handleEdit}
        >
          <IconPencil size={20} />
        </ActionIcon>
      ) : (
        <div className="flex gap-2">
          <ActionIcon
            variant="subtle"
            color="green.8"
            size="lg"
            onClick={handleSave}
          >
            <IconCheck size={20} />
          </ActionIcon>

          <ActionIcon
            variant="subtle"
            color="red.8"
            size="lg"
            onClick={handleCancel}
          >
            <IconX size={20} />
          </ActionIcon>
        </div>
      )}
    </div>

    {/* ===== Content ===== */}
    {edit ? (
      <Textarea
        placeholder="Enter about yourself"
        value={about}
        onChange={(e) => setAbout(e.currentTarget.value)}
        minRows={4}
        autosize
        className="w-full text-sm sm:text-base"
      />
    ) : (
      <p
        className={`
          text-sm 
          sm:text-base 
          md:text-lg 
          leading-relaxed
          ${
            profile.about
              ? "text-slate-600"
              : "text-slate-400"
          }
        `}
      >
        {profile.about || "Add information about yourself..."}
      </p>
    )}
  </div>
);
};

export default About;
