import {
  TextInput,
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
} from "@mantine/core";
import { IconCamera, IconUser, IconBriefcase, IconPhone, IconMail } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setUser, updateUser } from "../Slice/UserSlice";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slice/EmployerProfileSlice";

const labelStyle = {
  fontSize: 11, fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
  color: "#475569", marginBottom: 5
};

export default function EmployerProfileComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileId } = useParams();
  const employerProfile = useSelector((state) => state.employerProfile);
  const [loading, setLoading] = useState(false);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const form = useForm({
    mode: "controlled",
    initialValues: {
      fullName: "", email: "", role: "", phone: "",
      profilePicture: null, banner: null, companyId: null,
    },
    validate: {
      fullName: (v) => v.trim().length < 3 ? "Full name must be at least 3 characters" : null,
      role: (v) => !v ? "Please select your role" : null,
      phone: (v) => {
        if (!v) return null;
        return /^[6-9]\d{9}$/.test(v) ? null : "Enter valid 10-digit phone number";
      },
    },
  });

  useEffect(() => {
    if (employerProfile && Object.keys(employerProfile).length > 0) {
      form.setValues(employerProfile);
      form.resetDirty();
    }
  }, [employerProfile]);

  const handleProfileImage = async (file) => {
    try {
      if (!file) return;
      const dataUrl = await fileToBase64(file);
      form.setFieldValue("profilePicture", dataUrl.split(",")[1]);
    } catch { errorNotification("Failed to process profile image"); }
  };

  const handleBannerImage = async (file) => {
    try {
      if (!file) return;
      const dataUrl = await fileToBase64(file);
      form.setFieldValue("banner", dataUrl.split(",")[1]);
    } catch { errorNotification("Failed to process banner image"); }
  };

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
      await dispatch(changeProfile(payload)).unwrap();
      successNotification(employerProfile?.id ? "Profile updated successfully ✅" : "Profile created successfully ✅");
      form.resetDirty();
      dispatch(updateUser({ onboardingStep: 2 }));  

      navigate(`/claim-company/${profileId}`);
    } catch (error) {
      errorNotification(error?.response?.data?.message || "Failed to save profile ❌");
    } finally {
      setLoading(false);
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
      <Box style={{ width: "100%", maxWidth: 620 }}>
        <Paper shadow="sm" style={{
          borderRadius: "clamp(14px, 3vw, 20px)",
          border: "1px solid rgba(226,232,240,0.8)",
          overflow: "hidden",
          background: "linear-gradient(160deg, #ffffff 0%, #eff6ff 50%, #dbeafe 100%)"
        }}>
          {/* Top gradient bar */}
          <div style={{ height: 3, background: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 40%, #93c5fd 70%, #1e293b 100%)" }} />

          {/* Banner + Avatar section */}
          <Box style={{ position: "relative", marginBottom: "clamp(40px, 8vw, 52px)" }}>

            {/* Banner */}
            <Box style={{
              height: "clamp(90px, 18vw, 130px)",
              background: form.values.banner
                ? `url(data:image/jpeg;base64,${form.values.banner}) center/cover no-repeat`
                : "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #93c5fd 100%)",
            }} />

            {/* Edit Banner btn */}
            <Box style={{ position: "absolute", top: 10, right: 12 }}>
              <FileButton accept="image/*" onChange={handleBannerImage}>
                {(props) => (
                  <Button {...props} size="xs" radius="md" style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    color: "#fff", fontWeight: 600, fontSize: 11,
                  }}>
                    Edit Banner
                  </Button>
                )}
              </FileButton>
            </Box>

            {/* Avatar + camera btn */}
            <Box style={{
              position: "absolute",
              bottom: "clamp(-36px, -7vw, -44px)",
              left: "clamp(16px, 4vw, 28px)",
              display: "inline-block"
            }}>
              <Avatar
                src={form.values.profilePicture ? `data:image/jpeg;base64,${form.values.profilePicture}` : null}
                size={clampSize()}
                radius="xl"
                style={{
                  border: "3px solid #ffffff",
                  boxShadow: "0 4px 14px rgba(59,130,246,0.2)"
                }}
              />
              <FileButton accept="image/*" onChange={handleProfileImage}>
                {(props) => (
                  <Button {...props} size="xs" radius="xl" style={{
                    position: "absolute", bottom: -4, right: -4,
                    background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                    boxShadow: "0 2px 8px rgba(59,130,246,0.4)",
                    padding: "4px 8px", minWidth: "unset"
                  }}>
                    <IconCamera size={13} />
                  </Button>
                )}
              </FileButton>
            </Box>
          </Box>

          {/* Header text */}
          <Box px={{ base: "md", sm: "xl" }} pb="md" style={{ borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
            <Title order={4} style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 60%, #1e293b 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", letterSpacing: "-0.3px",
              fontSize: "clamp(15px, 3vw, 18px)"
            }}>
              Recruiter Profile
            </Title>
            <Text size="sm" c="dimmed" mt={4} lh={1.5}>
              This information is private and won't be visible to candidates.
            </Text>
          </Box>

          {/* Form */}
          <Box px={{ base: "md", sm: "xl" }} py={{ base: "md", sm: "lg" }}>
            <Stack gap="sm">

              <TextInput
                label="Full Name" required
                placeholder="Enter your full name"
                leftSection={<IconUser size={15} />}
                styles={{ label: labelStyle }}
                {...form.getInputProps("fullName")}
              />

              <Select
                label="Role" required
                placeholder="Select your Role"
                leftSection={<IconBriefcase size={15} />}
                data={[
                  { value: "HR_PROFESSIONAL", label: "HR Professional" },
                  { value: "FOUNDER", label: "Founder" },
                  { value: "HIRING_MANAGER", label: "Hiring Manager" },
                ]}
                styles={{ label: labelStyle }}
                {...form.getInputProps("role")}
              />

              <Box>
                <TextInput
                  label="Email" disabled
                  leftSection={<IconMail size={15} />}
                  styles={{ label: labelStyle }}
                  {...form.getInputProps("email")}
                />
                <Text size="xs" c="dimmed" mt={4}>Email cannot be changed</Text>
              </Box>

              <TextInput
                label="Phone"
                placeholder="Enter 10-digit phone"
                leftSection={<IconPhone size={15} />}
                styles={{ label: labelStyle }}
                {...form.getInputProps("phone")}
              />

              <Button
                fullWidth mt="sm"
                onClick={handleSubmit}
                disabled={!form.isDirty() || loading}
                radius="md"
                style={{
                  background: (!form.isDirty() || loading) ? undefined : "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e293b 100%)",
                  boxShadow: (!form.isDirty() || loading) ? undefined : "0 4px 14px rgba(59,130,246,0.35)",
                  fontWeight: 700, letterSpacing: "0.02em",
                  height: "clamp(38px, 5vw, 44px)",
                  fontSize: "clamp(13px, 2vw, 14px)"
                }}
              >
                {loading ? <Loader size="sm" color="white" /> : "Save & Continue →"}
              </Button>

            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

// helper to clamp avatar size based on viewport
function clampSize() {
  if (typeof window === "undefined") return 80;
  const vw = window.innerWidth;
  if (vw < 400) return 70;
  if (vw < 640) return 80;
  return 92;
}