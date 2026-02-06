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
import CertificationCard from "./CertificationCard";
import CertiInput from "./CertiInput";

const Certification = () => {
  const profile = useSelector((state) => state.profile);

  const [edit, setEdit] = useState(false);
  const [addCerti, setAddCerti] = useState(false);

  const handleEditToggle = () => {
    setEdit((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border-default">
      {/* ===== Header (same as Experience) ===== */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">
          Certifications
        </h2>

        <div className="flex gap-2">
          {/* Add Certification */}
          <ActionIcon
            variant="subtle"
            color="brand"
            onClick={() => setAddCerti(true)}
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
        {/* Certifications list */}
        {profile?.certifications?.length > 0 ? (
          profile.certifications.map((certif, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50"
            >
              <CertificationCard
                index={index}
                {...certif}
                edit={edit}
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">
            No certifications added yet
          </p>
        )}

        {/* Add Certification Form */}
        {addCerti && (
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <CertiInput add setEdit={setAddCerti} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Certification;
