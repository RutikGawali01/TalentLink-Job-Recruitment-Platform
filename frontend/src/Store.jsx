import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import profileReducer from "./Slice/ProfileSlice"
import filterReducer from "./Slice/FilterSlice";
import sortReducer from "./Slice/SortSlice";
import jwtReducer from "./Slice/JwtSlice";
import employerProfileReducer from "./Slice/EmployerProfileSlice";
import profileCompletionReducer from "./Slice/profileCompletionSlice";

// centralized store for state managements
export default configureStore({
    reducer:{
        user: userReducer,// logged in user info
        profile: profileReducer,// profile details
        filter: filterReducer,//job filters
        sort:sortReducer,// sorting logic
        jwt:jwtReducer, // token management
        employerProfile:employerProfileReducer,
        
        profileCompletion: profileCompletionReducer,

    }

})
