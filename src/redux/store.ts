import { configureStore } from "@reduxjs/toolkit";
import policyReducer from "./service/policySlice";
import investmentReducer from "./service/investmentSlice";
import authReducer from "./service/authSlice";
import policyDataReducer from "./service/policyDataSlice";

export const store = configureStore({
  reducer: {
    policies: policyReducer,
    investments: investmentReducer,
    auth: authReducer,
    policyData: policyDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
