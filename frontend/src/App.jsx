import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import Store from "./Store.jsx";
import AppRoutes from "./pages/AppRoutes.jsx";
import { DatesProvider } from "@mantine/dates";
import { BrowserRouter } from "react-router-dom";

function App() {
  // 🎨 Mantine Theme for Job Portal (Light)
  const theme = createTheme({
    focusRing: "never",

    /* Primary brand color */
    primaryColor: "brand",
    primaryShade: 5,

    /* Font */
    fontFamily: "Poppins, sans-serif",

    /* Color palette aligned with your light theme */
    colors: {
      brand: [
        "#EFF6FF", // 0
        "#DBEAFE", // 1
        "#BFDBFE", // 2
        "#93C5FD", // 3
        "#60A5FA", // 4 (blue-400)
        "#3B82F6", // 5 (blue-500) → primary
        "#2563EB", // 6 (blue-600)
        "#1D4ED8", // 7
        "#1E40AF", // 8
        "#1E3A8A", // 9
      ],
      purple: [
        "#FAF5FF",
        "#F3E8FF",
        "#E9D5FF",
        "#D8B4FE",
        "#C084FC",
        "#A855F7",
        "#9333EA", // gradient end
        "#7E22CE",
        "#6B21A8",
        "#581C87",
      ],
      gray: [
        "#F9FAFB", // 0 bg-secondary
        "#F3F4F6", // 1 bg-tertiary
        "#E5E7EB", // 2 border
        "#D1D5DB", // 3 disabled
        "#9CA3AF", // 4 placeholder
        "#6B7280", // 5 icons
        "#4B5563", // 6 secondary text
        "#374151", // 7
        "#1F2937", // 8
        "#111827", // 9 primary text
      ],
    },

    /* Global styles */
    components: {
      Button: {
        defaultProps: {
          radius: "lg",
        },
      },
      Card: {
        defaultProps: {
          radius: "xl",
          withBorder: true,
        },
      },
      TextInput: {
        defaultProps: {
          radius: "lg",
        },
      },
    },
  });

return (
    <Provider store={Store}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        {/* ✅ ADD THIS */}
        <DatesProvider settings={{ locale: "en" }}>
          <Notifications position="top-center" zIndex={1000} />
         <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </DatesProvider>
      </MantineProvider>
    </Provider>
  );
}

export default App;