import { Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { formateDate } from "../Services/Utilities";

const EducationCard = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const handleDelete = async () => {
  try {
    let edu = [...profile.educations];
    edu.splice(props.index, 1);

    await dispatch(
      changeProfile({ ...profile, educations: edu })
    ).unwrap();

    successNotification(
      "Success",
      "Education deleted successfully"
    );
  } catch (error) {
    errorNotification(
      "Error",
      "Failed to delete education"
    );
  }
};



  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{props.degree}</div>
          <div className="text-sm text-blue-600 font-medium">
            {props.institution}
          </div>
          <div className="text-sm text-slate-500">
            {props.location} •{" "}
            {formateDate(props.startDate)} – {formateDate(props.endDate)}
            {props.cgpa && ` • CGPA: ${props.cgpa}`}
          </div>
        </div>
      </div>

      {props.edit && (
        <div className="flex gap-4 mt-2">
          <Button color="red.8" variant="outline" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default EducationCard;
