import { useState } from "react";
import {
  Card,
  Group,
  Text,
  Badge,
  Button,
  List,
  Stack,
  Divider,
  FileInput,
  ThemeIcon,
  Box,
  Progress,
  Collapse,
  Tooltip,
} from "@mantine/core";
import {
  IconFileTypePdf,
  IconDownload,
  IconArrowsExchange,
  IconUpload,
  IconBrain,
  IconSparkles,
  IconChevronUp,
  IconChevronDown,
  IconCalendar,
  IconFileAnalytics,
  IconBulb,
  IconTargetArrow,
} from "@tabler/icons-react";

/* ─── Dummy Data ─────────────────────────────────── */
const DUMMY_RESUME = {
  name: "Rutik Gawali Resume.pdf",
  uploadDate: "3/14/2026",
  size: "284 KB",
};

const ANALYSIS = {
  score: 72,
  suggestions: [
    "Add measurable achievements in projects",
    "Mention technologies used in projects",
    "Improve professional summary",
    "Add GitHub or portfolio link",
  ],
};

/* ─── Component ──────────────────────────────────── */
export default function ResumeSection() {
  const [hasResume, setHasResume] = useState(true);
  const [fileValue, setFileValue] = useState(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);

  const handleDownload = () =>
    console.log("[ResumeSection] Download clicked:", DUMMY_RESUME.name);

  const handleReplace = () =>
    console.log("[ResumeSection] Replace clicked");

  const handleFileUpload = (file) => {
    setFileValue(file);
    if (file) {
      // console.log("[ResumeSection] File selected:", file.name);
      setHasResume(true);
    }
  };

  const handleAnalyze = () => {
    setAnalysisOpen((prev) => !prev);
    // console.log("[ResumeSection] Analyze Resume clicked – toggling analysis panel");
  };

  return (
    <Box
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        maxWidth: 700,
        margin: "0 auto",
        padding: "28px 16px",
      }}
    >
      {/* ── Page Header ── */}
      <Group justify="space-between" align="flex-end" mb="xl">
        <Stack gap={2}>
          <Text
            fw={800}
            size="xl"
            style={{ color: "#0d1b2a", letterSpacing: "-0.4px" }}
          >
            Resume
          </Text>
          <Text size="sm" c="dimmed">
            Manage and analyse your resume
          </Text>
        </Stack>
        <Badge
          variant="light"
          color="blue"
          size="lg"
          radius="sm"
          style={{ fontWeight: 600 }}
        >
          Applicant Profile
        </Badge>
      </Group>

      {/* ══ Main Card ════════════════════════════════ */}
      <Card
        radius="lg"
        withBorder
        p={0}
        style={{
          borderColor: "#dce3ef",
          boxShadow: "0 2px 12px rgba(13,27,42,0.07)",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* ── Card Top Bar ── */}
        <Box
          style={{
            background: "linear-gradient(90deg, #1864ab 0%, #1c7ed6 100%)",
            padding: "12px 20px",
          }}
        >
          <Group justify="space-between" align="center">
            <Group gap={8}>
              <IconFileAnalytics size={16} color="rgba(255,255,255,0.85)" stroke={2} />
              <Text size="sm" fw={600} style={{ color: "rgba(255,255,255,0.92)" }}>
                Resume Document
              </Text>
            </Group>
            {hasResume && (
              <Badge
                size="sm"
                radius="sm"
                style={{
                  background: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)",
                  fontWeight: 600,
                }}
              >
                Active
              </Badge>
            )}
          </Group>
        </Box>

        {/* ── Card Body ── */}
        <Box p="xl">
          {hasResume ? (
            /* ── Resume exists ── */
            <Group justify="space-between" wrap="nowrap" align="center">
              {/* File info */}
              <Group wrap="nowrap" gap="md">
                <ThemeIcon
                  size={54}
                  radius="md"
                  variant="light"
                  color="blue"
                  style={{
                    flexShrink: 0,
                    border: "1.5px solid #c5d8fb",
                  }}
                >
                  <IconFileTypePdf size={26} stroke={1.5} />
                </ThemeIcon>

                <Stack gap={3}>
                  <Text fw={700} size="sm" style={{ color: "#0d1b2a" }}>
                    {DUMMY_RESUME.name}
                  </Text>
                  <Group gap={5}>
                    <IconCalendar size={12} color="#868e96" />
                    <Text size="xs" c="dimmed">
                      Uploaded {DUMMY_RESUME.uploadDate}
                    </Text>
                    <Text size="xs" c="dimmed">·</Text>
                    <Text size="xs" c="dimmed">{DUMMY_RESUME.size}</Text>
                  </Group>
                </Stack>
              </Group>

              {/* Action buttons */}
              <Group gap="xs" wrap="nowrap">
                <Tooltip label="Download resume" withArrow position="top">
                  <Button
                    leftSection={<IconDownload size={14} stroke={2} />}
                    variant="filled"
                    color="blue"
                    size="xs"
                    radius="md"
                    onClick={handleDownload}
                    style={{ fontWeight: 600 }}
                  >
                    Download
                  </Button>
                </Tooltip>

                <Tooltip label="Replace with a new file" withArrow position="top">
                  <Button
                    leftSection={<IconArrowsExchange size={14} stroke={2} />}
                    variant="light"
                    color="dark"
                    size="xs"
                    radius="md"
                    onClick={handleReplace}
                    style={{ fontWeight: 600, color: "#495057" }}
                  >
                    Replace
                  </Button>
                </Tooltip>
              </Group>
            </Group>
          ) : (
            /* ── No resume state ── */
            <Stack align="center" gap="sm" py="sm">
              <ThemeIcon size={60} radius="xl" variant="light" color="blue">
                <IconUpload size={26} stroke={1.5} />
              </ThemeIcon>
              <Text fw={700} size="sm" style={{ color: "#0d1b2a" }}>
                No resume uploaded yet
              </Text>
              <Text size="xs" c="dimmed" ta="center" maw={320}>
                Upload your resume to enable AI-powered analysis and smart
                profile matching.
              </Text>
              <FileInput
                placeholder="Choose PDF file"
                accept="application/pdf"
                leftSection={<IconFileTypePdf size={15} />}
                value={fileValue}
                onChange={handleFileUpload}
                w={260}
                radius="md"
                size="sm"
                mt={4}
              />
            </Stack>
          )}

          {/* ── Analyze Button ── */}
          {hasResume && (
            <>
              <Divider my="md" color="#f1f3f5" />
              <Button
                fullWidth
                variant={analysisOpen ? "filled" : "light"}
                color="blue"
                radius="md"
                size="sm"
                leftSection={
                  analysisOpen
                    ? <IconChevronUp size={15} stroke={2.2} />
                    : <IconSparkles size={15} stroke={2} />
                }
                rightSection={
                  analysisOpen
                    ? null
                    : <IconChevronDown size={14} stroke={2} color="#1c7ed6" />
                }
                onClick={handleAnalyze}
                style={{ fontWeight: 600, letterSpacing: "0.01em" }}
              >
                {analysisOpen ? "Hide Analysis" : "Analyze Resume"}
              </Button>
            </>
          )}
        </Box>

        {/* ── Collapsible AI Analysis ── */}
        {hasResume && (
          <Collapse in={analysisOpen}>
            <Divider color="#dce3ef" />

            <Box
              p="xl"
              style={{
                background: "linear-gradient(160deg, #f8faff 0%, #f0f4ff 100%)",
              }}
            >
              {/* Analysis header */}
              <Group mb="md" gap={10} align="center">
                <ThemeIcon size={36} radius="md" color="blue" variant="filled">
                  <IconBrain size={19} stroke={1.8} />
                </ThemeIcon>
                <Stack gap={1}>
                  <Text
                    fw={800}
                    size="md"
                    style={{ color: "#0d1b2a", letterSpacing: "-0.2px" }}
                  >
                    AI Resume Analysis
                  </Text>
                  <Text size="xs" c="dimmed">
                    Powered by Anthropic Claude
                  </Text>
                </Stack>
              </Group>

              {/* Score Card */}
              <Card
                radius="md"
                p="md"
                mb="lg"
                style={{
                  background: "#fff",
                  border: "1.5px solid #c5d8fb",
                  boxShadow: "0 1px 4px rgba(28,126,214,0.08)",
                }}
              >
                <Group justify="space-between" align="center" mb={10}>
                  <Group gap={6}>
                    <IconTargetArrow size={15} color="#1864ab" stroke={2} />
                    <Text size="sm" fw={700} style={{ color: "#1864ab" }}>
                      Resume Score
                    </Text>
                  </Group>
                  <Badge
                    size="lg"
                    radius="sm"
                    style={{
                      background:
                        ANALYSIS.score >= 75
                          ? "#1864ab"
                          : ANALYSIS.score >= 50
                          ? "#1971c2"
                          : "#e03131",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 14,
                      padding: "4px 14px",
                    }}
                  >
                    {ANALYSIS.score} / 100
                  </Badge>
                </Group>

                <Progress
                  value={ANALYSIS.score}
                  size={8}
                  radius="xl"
                  color="blue"
                  style={{ background: "#dce9f8" }}
                />

                <Text size="xs" c="dimmed" mt={8} style={{ lineHeight: 1.5 }}>
                  Your resume scores above average. Apply the suggestions below
                  to push your score above 90.
                </Text>
              </Card>

              {/* Suggestions */}
              <Stack gap={6}>
                <Group gap={6} mb={4}>
                  <IconBulb size={14} color="#1864ab" stroke={2} />
                  <Text
                    size="xs"
                    fw={700}
                    style={{
                      color: "#1864ab",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    Suggestions to Improve
                  </Text>
                </Group>

                <List
                  spacing={8}
                  size="sm"
                  icon={
                    <ThemeIcon size={20} radius="xl" color="blue" variant="light">
                      <IconChevronDown
                        size={10}
                        stroke={3}
                        style={{ transform: "rotate(-90deg)" }}
                      />
                    </ThemeIcon>
                  }
                >
                  {ANALYSIS.suggestions.map((s, i) => (
                    <List.Item
                      key={i}
                      style={{ color: "#343a40", fontWeight: 500 }}
                    >
                      {s}
                    </List.Item>
                  ))}
                </List>
              </Stack>

              {/* Bottom CTAs */}
              <Divider my="lg" color="#dce3ef" />
              <Group gap="sm">
                <Button
                  leftSection={<IconBrain size={15} stroke={2} />}
                  variant="filled"
                  color="blue"
                  radius="md"
                  size="sm"
                  onClick={() =>
                    // console.log("[ResumeSection] Re-Analyze Resume clicked")
                  }
                  style={{ fontWeight: 600 }}
                >
                  Re‑Analyze Resume
                </Button>
              </Group>
            </Box>
          </Collapse>
        )}
      </Card>
    </Box>
  );
}