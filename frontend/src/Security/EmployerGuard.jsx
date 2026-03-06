 import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";


const EmployerGuard = ({ children }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace />;

  if (user.accountType !== "EMPLOYER")
    return <Navigate to="/" replace />;

  // ---------- STEP 1 ----------
  if (user.onboardingStep === 1) {
    const correctPath = `/employer/profile/${user.profileId}`;
    if (location.pathname !== correctPath) {
      return <Navigate to={correctPath} replace />;
    }
  }

  // ---------- STEP 2 ----------
  else if (user.onboardingStep === 2) {
    const correctPath = `/employer/company-profile/${user.profileId}`;
    if (location.pathname !== correctPath) {
      return <Navigate to={correctPath} replace />;
    }
  }

  // ---------- STEP 3 (Dynamic /post-job/:id) ----------
  else if (user.onboardingStep === 3) {
    const isPostJobRoute = matchPath("/post-job/:id", location.pathname);

    if (!isPostJobRoute) {
      return <Navigate to="/post-job/0" replace />;
    }
  }

  return children;
};

export default EmployerGuard;
