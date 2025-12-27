import {
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Checkbox,
} from "@mantine/core";
import { IconAt, IconX, IconCheck, IconLock } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Radio, Group, LoadingOverlay } from "@mantine/core";
import { useState } from "react";

import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
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
    accountType: "APPLICANT",
  };

  const [formError, setFormError] = useState(form);
  const [data, setData] = useState(form);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    if (typeof event == "string") {
      setData({ ...data, accountType: event });
      return;
    }
    let name = event.target.name,
      value = event.target.value;
    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: signupValidation(name, value) });
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
        setFormError({ ...form, [name]: "Passwords do not match." });
      else setFormError({ ...formError, confirmPassword: "" });
    }
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError = {};
    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword")
        newFormError[key] = signupValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFormError[key] = "Passwords do not match.";
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    //console.log(valid);
    if (valid == true) {
      setLoading(true); // only if all fields are valid then loading
      registerUser(data)
        .then((res) => {
          console.log(res);
          setData(form);

          successNotification(
            "Registered Successfully",
            "Redirecting to home page..."
          );
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          const errorMsg =
            err?.response?.data?.errorMessage || "Something went wrong";
          errorNotification("Registration Failed", errorMsg);
        });
    }
  };

  return (
    <>
      <LoadingOverlay visible={loading} zIndex={1000} className="translate-x-1/2" overlayProps={{radius:"sm", blur:2}} 
        loaderProps={{color:"yellow", type:"bars"}}
    />
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className=" text-2xl font-semibold">Create Account</div>
      <TextInput
        error={formError.name}
        value={data.name}
        onChange={handleChange}
        name="name"
        withAsterisk
        label="Full Name"
        placeholder="Your name"
      />
      <TextInput
        error={formError.email}
        value={data.email}
        withAsterisk
        onChange={handleChange}
        name="email"
        leftSection={<IconAt size={16} />}
        label=" Email"
        placeholder="Your email"
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
        label=" Confirm Password"
        placeholder=" Confirm Password"
      />

      <Radio.Group
        value={data.accountType}
        onChange={handleChange}
        label="You are?"
        withAsterisk
      >
        <Group mt="xs">
          <Radio
            className="py-4 px-6 hover:bg-mine-shaft-900 border border-mine-shaft-800 rounded-lg
            has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5"
            autoContrast
            value="APPLICANT"
            label="Applicant"
          />
          <Radio
            className="py-4 px-6 hover:bg-mine-shaft-900 border border-mine-shaft-800 rounded-lg
            has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5"
            autoContrast
            value="EMPLOYER"
            label="Employer"
          />
        </Group>
      </Radio.Group>

      <Checkbox
        autoContrast
        label={
          <>
            I accept <Anchor>terms & conditions </Anchor>{" "}
          </>
        }
      />
      <Button loading={loading} onClick={handleSubmit} autoContrast variant="filled">
        Sign up
      </Button>
      <div className="mx-auto">
        Have an account?{" "}
        <span
          onClick={() => {
            navigate("/login");
            setFormError(form);
            setData(form);
          }}
          className="cursor-pointer text-bright-sun-400 hover:underline"
        >
          Login
        </span>
      </div>
    </div>
    </>
  );
};

export default SignUp;
