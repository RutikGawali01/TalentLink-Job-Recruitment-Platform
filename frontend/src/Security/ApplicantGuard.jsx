import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ApplicantGuard = ({ children }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user) return <Navigate to="/applicant/login" replace />;

  if (user.role !== "APPLICANT") return <Navigate to="/" replace />;

  if (!user.profileCompleted) {
    if (!location.pathname.startsWith("/applicant/profile")) {
      return <Navigate to={`/applicant/profile/${user.profileId}`} replace />;
    }
  }

  return children;
};

export default ApplicantGuard;
