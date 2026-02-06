import { Button, TextInput } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import SelectInput from "./SelectInput";
import fields from "../assets/Data/Profile";

const normalizeDate = (value) => {
  if (!value) return null;

  if (typeof value === "string") {
    if (value.length === 10) return `${value}T00:00:00`;
    return value;
  }

  if (value instanceof Date) return value.toISOString();
  return null;
};

const CertiInput = ({ add, setEdit }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
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
      issueDate: isNotEmpty("Issue date is required"),
      certificateId: isNotEmpty("Certificate ID is required"),
    },
  });

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    const values = form.getValues();

    const formattedCert = {
      ...values,
      issueDate: normalizeDate(values.issueDate),
    };

    let certs = [...(profile.certifications || [])];
    certs.push(formattedCert);

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
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Add Certificate</h3>

      <div className="flex gap-6 [&>*]:w-1/2">
        <TextInput
          {...form.getInputProps("name")}
          withAsterisk
          label="Title"
          placeholder="Enter certificate title"
        />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>

      <div className="flex gap-6 [&>*]:w-1/2">
        {/* Use MonthPickerInput later if needed */}
        <TextInput
          {...form.getInputProps("certificateId")}
          withAsterisk
          label="Certificate ID"
          placeholder="Enter ID"
        />
      </div>

      <div className="flex gap-4">
        <Button color="green.8" variant="light" onClick={handleSave}>
          Save
        </Button>
        <Button color="red.8" variant="outline" onClick={() => setEdit(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;
