import {createSlice} from "@reduxjs/toolkit";

import {updateProfile} from "../Services/ProfileService"
const ProfileSlice = createSlice({
    name:'profile',
    initialState:{},
    reducers:{
        changeProfile:(state, action)=>{
            state=updateProfile(action.payload);
            return action.payload; 
        },
        setProfile:(state, action)=>{
            state=action.payload;
            return state;
        },
        clearProfile: ()=> null

    }
});

export const {changeProfile, setProfile, clearProfile} = ProfileSlice.actions;
export default ProfileSlice.reducer;