import React from "react";
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import { MantineProvider, createTheme } from "@mantine/core";
import HomePage from "./pages/HomePage.jsx";
import "./index.css"; // <-- MUST contain your @theme tokens (or App.css if you put them there)

function App() {
  // just pass a plain theme object to MantineProvider
  const theme = createTheme({
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
});

  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route  path="*" element={< HomePage />} />
        </Routes>
        
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
