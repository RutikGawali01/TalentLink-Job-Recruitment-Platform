import { useSelector } from "react-redux";
import PublicNavLinks from "./PublicNavLinks";
import ApplicantNavLinks from "./ApplicantNavLinks";
import EmployerNavLinks from "./EmployerNavLinks";


const NavLinksController = (props) => {
  const user = useSelector((state) => state.user);

  if (!user) return <PublicNavLinks {...props }/>;

  if (user.accountType === "APPLICANT") {
    return <ApplicantNavLinks  {...props } />;
  }

  if (user.accountType === "EMPLOYER") {
    return <EmployerNavLinks {...props } />;
  }

  return null;
};

export default NavLinksController;
