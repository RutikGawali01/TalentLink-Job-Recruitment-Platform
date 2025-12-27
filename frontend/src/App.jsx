import { MantineProvider, createTheme } from "@mantine/core";
import {Notifications} from "@mantine/notifications"
import {Provider} from "react-redux"
import Store from "./Store.jsx";
import AppRoutes from "./pages/AppRoutes.jsx";
import {getItem} from "./Services/LocalStorageService.jsx"

function App() {
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


  return (
    
    <Provider store={Store} > 
      <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications position="top-center" zIndex={1000} />
          <AppRoutes  />
        </MantineProvider>
     </Provider>
  );
}

export default App;



// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
