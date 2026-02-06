import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Prevent logged-in users from accessing:/login and /signup
const PublicRoute = ({ children }) => {
    const token = useSelector((state) => state.jwt);
    if (token) {
        return <Navigate to="/" />
    }

    return children;
}
export default PublicRoute;