import axiosInstance from "@/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Investment = Record<string, any>;

export const fetchInvestments = createAsyncThunk<Investment[]>(
  "investments/fetchInvestments",
  async () => {
    const res = await axiosInstance.get(`/investments`);
    return res.data;
  }
);

export const postInvestment = createAsyncThunk<Investment, Investment>(
  "investments/postInvestment",
  async (investmentData) => {
    const res = await axiosInstance.post(`/investments`, investmentData);
    return res.data;
  }
);

const investmentSlice = createSlice({
  name: "investments",
  initialState: {
    data: [] as Investment[],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvestments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(postInvestment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postInvestment.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default investmentSlice.reducer;
