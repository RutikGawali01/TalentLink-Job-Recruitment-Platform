import SelectInput from "./SelectInput";
import fields from "../assets/Data/Profile";
import {
  Textarea,
  Checkbox,
  Button,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, isNotEmpty } from "@mantine/form";
import { changeProfile } from "../Slice/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const ExpInput = (props) => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const select = fields;

  /* ---------------- FORM ---------------- */
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      startDate: null,
      endDate: null,
      working: false,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Summary is required"),
    },
  });

  /* ---------------- PREFILL (EDIT MODE) ---------------- */
  useEffect(() => {
    if (!props.add) {
      form.setValues({
        title: props.title,
        company: props.company,
        location: props.location,
        description: props.description,
        startDate: props.startDate ? new Date(props.startDate) : null,
        endDate: props.endDate ? new Date(props.endDate) : null,
        working: props.working,
      });
    }
  }, []);


  const normalizeDate = (value) => {
  if (!value) return null;

  // already a string → return as is
  if (typeof value === "string") return value;

  // Date object → convert to ISO
  if (value instanceof Date) return value.toISOString();

  return null;
};


  /* ---------------- SAVE ---------------- */
 const handleSave = () => {
  form.validate();
  if (!form.isValid()) return;

  const values = form.getValues();

  const formattedExp = {
    ...values,
    startDate: normalizeDate(values.startDate),
    endDate: values.working
      ? null
      : normalizeDate(values.endDate),
  };

  let exp = [...(profile?.experiences || [])];

  if (props.add) {
    exp.push(formattedExp);
  } else {
    exp[props.index] = formattedExp;
  }

  const updatedProfile = {
    ...profile,
    experiences: exp,
  };

  props.setEdit(false);
  dispatch(changeProfile(updatedProfile));

  successNotification(
    "Success",
    `Experience ${props.add ? "added" : "updated"} successfully`
  );
};


  /* ---------------- UI ---------------- */
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">
        {props.add ? "Add Experience" : "Edit Experience"}
      </h3>

      {/* Job Title + Company */}
      <div className="flex gap-6 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>

      {/* Location */}
      <SelectInput form={form} name="location" {...select[2]} />

      {/* Summary */}
      <Textarea
        withAsterisk
        label="Summary"
        autosize
        minRows={3}
        placeholder="Describe your role and responsibilities"
        {...form.getInputProps("description")}
      />

      {/* Dates */}
      <div className="flex gap-6 [&>*]:w-1/2">
        <MonthPickerInput
          withAsterisk
          label="Start Date"
          placeholder="Select start date"
          value={form.values.startDate}
          onChange={(value) => form.setFieldValue("startDate", value)}
          maxDate={new Date()}
        />

        <MonthPickerInput
          withAsterisk={!form.values.working}
          label="End Date"
          placeholder="Select end date"
          value={form.values.endDate}
          onChange={(value) => form.setFieldValue("endDate", value)}
          disabled={form.values.working}
          minDate={form.values.startDate || undefined}
          maxDate={new Date()}
        />
      </div>

      {/* Currently Working */}
      <Checkbox
        label="Currently working here"
        checked={form.values.working}
        onChange={(e) => {
          form.setFieldValue("working", e.currentTarget.checked);
          if (e.currentTarget.checked) {
            form.setFieldValue("endDate", null);
          }
        }}
      />

      {/* Actions */}
      <div className="flex gap-4 mt-2">
        <Button color="green.8" variant="light" onClick={handleSave}>
          Save
        </Button>
        <Button
          color="red.8"
          variant="outline"
          onClick={() => props.setEdit(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ExpInput;
