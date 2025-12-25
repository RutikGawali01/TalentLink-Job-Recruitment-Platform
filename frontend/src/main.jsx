import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import App from "./App.jsx";
import "./index.css";
import {Notifications} from "@mantine/notifications"

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css"

const theme = createTheme({
  focusRing: "never",
  primaryColor: "brightSun",
  primaryShade: 4,
  colors: {
    mineShaft: [
      "#f6f6f6", "#e7e7e7", "#d1d1d1", "#b0b0b0", "#888888",
      "#6d6d6d", "#5d5d5d", "#4f4f4f", "#454545", "#3d3d3d",
    ],
    brightSun: [
      "#fffbeb", "#fff3c6", "#ffe588", "#ffd149", "#ffbd20",
      "#f99b07", "#dd7302", "#b75006", "#943c0c", "#7a330d",
    ],
  },
  fontFamily: "poppins, sans-serif",
});

createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
    <Notifications position="top-center" zIndex={1000} />
    <App />
  </MantineProvider>
);
