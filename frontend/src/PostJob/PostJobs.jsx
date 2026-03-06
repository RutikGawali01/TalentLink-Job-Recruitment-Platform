import SelectInput from "./SelectInput";
import {
  TagsInput,
  Button,
  useMantineTheme,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { fields, content } from "../assets/Data/PostJob";
import TextEditor from "./TextEditor";
import { useForm, isNotEmpty } from "@mantine/form";
import { postJob, getJob } from "../Services/JobService";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJobs = () => {
  const { id } = useParams();
  const select = fields;
  const [editorData, setEditorData] = useState(content);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const theme = useMantineTheme();

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about: "",
      description: content,
    },
    validate: {
      jobTitle: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      experience: isNotEmpty("Experience is required"),
      jobType: isNotEmpty("Job Type is required"),
      location: isNotEmpty("Location is required"),
      packageOffered: isNotEmpty("Package is required"),
      skillsRequired: isNotEmpty("Skills are required"),
      about: isNotEmpty("About is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id !== "0") {
      getJob(id)
        .then((res) => {
          setEditorData(res.description);
          form.setValues(res);
        })
        .catch((err) => console.log(err));
    } else {
      form.reset();
      setEditorData(content);
    }
  }, [id]);

  const handlePost = () => {
    form.validate();
    if (!form.isValid()) return;

    postJob({
      ...form.getValues(),
      id,
      postedBy: user.id,
      jobStatus: "ACTIVE",
    })
      .then((res) => {
        successNotification("Success", "Job Posted successfully");
        navigate(`/posted-jobs/${res.id}`);
      })
      .catch((err) => {
        const errorMsg =
          err?.response?.data?.errorMessage || "Something went wrong";
        errorNotification("Error", errorMsg);
      });
  };

  const handleDraft = () => {
    postJob({
      ...form.getValues(),
      id,
      postedBy: user.id,
      jobStatus: "DRAFT",
    })
      .then((res) => {
        successNotification("Success", "Job Drafted successfully");
        navigate(`/posted-jobs/${res.id}`);
      })
      .catch((err) => {
        const errorMsg =
          err?.response?.data?.errorMessage || "Something went wrong";
        errorNotification("Error", errorMsg);
      });
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-12">
      <div
        className="
        w-full
        sm:w-[95%]
        md:w-[90%]
        lg:w-[85%]
        xl:w-[75%]
        mx-auto
        bg-white
        border-default
        p-6 sm:p-8 lg:p-10
        rounded-2xl
        shadow-sm
      "
      >
        {/* Header */}
        <div className="text-xl sm:text-2xl lg:text-3xl text-center font-semibold">
          Post a Job
        </div>

        <div className="text-center text-tertiary text-sm sm:text-base mt-2">
          Create an exceptional job listing that attracts top talent
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-6 mt-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SelectInput form={form} name="experience" {...select[2]} />
            <SelectInput form={form} name="jobType" {...select[3]} />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SelectInput form={form} name="location" {...select[4]} />
            <NumberInput
              {...form.getInputProps("packageOffered")}
              clampBehavior="strict"
              min={1}
              max={100}
              label="Salary (LPA)"
              withAsterisk
              placeholder="Enter salary"
              hideControls
            />
          </div>

          {/* Skills */}
          <TagsInput
            {...form.getInputProps("skillsRequired")}
            withAsterisk
            splitChars={[",", " ", "|"]}
            acceptValueOnBlur
            clearable
            label="Skills"
            placeholder="Enter skills"
          />

          {/* About */}
          <Textarea
            {...form.getInputProps("about")}
            withAsterisk
            label="About Job"
            autosize
            minRows={3}
            placeholder="Enter about job"
          />
        </div>

        {/* Description */}
        <div
          className="
          flex flex-col gap-5 mt-8
          [&_button[data-active='true']]:!text-[var(--blue-600)]
          [&_button[data-active='true']]:!bg-[var(--blue-600)]/20
        "
        >
          <div className="text-sm font-medium">
            Job Description:{" "}
            <span className="text-red-500">*</span>
          </div>

          <TextEditor form={form} data={editorData} />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Button
            color="brand"
            onClick={handlePost}
            variant="filled"
            className="w-full sm:w-auto"
          >
            Publish Job
          </Button>

          <Button
            color="brand"
            onClick={handleDraft}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;