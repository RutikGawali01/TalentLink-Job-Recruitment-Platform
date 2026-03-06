import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import profileReducer from "./Slice/ProfileSlice";
import filterReducer from "./Slice/FilterSlice";
import sortReducer from "./Slice/SortSlice";
import jwtReducer from "./Slice/JwtSlice";
import employerProfileReducer from "./Slice/EmployerProfileSlice";
import profileCompletionReducer from "./Slice/profileCompletionSlice";
import companyReducer from "./Slice/CompanySlice";
import jobReducer from "./Slice/JobSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    filter: filterReducer,
    sort: sortReducer,
    jwt: jwtReducer,
    employerProfile: employerProfileReducer,
    profileCompletion: profileCompletionReducer,

    company: companyReducer, // ✅ lowercase (important)
    jobs: jobReducer,
  },
});
