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
import {getItem} from "../Services/LocalStorageService.jsx"

const AppRoutes = () => {
    const user = getItem("user");
  return (
   <BrowserRouter>
      <div className="relative">
        <Header />
        <Divider size="xs" mx="md" />

        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/jobs/:id" element={<JobDescriptionPage />} />
          <Route path="/talent-profile" element={<TalentProfilePage />} />
          <Route path="/apply-job/:id" element={<AppplyJobPage />} />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/posted-job" element={<PostedJobsPage />} />
          <Route path="/job-history" element={<JobHistoryPage />} />

          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />

          <Route path="/login" element={user ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="*" element={<HomePage />} />
        </Routes>

        <FooterComp />
      </div>
    </BrowserRouter>
  )
}

export default AppRoutes
