import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  PinInput,
  useMantineTheme,
} from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useState } from "react";
import { IconAt, IconLock } from "@tabler/icons-react";
import { sendOtp, changePassword , verifyOtp} from "../Services/UserService";
import {signupValidation} from "../Services/FormValidation";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";
// / ─── ResetPassword.jsx ────────────────────────────────────────────────────────
const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);

  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(30);
      interval.stop();
    } else setSeconds((s) => s - 1);
  }, 1000);

  const handleSentOTP = () => {
    setOtpSending(true);
    sendOtp(email)
      .then(() => {
        successNotification("OTP Sent Successfully", "Enter OTP to reset.");
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        setOtpSending(false);
        errorNotification("OTP Sending Failed", err?.response?.data?.errorMessage || "Something went wrong");
      });
  };

  const handleVerifyOTP = (otp) => {
    verifyOtp(email, otp)
      .then(() => {
        successNotification("OTP Verified", "Enter new password");
        setVerified(true);
      })
      .catch((err) => {
        errorNotification("Verification Failed", err?.response?.data?.errorMessage || "Something went wrong");
      });
  };

  const resendOTP = () => {
    if (resendLoader) return;
    handleSentOTP();
  };

  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(30);
    setVerified(false);
    interval.stop();
  };

  const handleResetPassword = () => {
    changePassword(email, password)
      .then(() => successNotification("Password Changed", "Login with new password"))
      .catch((err) => errorNotification("Reset Failed", err?.response?.data?.errorMessage || "Something went wrong"));
  };

  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      title={
        <span className="font-extrabold text-lg text-slate-900 tracking-tight">
          Reset Password
        </span>
      }
      radius="xl"
      size="sm"
      centered
      overlayProps={{ blur: 4, backgroundOpacity: 0.4 }}
      styles={{
        header: { borderBottom: "1px solid #E2E8F0", paddingBottom: 14 },
        body: { padding: "20px 24px 24px" },
      }}
    >
      <div className="flex flex-col gap-5">

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {["Email", "Verify OTP", "New Password"].map((step, i) => {
            const done = (i === 0 && otpSent) || (i === 1 && verified) || (i === 2 && false);
            const active = (i === 0 && !otpSent) || (i === 1 && otpSent && !verified) || (i === 2 && verified);
            return (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all
                  ${done ? "bg-emerald-500 text-white" : active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {done ? "✓" : i + 1}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${active ? "text-blue-600" : "text-slate-400"}`}>{step}</span>
                {i < 2 && <div className={`flex-1 h-px ${done ? "bg-emerald-300" : "bg-slate-200"}`} />}
              </div>
            );
          })}
        </div>

        {/* Email input */}
        <TextInput
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          size="md"
          value={email}
          withAsterisk
          leftSection={<IconAt size={16} className="text-slate-400" />}
          rightSection={
            <Button
              size="xs"
              loading={otpSending && !otpSent}
              onClick={handleSentOTP}
              disabled={email === "" || otpSent}
              variant="filled"
              radius="lg"
              color="blue"
              className="!mr-1 !font-semibold"
            >
              Send
            </Button>
          }
          rightSectionWidth={72}
          label="Email address"
          placeholder="you@email.com"
          radius="lg"
          classNames={{
            input: "!border-slate-200 focus:!border-blue-500",
            label: "!font-semibold !text-slate-700 !text-sm !mb-1",
          }}
          disabled={otpSent}
        />

        {/* OTP pin */}
        {otpSent && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700">Enter 6-digit OTP</p>
            <PinInput
              onComplete={handleVerifyOTP}
              gap="sm"
              length={6}
              type="number"
              className="mx-auto"
              size="md"
              styles={{ input: { borderRadius: 10, borderColor: "#E2E8F0" } }}
            />
          </div>
        )}

        {/* Resend / change email */}
        {otpSent && !verified && (
          <div className="flex gap-3">
            <Button
              fullWidth
              size="sm"
              loading={otpSending}
              onClick={resendOTP}
              variant="light"
              color="blue"
              radius="lg"
              className="!font-semibold"
            >
              {resendLoader ? `Resend in ${seconds}s` : "Resend OTP"}
            </Button>
            <Button
              fullWidth
              size="sm"
              onClick={changeEmail}
              variant="outline"
              color="slate"
              radius="lg"
              className="!font-semibold !border-slate-200 !text-slate-600"
            >
              Change Email
            </Button>
          </div>
        )}

        {/* New password */}
        {verified && (
          <PasswordInput
            error={passErr}
            value={password}
            name="password"
            withAsterisk
            onChange={(e) => {
              setPassword(e.target.value);
              setPassErr(signupValidation("password", e.target.value));
            }}
            leftSection={<IconLock size={16} className="text-slate-400" />}
            label="New Password"
            placeholder="Min 8 characters"
            radius="lg"
            size="md"
            classNames={{
              input: "!border-slate-200 focus:!border-blue-500",
              label: "!font-semibold !text-slate-700 !text-sm !mb-1",
            }}
          />
        )}

        {verified && (
          <Button
            onClick={handleResetPassword}
            fullWidth
            radius="xl"
            size="md"
            className="
              !h-11 !font-bold
              !bg-gradient-to-r !from-blue-600 !to-blue-700
              hover:!from-blue-700 hover:!to-blue-800
              !shadow-md !shadow-blue-200
              !transition-all !duration-200
            "
          >
            Change Password →
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;