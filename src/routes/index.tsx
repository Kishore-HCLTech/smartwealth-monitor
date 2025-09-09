import { lazy } from "react";
import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";

//Normal Imports
import Login from "@/pages/Login";
import ProtectedRoute from "./ProtectedRoute";

//Lazy Imports
const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Policy = lazy(() => import("@/pages/Policies"));
const Investment = lazy(() => import("@/pages/Investment"));
const ROICalculator = lazy(() => import("@/pages/ROICalculator"));
const RenewalAlert = lazy(() => import("@/pages/RenewalAlert"));
const Stocks = lazy(() => import("@/pages/Stocks"));
const MutualFunds = lazy(() => import("@/pages/MutualFunds"));
const FixedDeposit = lazy(() => import("@/pages/FixedDeposit"));

const PolicyUpload = lazy(() => import("@/pages/PolicyUpload"));
const PolicyManager = lazy(() => import("@/pages/PolicyManager"));

export const routes: RouteObject[] = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/home", element: <Home /> },
      { path: "/investment", element: <Investment /> },
      { path: "/policy-overview", element: <Policy /> },
      { path: "/policy", element: <PolicyManager /> },
      { path: "/roi-calculator", element: <ROICalculator /> },
      { path: "/renewal-alert", element: <RenewalAlert /> },
      { path: "/investment/stocks", element: <Stocks /> },
      { path: "/investment/mutual-funds", element: <MutualFunds /> },
      { path: "/investment/fixed-deposit", element: <FixedDeposit /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
];
