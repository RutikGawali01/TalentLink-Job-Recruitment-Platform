import { Button, TextInput } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";

const normalizeLocalDate = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value.split("T")[0];
  if (value instanceof Date) return value.toISOString().split("T")[0];
  return null;
};

const EduInput = ({ add, setEdit }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      degree: "",
      institution: "",
      location: "",
      cgpa: "",
      startDate: new Date(),
      endDate: new Date(),
    },
    validate: {
      degree: isNotEmpty("Degree is required"),
      institution: isNotEmpty("Institution is required"),
      location: isNotEmpty("Location is required"),
    },
  });

  const inputStyles = {
    input: { borderRadius: "12px", borderColor: "#bfdbfe", background: "#fff", fontSize: "14px" },
    label: { fontWeight: 600, color: "#1e3a5f", fontSize: "13px", marginBottom: "4px" },
  };

  const handleSave = async () => {
    form.validate();
    if (!form.isValid()) return;
    try {
      const values = form.getValues();
      const formattedEdu = {
        ...values,
        cgpa: values.cgpa === "" ? null : Number(values.cgpa),
        startDate: normalizeLocalDate(values.startDate),
        endDate: normalizeLocalDate(values.endDate),
      };
      let edu = [...(profile.educations || [])];
      edu.push(formattedEdu);
      await dispatch(changeProfile({ ...profile, educations: edu })).unwrap();
      setEdit(false);
      successNotification("Success", "Education added successfully");
    } catch (error) {
      errorNotification("Error", "Failed to add education");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-base sm:text-lg font-bold text-slate-900">Add Education</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput withAsterisk label="Degree" {...form.getInputProps("degree")} styles={inputStyles} />
        <TextInput withAsterisk label="Institution" {...form.getInputProps("institution")} styles={inputStyles} />
        <TextInput withAsterisk label="Location" {...form.getInputProps("location")} styles={inputStyles} />
        <TextInput label="CGPA (optional)" {...form.getInputProps("cgpa")} styles={inputStyles} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MonthPickerInput
          label="Start Date"
          value={form.values.startDate}
          onChange={(v) => form.setFieldValue("startDate", v)}
          maxDate={new Date()}
          styles={inputStyles}
        />
        <MonthPickerInput
          label="End Date"
          value={form.values.endDate}
          onChange={(v) => form.setFieldValue("endDate", v)}
          styles={inputStyles}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Button
          color="green.8"
          variant="filled"
          onClick={handleSave}
          styles={{ root: { borderRadius: "12px", fontWeight: 600 } }}
        >
          Save
        </Button>
        <Button
          color="red.8"
          variant="light"
          onClick={() => setEdit(false)}
          styles={{ root: { borderRadius: "12px", fontWeight: 600 } }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EduInput;