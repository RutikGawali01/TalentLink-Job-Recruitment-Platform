import { useState , useEffect} from "react";
import {
  ActionIcon,
  Button,
  FileInput,
  Collapse,
  Divider,
  Progress,
  List,
  ThemeIcon,
} from "@mantine/core";

import {
  IconUpload,
  IconDownload,
  IconReplace,
  IconSparkles,
  IconChevronDown,
  IconChevronUp,
  IconBrain,
  IconBulb,
  IconTargetArrow,
} from "@tabler/icons-react";

import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { getBase64 } from "../Services/Utilities";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";
import { analyzeResume } from "../Services/ResumeService";
import { Loader } from "@mantine/core";

const Resume = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  // console.log(profile);
  const [analysisOpen, setAnalysisOpen] = useState(false);

  const [analysisData, setAnalysisData] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const handleResumeUpload = async (file) => {
    if (!file) return;

    try {
      const base64 = await getBase64(file);

      const updatedProfile = {
        ...profile,
        resume: base64.split(",")[1],
        resumeName: file.name,
        resumeUploadDate: new Date().toISOString(),
      };

      await dispatch(changeProfile(updatedProfile)).unwrap();

      setAnalysisOpen(false);
setAnalysisData(null);

      successNotification("Success", "Resume uploaded successfully");
    } catch (error) {
      errorNotification("Error", "Resume upload failed");
    }
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${profile.resume}`;
    link.download = profile.resumeName || "resume.pdf";
    link.click();
  };

  const handleAnalyzeResume = async () => {
    try {
      setAnalysisOpen(true);
      setLoadingAnalysis(true);
      const data = await analyzeResume(profile.userId, profile.resume);

      setAnalysisData(data);
    } catch (error) {
      errorNotification("Error", "Failed to analyze resume");
    } finally {
      setLoadingAnalysis(false);
    }
  };
  const handleToggleAnalysis = () => {
  if (analysisOpen) {
    setAnalysisOpen(false);
  } else {
    if (analysisData) {
      setAnalysisOpen(true); // reuse data
    } else {
      handleAnalyzeResume(); // first time API
    }
  }
};

useEffect(() => {
  const fetchAnalysis = async () => {
    if (!profile?.resume) return;

    try {
      const data = await analyzeResume(profile.userId, profile.resume);

      setAnalysisData(data);
      // ❌ don't auto open
      // setAnalysisOpen(true);
    } catch (error) {
      console.log("No previous analysis found");
    }
  };

  fetchAnalysis();
}, [profile?.resume]);

  return (
    <div
      id="resume"
      style={{ scrollMarginTop: "100px" }}
      className="bg-white rounded-3xl shadow-lg border border-blue-100 p-5 sm:p-7"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-blue-50">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-400 to-blue-600" />
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          Resume
        </h2>
      </div>

      {profile?.resume ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-white border border-blue-100">
            {/* Resume Info */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-blue-100 border border-blue-200 shrink-0">
                <span className="text-xl">📄</span>
              </div>

              <div>
                <p className="font-semibold text-slate-900 text-sm sm:text-base">
                  {profile.resumeName || "Resume.pdf"}
                </p>

                {profile.resumeUploadDate && (
                  <p className="text-xs text-slate-400">
                    Uploaded{" "}
                    {new Date(profile.resumeUploadDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="light"
                color="blue"
                leftSection={<IconDownload size={15} />}
                onClick={downloadResume}
                styles={{
                  root: {
                    borderRadius: "12px",
                    fontWeight: 600,
                    fontSize: "13px",
                  },
                }}
              >
                Download
              </Button>

              <div className="relative">
                <Button
                  variant="outline"
                  color="blue"
                  leftSection={<IconReplace size={15} />}
                  styles={{
                    root: {
                      borderRadius: "12px",
                      fontWeight: 600,
                      fontSize: "13px",
                    },
                  }}
                >
                  Replace
                </Button>

                <FileInput
                  accept=".pdf,.doc,.docx"
                  variant="transparent"
                  onChange={handleResumeUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Analyze Resume Button */}
          <Divider my="md" />

          <Button
            fullWidth
            variant={analysisOpen ? "filled" : "light"}
            color="blue"
            leftSection={
              analysisOpen ? (
                <IconChevronUp size={15} />
              ) : (
                <IconSparkles size={15} />
              )
            }
            rightSection={!analysisOpen && <IconChevronDown size={14} />}
            onClick={handleToggleAnalysis}
            disabled={loadingAnalysis}
            styles={{
              root: {
                borderRadius: "12px",
                fontWeight: 600,
              },
            }}
          >
            {loadingAnalysis
              ? "Analyzing your resume..."
              : analysisOpen
                ? "Hide Analysis"
                : "Analyze Resume"}
          </Button>

          <Collapse in={analysisOpen}>
            <div className="mt-4 p-5 rounded-xl bg-blue-50 border border-blue-100">
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <IconBrain size={18} className="text-blue-600" />
                <h3 className="font-semibold text-blue-900">
                  AI Resume Analysis
                </h3>
              </div>

              {/* 🔥 LOADING STATE */}
              {loadingAnalysis ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <Loader size="lg" color="blue" />
                  <p className="text-sm text-gray-500">
                    Analyzing your resume... Please wait
                  </p>
                </div>
              ) : (
                <>
                  {/* Score */}
                  <div className="bg-white p-4 rounded-xl border border-blue-200 mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2 text-blue-700 font-semibold">
                        <IconTargetArrow size={16} />
                        Resume Score
                      </div>

                      <span className="text-blue-700 font-bold">
                        {analysisData?.score || 0} / 100
                      </span>
                    </div>

                    <Progress
                      value={analysisData?.score || 0}
                      color="blue"
                      radius="xl"
                    />

                    <p className="text-xs text-gray-500 mt-2">
                      Improve the suggestions below to increase your resume
                      score.
                    </p>
                  </div>

                  {/* Suggestions */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-blue-800 font-semibold text-sm">
                      <IconBulb size={16} />
                      Suggestions
                    </div>

                    <List
                      spacing="xs"
                      size="sm"
                      icon={
                        <ThemeIcon color="blue" size={20} radius="xl">
                          <IconChevronDown
                            size={10}
                            style={{ transform: "rotate(-90deg)" }}
                          />
                        </ThemeIcon>
                      }
                    >
                      {analysisData?.suggestions?.map((item, index) => (
                        <List.Item key={index}>{item}</List.Item>
                      ))}
                    </List>
                  </div>

                  {/* Reanalyze */}
                  <div className="mt-5">
                    <Button
                      leftSection={<IconBrain size={15} />}
                      variant="filled"
                      color="blue"
                      size="xs"
                      onClick={handleAnalyzeResume} // ✅ reuse same function
                    >
                      Re-Analyze Resume
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Collapse>
        </>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50/60 to-white border border-dashed border-blue-200">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <IconUpload size={18} className="text-blue-400" />
            </div>

            <span className="text-sm">No resume uploaded yet</span>
          </div>

          <FileInput
            accept=".pdf,.doc,.docx"
            placeholder="Upload Resume"
            leftSection={<IconUpload size={14} />}
            onChange={handleResumeUpload}
            styles={{
              input: {
                borderRadius: "12px",
                borderColor: "#bfdbfe",
                fontSize: "13px",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Resume;
