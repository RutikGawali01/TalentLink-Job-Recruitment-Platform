import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formateDate } from "../Services/Utilities";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { successNotification } from "../Services/NotificationService";


const CertificationCard = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  const handleDelete = () => {
    let certi = [...profile.certifications];
    certi.splice(props.index, 1);
    dispatch(changeProfile({ ...profile, certifications: certi }));
    successNotification("Success", "Certificate deleted successfully");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
      {/* Left */}
      <div className="flex gap-3 items-start">
        <div className="p-2 rounded-xl bg-slate-900 shadow-sm shrink-0">
          <img className="h-6 sm:h-7" src={`/Icons/${props.issuer}.png`} alt="" />
        </div>
        <div>
          <div className="font-semibold text-slate-900 text-sm sm:text-base">{props.name}</div>
          <div className="text-xs text-blue-600 font-medium mt-0.5">{props.issuer}</div>
        </div>
      </div>

      {/* Right */}
      <div className="flex sm:flex-col items-start sm:items-end gap-2 justify-between w-full sm:w-auto">
        <div>
          <div className="text-xs text-slate-400">{formateDate(props.issueDate)}</div>
          <div className="text-xs text-slate-400 mt-0.5">ID: {props.certificateId}</div>
        </div>
        {props.edit && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-100 transition-all duration-200"
          >
            <IconTrash size={13} /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;