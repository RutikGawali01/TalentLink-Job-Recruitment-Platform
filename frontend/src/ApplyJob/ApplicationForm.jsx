import { Divider, Text, LoadingOverlay } from "@mantine/core";
import { Button, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { applyJob } from "../Services/JobService";
import { successNotification, errorNotification } from "../Services/NotificationService";

const ApplicationForm = () => {
  const { id } = useParams();
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [submit, setSubmit] = useState(false);

  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile.data);

  const handleSubmit = async () => {
    try {
      setSubmit(true);
      console.log(user.id);
      // Only send jobId (backend will use profile data)
      await applyJob(id, {});

      successNotification("Success", "Application submitted using your profile");
      navigate("/job-history");
    } catch (err) {
      console.log(err);
      errorNotification("Error", err?.response?.data?.errorMessage);
    } finally {
      setSubmit(false);
    }
  };

  return (
  <div className=" bg-blue-50 py-12 px-4 rounded-xl" >
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-10">

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          Apply Using Profile
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          You are about to apply using your saved profile details.
          Please make sure your profile is updated before continuing.
        </p>
      </div>

      <Divider className="my-6" />

      {/* Profile Summary */}
      <div className="space-y-4 text-base">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Name</span>
          <span className="text-gray-900">
            {profile?.name || "Not available"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Email</span>
          <span className="text-gray-900">
            {profile?.email || "Not available"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Website</span>
          <span className="text-gray-900">
            {profile?.website || "Not available"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Resume</span>
          <span className="text-gray-900">
            {profile?.resume
              ? "Attached (from profile)"
              : "No resume uploaded"}
          </span>
        </div>
      </div>

      <Divider className="my-8" />

      {/* Buttons */}
      <div className="flex gap-6">
        <Button
          fullWidth
          size="md"
          variant="outline"
          onClick={() => navigate("/applicant/profile")}
        >
          Edit / Update Profile
        </Button>

        <Button
          fullWidth
          size="md"
          radius="xl"
          onClick={handleSubmit}
        >
          Confirm Apply
        </Button>
      </div>

    </div>
  </div>
);
};

export default ApplicationForm;