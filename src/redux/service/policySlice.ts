import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Policy } from "@/types/policy";

interface PolicyState {
  data: Policy[];
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PolicyState = {
  data: [],
  total: 0,
  status: "idle",
  error: null,
};

export const fetchPolicies = createAsyncThunk<
  { data: Policy[]; total: number },
  { page: number; limit: number },
  { rejectValue: string }
>("policies/fetchPolicies", async ({ page, limit }, thunkAPI) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/policies?_page=${page}&_limit=${limit}`
    );

    // Log headers for debugging
    console.log("Response headers:", response.headers);

    // Safely parse x-total-count
    const totalHeader = response.headers["x-total-count"];
    const total = totalHeader ? parseInt(totalHeader, 10) : 0;

    console.log(`Parsed total count: ${total}`);
    return { data: response.data, total };
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Failed to fetch policies");
  }
});

const policySlice = createSlice({
  name: "policies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default policySlice.reducer;
