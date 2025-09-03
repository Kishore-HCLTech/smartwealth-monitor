import type { ReactNode, FC } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Calculator,
  FileText,
  LayoutDashboard,
  LineChart,
  BellRing,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  PieChart,
  Banknote,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/service/authSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { APP_NAME } from "@/constants/appConstants";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [investmentOpen, setInvestmentOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  // console.log(user);

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    // { label: "Policy Overview", path: "/policy-overview", icon: FileText },
    { label: "Policy", path: "/policy", icon: FileText },
    // {
    //   label: "Investment",
    //   path: "/investment",
    //   icon: LineChart,
    //   children: [
    //     { label: "Stocks", path: "/investment/stocks", icon: TrendingUp },
    //     {
    //       label: "Mutual Funds",
    //       path: "/investment/mutual-funds",
    //       icon: PieChart,
    //     },
    //     { label: "FD", path: "/investment/fixed-deposit", icon: Banknote },
    //   ],
    // },
    {
      label: "Investments",
      path: "/investment",
      icon: LineChart,
    },
    {
      label: "ROI Calculator",
      path: "/roi-calculator",
      icon: Calculator,
    },
    {
      label: "Renewal Alert",
      path: "/renewal-alert",
      icon: BellRing,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    toast.error("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gradient-to-r from-[#99CFF0] to-[#C3A1E6] p-4 border-r flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">{APP_NAME}</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.path}>
                {item.label === "Investment" ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => setInvestmentOpen(!investmentOpen)}
                      className={cn(
                        "justify-between gap-2 w-full",
                        location.pathname.startsWith(item.path) &&
                          "bg-gray-300 text-black"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </div>
                      {investmentOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>

                    {/* {investmentOpen && (
                      <div className="ml-6 mt-1 flex flex-col gap-1">
                        {item.children?.map((child) => (
                          <Button
                            key={child.path}
                            variant="ghost"
                            onClick={() => navigate(child.path)}
                            className={cn(
                              "justify-start text-sm gap-2",
                              location.pathname === child.path &&
                                "bg-gray-200 text-black"
                            )}
                          >
                            <child.icon className="w-4 h-4" />
                            {child.label}
                          </Button>
                        ))}
                      </div>
                    )} */}
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "justify-start gap-2 w-full",
                      location.pathname === item.path &&
                        "bg-gray-300 text-black"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">
            Logged in as <span className="font-semibold">{user?.name}</span>
          </p>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
