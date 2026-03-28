import {
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconAt,
  IconLock,IconAnchor,
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

// ─── SignUp.jsx ───────────────────────────────────────────────────────────────
const SignUp = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("APPLICANT");
  const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);

    let errorMessage = signupValidation(name, value);

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
      if (value !== updatedData.password) errorMessage = "Passwords do not match";
    }

    setFormError((prev) => ({
      ...prev,
      [name]: errorMessage,
      ...(name === "password" && {
        confirmPassword:
          updatedData.confirmPassword && updatedData.confirmPassword !== value
            ? "Passwords do not match"
            : "",
      }),
    }));
  };

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
        setTimeout(() => navigate("/login"), 800);
      })
      .catch((err) => {
        errorNotification("Registration Failed", err?.response?.data?.errorMessage || "Something went wrong");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center px-4 py-12">
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">

        {/* ── LEFT PANEL ── */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-12 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-blue-800/40 rounded-full blur-3xl" />

          {/* Logo */}
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <IconAnchor className="text-white h-5 w-5" stroke={2.25} />
            </div>
            <span className="text-white font-extrabold text-2xl tracking-tight">HireFlow</span>
          </div>

          {/* Center copy */}
          <div className="relative z-10 space-y-5">
            <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
              Start Your<br />Journey 🚀
            </h2>
            <p className="text-blue-100 text-base leading-relaxed">
              Join thousands of professionals who've found their dream role through HireFlow.
            </p>
            <div className="flex flex-col gap-3 pt-2">
              {[
                { icon: "✅", text: "Free to sign up, always" },
                { icon: "🏢", text: "10,000+ hiring companies" },
                { icon: "💼", text: "50,000+ active job listings" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-3">
                  <span className="text-lg">{b.icon}</span>
                  <span className="text-blue-100 text-sm font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-blue-200 text-xs relative z-10">© 2025 HireFlow. All rights reserved.</p>
        </div>

        {/* ── RIGHT FORM ── */}
        <div className="p-8 sm:p-10 flex flex-col justify-center space-y-5 overflow-y-auto max-h-screen">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-slate-500 text-sm mt-1.5">Choose your account type to get started</p>
          </div>

          {/* Account type selector */}
          <div className="grid grid-cols-2 gap-3">
            {["APPLICANT", "EMPLOYER"].map((type) => (
              <button
                key={type}
                onClick={() => setAccountType(type)}
                className={`
                  p-4 rounded-2xl border-2 text-left cursor-pointer transition-all duration-200
                  ${accountType === type
                    ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                  }
                `}
              >
                <div className={`font-bold text-sm ${accountType === type ? "text-blue-700" : "text-slate-800"}`}>
                  {type === "APPLICANT" ? "👤 Applicant" : "🏢 Employer"}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {type === "APPLICANT" ? "Search & apply to jobs" : "Post jobs & hire talent"}
                </div>
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              name="name"
              value={data.name}
              error={formError.name}
              leftSection={<IconUserCircle size={16} className="text-slate-400" />}
              onChange={handleChange}
              radius="lg"
              size="md"
              classNames={{
                input: "!h-11 !border-slate-200 focus:!border-blue-500 !rounded-xl",
                label: "!font-semibold !text-slate-700 !text-sm !mb-1",
              }}
              withAsterisk
            />

            <TextInput
              label="Email Address"
              placeholder="you@email.com"
              name="email"
              value={data.email}
              error={formError.email}
              leftSection={<IconAt size={16} className="text-slate-400" />}
              onChange={handleChange}
              radius="lg"
              size="md"
              classNames={{
                input: "!h-11 !border-slate-200 focus:!border-blue-500 !rounded-xl",
                label: "!font-semibold !text-slate-700 !text-sm !mb-1",
              }}
              withAsterisk
            />

            <div className="grid grid-cols-2 gap-3">
              <PasswordInput
                label="Password"
                placeholder="Min 8 characters"
                name="password"
                value={data.password}
                error={formError.password}
                leftSection={<IconLock size={16} className="text-slate-400" />}
                onChange={handleChange}
                radius="lg"
                size="md"
                classNames={{
                  input: "!h-11 !border-slate-200 focus:!border-blue-500 !rounded-xl",
                  label: "!font-semibold !text-slate-700 !text-sm !mb-1",
                }}
                withAsterisk
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Re-enter password"
                name="confirmPassword"
                value={data.confirmPassword}
                error={formError.confirmPassword}
                leftSection={<IconLock size={16} className="text-slate-400" />}
                onChange={handleChange}
                radius="lg"
                size="md"
                classNames={{
                  input: "!h-11 !border-slate-200 focus:!border-blue-500 !rounded-xl",
                  label: "!font-semibold !text-slate-700 !text-sm !mb-1",
                }}
                withAsterisk
              />
            </div>
          </div>

          {/* Terms */}
          <Checkbox
            label={
              <span className="text-sm text-slate-600">
                I agree to the{" "}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Terms</span>
                {" "}and{" "}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Privacy Policy</span>
              </span>
            }
            size="sm"
            color="blue"
          />

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            fullWidth
            radius="xl"
            size="md"
            className="
              !h-12 !font-bold !text-base
              !bg-gradient-to-r !from-blue-600 !to-blue-700
              hover:!from-blue-700 hover:!to-blue-800
              !shadow-lg !shadow-blue-200
              hover:!shadow-blue-300 hover:!-translate-y-0.5
              !transition-all !duration-200
            "
          >
            Create Account →
          </Button>

          {/* Redirect */}
          <p className="text-center text-sm text-slate-500 pb-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-bold cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
