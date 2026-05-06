import {
  LayoutDashboard,
  Package,
  TrendingUp,
  Users,
  Truck,
  Wallet,
  BarChart3,
  FileText,
  Users2,
} from "lucide-react";

interface BottomNavBarProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
  onLogout: () => void;
}

export function BottomNavBar({
  activePanel,
  onPanelChange,
  onLogout,
}: BottomNavBarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "sales", label: "Sales", icon: TrendingUp },
    { id: "customers", label: "Customers", icon: Users },
    { id: "trucks", label: "Dispatch", icon: Truck },
    { id: "payroll", label: "Payroll", icon: Wallet },
    { id: "expenses", label: "Expenses", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "employees", label: "Employees", icon: Users2 },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy border-t border-white/10 z-30 md:hidden">
      {/* Scrollable Navigation Items */}
      <div className="flex overflow-x-auto scrollbar-hide gap-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onPanelChange(item.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center px-2 py-2 font-barlow text-[10px] font-semibold transition-all ${
                activePanel === item.id
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <IconComponent size={18} />
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
