import { useState } from "react";
import {
  ActionIcon,
  TagsInput,
} from "@mantine/core";
import {
  IconPencil,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Skills = () => {
  /* ---------------- REDUX ---------------- */
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  /* ---------------- STATE ---------------- */
  const [edit, setEdit] = useState(false);
  const [skills, setSkills] = useState([]);

  /* ---------------- HANDLERS (SAME LOGIC) ---------------- */
  const handleEdit = () => {
    setEdit(true);
    setSkills(profile.skills || []);
  };

  const handleCancel = () => {
    setEdit(false);
    setSkills(profile.skills || []);
  };

  const handleSave = () => {
    const updatedProfile = {
      ...profile,
      skills,
    };

    dispatch(changeProfile(updatedProfile));
    setEdit(false);
    successNotification("Success", "Skills updated successfully");
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border-default">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Skills</h2>

        {!edit ? (
          <ActionIcon
            variant="subtle"
            color="brand"
            onClick={handleEdit}
          >
            <IconPencil size={20} />
          </ActionIcon>
        ) : (
          <div className="flex gap-2">
            <ActionIcon
              variant="subtle"
              color="green.8"
              onClick={handleSave}
            >
              <IconCheck size={20} />
            </ActionIcon>

            <ActionIcon
              variant="subtle"
              color="red.8"
              onClick={handleCancel}
            >
              <IconX size={20} />
            </ActionIcon>
          </div>
        )}
      </div>

      {/* ===== Content ===== */}
      {edit ? (
        <TagsInput
          value={skills}
          onChange={setSkills}
          placeholder="Add skills"
          splitChars={[",", " ", "|"]}
          className="w-full"
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.length > 0 ? (
            profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium 
                  bg-slate-100 text-slate-800 border border-slate-200"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              No skills added yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Skills;
