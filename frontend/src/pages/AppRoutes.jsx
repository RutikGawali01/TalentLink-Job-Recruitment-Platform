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
import JobHistoryPage from "./JobHistoryPage.jsx"
import FooterComp from "../Footer/FooterComp.jsx";
import Header from "../Header/HeaderComp.jsx";
import SignUpPage from "./SignUpPage.jsx"
import ProfilePage from "./ProfilePage.jsx";
import { Divider } from "@mantine/core";
import { getItem } from "../Services/LocalStorageService.jsx"
import ProtectedRoute from "../Services/ProtectedRoute.jsx";
import PublicRoute from "../Services/PublicRoute.jsx";
import EmployerProfilePage from "./EmployerProfilePage.jsx";
import EmployerDashboardPage from "./EmployerDashboardPage.jsx";
import ApplicantDashboardPage from "./ApplicantDashboardPage.jsx";
import ApplicantNavLinks from "../Header/ApplicantNavLinks.jsx";
import NavLinksController from "../Header/NavLinksController.jsx";

const  AppRoutes = () => {
  const user = getItem("user");
  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        {/* < NavLinksController/> */}
        <Divider  className="text-primary" />

        <Routes>
          <Route path="/find-jobs" element={ <ProtectedRoute allowedRoles={["APPLICANT"]}>   <FindJobs /> </ProtectedRoute> } />

          {/* <Route path="/find-talent" element={<ProtectedRoute allowedRoles={["EMPLOYER"]}> <FindTalentPage /> </ProtectedRoute>   } /> */}
          <Route path="/find-talent" element={ <FindTalentPage />   } />


          <Route path="/post-job/:id" element={<ProtectedRoute allowedRoles={["EMPLOYER"]}>  <PostJobPage />  </ProtectedRoute>} />

          <Route path="/jobs/:id" element={<JobDescriptionPage />} />

          <Route path="/talent-profile/:id" element={<TalentProfilePage />} />

          <Route path="/apply-job/:id" element={ <ProtectedRoute allowedRoles={["APPLICANT"]}> <AppplyJobPage />   </ProtectedRoute>  } />

          <Route path="/company/:name" element={<CompanyPage />} />

          <Route path="/posted-jobs/:id" element={<ProtectedRoute allowedRoles={["EMPLOYER"]}>  <PostedJobsPage /></ProtectedRoute>} />

          <Route path="/job-history" element={<ProtectedRoute allowedRoles={["APPLICANT"]}> <JobHistoryPage />  </ProtectedRoute>} />

          <Route path="/applicant/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />

          <Route path="/employer/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />

          <Route path="/applicant/login" element={<PublicRoute><SignUpPage /></PublicRoute>} />
          <Route path="/employer/login" element={<PublicRoute><SignUpPage /></PublicRoute>} />


          <Route path="/applicant/profile" element={<ProfilePage />} />

          <Route path="/employer/profile" element={<EmployerProfilePage/>} />

          <Route path="/employer/dashboard" element={<EmployerDashboardPage/>} />

          <Route path="/applicant/dashboard" element={<ApplicantDashboardPage/>} />

          <Route path="*" element={<HomePage />} />
        </Routes> 

        <FooterComp />
      </div>  
    </BrowserRouter>
  )
}

export default AppRoutes
