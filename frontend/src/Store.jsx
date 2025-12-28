import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import profileReducer from "./Slice/ProfileSlice"
export default configureStore({
    reducer:{
        user: userReducer,
        profile: profileReducer
    }

})