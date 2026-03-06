import {
  TextInput,
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
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setUser } from "../Slice/UserSlice";
import { updateUser } from "../Slice/UserSlice";

import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { changeProfile } from "../Slice/EmployerProfileSlice";

export default function EmployerProfileComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileId } = useParams(); // 🔥 get from URL

  const employerProfile = useSelector((state) => state.employerProfile);

  const [loading, setLoading] = useState(false);

  // ---------- Base64 Converter ----------
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // ---------- Form ----------
  const form = useForm({
    mode: "controlled",
    initialValues: {
      fullName: "",
      email: "",
      role: "",
      phone: "",
      profilePicture: null,
      banner: null,
      companyId: null,
    },

    validate: {
      fullName: (value) =>
        value.trim().length < 3
          ? "Full name must be at least 3 characters"
          : null,

      role: (value) => (!value ? "Please select your role" : null),

      phone: (value) => {
        if (!value) return null;
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(value)
          ? null
          : "Enter valid 10-digit phone number";
      },
    },
  });

  // ---------- Load Redux → Form ----------
  useEffect(() => {
    if (employerProfile && Object.keys(employerProfile).length > 0) {
      form.setValues(employerProfile);
      form.resetDirty();
    }
  }, [employerProfile]);

  // ---------- Image Upload ----------
  const handleProfileImage = async (file) => {
    try {
      if (!file) return;
      const dataUrl = await fileToBase64(file);
      const base64 = dataUrl.split(",")[1];
      form.setFieldValue("profilePicture", base64);
    } catch {
      errorNotification("Failed to process profile image");
    }
  };

  const handleBannerImage = async (file) => {
    try {
      if (!file) return;
      const dataUrl = await fileToBase64(file);
      const base64 = dataUrl.split(",")[1];
      form.setFieldValue("banner", base64);
    } catch {
      errorNotification("Failed to process banner image");
    }
  };

  // ---------- Submit (Create / Update) ----------
  const handleSubmit = async () => {
    const validation = form.validate();
    if (validation.hasErrors) return;

    setLoading(true);

    try {
      const payload = {
        id: profileId || employerProfile?.id || null,
        fullName: form.values.fullName.trim(),
        email: form.values.email,
        role: form.values.role,
        phone: form.values.phone,
        profilePicture: form.values.profilePicture,
        banner: form.values.banner,
        companyId: form.values.companyId,
      };

      // 🔥 Save profile
      const res = await dispatch(changeProfile(payload)).unwrap();

      successNotification(
        employerProfile?.id
          ? "Profile updated successfully ✅"
          : "Profile created successfully ✅",
      );

      form.resetDirty();

      // =====================================================
      // 🔥 Sync onboarding step locally (backend already set → 2)
      // =====================================================
      dispatch(
        updateUser({
          onboardingStep: 2, // move to Company step
        }),
      );

      // =====================================================
      // 🔥 Redirect to Company Page
      // =====================================================
      navigate(`/employer/company-profile/${profileId}`);
    } catch (error) {
      console.error(error);
      errorNotification(
        error?.response?.data?.message || "Failed to save profile ❌",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 sm:p-6">
      <Paper radius="lg" shadow="sm" p="lg" className="w-full max-w-2xl">
        <Text fw={600} size="lg">
          Recruiter Profile
        </Text>

        <Text size="sm" c="dimmed" mb="md">
          This information is private and won't be visible to candidates
        </Text>

        {/* Banner */}
        <div className="relative mb-14 sm:mb-12">
          <div
            className="h-28 sm:h-36 rounded-lg bg-gray-200"
            style={{
              backgroundImage: form.values.banner
                ? `url(data:image/jpeg;base64,${form.values.banner})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <FileButton accept="image/*" onChange={handleBannerImage}>
          {(props) => (
            <Button
              {...props}
              size="xs"
              className="
              absolute 
              -top-24 sm:-top-32
              right-2 sm:right-4
              "
            >
              Edit Banner
            </Button>
          )}
        </FileButton>

          {/* Profile Picture */}
          <div className="absolute -bottom-12 sm:-bottom-10 left-4 sm:left-6">
            <Avatar
              src={
                form.values.profilePicture
                  ? `data:image/jpeg;base64,${form.values.profilePicture}`
                  : null
              }
              size={80}
              radius="xl"
              className="sm:size-[100px] border-4 border-white shadow"
            />

            <FileButton accept="image/*" onChange={handleProfileImage}>
              {(props) => (
                <Button
                  {...props}
                  size="xs"
                  radius="lg"
                  className="
                absolute 
                -top-4 sm:-top-5
                -right-10 sm:-right-14
                "
                >
                  <IconCamera size={16} />
                </Button>
              )}
            </FileButton>
          </div>
        </div>

        {/* Form */}
        <Stack mt={10}>
          <TextInput
            label="Full Name"
            required
            {...form.getInputProps("fullName")}
          />

          <Select
            label="Role"
            required
            placeholder="Select your Role"
            data={[
              { value: "HR_PROFESSIONAL", label: "HR Professional" },
              { value: "FOUNDER", label: "Founder" },
              { value: "HIRING_MANAGER", label: "Hiring Manager" },
            ]}
            {...form.getInputProps("role")}
          />

          <TextInput label="Email" disabled {...form.getInputProps("email")} />

          <Text size="xs" c="dimmed">
            Email cannot be changed
          </Text>

          <TextInput
            label="Phone"
            placeholder="Enter 10-digit phone"
            {...form.getInputProps("phone")}
          />

          <Button
            fullWidth
            mt="md"
            onClick={handleSubmit}
            disabled={!form.isDirty() || loading}
          >
            {loading ? <Loader size="sm" /> : "Save & Continue →"}
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}
