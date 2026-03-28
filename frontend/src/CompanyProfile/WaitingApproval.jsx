import { Box, Paper, Title, Text, Button, Badge } from "@mantine/core";
import { useEffect } from "react";
import {
  IconBuildingSkyscraper,
  IconCircleCheck,
  IconClock,
  IconLayoutDashboard,
  IconRefresh,
} from "@tabler/icons-react";
import {updateUser} from "../Slice/UserSlice";
import { checkStatus } from "../Services/CompanyService";
import { useDispatch, useSelector } from "react-redux";

export default function WaitingApproval() {
  const companyName = "Acme Inc.";
  const employerProfile = useSelector((state) => state.employerProfile);
  console.log(employerProfile);
  useEffect(() => {
    if (!employerProfile?.id) return;

    const interval = setInterval(() => {
      console.log(employerProfile.id);
      checkStatus(employerProfile.id).then((res) => {
        if (res.status === "APPROVED") {
          dispatch(
            updateUser({
              onboardingStep: 4,
              companyId: res.companyId,
              status: "APPROVED",
            }),
          );

          successNotification("Request Approved 🎉", "You can now post jobs");

          navigate("/post-job/0");
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [employerProfile?.id]);

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px, 4vw, 32px)",
      }}
    >
      <Box style={{ width: "100%", maxWidth: 480 }}>
        <Paper
          shadow="sm"
          style={{
            borderRadius: "clamp(14px, 3vw, 20px)",
            border: "1px solid rgba(226,232,240,0.8)",
            overflow: "hidden",
            background:
              "linear-gradient(160deg, #ffffff 0%, #eff6ff 55%, #dbeafe 100%)",
          }}
        >
          {/* Top gradient bar */}
          <div
            style={{
              height: 3,
              background:
                "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 40%, #93c5fd 70%, #1e293b 100%)",
            }}
          />

          <Box
            className="flex flex-col items-center text-center px-6 py-10 sm:px-10 sm:py-12"
            style={{ gap: 0 }}
          >
            {/* Success icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                border: "1px solid rgba(59,130,246,0.2)",
                boxShadow: "0 4px 16px rgba(59,130,246,0.15)",
              }}
            >
              <IconCircleCheck size={32} stroke={1.5} color="#3b82f6" />
            </div>

            {/* Title */}
            <Title
              order={3}
              style={{
                background:
                  "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 60%, #1e293b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.3px",
                fontSize: "clamp(16px, 3.5vw, 20px)",
                marginBottom: 6,
              }}
            >
              Request Sent Successfully
            </Title>

            <Text size="sm" c="dimmed" lh={1.6} mb="xl">
              You requested access to:
            </Text>

            {/* Company chip */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl mb-6"
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(59,130,246,0.2)",
                boxShadow: "0 2px 8px rgba(59,130,246,0.08)",
              }}
            >
              <IconBuildingSkyscraper size={18} color="#3b82f6" stroke={1.5} />
              <Text fw={700} size="sm" style={{ color: "#1e3a8a" }}>
                {companyName}
              </Text>
            </div>

            {/* Divider */}
            <div
              className="w-full mb-6"
              style={{ height: 1, background: "rgba(59,130,246,0.08)" }}
            />

            {/* Info text */}
            <Text size="sm" c="dimmed" lh={1.7} mb="lg" className="max-w-xs">
              Your request is waiting for approval from the company
              administrator.
            </Text>

            {/* Status badge */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <IconClock size={15} color="#3b82f6" />
              <Text
                size="xs"
                fw={700}
                style={{
                  color: "#1e40af",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}
              >
                Pending Approval
              </Text>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                fullWidth
                radius="md"
                leftSection={<IconRefresh size={15} />}
                style={{
                  background:
                    "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e293b 100%)",
                  boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  height: "clamp(38px, 5vw, 42px)",
                  fontSize: "clamp(12px, 2vw, 13px)",
                }}
              >
                Check Status
              </Button>
              <Button
                fullWidth
                radius="md"
                variant="outline"
                leftSection={<IconLayoutDashboard size={15} />}
                style={{
                  borderColor: "#3b82f6",
                  color: "#1e3a8a",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  height: "clamp(38px, 5vw, 42px)",
                  fontSize: "clamp(12px, 2vw, 13px)",
                }}
              >
                Go to Dashboard
              </Button>
            </div>
          </Box>
        </Paper>

        {/* Footer note */}
        <Text size="xs" c="dimmed" ta="center" mt="md" lh={1.6}>
          You'll be notified once the admin reviews your request.
        </Text>
      </Box>
    </Box>
  );
}
