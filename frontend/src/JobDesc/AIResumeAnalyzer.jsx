import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Button,
  Group,
  FileInput,
  Progress,
  List,
  ThemeIcon,
  Loader,
  Stack,
  Divider,
  Badge,
} from "@mantine/core";
import {
  IconUpload,
  IconX,
  IconCheck,
  IconSparkles,
  IconRefresh,
} from "@tabler/icons-react";
import {
  analyzeWithUpload,
  analyzeWithSavedResume,
  getAnalysis,
} from "../Services/ResumeService";

const AIResumeAnalyzer = ({ jobId, user }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getAnalysis(user.id, jobId);
        if (data) setResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setChecking(false);
      }
    };
    fetchAnalysis();
  }, [user.id, jobId]);

  const handleUploadAnalyze = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const data = await analyzeWithUpload(file, user.id, jobId);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseSaved = async () => {
    try {
      setLoading(true);
      const data = await analyzeWithSavedResume(user.id, jobId);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ── score colour helper ── */
  const scoreColor =
    result?.matchScore >= 70 ? "green" : result?.matchScore >= 40 ? "yellow" : "red";

  return (
    <Card
      shadow="none"
      radius="xl"
      p="xl"
      mt="xl"
      withBorder
      className="!border-[var(--blue-200)] !bg-gradient-to-br from-[var(--blue-50)] to-[var(--white)]"
    >
      {/* ── Header ── */}
      <Group mb={4}>
        <div className="p-2 rounded-lg bg-[var(--blue-100)]">
          <IconSparkles size={18} className="text-[var(--blue-600)]" />
        </div>
        <Text fw={700} size="lg" className="!text-[var(--color-text-primary)]">
          AI Resume Match Analyzer
        </Text>
      </Group>

      <Text size="sm" c="dimmed" mb="lg">
        Check how well your profile matches this job
      </Text>

      <Divider color="var(--blue-100)" mb="lg" />

      {/* ── Initial check loading ── */}
      {checking ? (
        <Stack align="center" py="md" gap="xs">
          <Loader color="brand" size="sm" />
          <Text size="sm" c="dimmed">Checking previous analysis...</Text>
        </Stack>

      ) : result ? (
        /* ── Result UI ── */
        <Stack gap="md">

          {/* Score row */}
          <div className="flex items-center justify-between">
            <Text fw={600} size="sm" className="!text-[var(--color-text-primary)]">
              Match Score
            </Text>
            <Badge color={scoreColor} variant="light" size="lg" radius="xl">
              {result.matchScore}%
            </Badge>
          </div>

          <Progress
            value={result.matchScore}
            color={scoreColor}
            radius="xl"
            size="md"
            className="!bg-[var(--blue-100)]"
          />

          {/* Matched Skills */}
          {result.matchedSkills?.length > 0 && (
            <div className="p-4 rounded-xl bg-[var(--white)] border border-[var(--blue-100)]">
              <Text fw={600} size="sm" mb="xs" className="!text-green-700">
                ✅ Matching Skills
              </Text>
              <List spacing={6}>
                {result.matchedSkills.map((skill, i) => (
                  <List.Item
                    key={i}
                    icon={
                      <ThemeIcon color="green" size={18} radius="xl" variant="light">
                        <IconCheck size={11} />
                      </ThemeIcon>
                    }
                  >
                    <Text size="sm">{skill}</Text>
                  </List.Item>
                ))}
              </List>
            </div>
          )}

          {/* Missing Skills */}
          {result.missingSkills?.length > 0 && (
            <div className="p-4 rounded-xl bg-[var(--white)] border border-[var(--blue-100)]">
              <Text fw={600} size="sm" mb="xs" className="!text-red-600">
                ❌ Missing Skills
              </Text>
              <List spacing={6}>
                {result.missingSkills.map((skill, i) => (
                  <List.Item
                    key={i}
                    icon={
                      <ThemeIcon color="red" size={18} radius="xl" variant="light">
                        <IconX size={11} />
                      </ThemeIcon>
                    }
                  >
                    <Text size="sm">{skill}</Text>
                  </List.Item>
                ))}
              </List>
            </div>
          )}

          {/* Recommendations */}
          {result.recommendations?.length > 0 && (
            <div className="p-4 rounded-xl bg-[var(--white)] border border-[var(--blue-100)]">
              <Text fw={600} size="sm" mb="xs" className="!text-[var(--blue-600)]">
                📈 Recommendations
              </Text>
              <List spacing={6}>
                {result.recommendations.map((rec, i) => (
                  <List.Item key={i}>
                    <Text size="sm" c="dimmed">{rec}</Text>
                  </List.Item>
                ))}
              </List>
            </div>
          )}

          <Button
            leftSection={<IconRefresh size={15} />}
            variant="subtle"
            color="brand"
            size="sm"
            radius="xl"
            onClick={() => { setResult(null); setFile(null); }}
          >
            Analyze Again
          </Button>
        </Stack>

      ) : (
        /* ── Upload UI ── */
        <Stack gap="md">
          <FileInput
            placeholder="Upload your resume (PDF)"
            value={file}
            onChange={setFile}
            leftSection={<IconUpload size={15} />}
            radius="xl"
            styles={{
              input: {
                borderColor: "var(--blue-200)",
                backgroundColor: "var(--white)",
              },
            }}
          />

          <Group grow>
            <Button
              onClick={handleUploadAnalyze}
              disabled={!file || loading}
              loading={loading}
              color="brand"
              radius="xl"
              variant="filled"
            >
              Upload & Analyze
            </Button>

            <Button
              variant="outline"
              color="brand"
              radius="xl"
              onClick={handleUseSaved}
              loading={loading}
            >
              Use Saved Resume
            </Button>
          </Group>
        </Stack>
      )}

      {/* ── API loading overlay ── */}
      {loading && (
        <Stack align="center" mt="md" gap="xs">
          <Loader color="brand" size="sm" />
          <Text size="sm" c="dimmed">Analyzing your resume...</Text>
        </Stack>
      )}
    </Card>
  );
};

export default AIResumeAnalyzer;