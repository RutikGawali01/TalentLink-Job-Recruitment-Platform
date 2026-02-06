import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileCompleted: false,
    completionPercentage: 0,
    missingFields: [],
    role: null, // "EMPLOYER" | "APPLICANT"
};

const profileCompletionSlice = createSlice({
    name: "profileCompletion",
    initialState,
    reducers: {
        setProfileCompletion: (state, action) => {
            state.profileCompleted = action.payload.profileCompleted;
            state.completionPercentage = action.payload.completionPercentage;
            state.missingFields = action.payload.missingFields;
            state.role = action.payload.role; // optional but helpful
        },
        resetProfileCompletion: () => initialState,
    },
});

export const {
    setProfileCompletion,
    resetProfileCompletion,
} = profileCompletionSlice.actions;
    
export default profileCompletionSlice.reducer;
