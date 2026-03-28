import { useState } from "react";
import { ActionIcon, TagsInput } from "@mantine/core";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Skills = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  const [edit, setEdit] = useState(false);
  const [skills, setSkills] = useState([]);

  const handleEdit = () => {
    setEdit(true);
    setSkills(profile.skills || []);
  };

  const handleCancel = () => {
    setEdit(false);
    setSkills(profile.skills || []);
  };

  const handleSave = async () => {
    const updatedProfile = { ...profile, skills };
    await dispatch(changeProfile(updatedProfile)).unwrap();
    setEdit(false);
    successNotification("Success", "Skills updated successfully");
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
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Skills</h2>
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
        <TagsInput
          value={skills}
          onChange={setSkills}
          placeholder="Type a skill and press Enter..."
          splitChars={[",", " ", "|"]}
          styles={{
            input: { borderRadius: "12px", borderColor: "#bfdbfe", background: "#f8faff", fontSize: "14px" },
            pill: { borderRadius: "20px", background: "#eff6ff", color: "#1d4ed8", fontWeight: 600, fontSize: "12px" },
          }}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.length > 0 ? (
            profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors duration-150"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-400 italic">No skills added yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Skills;