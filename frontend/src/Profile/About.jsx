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
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  const [edit, setEdit] = useState(false);
  const [about, setAbout] = useState(profile?.about || "");

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
      const updatedProfile = { ...profile, about };
      await dispatch(changeProfile(updatedProfile)).unwrap();
      setEdit(false);
      successNotification("Success", "About section updated successfully");
    } catch (err) {
      errorNotification("Error", "Failed to update about section");
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="w-8 h-8 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-blue-100 p-5 sm:p-7 md:p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">About</h2>
        </div>

        {!edit ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-all duration-200"
          >
            <IconPencil size={13} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-all duration-200"
            >
              <IconCheck size={13} /> Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition-all duration-200"
            >
              <IconX size={13} /> Cancel
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {edit ? (
        <Textarea
          placeholder="Write something about yourself..."
          value={about}
          onChange={(e) => setAbout(e.currentTarget.value)}
          minRows={4}
          autosize
          styles={{
            input: {
              borderRadius: "14px",
              borderColor: "#bfdbfe",
              background: "#f8faff",
              fontSize: "14px",
              lineHeight: "1.7",
              padding: "14px 16px",
            },
          }}
        />
      ) : (
        <p className={`text-sm sm:text-base leading-relaxed ${profile.about ? "text-slate-600" : "text-slate-400 italic"}`}>
          {profile.about || "Tell people about your background, interests, and what drives you..."}
        </p>
      )}
    </div>
  );
};

export default About;