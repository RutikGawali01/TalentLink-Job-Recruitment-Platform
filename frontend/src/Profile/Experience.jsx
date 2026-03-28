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
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Experience</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAddExp(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition-all duration-200"
          >
            <IconPlus size={13} /> Add
          </button>
          <button
            onClick={() => setEdit((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
              edit
                ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {edit ? <><IconX size={13} /> Done</> : <><IconPencil size={13} /> Edit</>}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-7">
        {profile?.experiences?.length > 0 ? (
          profile.experiences.map((exp, index) => (
            <div key={index} className="relative pl-5 md:pl-7 border-l-2 border-blue-100">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-50" />
              <ExperienceCard {...exp} index={index} edit={edit} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
              <span className="text-2xl">💼</span>
            </div>
            <p className="text-sm text-slate-400">No experience added yet</p>
          </div>
        )}

        {addExp && (
          <div className="mt-2 p-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white">
            <ExpInput add setEdit={setAddExp} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;