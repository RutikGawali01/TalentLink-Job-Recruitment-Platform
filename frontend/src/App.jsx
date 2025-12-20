import React from "react";
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import { MantineProvider, createTheme } from "@mantine/core";
import HomePage from "./pages/HomePage.jsx";
import FindJobs from "./pages/FindJobs.jsx";
import FindTalentPage from "./pages/FindTalentPage.jsx"
import TalentProfilePage from "./pages/TalentProfilePage.jsx";
import PostJobPage from "./pages/PostJobPage.jsx"
import JobDescriptionPage from "./pages/JobDescriptionPage.jsx";
import AppplyJobPage from "./pages/ApplyJobPage.jsx";
import "./index.css"; // <-- MUST contain your @theme tokens (or App.css if you put them there)
import FooterComp from "../src/Footer/FooterComp.jsx";
import Header from "../src/Header/HeaderComp.jsx";
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

import {Divider} from "@mantine/core"

function App() {
  // just pass a plain theme object to MantineProvider
  const theme = createTheme({
    focusRing: "never",
    primaryColor: "brightSun",
    primaryShade:4,
  colors: {
    mineShaft: [
      "#f6f6f6", "#e7e7e7", "#d1d1d1", "#b0b0b0", "#888888",
      "#6d6d6d", "#5d5d5d", "#4f4f4f", "#454545", "#3d3d3d"
    ],
    brightSun: [
      "#fffbeb", "#fff3c6", "#ffe588", "#ffd149", "#ffbd20",
      "#f99b07", "#dd7302", "#b75006", "#943c0c", "#7a330d"
    ],
  },
  fontFamily:"poppins, sans-serif"

});

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <BrowserRouter>

        <div className="relative"> 
        <Header />
       <Divider  size="xs" mx="md"  />
        <Routes>
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/post-job" element= {<PostJobPage />} />
          <Route path="/jobs" element= {<JobDescriptionPage />} />
          <Route path="/talent-profile" element={<TalentProfilePage />} />
          <Route path="/apply-job" element = {<AppplyJobPage />} />
          <Route  path="*" element={< HomePage />} />
        </Routes>
        <FooterComp />
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;



// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
