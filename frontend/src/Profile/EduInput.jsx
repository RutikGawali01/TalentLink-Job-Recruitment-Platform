import { Button, TextInput } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { errorNotification, successNotification } from "../Services/NotificationService";

/* ---- SAME DATE NORMALIZER ---- */
const normalizeLocalDate = (value) => {
  if (!value) return null;

  if (typeof value === "string") {
    // Already yyyy-MM-dd
    if (value.length === 10) return value;

    // ISO string → extract date
    return value.split("T")[0];
  }

  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  return null;
};


const EduInput = ({ add, setEdit }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

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

        await dispatch(
        changeProfile({ ...profile, educations: edu })
        ).unwrap();

        setEdit(false);

        successNotification(
        "Success",
        "Education added successfully"
        );
    } catch (error) {
        errorNotification(
        "Error",
        "Failed to add education"
        );
    }
    };


  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Add Education</h3>

      <TextInput
        {...form.getInputProps("degree")}
        withAsterisk
        label="Degree"
      />

      <TextInput
        {...form.getInputProps("institution")}
        withAsterisk
        label="Institution"
      />

      <TextInput
        {...form.getInputProps("location")}
        withAsterisk
        label="Location"
      />

      <div className="flex gap-6 [&>*]:w-1/2">
        <MonthPickerInput
          label="Start Date"
          value={form.values.startDate}
          onChange={(v) => form.setFieldValue("startDate", v)}
          maxDate={new Date()}
        />
        <MonthPickerInput
          label="End Date"
          value={form.values.endDate}
          onChange={(v) => form.setFieldValue("endDate", v)}
          maxDate={new Date()}
        />
      </div>

      <TextInput
        {...form.getInputProps("cgpa")}
        label="CGPA (optional)"
      />

      <div className="flex gap-4">
        <Button color="green.8" variant="light" onClick={handleSave}>
          Save
        </Button>
        <Button
          color="red.8"
          variant="outline"
          onClick={() => setEdit(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EduInput;
