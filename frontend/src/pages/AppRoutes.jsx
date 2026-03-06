import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import FindJobs from "./FindJobs.jsx";
import FindTalentPage from "./FindTalentPage.jsx";
import TalentProfilePage from "./TalentProfilePage.jsx";
import PostJobPage from "./PostJobPage.jsx";
import JobDescriptionPage from "./JobDescriptionPage.jsx";
import AppplyJobPage from "./ApplyJobPage.jsx";
import CompanyPage from "./CommpanyPage.jsx";
import PostedJobsPage from "./PostedJobsPage.jsx";
import JobHistoryPage from "./JobHistoryPage.jsx";
import FooterComp from "../Footer/FooterComp.jsx";
import Header from "../Header/HeaderComp.jsx";
import AuthPage from "./SignUpPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import { Divider } from "@mantine/core";
import { getItem } from "../Services/LocalStorageService.jsx";
import ProtectedRoute from "../Services/ProtectedRoute.jsx";
import PublicRoute from "../Services/PublicRoute.jsx";
import EmployerProfilePage from "./EmployerProfilePage.jsx";
import EmployerDashboardPage from "./EmployerDashboardPage.jsx";
import ApplicantDashboardPage from "./ApplicantDashboardPage.jsx";
import ApplicantNavLinks from "../Header/ApplicantNavLinks.jsx";
import NavLinksController from "../Header/NavLinksController.jsx";
import CompanyProfileComp from "../CompanyProfile/CompanyProfileComp.jsx";

import EmployerGuard from "../Security/EmployerGuard.jsx";

import ApplicantGuard from "../Security/ApplicantGuard.jsx";

import { useLocation } from "react-router-dom";
const AppRoutes = () => {
  const location = useLocation();

  const hideNavbarRoutes = [
    // "/signup",
    // "/login",
  ];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route),
  );
  const user = getItem("user");
  return (
    <div className="relative">
      {!shouldHideNavbar && <Header />}
      {/* < NavLinksController/> */}
      {!shouldHideNavbar && <Divider className="text-primary" />}

      <Routes>
        <Route
          path="/find-jobs"
          element={
            <ProtectedRoute allowedRoles={["APPLICANT"]}>
              {" "}
              <FindJobs />{" "}
            </ProtectedRoute>
          }
        />

        {/* <Route path="/find-talent" element={<ProtectedRoute allowedRoles={["EMPLOYER"]}> <FindTalentPage /> </ProtectedRoute>   } /> */}
        <Route path="/find-talent" element={<FindTalentPage />} />

        <Route
          path="/post-job/:id"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
              <EmployerGuard>
                <PostJobPage />
              </EmployerGuard>
            </ProtectedRoute>
          }
        />

        <Route path="/jobs/:id" element={<JobDescriptionPage />} />

        <Route path="/talent-profile/:id" element={<TalentProfilePage />} />

        <Route
          path="/apply-job/:id"
          element={
            <ProtectedRoute allowedRoles={["APPLICANT"]}>
              {" "}
              <AppplyJobPage />{" "}
            </ProtectedRoute>
          }
        />

        <Route path="/company/:name" element={<CompanyPage />} />

        <Route
          path="/employer/company-profile/:profileId"
          element={
            <EmployerGuard>
              <CompanyProfileComp />
            </EmployerGuard>
          }
        />

        <Route
          path="/posted-jobs/:id"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYER"]}>
              {" "}
              <PostedJobsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-history"
          element={
            <ProtectedRoute allowedRoles={["APPLICANT"]}>
              {" "}
              <JobHistoryPage />{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <AuthPage mode="signup" />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthPage mode="login" />
            </PublicRoute>
          }
        />

        <Route path="/applicant/profile" element={<ProfilePage />} />

        <Route
          path="/employer/profile/:profileId"
          element={
            <EmployerGuard>
              <EmployerProfilePage />
            </EmployerGuard>
          }
        />


          {/* <Route path="/employer/profile/:profileId" element={<EmployerProfilePage />} /> */}

        <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />

        <Route
          path="/applicant/dashboard"
          element={<ApplicantDashboardPage />}
        />

        <Route path="*" element={<HomePage />} />
      </Routes>

      <FooterComp />
    </div>
  );
};

export default AppRoutes;
