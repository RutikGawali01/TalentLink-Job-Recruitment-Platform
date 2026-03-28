import { Button } from "@mantine/core";
import { useState } from "react";
import { formateDate } from "../Services/Utilities";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import ExpInput from "./ExpInput";

const ExperienceCard = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const [editMode, setEditMode] = useState(false);

  const handleDelete = () => {
    let exp = [...profile.experiences];
    exp.splice(props.index, 1);
    dispatch(changeProfile({ ...profile, experiences: exp }));
    successNotification("Success", "Experience deleted successfully");
  };

  if (editMode) {
    return <ExpInput {...props} setEdit={setEditMode} />;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Top Row */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3">
        <div className="flex gap-3 items-start">
          <div className="p-2 rounded-xl bg-slate-900 shadow-sm shrink-0">
            <img className="h-6 sm:h-7" src={`/Icons/${props.company}.png`} alt="" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 text-sm sm:text-base">{props.title}</div>
            <div className="text-xs sm:text-sm text-blue-600 font-medium">
              {props.company} · {props.location}
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-400 shrink-0 font-medium">
          {formateDate(props.startDate)} – {props.working ? "Present" : formateDate(props.endDate)}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed">{props.description}</p>

      {/* Actions */}
      {props.edit && (
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-all duration-200"
          >
            <IconPencil size={13} /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition-all duration-200"
          >
            <IconTrash size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;