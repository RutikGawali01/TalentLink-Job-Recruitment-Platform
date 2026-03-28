import SelectInput from "./SelectInput";
import fields from "../assets/Data/Profile";
import { Textarea, Checkbox, Button } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, isNotEmpty } from "@mantine/form";
import { changeProfile } from "../Slice/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const ExpInput = (props) => {
  const profile = useSelector((state) => state.profile.data);
  const dispatch = useDispatch();
  const select = fields;

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
    if (typeof value === "string") return value;
    if (value instanceof Date) return value.toISOString();
    return null;
  };

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    const values = form.getValues();
    const formattedExp = {
      ...values,
      startDate: normalizeDate(values.startDate),
      endDate: values.working ? null : normalizeDate(values.endDate),
    };
    let exp = [...(profile?.experiences || [])];
    if (props.add) exp.push(formattedExp);
    else exp[props.index] = formattedExp;
    dispatch(changeProfile({ ...profile, experiences: exp }));
    props.setEdit(false);
    successNotification("Success", `Experience ${props.add ? "added" : "updated"} successfully`);
  };

  const inputStyles = {
    input: { borderRadius: "12px", borderColor: "#bfdbfe", background: "#fff", fontSize: "14px" },
    label: { fontWeight: 600, color: "#1e3a5f", fontSize: "13px", marginBottom: "4px" },
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-base sm:text-lg font-bold text-slate-900">
        {props.add ? "Add Experience" : "Edit Experience"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>

      <SelectInput form={form} name="location" {...select[2]} />

      <Textarea
        withAsterisk
        label="Summary"
        autosize
        minRows={3}
        placeholder="Describe your role and responsibilities"
        {...form.getInputProps("description")}
        styles={{
          input: { borderRadius: "12px", borderColor: "#bfdbfe", background: "#fff", fontSize: "14px" },
          label: { fontWeight: 600, color: "#1e3a5f", fontSize: "13px", marginBottom: "4px" },
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MonthPickerInput
          withAsterisk
          label="Start Date"
          value={form.values.startDate}
          onChange={(v) => form.setFieldValue("startDate", v)}
          maxDate={new Date()}
          styles={inputStyles}
        />
        <MonthPickerInput
          withAsterisk={!form.values.working}
          label="End Date"
          value={form.values.endDate}
          onChange={(v) => form.setFieldValue("endDate", v)}
          disabled={form.values.working}
          minDate={form.values.startDate || undefined}
          maxDate={new Date()}
          styles={inputStyles}
        />
      </div>

      <Checkbox
        label="Currently working here"
        checked={form.values.working}
        onChange={(e) => {
          form.setFieldValue("working", e.currentTarget.checked);
          if (e.currentTarget.checked) form.setFieldValue("endDate", null);
        }}
        styles={{
          label: { fontWeight: 500, color: "#374151", fontSize: "14px" },
          input: { borderColor: "#93c5fd", cursor: "pointer" },
        }}
      />

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
          onClick={() => props.setEdit(false)}
          styles={{ root: { borderRadius: "12px", fontWeight: 600 } }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ExpInput;