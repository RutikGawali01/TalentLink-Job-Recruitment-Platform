import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconPlus, IconPencil, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import EduInput from "./EduInput";
import EducationCard from "./EducationCard";

const Education = () => {
  const profile = useSelector((state) => state.profile.data);

  const [edit, setEdit] = useState(false);
  const [addEdu, setAddEdu] = useState(false);

  if (!profile) {
    return (
      <div className="p-6 text-center text-gray-500">Loading profile...</div>
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
          Education
        </h2>

        <div className="flex gap-2">
          <ActionIcon
            variant="subtle"
            color="brand"
            size="lg"
            onClick={() => setAddEdu(true)}
          >
            <IconPlus size={20} />
          </ActionIcon>

          <ActionIcon
            variant="subtle"
            size="lg"
            color={edit ? "red.8" : "brand"}
            onClick={() => setEdit((p) => !p)}
          >
            {edit ? <IconX size={20} /> : <IconPencil size={20} />}
          </ActionIcon>
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="flex flex-col gap-8">
        {profile?.educations?.length > 0 ? (
          profile.educations.map((edu, index) => (
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
              {/* Timeline Dot */}
              <span className="absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100" />

              <EducationCard {...edu} index={index} edit={edit} />
            </div>
          ))
        ) : (
          <p className="text-sm sm:text-base text-slate-400">
            No education added yet
          </p>
        )}

        {addEdu && (
          <div className="p-4 sm:p-6 rounded-xl border border-slate-200 bg-slate-50">
            <EduInput add setEdit={setAddEdu} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;