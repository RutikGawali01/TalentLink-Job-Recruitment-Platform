import { useSelector } from "react-redux";
import PublicNavLinks from "./PublicNavLinks";
import ApplicantNavLinks from "./ApplicantNavLinks";
import EmployerNavLinks from "./EmployerNavLinks";


const NavLinksController = () => {
  const user = useSelector((state) => state.user);

  if (!user) return <PublicNavLinks />;

  if (user.accountType === "APPLICANT") {
    return <ApplicantNavLinks />;
  }

  if (user.accountType === "EMPLOYER") {
    return <EmployerNavLinks />;
  }

  return null;
};

export default NavLinksController;
