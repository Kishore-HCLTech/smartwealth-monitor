import type { ReactNode, FC } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {Calculator,FileText,LayoutDashboard,LineChart,BellRing, Menu,} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/service/authSlice";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    // { label: "Policy Overview", path: "/policy-overview", icon: FileText },
    { label: "Policy", path: "/policy", icon: FileText },
 
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
    setMobileMenuOpen(false); //close the on logout
  };

  const hadleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false); //close the menu on navigation
  };
  const renderNavItems = () => (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          onClick={() => hadleNavigate(item.path)}
          className={cn(
            "justify-start gap-2 w-full",
            location.pathname === item.path && "bg-gray-300 text-black"
          )}
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </Button>
      ))}
    </nav>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar for large screens */}
      <aside className="hidden md:flex md:w-64 bg-gradient-to-r from-[#99CFF0] to-[#C3A1E6] p-4 border-r flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">{APP_NAME}</h2>
          {renderNavItems()}
        </div>
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


      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#99CFF0] to-[#C3A1E6] p-4 flex items-center gap-4">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
         
          <SheetContent
            side="left"
            className="bg-gradient-to-r from-[#99CFF0] to-[#C3A1E6] w-64 text-black flex flex-col justify-between"
          >
            <div>{renderNavItems()}</div>
            <div className="border-t pt-4">
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
          </SheetContent>
        </Sheet>

        <h2 className="text-lg font-bold">{APP_NAME}</h2>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 pt-20 md:pt-6 overflow-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
