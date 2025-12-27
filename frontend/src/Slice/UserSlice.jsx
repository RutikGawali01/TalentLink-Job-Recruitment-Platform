import {createSlice} from "@reduxjs/toolkit";
import {getItem, setItem, removeItem} from "../Services/LocalStorageService";
const UserSlice = createSlice({
    name:"user",
    initialState:getItem("user"),
    reducers:{
        setUser:(state, action)=>{
            setItem("user", action.payload);
            state=getItem("user");
            return state; // this is important for updation of state in other component
        },
        removeUser:(state)=>{
            removeItem("user");
            state=null;
            return state;
            // see changes by removing above return state. 
            // login and then logout but it will not update directly until u refresh page
        }

    }
});

export const {setUser, removeUser} = UserSlice.actions;
export default UserSlice.reducer;