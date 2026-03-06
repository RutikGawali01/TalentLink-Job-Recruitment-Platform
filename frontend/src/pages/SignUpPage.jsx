import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import Login from "../SignUpLogin/Login";
import SignUp from "../SignUpLogin/SignUp";

const AuthPage = ({ mode }) => {
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  return (

      // {/* Home Button */}
    

      // {/* Auth Content */}
      <div className="w-full">
        {isSignup ? <SignUp /> : <Login />}
      </div>

  );
};

export default AuthPage;