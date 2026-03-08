import { ActionIcon, Button, FileInput } from "@mantine/core";
import { IconUpload, IconDownload, IconReplace } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slice/ProfileSlice";
import { getBase64 } from "../Services/Utilities";
import { successNotification, errorNotification } from "../Services/NotificationService";

const Resume = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

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

  return (
    <div id="resume" style={{ scrollMarginTop: "100px" }} className="bg-white rounded-2xl shadow-sm border-default p-6">
      <h2 className="text-lg font-semibold mb-4">Resume</h2>

      {profile?.resume ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Resume Info */}
          <div className="flex items-center gap-3">
            <span className="text-xl">📄</span>

            <div>
              <p className="font-medium">{profile.resumeName || "Resume.pdf"}</p>

              {profile.resumeUploadDate && (
                <p className="text-sm text-gray-500">
                  Uploaded on{" "}
                  {new Date(profile.resumeUploadDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="light"
              leftSection={<IconDownload size={16} />}
              onClick={downloadResume}
            >
              Download
            </Button>

            <FileInput
              accept=".pdf,.doc,.docx"
              variant="filled"
              placeholder="Replace"
              leftSection={<IconReplace size={16} />}
              onChange={handleResumeUpload}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-gray-500">No resume uploaded yet</p>

          <FileInput
            accept=".pdf,.doc,.docx"
            placeholder="Upload Resume"
            leftSection={<IconUpload size={16} />}
            onChange={handleResumeUpload}
          />
        </div>
      )}
    </div>
  );
};

export default Resume;