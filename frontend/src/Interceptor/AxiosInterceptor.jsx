import axios from "axios";
import Store from "../Store";
import { removeUser } from "../Slice/UserSlice";
import { clearProfile } from "../Slice/ProfileSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9090",
  // baseURL: "https://job-portal-full-stack-project.onrender.com"
});

/* ================= REQUEST INTERCEPTOR ================= */

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ================= RESPONSE INTERCEPTOR ================= */

export const setupResponseInterceptor = (navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
      const status = error?.response?.status;
      const url = error?.config?.url;

      // Token expired / unauthorized
      if (status === 401 && url !== "/auth/me") {
        localStorage.removeItem("token");

        Store.dispatch(removeUser());
        Store.dispatch(clearProfile());

        navigate("/login");
      }

      // Optional: log server errors
      if (status === 500) {
        console.error("Server Error:", error?.response?.data);
      }

      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
