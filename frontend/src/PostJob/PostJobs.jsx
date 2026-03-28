import SelectInput from "./SelectInput";
import {
  TagsInput,
  Button,
  Textarea,
  NumberInput,
  Box,
  Paper,
  Title,
  Text,
  Divider,
  SimpleGrid,
  Stack,
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
import { fetchCompanyByEmployerId } from "../Slice/CompanySlice";
import { useDispatch } from "react-redux";
import {
  IconBriefcase,
  IconBuilding,
  IconClock,
  IconCategory,
  IconMapPin,
  IconCurrencyRupee,
  IconCode,
  IconFileDescription,
  IconSend,
  IconDeviceFloppy,
} from "@tabler/icons-react";

const labelStyle = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "#475569",
  marginBottom: 5,
};


const PostJobs = () => {
  const { id } = useParams();
  const select = fields;
  const [editorData, setEditorData] = useState(content);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
const employerProfile = useSelector((state) => state.employerProfile);
  const company = useSelector((state) => state.company.company);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (user?.profileId) {
      dispatch(fetchCompanyByEmployerId(user.profileId));
    }
  }, [user]);

  useEffect(() => {
    if (company?.name) {
      form.setFieldValue("company", company.name);
    }
  }, [company]);

  const handlePost = () => {
    form.validate();
    if (!form.isValid()) return;
    postJob({ ...form.getValues(), id, postedBy: user.id, jobStatus: "ACTIVE" })
      .then((res) => {
        successNotification("Success", "Job Posted successfully");
        navigate(`/posted-jobs/${res.id}`);
      })
      .catch((err) =>
        errorNotification(
          "Error",
          err?.response?.data?.errorMessage || "Something went wrong",
        ),
      );
  };

  const handleDraft = () => {
    postJob({ ...form.getValues(), id, postedBy: user.id, jobStatus: "DRAFT" })
      .then((res) => {
        successNotification("Success", "Job Drafted successfully");
        navigate(`/posted-jobs/${res.id}`);
      })
      .catch((err) =>
        errorNotification(
          "Error",
          err?.response?.data?.errorMessage || "Something went wrong",
        ),
      );
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "clamp(12px, 4vw, 32px) clamp(12px, 4vw, 24px)",
      }}
    >
      <Box style={{ width: "100%", maxWidth: 780 }}>
        <Paper
          shadow="sm"
          style={{
            borderRadius: "clamp(14px, 3vw, 20px)",
            border: "1px solid rgba(226,232,240,0.8)",
            overflow: "hidden",
            background:
              "linear-gradient(160deg, #ffffff 0%, #eff6ff 50%, #dbeafe 100%)",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              height: 3,
              background:
                "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 40%, #93c5fd 70%, #1e293b 100%)",
            }}
          />

          {/* Header */}
          <Box
            px={{ base: "md", sm: "xl" }}
            pt={{ base: "md", sm: "xl" }}
            pb="md"
            style={{
              borderBottom: "1px solid rgba(59,130,246,0.08)",
              textAlign: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <Box
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#3b82f6",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(59,130,246,0.12)",
                }}
              >
                <IconBriefcase size={20} stroke={1.5} />
              </Box>
              <Title
                order={4}
                style={{
                  background:
                    "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 60%, #1e293b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.3px",
                  fontSize: "clamp(15px, 3vw, 18px)",
                }}
              >
                Post a Job
              </Title>
            </Box>
            <Text size="sm" c="dimmed" lh={1.6}>
              Create an exceptional job listing that attracts top talent
            </Text>
          </Box>

          {/* Form */}
          <Box px={{ base: "md", sm: "xl" }} py={{ base: "md", sm: "lg" }}>
            <Stack gap="md">
              <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm">
                <Box>
                  {/* <Text style={labelStyle} mb={5}>Job Title <span style={{ color: "#ef4444" }}>*</span></Text> */}
                  <SelectInput form={form} name="jobTitle" {...select[0]} />
                </Box>
                <Box>
                  {/* <Text style={labelStyle} mb={5}>Company <span style={{ color: "#ef4444" }}>*</span></Text> */}
                  <SelectInput
                    form={form}
                    name="company"
                    {...select[1]}
                    value={company?.name || ""}
                    disabled
                  />
                </Box>
              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm">
                <Box>
                  {/* <Text style={labelStyle} mb={5}>Experience <span style={{ color: "#ef4444" }}>*</span></Text> */}
                  <SelectInput form={form} name="experience" {...select[2]} />
                </Box>
                <Box>
                  {/* <Text style={labelStyle} mb={5}>Job Type <span style={{ color: "#ef4444" }}>*</span></Text> */}
                  <SelectInput form={form} name="jobType" {...select[3]} />
                </Box>
              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm">
                <Box>
                  {/* <Text style={labelStyle} mb={5}>Location <span style={{ color: "#ef4444" }}>*</span></Text> */}
                  <SelectInput form={form} name="location" {...select[4]} />
                </Box>
                <NumberInput
                  {...form.getInputProps("packageOffered")}
                  clampBehavior="strict"
                  min={1}
                  max={100}
                  label="Salary (LPA)"
                  withAsterisk
                  placeholder="Enter salary"
                  hideControls
                  leftSection={<IconCurrencyRupee size={15} />}
                  styles={{ label: labelStyle }}
                />
              </SimpleGrid>

              <TagsInput
                {...form.getInputProps("skillsRequired")}
                withAsterisk
                splitChars={[",", " ", "|"]}
                acceptValueOnBlur
                clearable
                label="Skills Required"
                placeholder="Type and press comma or space"
                leftSection={<IconCode size={15} />}
                styles={{ label: labelStyle }}
              />

              <Textarea
                {...form.getInputProps("about")}
                withAsterisk
                label="About Job"
                autosize
                minRows={3}
                placeholder="Enter about job"
                styles={{ label: labelStyle }}
              />

              <Divider style={{ borderColor: "rgba(59,130,246,0.1)" }} />

              {/* Description */}
              <Box>
                <Text style={labelStyle} mb={8}>
                  Job Description <span style={{ color: "#ef4444" }}>*</span>
                </Text>
                <Box
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    border: "1px solid rgba(59,130,246,0.15)",
                    boxShadow: "0 2px 8px rgba(59,130,246,0.06)",
                  }}
                >
                  <TextEditor form={form} data={editorData} />
                </Box>
              </Box>

              {/* Buttons */}
              <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm" mt="sm">
                <Button
                  fullWidth
                  onClick={handlePost}
                  radius="md"
                  leftSection={<IconSend size={15} />}
                  style={{
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e293b 100%)",
                    boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    height: "clamp(38px, 5vw, 44px)",
                  }}
                >
                  Publish Job
                </Button>
                <Button
                  fullWidth
                  onClick={handleDraft}
                  radius="md"
                  variant="outline"
                  leftSection={<IconDeviceFloppy size={15} />}
                  style={{
                    borderColor: "#3b82f6",
                    color: "#1e3a8a",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    height: "clamp(38px, 5vw, 44px)",
                  }}
                >
                  Save as Draft
                </Button>
              </SimpleGrid>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default PostJobs;
