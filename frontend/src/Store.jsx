import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import profileReducer from "./Slice/ProfileSlice"
import filterReducer from "./Slice/FilterSlice";
export default configureStore({
    reducer:{
        user: userReducer,
        profile: profileReducer,
        filter: filterReducer
    }

})
