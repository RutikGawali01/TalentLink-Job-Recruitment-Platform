  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import { updateProfile } from "../Services/EmployerProfileService";

  export const changeProfile = createAsyncThunk(
    "employerProfile/changeProfile",
    async (profile) => {
      return await updateProfile(profile);
    }
  );

  const employerProfileSlice = createSlice({
    name: "employerProfile",
    initialState: {},
    reducers: {
      setEmployerProfile: (state, action) => {
        return action.payload; // ✅ THIS replaces state properly
      },
    },
    extraReducers: (builder) => {
      builder.addCase(changeProfile.fulfilled, (state, action) => {

        return action.payload; // ✅ backend response (with id)
      });
    },
  });

  export const { setEmployerProfile } = employerProfileSlice.actions;
  export default employerProfileSlice.reducer;


