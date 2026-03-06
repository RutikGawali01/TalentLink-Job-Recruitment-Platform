import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import ExperienceCard from "./ExperienceCard";
import ExpInput from "./ExpInput";

const Experience = () => {
  const profile = useSelector((state) => state.profile.data);

  const [edit, setEdit] = useState(false);
  const [addExp, setAddExp] = useState(false);

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-3 border-b-2 border-slate-200">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
          Experience
        </h2>

        <div className="flex gap-2">
          <ActionIcon
            variant="subtle"
            color="brand"
            size="lg"
            onClick={() => setAddExp(true)}
          >
            <IconPlus size={20} />
          </ActionIcon>

          <ActionIcon
            variant="subtle"
            size="lg"
            color={edit ? "red.8" : "brand"}
            onClick={() => setEdit((prev) => !prev)}
          >
            {edit ? <IconX size={20} /> : <IconPencil size={20} />}
          </ActionIcon>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8">
        {profile?.experiences?.length > 0 ? (
          profile.experiences.map((exp, index) => (
            <div
              key={index}
              className="
                relative 
                pl-6 
                md:pl-8 
                border-l-2 
                border-slate-200
              "
            >
              <ExperienceCard {...exp} index={index} edit={edit} />
            </div>
          ))
        ) : (
          <p className="text-sm sm:text-base text-slate-400">
            No experience added yet
          </p>
        )}

        {addExp && (
          <div className="p-4 sm:p-6 rounded-xl border border-slate-200 bg-slate-50">
            <ExpInput add setEdit={setAddExp} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;