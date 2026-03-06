import { Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { formateDate } from "../Services/Utilities";

const EducationCard = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  const handleDelete = async () => {
    try {
      let edu = [...profile.educations];
      edu.splice(props.index, 1);

      await dispatch(
        changeProfile({ ...profile, educations: edu })
      ).unwrap();

      successNotification("Success", "Education deleted successfully");
    } catch (error) {
      errorNotification("Error", "Failed to delete education");
    }
  };

  return (
    <div className="flex flex-col gap-3">

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
        <div>
          <div className="font-semibold text-base sm:text-lg">
            {props.degree}
          </div>

          <div className="text-sm sm:text-base text-blue-600 font-medium">
            {props.institution}
          </div>

          <div className="text-sm text-slate-500">
            {props.location} •{" "}
            {formateDate(props.startDate)} – {formateDate(props.endDate)}
            {props.cgpa && ` • CGPA: ${props.cgpa}`}
          </div>
        </div>

        {props.edit && (
          <Button
            color="red.8"
            variant="light"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default EducationCard;