import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllJobs, applyJob } from "../Services/JobService";

// ================= FETCH ALL JOBS =================
export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllJobs();
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= APPLY TO JOB =================
export const applyToJobThunk = createAsyncThunk(
  "jobs/apply",
  async ({ jobId, applicant }, { rejectWithValue }) => {
    try {
      const updatedJob = await applyJob(jobId, applicant);
      return updatedJob; // backend should return updated job
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ================= SLICE =================
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ===== FETCH JOBS =====
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== APPLY JOB =====
      .addCase(applyToJobThunk.fulfilled, (state, action) => {
        const updatedJob = action.payload;

        const index = state.data.findIndex(
          (job) => job.id === updatedJob.id
        );

        if (index !== -1) {
          state.data[index] = updatedJob; // 🔥 update only that job
        }
      });
  },
});

export default jobSlice.reducer;