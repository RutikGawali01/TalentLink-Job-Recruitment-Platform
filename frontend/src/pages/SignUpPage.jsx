import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import Login from "../SignUpLogin/Login";
import SignUp from "../SignUpLogin/SignUp";

  
// ─── AuthPage.jsx ─────────────────────────────────────────────────────────────
const AuthPage = ({ mode }) => {
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-300">

      {/* Top-left blob */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-300 opacity-50 blur-3xl" />

      {/* Bottom-right blob */}
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-blue-500 opacity-40 blur-3xl" />

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#1e40af 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Page content */}
      <div className="relative z-10 w-full">
        {isSignup ? <SignUp /> : <Login />}
      </div>
    </div>
  );
};

export default AuthPage;