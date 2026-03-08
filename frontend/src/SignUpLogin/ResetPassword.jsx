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
const ResetPassword = (props) => {
  
  const theme = useMantineTheme();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);// for loading overlay
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
      .then((res) => {
        console.log(res);
        successNotification("OTP Sent Successfully", "Enter OTP to reset.");
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        console.log(err);
        setOtpSending(false);
        const errorMsg = err?.response?.data?.errorMessage || "Something went wrong";
        errorNotification("OTP Sending Failed", errorMsg);
      });
  };

  const handleVerifyOTP = (otp) => {
    
    verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        successNotification("OTP verified", "Enter new password");
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        const errorMsg = err?.response?.data?.errorMessage || "Something went wrong";
        errorNotification(
          "OTP verification Failed",
          errorMsg
        );
      });
  };

  const resendOTP = () => {
    if(resendLoader)return;
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
      .then((res) => {
        console.log(res);
        successNotification("Password Changed", "Login with new password");
        // props.close();
      })
      .then((err) => {
        console.log(err);
        const errorMsg = err?.response?.data?.errorMessage || "Something went wrong";
        errorNotification(
          "Password Reset Failed",
          errorMsg
        );
      });
  };

  return (
    <Modal opened={props.opened} onClose={props.close} title="Reset Password">
      <div className="flex flex-col gap-6  ">
        <TextInput
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          size="md"
          value={email}
          withAsterisk
          leftSection={<IconAt size={16} />}
          rightSection={
            <Button
              size="xs"
              loading={otpSending && !otpSent}
              className="mr-1"
              onClick={handleSentOTP}
              autoContrast
              disabled={email === "" || otpSent}
              variant="filled"
            >
              Sent
            </Button>
          }
          rightSectionWidth="xl"
          label=" Email"
          placeholder="Your email"
        />
        {/* PinInput automatically passes the entered OTP as an argument to the function you give in onComplete.
         so otp send in handleVerifyOTP  */}
        {otpSent && (
          <PinInput
            onComplete={handleVerifyOTP}
            gap="lg"
            length={6}
            type="number"
            className="mx-auto"
            size="md"
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-3">
            <Button
              fullWidth
              color={"brand.4"}
              size="xs"
              loading={otpSending}
              className="mr-1"
              onClick={resendOTP}
              autoContrast
              variant="light"
            >
              {resendLoader?seconds: "Resend"}
            </Button>

            <Button
              fullWidth
              onClick={changeEmail}
              autoContrast
              variant="filled"
            >
              Change Email
            </Button>
          </div>
        )}
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
            leftSection={<IconLock size={18} stroke={1.5} />}
            label="Password"
            placeholder="Password"
          />
        )}
        {verified && (
          <Button onClick={handleResetPassword} autoContrast variant="filled">
            Change Password
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
