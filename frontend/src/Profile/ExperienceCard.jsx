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
    <div className="flex flex-col gap-4">

      {/* Top Row */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3">

        <div className="flex gap-3 items-start">
          <div className="p-2 rounded-md bg-mine-shaft-800">
            <img
              className="h-6 sm:h-7"
              src={`/Icons/${props.company}.png`}
              alt=""
            />
          </div>

          <div>
            <div className="font-semibold text-base sm:text-lg">
              {props.title}
            </div>

            <div className="text-sm text-mine-shaft-300">
              {props.company} • {props.location}
            </div>
          </div>
        </div>

        <div className="text-sm text-mine-shaft-300">
          {formateDate(props.startDate)} –{" "}
          {props.working ? "Present" : formateDate(props.endDate)}
        </div>
      </div>

      {/* Description */}
      <div className="text-sm sm:text-base text-mine-shaft-300 leading-relaxed">
        {props.description}
      </div>

      {/* Actions */}
      {props.edit && (
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button
            onClick={() => setEditMode(true)}
            color="brand"
            variant="outline"
            size="sm"
            fullWidth
            className="sm:w-auto"
          >
            Edit
          </Button>

          <Button
            color="red.8"
            onClick={handleDelete}
            variant="outline"
            size="sm"
            fullWidth
            className="sm:w-auto"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;