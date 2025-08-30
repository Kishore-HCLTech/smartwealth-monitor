import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInvestments = createAsyncThunk(
  "investments/fetchInvestments",
  async () => {
    const res = await axios.get(
      `http://localhost:3001/investments`
    );
    return res.data;
  }
);

const investmentSlice = createSlice({
  name: "investments",
  initialState: { data: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvestments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default investmentSlice.reducer;
