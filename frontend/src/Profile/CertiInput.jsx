import { Button, TextInput } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import SelectInput from "./SelectInput";
import fields from "../assets/Data/Profile";

const CertiInput = ({ add, setEdit }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const select = fields;

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      issuer: isNotEmpty("Issuer is required"),
      certificateId: isNotEmpty("Certificate ID is required"),
    },
  });

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    let certs = [...(profile.certifications || [])];
    certs.push(form.getValues());

    dispatch(
      changeProfile({
        ...profile,
        certifications: certs,
      })
    );

    setEdit(false);
    successNotification("Success", "Certificate added successfully");
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg sm:text-xl font-semibold">
        Add Certificate
      </h3>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          {...form.getInputProps("name")}
          withAsterisk
          label="Title"
        />

        <SelectInput
          form={form}
          name="issuer"
          {...select[1]}
        />
      </div>

      <TextInput
        {...form.getInputProps("certificateId")}
        withAsterisk
        label="Certificate ID"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          color="green.8"
          variant="filled"
          onClick={handleSave}
          fullWidth
          className="sm:w-auto"
        >
          Save
        </Button>

        <Button
          color="red.8"
          variant="light"
          onClick={() => setEdit(false)}
          fullWidth
          className="sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;