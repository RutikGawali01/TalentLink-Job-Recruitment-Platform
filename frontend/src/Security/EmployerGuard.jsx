import { useSelector } from "react-redux";
import { Navigate, useLocation, matchPath } from "react-router-dom";
const EmployerGuard = ({ children }) => {

  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace />;

  if (user.accountType !== "EMPLOYER")
    return <Navigate to="/" replace />;

  // REQUEST PENDING
  if (user.requestStatus === "PENDING") {
    if (location.pathname !== "/company-request-status") {
      return <Navigate to="/company-request-status" replace />;
    }
  }

  // PROFILE STEP
  else if (user.onboardingStep === 1) {
    const correctPath = `/employer/profile/${user.profileId}`;

    if (location.pathname !== correctPath) {
      return <Navigate to={correctPath} replace />;
    }
  }

  // CLAIM COMPANY
  else if (user.onboardingStep === 2) {
    const correctPath = `/company-claim/${user.profileId}`;

    if (location.pathname !== correctPath) {
      return <Navigate to={correctPath} replace />;
    }
  }

  // COMPANY PROFILE
  else if (user.onboardingStep === 3) {
    const correctPath = `/employer/company-profile/${user.profileId}`;

    if (location.pathname !== correctPath) {
      return <Navigate to={correctPath} replace />;
    }
  }

  return children;
};

export default EmployerGuard;