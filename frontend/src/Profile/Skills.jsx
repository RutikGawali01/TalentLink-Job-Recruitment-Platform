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
    const updatedProfile = {
      ...profile,
      skills,
    };

    await dispatch(changeProfile(updatedProfile)).unwrap();
    setEdit(false);
    successNotification("Success", "Skills updated successfully");
  };

  if (!profile) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

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
      <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-slate-200">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
          Skills
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
        <div className="max-w-3xl">
          <TagsInput
            value={skills}
            onChange={setSkills}
            placeholder="Add skills (Press Enter or comma)"
            splitChars={[",", " ", "|"]}
            className="w-full text-sm sm:text-base"
          />
        </div>
      ) : (
        <div
          className="
            flex 
            flex-wrap 
            gap-2 
            sm:gap-3
          "
        >
          {profile?.skills?.length > 0 ? (
            profile.skills.map((skill, index) => (
              <span
                key={index}
                className="
                  px-3 
                  py-1 
                  sm:px-4 
                  sm:py-1.5
                  rounded-full 
                  text-xs 
                  sm:text-sm 
                  font-medium
                  bg-slate-100 
                  text-slate-800 
                  border 
                  border-slate-200
                  hover:bg-slate-200
                  transition
                "
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm sm:text-base text-slate-400">
              No skills added yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Skills;