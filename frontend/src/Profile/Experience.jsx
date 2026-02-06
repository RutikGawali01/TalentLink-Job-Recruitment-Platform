import { useState } from "react";
import {
  ActionIcon,
} from "@mantine/core";
import {
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import ExperienceCard from "./ExperienceCard";
import ExpInput from "./ExpInput";

const Experience = () => {
  const profile = useSelector((state) => state.profile);

  const [edit, setEdit] = useState(false);
  const [addExp, setAddExp] = useState(false);

  const handleEditToggle = () => {
    setEdit((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border-default">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Experience</h2>

        <div className="flex gap-2">
          {/* Add Experience */}
          <ActionIcon
            variant="subtle"
            color="brand"
            onClick={() => setAddExp(true)}
          >
            <IconPlus size={20} />
          </ActionIcon>

          {/* Edit Toggle */}
          <ActionIcon
            variant="subtle"
            color={edit ? "red.8" : "brand"}
            onClick={handleEditToggle}
          >
            {edit ? <IconX size={20} /> : <IconPencil size={20} />}
          </ActionIcon>
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="flex flex-col gap-6">
        {/* Existing Experiences */}
        {profile?.experiences?.length > 0 ? (
          profile.experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-6 border-l-2 border-slate-200"
            >
              {/* Timeline Dot */}
              {/* <span className="absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100" /> */}

              <ExperienceCard
                {...exp}
                index={index}
                edit={edit}
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">
            No experience added yet
          </p>
        )}

        {/* Add Experience Form */}
        {addExp && (
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <ExpInput add setEdit={setAddExp} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
