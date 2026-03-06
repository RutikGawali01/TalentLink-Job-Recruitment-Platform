import {
  TextInput,
  Textarea,
  Select,
  Button,
  Text,
  Avatar,
  FileButton,
  Paper,
  Stack,
  Loader,
} from "@mantine/core";
import { IconCamera } from "@tabler/icons-react";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { updateUser } from "../Slice/UserSlice";
import { useNavigate } from "react-router-dom";

import {
  fetchCompanyByEmployerId,
  saveCompanyProfile,
} from "../Slice/CompanySlice";

export default function CompanyProfileComp() {
  const dispatch = useDispatch();
  const { company, loading } = useSelector((state) => state.company);
  const employer = useSelector((state) => state.employerProfile);
  const navigate = useNavigate();

  // ================= FORM =================
  const form = useForm({
    initialValues: {
      id: null,
      name: "",
      email: "",
      tagline: "",
      industry: "",
      location: "",
      about: "",
      companyType: "",
      companySize: "",
      workModel: "",
      website: "",
      foundedYear: "",
      logo: null,
      employerId: null,
      profileCompleted: false,
      verified: false,
    },

    validate: {
      name: (value) =>
        value.trim().length < 2
          ? "Company name must contain at least 2 characters"
          : null,

      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid company email",

      tagline: (value) =>
        value.trim().length < 5
          ? "Tagline should contain at least 5 characters"
          : null,

      industry: (value) => (!value ? "Please select industry" : null),

      location: (value) =>
        value.trim().length < 2 ? "Location is required" : null,

      about: (value) =>
        value.trim().length < 20
          ? "Company description must be at least 20 characters"
          : null,

      companyType: (value) =>
        !value ? "Please select company type" : null,

      companySize: (value) =>
        !value ? "Please select company size" : null,

      workModel: (value) =>
        !value ? "Please select work model" : null,

      website: (value) =>
        value && !/^https?:\/\/.+/.test(value)
          ? "Website must start with http:// or https://"
          : null,

      foundedYear: (value) => {
        if (!value) return "Founded year is required";
        const year = Number(value);
        const currentYear = new Date().getFullYear();

        if (year < 1800 || year > currentYear) {
          return "Enter a valid founded year";
        }
        return null;
      },

      logo: (value) => (!value ? "Company logo is required" : null),
    },
  });

  // ================= LOAD COMPANY =================
  useEffect(() => {
    if (employer?.id) {
      dispatch(fetchCompanyByEmployerId(employer.id));
    }
  }, [employer]);

  // ================= SYNC REDUX → FORM =================
  useEffect(() => {
    if (company) {
      form.setValues(company);
      form.resetDirty();
    }
  }, [company]);

  // ================= IMAGE → BASE64 =================
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

  // ================= SUBMIT =================
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        employerId: employer.id,
        profileCompleted: true,
        foundedYear: values.foundedYear
          ? Number(values.foundedYear)
          : null,
      };

      const res = await dispatch(saveCompanyProfile(payload)).unwrap();

      successNotification("Company saved successfully ✅");

      dispatch(
        updateUser({
          onboardingStep: 3,
          companyId: res?.id || null,
        })
      );

      navigate("/post-job/0");
    } catch (err) {
      console.error(err);
      errorNotification(
        err?.response?.data?.message || "Failed to save company ❌"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 sm:p-6">
      <Paper radius="lg" shadow="sm" p="lg" className="w-full max-w-3xl">
        <Text fw={700} size="lg">
          Company Profile
        </Text>

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="relative inline-block">
            <Avatar
              src={
                form.values.logo
                  ? `data:image/jpeg;base64,${form.values.logo}`
                  : null
              }
              size={100}
              radius="xl"
            />

            <FileButton accept="image/*" onChange={handleLogo}>
              {(props) => (
                <Button
                  {...props}
                  size="xs"
                  radius="xl"
                  className="absolute bottom-5 left-20"
                >
                  <IconCamera size={14} />
                </Button>
              )}
            </FileButton>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="sm" className="mt-2">

            <TextInput
              label="Company Name"
              placeholder="Enter company name"
              required
              {...form.getInputProps("name")}
            />

            <TextInput
              label="Company Email"
              placeholder="Enter company email"
              required
              type="email"
              {...form.getInputProps("email")}
            />

            <TextInput
              label="Tagline"
              placeholder="Enter company tagline"
              {...form.getInputProps("tagline")}
            />

            <Select
              label="Industry"
              placeholder="Select industry"
              required
              data={["IT", "Finance", "Healthcare", "Education", "Other"]}
              {...form.getInputProps("industry")}
            />

            <TextInput
              label="Location"
              placeholder="Enter company location"
              required
              {...form.getInputProps("location")}
            />

            <Textarea
              label="About Company"
              placeholder="Write a short description about the company"
              minRows={3}
              autosize
              required
              {...form.getInputProps("about")}
            />

            <Select
              label="Company Type"
              placeholder="Select company type"
              required
              data={["Startup", "Private", "Public", "MNC"]}
              {...form.getInputProps("companyType")}
            />

            <Select
              label="Company Size"
              placeholder="Select company size"
              required
              data={["1-10", "11-50", "51-200", "201-500", "500+"]}
              {...form.getInputProps("companySize")}
            />

            <Select
              label="Work Model"
              placeholder="Select work model"
              required
              data={["Onsite", "Remote", "Hybrid"]}
              {...form.getInputProps("workModel")}
            />

            <TextInput
              label="Website"
              required
              placeholder="Enter company website URL"
              {...form.getInputProps("website")}
            />

            <TextInput
              label="Founded Year"
              placeholder="Enter founding year"
              type="number"
              required
              {...form.getInputProps("foundedYear")}
            />

            <Button fullWidth mt="md" type="submit" disabled={loading}>
              {loading ? <Loader size="sm" /> : "Save Company"}
            </Button>

          </Stack>
        </form>
      </Paper>
    </div>
  );
}