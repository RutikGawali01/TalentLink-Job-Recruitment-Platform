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

    dispatch(
      changeProfile({ ...profile, certifications: certi })
    );

    successNotification("Success", "Certificate deleted successfully");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

      {/* Left Section */}
      <div className="flex gap-3 items-start">
        <div className="p-2 rounded-md bg-mine-shaft-800">
          <img
            className="h-6 sm:h-7"
            src={`/Icons/${props.issuer}.png`}
            alt=""
          />
        </div>

        <div>
          <div className="font-semibold text-base sm:text-lg">
            {props.name}
          </div>

          <div className="text-sm text-mine-shaft-300">
            {props.issuer}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-between sm:flex-col sm:items-end gap-2 w-full sm:w-auto">

        <div className="text-sm text-mine-shaft-300">
          {formateDate(props.issueDate)}
        </div>

        <div className="text-sm text-mine-shaft-300">
          ID: {props.certificateId}
        </div>

        {props.edit && (
          <ActionIcon
            size="lg"
            variant="subtle"
            color="red.8"
            onClick={handleDelete}
          >
            <IconTrash size={18} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};

export default CertificationCard;