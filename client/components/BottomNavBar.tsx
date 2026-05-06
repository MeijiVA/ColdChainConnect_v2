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
    { id: "dashboard", label: "Dashboard" },
    { id: "inventory", label: "Inventory" },
    { id: "sales", label: "Sales" },
    { id: "customers", label: "Customers" },
    { id: "trucks", label: "Dispatch" },
    { id: "payroll", label: "Payroll" },
    { id: "expenses", label: "Expenses" },
    { id: "reports", label: "Reports" },
    { id: "employees", label: "Employees" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy border-t border-white/10 z-30 md:hidden">
      {/* Scrollable Navigation Items */}
      <div className="flex overflow-x-auto scrollbar-hide">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            className={`flex-shrink-0 px-4 py-3 font-barlow text-xs font-semibold transition-all whitespace-nowrap ${
              activePanel === item.id
                ? "text-white border-b-2 border-accent-2"
                : "text-white/60 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="border-t border-white/10 px-4 py-2">
        <button
          onClick={onLogout}
          className="w-full py-2 text-white/60 font-barlow text-xs font-semibold hover:text-white transition-all"
        >
          ⎋ Log Out
        </button>
      </div>
    </div>
  );
}
