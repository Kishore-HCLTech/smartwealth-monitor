import type { Policy } from "@/types/policy";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// export type Policy = {
//   id: number;
//   name: string;
//   type: string;
//   renewalDate: string;
//   premium: number;
//   maturityDate: string;
// };

interface PolicyState {
  policies: Policy[];
}

const initialState: PolicyState = {
  policies: [],
};

const policyDataSlice = createSlice({
  name: "policyData",
  initialState,
  reducers: {
    setPolicies: (state, action: PayloadAction<Policy[]>) => {
      state.policies = action.payload;
    },
  },
});

export const { setPolicies } = policyDataSlice.actions;
export default policyDataSlice.reducer;
