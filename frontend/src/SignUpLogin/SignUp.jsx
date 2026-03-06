import {
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconAt,
  IconLock,
  IconUserCircle,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";

const SignUp = () => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("APPLICANT");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  // ================= HANDLE CHANGE =================
  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedData = { ...data, [name]: value };
    setData(updatedData);

    let errorMessage = signupValidation(name, value);

    // 🔥 Live password match validation
    if (name === "password" && updatedData.confirmPassword) {
      if (value !== updatedData.confirmPassword) {
        setFormError((prev) => ({
          ...prev,
          password: errorMessage,
          confirmPassword: "Passwords do not match",
        }));
        return;
      }
    }

    if (name === "confirmPassword") {
      if (value !== updatedData.password) {
        errorMessage = "Passwords do not match";
      }
    }

    setFormError((prev) => ({
      ...prev,
      [name]: errorMessage,
      ...(name === "password" && {
        confirmPassword:
          updatedData.confirmPassword &&
          updatedData.confirmPassword !== value
            ? "Passwords do not match"
            : "",
      }),
    }));
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = () => {
    let valid = true;
    let newErrors = {};

    for (let key in data) {
      newErrors[key] = signupValidation(key, data[key]);
      if (newErrors[key]) valid = false;
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setFormError(newErrors);
    if (!valid) return;

    setLoading(true);

    registerUser({ ...data, accountType })
      .then(() => {
        successNotification("Registered Successfully", "Redirecting...");
        setTimeout(() => navigate("/login"), 1200);
      })
      .catch((err) => {
        errorNotification(
          "Registration Failed",
          err?.response?.data?.errorMessage || "Something went wrong"
        );
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-tertiary flex items-center justify-center px-4 ">
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 ">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[var(--blue-100)] p-12 text-center">
          <h2 className="text-4xl font-bold text-indigo-600 mb-4">
            Join Us Today
          </h2>
          <p className="text-gray-600">
            Create your account and start your journey
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10 space-y-6">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Choose your account type
            </p>
          </div>

          {/* ACCOUNT TYPE */}
          <div className="grid grid-cols-2 gap-4">
            {["APPLICANT", "EMPLOYER"].map((type) => (
              <div
                key={type}
                onClick={() => setAccountType(type)}
                className={`p-5 rounded-xl border cursor-pointer transition
                  ${
                    accountType === type
                      ? "border-[var(--blue-500)] bg-indigo-50 shadow-md"
                      : "border-gray-200 hover:shadow-sm"
                  }`}
              >
                <div className="font-semibold text-gray-800">
                  {type === "APPLICANT" ? "👤 Applicant" : "🏢 Employer"}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {type === "APPLICANT"
                    ? "Search & apply to jobs"
                    : "Hire top candidates"}
                </div>
              </div>
            ))}
          </div>

          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            name="name"
            value={data.name}
            error={formError.name}
            leftSection={<IconUserCircle size={16} />}
            onChange={handleChange}
            radius="md"
            classNames={{ input: "h-12" }}
            withAsterisk
          />

          <TextInput
            label="Email"
            placeholder="your@email.com"
            name="email"
            value={data.email}
            error={formError.email}
            leftSection={<IconAt size={16} />}
            onChange={handleChange}
            radius="md"
            classNames={{ input: "h-12" }}
            withAsterisk
          />

          <PasswordInput
            label="Password"
            placeholder="Enter strong password"
            name="password"
            value={data.password}
            error={formError.password}
            leftSection={<IconLock size={16} />}
            onChange={handleChange}
            radius="md"
            classNames={{ input: "h-12" }}
            withAsterisk
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter password"
            name="confirmPassword"
            value={data.confirmPassword}
            error={formError.confirmPassword}
            leftSection={<IconLock size={16} />}
            onChange={handleChange}
            radius="md"
            classNames={{ input: "h-12" }}
            withAsterisk
          />

          <Checkbox
            label="I accept terms & conditions"
            size="sm"
          />

          <Button
            onClick={handleSubmit}
            fullWidth
            radius="md"
            className="h-12 bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Get Started
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;