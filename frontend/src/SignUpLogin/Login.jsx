import {
  TextInput,
  PasswordInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { IconAt, IconLock, IconAnchor } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";

import { loginValidation } from "../Services/FormValidation";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";
import { setUser } from "../Slice/UserSlice";
import {setProfile} from "../Slice/ProfileSlice";
import {setEmployerProfile} from "../Slice/EmployerProfileSlice";
import { setJwt } from "../Slice/JwtSlice";
import { loginUser } from "../Services/AuthService";
import ResetPassword from "./ResetPassword";

// ─── Login.jsx ────────────────────────────────────────────────────────────────
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
    setFormError({ ...formError, [name]: loginValidation(name, value) });
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
        // console.log("Login Response:", res);

        //         const user = useSelector((state) => state.user);
        // console.log("Redux user:", user);
        successNotification("Login Successful", "Redirecting...");
        dispatch(setJwt(res.jwt));

        dispatch(
          setUser({
            accountType: res.accountType,
            profileId: res.profileId,
            onboardingStep: res.onboardingStep,
            companyId: res.companyId,
            status: res.status,
          }),
        );

        if (res.accountType === "APPLICANT") {
          dispatch(
            setProfile({
              resumeUploaded: res.resumeUploaded,
              profileCompleted: res.profileCompleted,
            }),
          );
        } else if (res.accountType === "EMPLOYER") {
          dispatch(
            setEmployerProfile({
              profileCompleted: res.profileCompleted,
            }),
          );
        }

        // console.log(res);
        setTimeout(() => {
          setLoading(false);

          if (res.accountType === "EMPLOYER") {
            if (res?.status === "PENDING") {
              navigate("/company-request-status");
            } else if (res?.status === "APPROVED") {
              navigate("/post-job/0");
            } else if (res?.companyId) {
              navigate("/post-job/0");
            } else if (res.onboardingStep === 1) {
              navigate(`/employer/profile/${res.profileId}`);
            } else if (res.onboardingStep === 2) {
              navigate(`/company-claim/${res.profileId}`);
            } else if (res.onboardingStep === 3) {
              navigate(`/employer/company-profile/${res.profileId}`);
            } else {
              navigate("/");
            }
          } else if (res.accountType === "APPLICANT") {
          
            // console.log("reached applicant")
            if (!res.resumeUploaded) {
              navigate("/applicant/resume-upload");
            } else if (!res.profileCompleted) {
              navigate(`/applicant/profile`);
            } else {
              navigate("/find-jobs");
            }
          }
        }, 800);
      })
      .catch((err) => {
        setLoading(false);
        errorNotification(
          "Login Failed",
          err?.response?.data?.errorMessage || "Invalid credentials",
        );
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center px-4 py-12">
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
        {/* ── LEFT PANEL ── */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-12 relative overflow-hidden">
          {/* decorative blobs */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-blue-800/40 rounded-full blur-3xl" />

          {/* Logo */}
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <IconAnchor className="text-white h-5 w-5" stroke={2.25} />
            </div>
            <span className="text-white font-extrabold text-2xl tracking-tight">
              HireFlow
            </span>
          </div>

          {/* Center copy */}
          <div className="relative z-10 space-y-5">
            <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
              Welcome
              <br />
              Back 👋
            </h2>
            <p className="text-blue-100 text-base leading-relaxed">
              Log back in and pick up right where you left off. Your next
              opportunity is waiting.
            </p>

            {/* Trust badges */}
            <div className="flex flex-col gap-3 pt-2">
              {[
                { icon: "🔒", text: "Secure & encrypted login" },
                { icon: "⚡", text: "Instant access to your dashboard" },
                { icon: "🎯", text: "Personalised job matches" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-3">
                  <span className="text-lg">{b.icon}</span>
                  <span className="text-blue-100 text-sm font-medium">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <p className="text-blue-200 text-xs relative z-10">
            © 2025 HireFlow. All rights reserved.
          </p>
        </div>

        {/* ── RIGHT FORM ── */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Sign In
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">
              Enter your credentials to continue
            </p>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <TextInput
              name="email"
              label="Email address"
              placeholder="you@email.com"
              value={data.email}
              error={formError.email}
              leftSection={<IconAt size={16} className="text-slate-400" />}
              onChange={handleChange}
              radius="lg"
              size="md"
              classNames={{
                input:
                  "!h-12 !border-slate-200 focus:!border-blue-500 !rounded-xl",
                label: "!font-semibold !text-slate-700 !text-sm !mb-1.5",
              }}
              withAsterisk
            />

            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={data.password}
              error={formError.password}
              leftSection={<IconLock size={16} className="text-slate-400" />}
              onChange={handleChange}
              radius="lg"
              size="md"
              classNames={{
                input:
                  "!h-12 !border-slate-200 focus:!border-blue-500 !rounded-xl",
                label: "!font-semibold !text-slate-700 !text-sm !mb-1.5",
              }}
              withAsterisk
            />
          </div>

          {/* Forgot password */}
          <div className="text-right -mt-2">
            <span
              onClick={open}
              className="text-sm text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>

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
            Sign In →
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Redirect */}
          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-bold cursor-pointer hover:underline"
            >
              Create one free
            </span>
          </p>
        </div>
      </div>

      <ResetPassword opened={opened} close={close} />
    </div>
  );
};

export default Login;
