    import {createSlice} from "@reduxjs/toolkit";
// import {getItem, setItem, removeItem} from "../Services/LocalStorageService";
// import { act } from "react";

const jwtSlice = createSlice({
    name:"jwt",
    initialState:localStorage.getItem("token")||"",
    reducers:{
        setJwt:(state, action)=>{
            localStorage.setItem("token", action.payload);
            state=action.payload;
            return state; // this is important for updation of state in other component
        },
        removeJwt:(state)=>{
           localStorage.removeItem("token");
            state="";
            return state;
        }

    }
});

export const {setJwt, removeJwt} = jwtSlice.actions;
export default jwtSlice.reducer; 