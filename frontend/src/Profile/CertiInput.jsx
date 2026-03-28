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

  const inputStyles = {
    input: { borderRadius: "12px", borderColor: "#bfdbfe", background: "#fff", fontSize: "14px" },
    label: { fontWeight: 600, color: "#1e3a5f", fontSize: "13px", marginBottom: "4px" },
  };

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    let certs = [...(profile.certifications || [])];
    certs.push(form.getValues());
    dispatch(changeProfile({ ...profile, certifications: certs }));
    setEdit(false);
    successNotification("Success", "Certificate added successfully");
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-base sm:text-lg font-bold text-slate-900">Add Certificate</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput withAsterisk label="Title" {...form.getInputProps("name")} styles={inputStyles} />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>

      <TextInput withAsterisk label="Certificate ID" {...form.getInputProps("certificateId")} styles={inputStyles} />

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Button color="green.8" variant="filled" onClick={handleSave} styles={{ root: { borderRadius: "12px", fontWeight: 600 } }}>
          Save
        </Button>
        <Button color="red.8" variant="light" onClick={() => setEdit(false)} styles={{ root: { borderRadius: "12px", fontWeight: 600 } }}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;
