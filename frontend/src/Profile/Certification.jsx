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
          Certifications
        </h2>

        <div className="flex gap-2">
          <ActionIcon
            variant="subtle"
            size="lg"
            color="brand"
            onClick={() => setAddCerti(true)}
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
      <div className="flex flex-col gap-6 sm:gap-8">
        {profile?.certifications?.length > 0 ? (
          profile.certifications.map((certif, index) => (
            <div
              key={index}
              className="
                p-4 
                sm:p-5 
                rounded-xl 
                border 
                border-slate-200 
                bg-slate-50
              "
            >
              <CertificationCard
                index={index}
                {...certif}
                edit={edit}
              />
            </div>
          ))
        ) : (
          <p className="text-sm sm:text-base text-slate-400">
            No certifications added yet
          </p>
        )}

        {addCerti && (
          <div className="p-4 sm:p-6 rounded-xl border border-slate-200 bg-slate-50">
            <CertiInput add setEdit={setAddCerti} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Certification;