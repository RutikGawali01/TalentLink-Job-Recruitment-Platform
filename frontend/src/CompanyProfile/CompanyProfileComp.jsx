import {
  TextInput,
  Textarea,
  Select,
  Button,
  Text,
  Title,
  Avatar,
  FileButton,
  Paper,
  Stack,
  Loader,
  Box,
  Divider,
  SimpleGrid,
} from "@mantine/core";
import { IconCamera, IconBuilding, IconMail, IconWorld, IconMapPin, IconCalendar, IconBriefcase, IconUsers, IconHome, IconBolt } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { updateUser } from "../Slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { fetchCompanyByEmployerId, saveCompanyProfile } from "../Slice/CompanySlice";

const labelStyle = {
  fontSize: 11, fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "#475569", marginBottom: 5
};

export default function CompanyProfileComp() {
  const dispatch = useDispatch();
  const { company, loading } = useSelector((state) => state.company);
  const employer = useSelector((state) => state.employerProfile);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      id: null, name: "", email: "", tagline: "", industry: "",
      location: "", about: "", companyType: "", companySize: "",
      workModel: "", website: "", foundedYear: "", logo: null,
      employerId: null, profileCompleted: false, verified: false,
    },
    validate: {
      name: (v) => v.trim().length < 2 ? "Company name must contain at least 2 characters" : null,
      email: (v) => /^\S+@\S+\.\S+$/.test(v) ? null : "Invalid company email",
      tagline: (v) => v.trim().length < 5 ? "Tagline should contain at least 5 characters" : null,
      industry: (v) => !v ? "Please select industry" : null,
      location: (v) => v.trim().length < 2 ? "Location is required" : null,
      about: (v) => v.trim().length < 20 ? "Company description must be at least 20 characters" : null,
      companyType: (v) => !v ? "Please select company type" : null,
      companySize: (v) => !v ? "Please select company size" : null,
      workModel: (v) => !v ? "Please select work model" : null,
      website: (v) => v && !/^https?:\/\/.+/.test(v) ? "Website must start with http:// or https://" : null,
      foundedYear: (v) => {
        if (!v) return "Founded year is required";
        const year = Number(v);
        if (year < 1800 || year > new Date().getFullYear()) return "Enter a valid founded year";
        return null;
      },
      logo: (v) => !v ? "Company logo is required" : null,
    },
  });

  useEffect(() => {
    if (employer?.id) dispatch(fetchCompanyByEmployerId(employer.id));
  }, [employer]);

  useEffect(() => {
    if (company) { form.setValues(company); form.resetDirty(); }
  }, [company]);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

  const handleLogo = async (file) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    form.setFieldValue("logo", base64);
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        employerId: employer.id,
        profileCompleted: true,
        foundedYear: values.foundedYear ? Number(values.foundedYear) : null
      };
      const res = await dispatch(saveCompanyProfile(payload)).unwrap();
      successNotification("Company saved successfully ✅");
      dispatch(updateUser({ onboardingStep: 4, companyId: res.id || null }));


      navigate("/post-job/0");
    } catch (err) {
      
      errorNotification(err?.response?.data?.message || "Failed to save company ❌");
    }
  };

  return (
    <Box style={{
      minHeight: "100vh",
      background: "#f1f5f9",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "clamp(12px, 4vw, 32px) clamp(12px, 4vw, 24px)",
    }}>
      <Box style={{ width: "100%", maxWidth: 720 }}>

        <Paper shadow="sm" style={{
          borderRadius: "clamp(14px, 3vw, 20px)",
          border: "1px solid rgba(226,232,240,0.8)",
          overflow: "hidden",
          background: "linear-gradient(160deg, #ffffff 0%, #eff6ff 50%, #dbeafe 100%)"
        }}>
          {/* Top gradient bar */}
          <div style={{ height: 3, background: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 40%, #93c5fd 70%, #1e293b 100%)" }} />

          {/* Header */}
          <Box
            px={{ base: "md", sm: "xl" }}
            pt={{ base: "md", sm: "xl" }}
            pb="md"
            style={{ borderBottom: "1px solid rgba(59,130,246,0.08)" }}
          >
            <Box style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <Box style={{
                width: 44, height: 44, borderRadius: 12,
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                border: "1px solid rgba(59,130,246,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#3b82f6", flexShrink: 0,
                boxShadow: "0 2px 8px rgba(59,130,246,0.12)"
              }}>
                <IconBuilding size={20} stroke={1.5} />
              </Box>
              <Box>
                <Title order={4} style={{
                  background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 60%, #1e293b 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text", letterSpacing: "-0.3px",
                  fontSize: "clamp(15px, 3vw, 18px)"
                }}>
                  Company Profile
                </Title>
                <Text size="xs" tt="uppercase" fw={600} c="dimmed" style={{ letterSpacing: "0.08em" }}>
                  Employer Setup
                </Text>
              </Box>
            </Box>
            <Text size="sm" c="dimmed" lh={1.6} mt="xs">
              Fill in your company details to start posting jobs and attracting talent.
            </Text>
          </Box>

          {/* Body */}
          <Box px={{ base: "md", sm: "xl" }} py={{ base: "md", sm: "lg" }}>

            {/* Logo upload */}
            <Box style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <Box style={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={form.values.logo ? `data:image/jpeg;base64,${form.values.logo}` : null}
                  size={88}
                  radius="xl"
                  style={{
                    border: "3px solid rgba(59,130,246,0.2)",
                    boxShadow: "0 4px 14px rgba(59,130,246,0.15)"
                  }}
                />
                <FileButton accept="image/*" onChange={handleLogo}>
                  {(props) => (
                    <Button
                      {...props}
                      size="xs"
                      radius="xl"
                      style={{
                        position: "absolute", bottom: -4, right: -4,
                        background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                        boxShadow: "0 2px 8px rgba(59,130,246,0.4)",
                        padding: "4px 8px", minWidth: "unset"
                      }}
                    >
                      <IconCamera size={13} />
                    </Button>
                  )}
                </FileButton>
              </Box>
            </Box>
            {form.errors.logo && (
              <Text size="xs" c="red" ta="center" mb="sm">{form.errors.logo}</Text>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="sm">

                {/* Name + Email */}
                <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm">
                  <TextInput
                    label="Company Name" placeholder="Acme Inc." required
                    leftSection={<IconBuilding size={15} />}
                    styles={{ label: labelStyle }}
                    {...form.getInputProps("name")}
                  />
                  <TextInput
                    label="Company Email" placeholder="hello@acme.com" required type="email"
                    leftSection={<IconMail size={15} />}
                    styles={{ label: labelStyle }}
                    {...form.getInputProps("email")}
                  />
                </SimpleGrid>

                {/* Website + Location */}
                <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm">
                  <TextInput
                    label="Website" placeholder="https://acme.com" required
                    leftSection={<IconWorld size={15} />}
                    styles={{ label: labelStyle }}
                    {...form.getInputProps("website")}
                  />
                  <TextInput
                    label="Location" placeholder="City, Country" required
                    leftSection={<IconMapPin size={15} />}
                    styles={{ label: labelStyle }}
                    {...form.getInputProps("location")}
                  />
                </SimpleGrid>

                {/* Tagline */}
                <TextInput
                  label="Tagline" placeholder="Your company's short tagline"
                  leftSection={<IconBolt size={15} />}
                  styles={{ label: labelStyle }}
                  {...form.getInputProps("tagline")}
                />

                {/* About */}
                <Textarea
                  label="About Company"
                  placeholder="Write a short description about the company"
                  minRows={3} autosize required
                  styles={{ label: labelStyle }}
                  {...form.getInputProps("about")}
                />

                <Divider style={{ borderColor: "rgba(59,130,246,0.1)" }} />

                {/* Industry + Type + Size */}
                <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }} spacing="sm">
                  <Select
                    label="Industry" placeholder="Select industry" required
                    leftSection={<IconBriefcase size={15} />}
                    data={["IT", "Finance", "Healthcare", "Education", "Other"]}
                    styles={{ label: labelStyle }}
                    {...form.getInputProps("industry")}
                  />
                  <Select
                    label="Company Type" placeholder="Select type" required
                    leftSection={<IconBuilding size={15} />}
                    data={["Startup", "Private", "Public", "MNC"]}
                    styles={{ label: labelStyle }}
                    {...form.getInputProps("companyType")}
                  />
                  <Select
                    label="Company Size" placeholder="Select size" required
                    leftSection={<IconUsers size={15} />}
                    data={["1-10", "11-50", "51-200", "201-500", "500+"]}
                    styles={{ label: labelStyle }}
                    {...form.getInputProps("companySize")}
                  />
                </SimpleGrid>

                {/* Work Model + Founded Year */}
                <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm">
                  <Select
                    label="Work Model" placeholder="Select work model" required
                    leftSection={<IconHome size={15} />}
                    data={["Onsite", "Remote", "Hybrid"]}
                    styles={{ label: labelStyle }}
                    {...form.getInputProps("workModel")}
                  />
                  <TextInput
                    label="Founded Year" placeholder="e.g. 2010" type="number" required
                    leftSection={<IconCalendar size={15} />}
                    styles={{ label: labelStyle }}
                    {...form.getInputProps("foundedYear")}
                  />
                </SimpleGrid>

                <Button
                  fullWidth mt="sm" type="submit" disabled={loading} radius="md"
                  style={{
                    background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e293b 100%)",
                    boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
                    fontWeight: 700, letterSpacing: "0.02em",
                    height: "clamp(38px, 5vw, 44px)",
                    fontSize: "clamp(13px, 2vw, 14px)"
                  }}
                >
                  {loading ? <Loader size="sm" color="white" /> : "Save Company Profile"}
                </Button>

              </Stack>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}