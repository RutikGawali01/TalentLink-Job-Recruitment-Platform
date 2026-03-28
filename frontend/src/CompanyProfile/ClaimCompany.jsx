import { useState } from "react";
import {
  TextInput,
  Button,
  Alert,
  Paper,
  Text,
  Title,
  Stack,
  Anchor,
  Divider,
  Box,
} from "@mantine/core";
import {
  IconBuilding,
  IconWorld,
  IconMail,
  IconAlertTriangle,
  IconCircleCheck,
  IconArrowRight,
} from "@tabler/icons-react";

import { createCompany } from "../Services/CompanyService";
import { useDispatch } from "react-redux";
import { updateUser } from "../Slice//UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { saveCompanyProfile } from "../Slice/CompanySlice";
import { errorNotification } from "../Services/NotificationService";
export default function ClaimCompany() {
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileId } = useParams();

  const handleSubmit = async () => {
    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    } else setEmailError("");

    if (!websiteRegex.test(website)) {
      setWebsiteError("Enter a valid website URL");
      valid = false;
    } else setWebsiteError("");

    if (!companyName || !valid) return;

    setLoading(true);

    try {
      const payload = {
        name: companyName.trim(),
        website: website.trim(),
        email: email.trim(),
        employerId: profileId,
      };

      await dispatch(saveCompanyProfile(payload)).unwrap();

      // Company created successfully
      dispatch(
        updateUser({
          onboardingStep: 3,
        }),
      );

      setStatus("success");

      setTimeout(() => {
        navigate(`/employer/company-profile/${profileId}`);
      }, 1200);
    } catch (error) {
      console.log("Full error:", error);

      const message =
        typeof error === "string"
          ? error
          : error?.response?.data?.message || "Something went wrong";

      // Company already exists → recruiter request flow
      if (message.includes("Join request")) {
        dispatch(
          updateUser({
            onboardingStep: 5,
            requestStatus: "PENDING",
          }),
        );

        navigate("/company-request-status");
      } else if (message.includes("already belong")) {
        const member = await getCompanyMember(profileId);

        dispatch(
          updateUser({
            onboardingStep: 4,
            companyId: member.companyId,
            status: "APPROVED",
          }),
        );

        successNotification(
          "Already Member",
          "You are already part of this company",
        );

        navigate("/post-job/0");
      } else {
        errorNotification("Error", message);
      }
    } finally {
      setLoading(false);
    }
  };

  const isValid =
    companyName && emailRegex.test(email) && websiteRegex.test(website);

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
      }}
    >
      <Box style={{ width: "100%", maxWidth: 440 }}>
        <Paper
          shadow="sm"
          style={{
            borderRadius: 20,
            border: "1px solid rgba(226,232,240,0.8)",
            overflow: "hidden",
            background:
              "linear-gradient(160deg, #ffffff 0%, #eff6ff 50%, #dbeafe 100%)",
          }}
        >
          <div
            style={{
              height: 3,
              background:
                "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 40%, #93c5fd 70%, #1e293b 100%)",
            }}
          />

          {/* Header */}
          <Box
            p="xl"
            pb="md"
            style={{ borderBottom: "1px solid rgba(59,130,246,0.08)" }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 10,
              }}
            >
              <Box
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
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
                <IconBuilding size={22} stroke={1.5} />
              </Box>

              <Box>
                <Title
                  order={4}
                  style={{
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 60%, #1e293b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.3px",
                  }}
                >
                  Claim Your Company
                </Title>

                <Text
                  size="xs"
                  tt="uppercase"
                  fw={600}
                  c="dimmed"
                  style={{ letterSpacing: "0.08em" }}
                >
                  Employer Profile
                </Text>
              </Box>
            </Box>

            <Text size="sm" c="dimmed" lh={1.6}>
              Create a company profile to start posting jobs and managing
              applicants.
            </Text>
          </Box>

          {/* Form */}
          <Box p="xl" pt="lg">
            <Stack gap="md">
              <TextInput
                label="Company Name"
                placeholder="Acme Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                leftSection={<IconBuilding size={15} />}
                styles={{
                  label: {
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "#475569",
                    marginBottom: 5,
                  },
                }}
              />

              <TextInput
                label="Company Website"
                placeholder="https://acme.com"
                value={website}
                error={websiteError}
                onChange={(e) => {
                  const value = e.target.value;
                  setWebsite(value);

                  if (!value) {
                    setWebsiteError("");
                  } else if (!websiteRegex.test(value)) {
                    setWebsiteError("Invalid website URL");
                  } else {
                    setWebsiteError("");
                  }
                }}
                leftSection={<IconWorld size={15} />}
                styles={{
                  label: {
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "#475569",
                    marginBottom: 5,
                  },
                  error: { color: "red", fontWeight: 500 },
                }}
              />

              <TextInput
                label="Company Email"
                placeholder="hello@acme.com"
                type="email"
                value={email}
                error={emailError}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);

                  if (!value) {
                    setEmailError("");
                  } else if (!emailRegex.test(value)) {
                    setEmailError("Invalid email format");
                  } else {
                    setEmailError("");
                  }
                }}
                leftSection={<IconMail size={15} />}
                styles={{
                  label: {
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    color: "#475569",
                    marginBottom: 5,
                  },
                  error: { color: "red", fontWeight: 500 },
                }}
              />

              {status === "exists" && (
                <Alert
                  icon={<IconAlertTriangle size={16} />}
                  color="blue"
                  variant="light"
                  radius="md"
                >
                  <Text fw={700} size="sm">
                    Company already exists
                  </Text>
                  <Text size="xs" mt={2}>
                    Join request sent to admin for approval.
                  </Text>
                </Alert>
              )}

              {status === "success" && (
                <Alert
                  icon={<IconCircleCheck size={16} />}
                  color="green"
                  variant="light"
                  radius="md"
                >
                  <Text fw={700} size="sm">
                    Company created!
                  </Text>
                  <Text size="xs" mt={2}>
                    Your company profile is live and ready.
                  </Text>
                </Alert>
              )}

              <Button
                fullWidth
                onClick={handleSubmit}
                disabled={!isValid}
                loading={loading}
                rightSection={!loading && <IconArrowRight size={15} />}
                radius="md"
                style={{
                  background: isValid
                    ? "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e293b 100%)"
                    : undefined,
                  boxShadow: isValid
                    ? "0 4px 14px rgba(59,130,246,0.35)"
                    : undefined,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                Create / Claim Company
              </Button>
            </Stack>

            <Divider
              my="md"
              style={{ borderColor: "rgba(148,163,184,0.15)" }}
            />

            <Text size="xs" c="dimmed" ta="center" lh={1.6}>
              By continuing you agree to our{" "}
              <Anchor size="xs" fw={600} c="blue">
                Terms of Service
              </Anchor>{" "}
              &{" "}
              <Anchor size="xs" fw={600} c="blue">
                Privacy Policy
              </Anchor>
            </Text>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
