import { useRoutes, useLocation } from "react-router-dom";
import { routes } from "@/routes";
import DashboardLayout from "./DashboardLayout";

// const Layout = () => {
//   return <>{useRoutes(routes)}</>;
// };
const Layout = () => {
  const location = useLocation();
  const element = useRoutes(routes);

  const isDashboardRoute = [
    "/home",
    "/dashboard",
    "/policy-overview",
    "/policy",
    "/investment",
    "/roi-calculator",
    "/renewal-alert",
    "/investment/stocks",
    "/investment/fixed-deposit",
  ].some((path) => location.pathname.startsWith(path));

  return isDashboardRoute ? (
    <DashboardLayout>{element}</DashboardLayout>
  ) : (
    element
  );
};

export default Layout;
