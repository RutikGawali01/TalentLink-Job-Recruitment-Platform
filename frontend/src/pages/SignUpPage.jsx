import { Button, useMantineTheme } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { IconAnchor, IconArrowLeft } from "@tabler/icons-react";
import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const isApplicant = location.pathname.startsWith("/applicant");
  const isEmployer = location.pathname.startsWith("/employer");

  const isSignup =
    location.pathname === "/applicant/signup" ||
    location.pathname === "/employer/signup";

  const content = isApplicant
    ? {
        title: "Find Job",
        subtitle: "Find the job made for you",
      }
    : {
        title: "Hire Candidates",
        subtitle: "Hire the best candidates for you",
      };

  return (
    <div className="min-h-[90vh] bg-primary font-['poppins'] overflow-hidden relative">
      <Button
        size="sm"
        onClick={() => navigate("/")}
        leftSection={<IconArrowLeft size={20} />}
        my="lg"
        color="brand"
        autoContrast
        variant="light"
        className="!absolute left-5 z-10"
      >
        Home
      </Button>

      <div
        className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-800 flex [&>*]:flex-shrink-0
        ${isSignup ? "-translate-x-1/2" : "translate-x-0"}`}
      >
        <Login  />

        <div
          className={`w-1/2 h-full transition-all ease-in-out duration-1000
          ${isSignup ? "rounded-r-[200px]" : "rounded-l-[200px]"}
          bg-[var(--blue-100)] flex items-center gap-5 justify-center flex-col`}
        >
          <div className="flex gap-1 items-center text-[var(--blue-600)]">
            <IconAnchor className="h-16 w-16" stroke={2.5} />
            <div className="text-6xl font-semibold">{content.title}</div>
          </div>

          <div className="text-2xl font-semibold text-[var(--blue-500)]">
            {content.subtitle}
          </div>
        </div>

        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
