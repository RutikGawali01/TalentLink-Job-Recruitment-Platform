import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import FindJobs from "./pages/FindJobs.jsx";
import FindTalentPage from "./pages/FindTalentPage.jsx";
import TalentProfilePage from "./pages/TalentProfilePage.jsx";
import PostJobPage from "./pages/PostJobPage.jsx";
import JobDescriptionPage from "./pages/JobDescriptionPage.jsx";
import AppplyJobPage from "./pages/ApplyJobPage.jsx";
import CompanyPage from "./pages/CommpanyPage.jsx";
import PostedJobsPage from "./pages/PostedJobsPage.jsx";
import JobHistoryPage from "./pages/JobHistoryPage.jsx"
import FooterComp from "./Footer/FooterComp.jsx";
import Header from "./Header/HeaderComp.jsx";
import SignUpPage from "./pages/SignUpPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx";
import { Divider } from "@mantine/core";

function App() {
  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Divider size="xs" mx="md" />

        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/jobs" element={<JobDescriptionPage />} />
          <Route path="/talent-profile" element={<TalentProfilePage />} />
          <Route path="/apply-job" element={<AppplyJobPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/posted-job" element={<PostedJobsPage />} />
          <Route path="/job-history" element={<JobHistoryPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="*" element={<HomePage />} />
        </Routes>

        <FooterComp />
      </div>
    </BrowserRouter>
  );
}

export default App;



// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
