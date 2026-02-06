import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";


const ProtectedRoute = ({ children, allowedRoles }) => {
    // read jwt from redux
    const token = useSelector((state) => state.jwt);
   // if no token - not logged -in
    if (!token) {
        return <Navigate to="/applicant/login" />
    }
    // decode jwt
    const decoded = jwtDecode(token);
    if (allowedRoles && !allowedRoles.includes(decoded.accountType)) return <Navigate to="/unauthorized" />;

    return children;
}
export default ProtectedRoute;