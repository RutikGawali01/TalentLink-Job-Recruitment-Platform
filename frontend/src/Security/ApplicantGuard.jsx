import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ApplicantGuard = ({ children }) => {

  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile.data);

  const location = useLocation();

  // console.log("user:", user);
  // console.log("profile:", profile);

  if (!user) {
    return <Navigate to="/applicant/login" replace />;
  }

  if (user.accountType !== "APPLICANT") {
    return <Navigate to="/" replace />;
  }

  /* -------- Profile not loaded yet -------- */

  if (!profile) {
    return null; // or loading spinner
  }

  /* -------- Resume Upload Step -------- */

  if (!profile.resumeUploaded) {
    if (!location.pathname.startsWith("/applicant/resume-upload")) {
      return <Navigate to="/applicant/resume-upload" replace />;
    }
  }

  /* -------- Profile Completion Step -------- */

  if (profile.resumeUploaded && !profile.profileCompleted) {
    // console.log("reached applicant profile");
    if (location.pathname.startsWith("/applicant/profile")) {
      return (
        <Navigate
          to={`/applicant/profile`}
          replace
        />
      );
    }
  }

  return children;
};

export default ApplicantGuard;