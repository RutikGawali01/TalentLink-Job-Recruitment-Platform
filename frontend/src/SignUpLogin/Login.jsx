import {
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useDisclosure } from "@mantine/hooks";

import { loginValidation } from "../Services/FormValidation";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";
import { setUser } from "../Slice/UserSlice";
import { setJwt } from "../Slice/JwtSlice";
import { loginUser } from "../Services/AuthService";
import ResetPassword from "./ResetPassword";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setData({ ...data, [name]: value });
    setFormError({
      ...formError,
      [name]: loginValidation(name, value),
    });
  };

  const handleSubmit = () => {
    let valid = true;
    let newErrors = {};

    for (let key in data) {
      newErrors[key] = loginValidation(key, data[key]);
      if (newErrors[key]) valid = false;
    }

    setFormError(newErrors);
    if (!valid) return;

    setLoading(true);

    loginUser(data)
      .then((res) => {
        successNotification("Login Successful", "Redirecting...");

        dispatch(setJwt(res.jwt));
        dispatch(
          setUser({
            accountType: res.accountType,
            profileId: res.profileId,
            profileCompleted: res.profileCompleted,
            onboardingStep: res.onboardingStep,
            companyId: res.companyId,
          }),
        );

        setTimeout(() => {
          setLoading(false);

          if (res.accountType === "EMPLOYER") {
            if (res.onboardingStep === 1) {
              navigate(`/employer/profile/${res.profileId}`);
            } else if (res.onboardingStep === 2) {
              navigate(`/employer/company-profile/${res.profileId}`);
            } else if (res.onboardingStep === 3) {
              navigate("/post-job/0");
            } else {
              navigate("/");
            }
          } else {
            navigate("/applicant/profile");
          }
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        errorNotification(
          "Login Failed",
          err?.response?.data?.errorMessage || "Invalid credentials",
        );
      });
  };

  return (
    <div className="min-h-screen bg-tertiary flex items-center justify-center px-4">
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[var(--blue-100)] p-12 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">Welcome Back</h2>
          <p className="text-gray-600">Login to continue your journey</p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
            <p className="text-gray-500 text-sm mt-1">
              Enter your credentials below
            </p>
          </div>

          <TextInput
            name="email"
            label="Email"
            placeholder="your@email.com"
            value={data.email}
            error={formError.email}
            leftSection={<IconAt size={16} />}
            onChange={handleChange}
            radius="md"
            size="md"
            classNames={{ input: "h-12" }}
            withAsterisk
          />

          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter password"
            value={data.password}
            error={formError.password}
            leftSection={<IconLock size={16} />}
            onChange={handleChange}
            radius="md"
            size="md"
            classNames={{ input: "h-12" }}
            withAsterisk
          />

          <Button
            onClick={handleSubmit}
            fullWidth
            radius="md"
            size="md"
            className="h-12 bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Login
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Get Started
            </span>
          </div>

          <div
            onClick={open}
            className="text-center text-sm text-indigo-600 hover:underline cursor-pointer"
          >
            Forgot Password?
          </div>
        </div>
      </div>

      <ResetPassword opened={opened} close={close} />
    </div>
  );
};

export default Login;
