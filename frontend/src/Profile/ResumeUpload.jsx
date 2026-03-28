import { useState, useEffect } from "react";
import { uploadResume } from "../Services/ResumeService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Text,
  Title,
  Button,
  FileInput,
  Badge,
  Stack,
  Group,
  Divider,
  ThemeIcon,
  Box,
  Anchor,
  Progress,
} from "@mantine/core";
import {
  IconUpload,
  IconArrowRight,
  IconCircleCheck,
  IconBrain,
  IconFileTypePdf,
  IconFileTypeDocx,
  IconArrowNarrowRight,
  IconPencil,
  IconLoader2,
  IconCheck,
} from "@tabler/icons-react";

const STEPS = [
  { label: "Uploading resume", duration: 1800 },
  { label: "Parsing resume", duration: 1600 },
  { label: "Extracting skills", duration: 1600 },
];

function ProgressSteps({ onDone }) {
  const [stepIndex, setStepIndex] = useState(0); // which step is active
  const [completed, setCompleted] = useState([]); // indices done
  const [progress, setProgress] = useState(0); // bar 0–100 within current step

  useEffect(() => {
    if (stepIndex >= STEPS.length) {
      onDone();
      return;
    }

    setProgress(0);
    const step = STEPS[stepIndex];
    const interval = 30;
    const increment = (interval / step.duration) * 100;

    const timer = setInterval(() => {
      setProgress((p) => {
        if (p + increment >= 100) {
          clearInterval(timer);
          setCompleted((c) => [...c, stepIndex]);
          setTimeout(() => setStepIndex((i) => i + 1), 300);
          return 100;
        }
        return p + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [stepIndex]);

  return (
    <Stack gap={20} py={8}>
      {STEPS.map((step, i) => {
        const isDone = completed.includes(i);
        const isActive = stepIndex === i;
        const isPending = stepIndex < i;

        return (
          <Box key={step.label}>
            <Group justify="space-between" mb={8}>
              <Group gap={10}>
                {/* Icon */}
                <Box
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: isDone
                      ? "linear-gradient(135deg,#DCFCE7,#BBF7D0)"
                      : isActive
                        ? "linear-gradient(135deg,#DBEAFE,#EFF6FF)"
                        : "#F8FAFC",
                    border: isDone
                      ? "1.5px solid #86EFAC"
                      : isActive
                        ? "1.5px solid #93C5FD"
                        : "1.5px solid #E2E8F0",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isDone ? (
                    <IconCheck size={15} color="#16A34A" />
                  ) : isActive ? (
                    <IconLoader2
                      size={15}
                      color="#2563EB"
                      style={{ animation: "spin 0.9s linear infinite" }}
                    />
                  ) : (
                    <Box
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#CBD5E1",
                      }}
                    />
                  )}
                </Box>

                <Text
                  size="sm"
                  fw={isDone || isActive ? 600 : 400}
                  c={isDone ? "green.7" : isActive ? "blue.7" : "dimmed"}
                  style={{ transition: "color 0.3s" }}
                >
                  {step.label}
                  {isActive ? "..." : isDone ? " ✓" : ""}
                </Text>
              </Group>

              {isActive && (
                <Text size="xs" c="blue.4" fw={500}>
                  {Math.round(progress)}%
                </Text>
              )}
            </Group>

            {/* Progress bar — shown for active and completed */}
            <Box
              style={{
                overflow: "hidden",
                maxHeight: isDone || isActive ? 6 : 0,
                transition: "max-height 0.3s ease",
              }}
            >
              <Progress
                value={isDone ? 100 : isActive ? progress : 0}
                size={5}
                radius="xl"
                color={isDone ? "green" : "blue"}
                style={{ transition: "none" }}
                styles={{
                  root: { background: "#EFF6FF" },
                  section: {
                    transition: isDone ? "none" : "width 30ms linear",
                    backgroundImage: isDone
                      ? "linear-gradient(90deg,#4ADE80,#22C55E)"
                      : "linear-gradient(90deg,#60A5FA,#2563EB)",
                  },
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}

export default function ResumeUpload() {
 
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle | processing | success
  const user = useSelector((state) => state.user);
  const userId = user?.id;

  const handleUpload = async () => {
    if (!file) return;

    try {
      setPhase("processing");

      await uploadResume(file, userId);

      setPhase("success");
    } catch (error) {
      console.error(error);
      setPhase("idle");
      alert(error.message);
    }
  };

  const handleSkip = () => navigate("/find-jobs");
  const handleFillManually = () => navigate("/applicant/profile");

  const FileIcon = file?.name?.endsWith(".pdf") ? (
    <IconFileTypePdf size={18} />
  ) : (
    <IconFileTypeDocx size={18} />
  );
 useEffect(() => {
    if (phase === "success") {
      const timer = setTimeout(() => {
        navigate("/applicant/profile");
      }, 2000); // wait 2 seconds to show success UI

      return () => clearTimeout(timer);
    }
  }, [phase]);
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#EBF4FF 0%,#F0F7FF 40%,#DBEAFE 80%,#EFF6FF 100%)",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Box
        style={{
          position: "fixed",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "#BFDBFE",
          filter: "blur(90px)",
          opacity: 0.3,
          top: -140,
          left: -140,
          pointerEvents: "none",
        }}
      />
      <Box
        style={{
          position: "fixed",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "#93C5FD",
          filter: "blur(90px)",
          opacity: 0.25,
          bottom: -100,
          right: -80,
          pointerEvents: "none",
        }}
      />

      <Paper
        radius="xl"
        p={48}
        w="100%"
        maw={560}
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(147,197,253,0.4)",
          boxShadow:
            "0 8px 48px rgba(59,130,246,0.12), 0 2px 8px rgba(59,130,246,0.06)",
        }}
      >
        <Stack gap={24}>
          {/* Top row */}
          <Group justify="space-between" align="center">
            <Badge
              leftSection={<IconBrain size={13} />}
              variant="light"
              color="blue"
              radius="xl"
              size="md"
            >
              AI-Powered Onboarding
            </Badge>
            {phase === "idle" && (
              <Anchor
                component="button"
                onClick={handleSkip}
                underline="never"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#94A3B8",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#3B82F6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
              >
                Skip and Browse Jobs
                <IconArrowNarrowRight size={15} />
              </Anchor>
            )}
          </Group>

          {/* Header */}
          <div>
            <Text size="md" c="dimmed" fw={500} mb={6}>
              Welcome Rutik 👋
            </Text>
            <Title order={1} fz={28} fw={700} lh={1.25} c="dark.8">
              Create your profile{" "}
              <Text span c="blue.6" inherit>
                automatically using AI
              </Text>
            </Title>
          </div>

          <Text size="sm" c="dimmed" lh={1.75}>
            Our AI will instantly extract your{" "}
            {["skills", "experience", "education", "projects"].map((w) => (
              <Text key={w} span fw={600} c="blue.6">
                {w}{" "}
              </Text>
            ))}
            from your resume — saving you hours of manual entry.
          </Text>

          <Group gap="xs">
            {[
              ["Skills", "blue"],
              ["Experience", "violet"],
              ["Education", "cyan"],
              ["Projects", "indigo"],
            ].map(([label, color]) => (
              <Badge
                key={label}
                variant="light"
                color={color}
                radius="xl"
                size="sm"
              >
                {label}
              </Badge>
            ))}
          </Group>

          <Divider color="blue.1" />

          {/* ── IDLE ── */}
          {phase === "idle" && (
            <>
              <FileInput
                value={file}
                onChange={setFile}
                placeholder="Click to browse or drag & drop your resume"
                accept=".pdf,.docx"
                leftSection={<IconUpload size={18} color="#2563EB" />}
                rightSection={file ? FileIcon : null}
                clearable
                radius="lg"
                size="lg"
                styles={{
                  input: {
                    height: 56,
                    border: "2px dashed #93C5FD",
                    background: "linear-gradient(160deg,#F0F7FF,#EFF6FF)",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "#334155",
                    cursor: "pointer",
                  },
                }}
              />

              <Group gap={32}>
                <Text size="xs" c="dimmed">
                  <span style={{ color: "#60A5FA" }}>✓</span> Supported: PDF,
                  DOCX
                </Text>
                <Text size="xs" c="dimmed">
                  <span style={{ color: "#60A5FA" }}>ℹ</span> Max size: 5MB
                </Text>
              </Group>

              <Button
                fullWidth
                size="lg"
                radius="md"
                disabled={!file || phase === "processing"}
                rightSection={<IconArrowRight size={18} />}
                onClick={handleUpload}
                gradient={{ from: "#2563EB", to: "#1D4ED8", deg: 135 }}
                variant="gradient"
                style={{
                  height: 52,
                  fontSize: 15,
                  fontWeight: 600,
                  boxShadow: file ? "0 6px 24px rgba(37,99,235,0.32)" : "none",
                }}
              >
                Upload Resume
              </Button>

              <Divider
                label={
                  <Text size="xs" c="dimmed" fw={500} px={8}>
                    or
                  </Text>
                }
                labelPosition="center"
                color="blue.1"
              />

              <Button
                fullWidth
                size="lg"
                radius="md"
                variant="light"
                color="blue"
                leftSection={<IconPencil size={17} />}
                rightSection={<IconArrowRight size={17} />}
                onClick={handleFillManually}
                style={{
                  height: 52,
                  fontSize: 15,
                  fontWeight: 600,
                  border: "1.5px solid #BFDBFE",
                  background: "linear-gradient(135deg,#EFF6FF,#DBEAFE)",
                  color: "#1D4ED8",
                }}
              >
                Fill Profile Manually
              </Button>

              <Text size="sm" c="dimmed" ta="center">
                Want to explore first?{" "}
                <Anchor
                  component="button"
                  onClick={handleSkip}
                  fw={600}
                  style={{
                    color: "#3B82F6",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "inherit",
                  }}
                >
                  Skip and Browse Jobs
                </Anchor>{" "}
                and find jobs right away.
              </Text>
            </>
          )}

          {/* ── PROCESSING ── */}
          {phase === "processing" && (
            <Box
              style={{
                background: "linear-gradient(160deg,#F0F7FF,#EFF6FF)",
                border: "1px solid #BFDBFE",
                borderRadius: 16,
                padding: "24px 28px",
              }}
            >
              <Text size="sm" fw={600} c="blue.7" mb={20}>
                Analyzing your resume with AI…
              </Text>
              <ProgressSteps onDone={() => setPhase("success")} />
            </Box>
          )}

          {/* ── SUCCESS ── */}
          {phase === "success" && (
            <Stack align="center" gap="md" py="sm">
              <ThemeIcon color="green" variant="light" radius="xl" size={72}>
                <IconCircleCheck size={38} />
              </ThemeIcon>
              <div style={{ textAlign: "center" }}>
                <Text fw={700} c="green.7" size="lg" mb={4}>
                  Profile created successfully!
                </Text>
                <Text size="sm" c="dimmed">
                  All your details have been extracted and saved.
                </Text>
              </div>
              <Group gap="xs" mt={4}>
                {["Skills", "Experience", "Education", "Projects"].map(
                  (tag) => (
                    <Badge
                      key={tag}
                      variant="light"
                      color="blue"
                      radius="xl"
                      size="sm"
                    >
                      {tag}
                    </Badge>
                  ),
                )}
              </Group>
              <Button
                mt="sm"
                size="md"
                radius="md"
                rightSection={<IconArrowRight size={16} />}
                onClick={() => navigate("/applicant/profile")}
              >
                Review & Edit Profile
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </Box>
  );
}
