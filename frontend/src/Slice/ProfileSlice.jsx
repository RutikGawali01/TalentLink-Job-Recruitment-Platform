  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import { updateProfile } from "../Services/ProfileService";

  /* ================= UPDATE PROFILE (API) ================= */
  export const changeProfile = createAsyncThunk(
    "profile/changeProfile",
    async (profileData, { rejectWithValue }) => {
      try {
        const response = await updateProfile(profileData);
        return response; // updated profile from backend (ProfileDTO)
      } catch (error) {
        return rejectWithValue(
          error?.response?.data || "Failed to update profile"
        );
      }
    }
  );

  /* ================= SLICE ================= */
  const ProfileSlice = createSlice({
    name: "profile",

    initialState: {
      data: null,
      loading: false,
      error: null,
    },

    reducers: {
      /* Manually set profile (ex: after login / fetch) */
      setProfile: (state, action) => {
        state.data = action.payload;
        state.error = null;
      },

      /* Clear profile (logout/reset) */
      clearProfile: (state) => {
        state.data = null;
        state.error = null;
      },
    },

    extraReducers: (builder) => {
      builder
        /* ===== UPDATE PROFILE ===== */
        .addCase(changeProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(changeProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; // update store with backend profile
        })
        .addCase(changeProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  /* ================= EXPORTS ================= */
  export const { setProfile, clearProfile } = ProfileSlice.actions;
  export default ProfileSlice.reducer;