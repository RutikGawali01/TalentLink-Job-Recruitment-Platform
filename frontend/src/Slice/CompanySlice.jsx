import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCompany,
  updateCompany,
  getCompany,
} from "../Services/CompanyService";

// ===== FETCH COMPANY =====
export const fetchCompanyByEmployerId = createAsyncThunk(
  "company/employer",
  async (employerId, { rejectWithValue }) => {
    try {
      return await getCompany(employerId);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "Failed to fetch company",
      );
    }
  },
);

// ===== SAVE COMPANY (UPSERT) =====
export const saveCompanyProfile = createAsyncThunk(
  "company/save",
  async (company, { rejectWithValue }) => {
    try {
      if (company.id) {
        return await updateCompany(company.id, company);
      }

      return await createCompany(company);
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.errorMessage || "Failed to save company",
      );
    }
  },
);

const companySlice = createSlice({
  name: "company",

  initialState: {
    company: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearCompany: (state) => {
      state.company = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchCompanyByEmployerId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyByEmployerId.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(fetchCompanyByEmployerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SAVE
      .addCase(saveCompanyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCompanyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload; // 🔥 UI updates here
      })
      .addCase(saveCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCompany } = companySlice.actions;
export default companySlice.reducer;
