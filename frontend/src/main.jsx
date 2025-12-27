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



createRoot(document.getElementById("root")).render(
    <App />
  
);
