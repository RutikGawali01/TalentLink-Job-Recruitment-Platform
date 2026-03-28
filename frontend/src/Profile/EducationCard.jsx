import { Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { formateDate } from "../Services/Utilities";
import { IconTrash } from "@tabler/icons-react";

const EducationCard = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  const handleDelete = async () => {
    try {
      let edu = [...profile.educations];
      edu.splice(props.index, 1);
      await dispatch(changeProfile({ ...profile, educations: edu })).unwrap();
      successNotification("Success", "Education deleted successfully");
    } catch (error) {
      errorNotification("Error", "Failed to delete education");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
      <div className="flex flex-col gap-1">
        <div className="font-semibold text-slate-900 text-sm sm:text-base">{props.degree}</div>
        <div className="text-sm text-blue-600 font-medium">{props.institution}</div>
        <div className="text-xs text-slate-400">
          {props.location}
          {" · "}
          {formateDate(props.startDate)} – {formateDate(props.endDate)}
          {props.cgpa && ` · CGPA: ${props.cgpa}`}
        </div>
      </div>

      {props.edit && (
        <button
          onClick={handleDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition-all duration-200 w-fit shrink-0"
        >
          <IconTrash size={13} /> Delete
        </button>
      )}
    </div>
  );
};

export default EducationCard;