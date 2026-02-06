import {
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Checkbox,
} from "@mantine/core";
import {
  IconAt,
  IconLock,
  IconUserCircle,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";
import { useState } from "react";

import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import {
  successNotification,
  errorNotification,
} from "../Services/NotificationService";

const SignUp = () => {
  const form = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  };

  const [formError, setFormError] = useState(form);
  const [data, setData] = useState(form);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const isEmployer = location.pathname === "/employer/signup";

  // controlled input
  const handleChange = (event) => {
    let name = event.target.name,
      value = event.target.value;

    setData({ ...data, [name]: value });

    setFormError({ ...formError, [name]: signupValidation(name, value) });

    // password match logic
    if (name === "password" && data.confirmPassword !== "") {
      let err = "";
      if (data.confirmPassword !== value) err = "Passwords do not match.";

      setFormError({
        ...formError,
        [name]: signupValidation(name, value),
        confirmPassword: err,
      });
    }

    if (name === "confirmPassword") {
      if (data.password !== value)
        setFormError({ ...formError, confirmPassword: "Passwords do not match." });
      else setFormError({ ...formError, confirmPassword: "" });
    }
  };

  const handleSubmit = () => {
    let valid = true;
    let newFormError = {};

    for (let key in data) {
      if (isEmployer && key === "name") continue; // skip name for employer

      if (key !== "confirmPassword") {
        newFormError[key] = signupValidation(key, data[key]);
      } else if (data.confirmPassword !== data.password) {
        newFormError[key] = "Passwords do not match.";
      }

      if (newFormError[key]) valid = false;
    }

    setFormError(newFormError);
    if (!valid) return;

    const payload = {
      ...data,
      ...(isEmployer && { name: undefined }), // remove name for employer
      accountType: isEmployer ? "EMPLOYER" : "APPLICANT",
    };

    setLoading(true);

    registerUser(payload)
      .then(() => {
        successNotification(
          "Registered Successfully",
          "Redirecting to login..."
        );

        setTimeout(() => {
          setLoading(false);
          navigate(
            isEmployer ? "/employer/login" : "/applicant/login"
          );
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        errorNotification(
          "Registration Failed",
          err?.response?.data?.errorMessage || "Something went wrong"
        );
      });
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        className="translate-x-1/2"
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />

      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>
        <div>
          {isEmployer ? "Hire Best Candidates" : "Search & apply to jobs"}
        </div>

        {/* Name field only for Applicant */}
        {!isEmployer && (
          <TextInput
            label="Full Name"
            placeholder="Your name"
            name="name"
            value={data.name}
            error={formError.name}
            leftSection={<IconUserCircle size={16} />}
            onChange={handleChange}
            withAsterisk
          />
        )}

        <TextInput
          error={formError.email}
          value={data.email}
          withAsterisk
          onChange={handleChange}
          name="email"
          leftSection={<IconAt size={16} />}
          label={isEmployer ? "Work Email" : "Email"}
          placeholder={isEmployer ? "you@company.com" : "your@email.com"}
        />

        <PasswordInput
          error={formError.password}
          value={data.password}
          name="password"
          withAsterisk
          onChange={handleChange}
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Password"
          placeholder="Password"
        />

        <PasswordInput
          error={formError.confirmPassword}
          name="confirmPassword"
          value={data.confirmPassword}
          withAsterisk
          onChange={handleChange}
          leftSection={<IconLock size={18} stroke={1.5} />}
          label="Confirm Password"
          placeholder="Confirm Password"
        />

        <Checkbox
          autoContrast
          label={
            <>
              I accept <Anchor>terms & conditions</Anchor>
            </>
          }
        />

        <Button
          loading={loading}
          onClick={handleSubmit}
          autoContrast
          variant="filled"
        >
          Sign up
        </Button>

        <div className="mx-auto">
          Have an account?{" "}
          <span
            onClick={() =>
              navigate(isEmployer ? "/employer/login" : "/applicant/login")
            }
            className="cursor-pointer text-[var(--blue-600)] hover:underline"
          >
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
