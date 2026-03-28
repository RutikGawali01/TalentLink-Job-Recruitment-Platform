import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import CertificationCard from "./CertificationCard";
import CertiInput from "./CertiInput";


const Certification = () => {
  const profile = useSelector((state) => state.profile.data);
  const [edit, setEdit] = useState(false);
  const [addCerti, setAddCerti] = useState(false);

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
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Certifications</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAddCerti(true)}
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
      <div className="flex flex-col gap-4">
        {profile?.certifications?.length > 0 ? (
          profile.certifications.map((certif, index) => (
            <div key={index} className="p-4 sm:p-5 rounded-2xl border border-blue-50 bg-gradient-to-r from-blue-50/40 to-white hover:border-blue-200 transition-all duration-200">
              <CertificationCard index={index} {...certif} edit={edit} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-1">
              <span className="text-2xl">🏆</span>
            </div>
            <p className="text-sm text-slate-400">No certifications added yet</p>
          </div>
        )}

        {addCerti && (
          <div className="p-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white">
            <CertiInput add setEdit={setAddCerti} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Certification;