import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Users, 
  Settings 
} from "lucide-react";

interface SidebarProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activePanel, onPanelChange, onLogout }: SidebarProps) {
  const navItems = [
    { id: "dashboard", icon: "⬛", label: "Dashboard" },
    { id: "inventory", icon: "📦", label: "Inventory Management" },
    { id: "sales", icon: "💳", label: "Sales Management" },
    { id: "ar", icon: "📋", label: "Accounts Receivable" },
    { id: "trucks", icon: "🚚", label: "Trucks in Transit" }, // Add this line
    { id: "customers", icon: "🧑‍🤝‍🧑", label: "Customer Management" },
    { id: "employees", icon: "🪪", label: "Employee Management" },
  ];

  const additionalItems = [
    { id: "payroll", icon: "💰", label: "Payroll" },
    { id: "expenses", icon: "🧾", label: "Expenses & Finance" },
    { id: "forecasting", icon: "📈", label: "AI Forecasting" },
    { id: "reports", icon: "📑", label: "Reports" },
  ];

  const systemItems = [
    { id: "notifications", icon: "🔔", label: "Notifications" },
    { id: "audit", icon: "🕵️", label: "Audit Log" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <nav className="hidden md:flex w-56 bg-navy text-white flex-col items-center py-6 px-0 gap-0 flex-shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="font-rajdhani text-2xl font-bold letter-spacing-wider text-white px-4 py-4">
        ACDP
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center gap-2 px-4 pb-5 border-b border-border w-full">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-2 to-navy-light flex items-center justify-center text-2xl font-bold border-2 border-accent-2">
          👤
        </div>
        <div className="font-rajdhani text-sm font-semibold text-center text-white">
          Mizael Anton M.
        </div>
        <div className="bg-accent text-white text-xs font-semibold letter-spacing-wider px-3 py-0.5 rounded-full">
          ASSISTANT
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full flex-1 flex flex-col py-2">
        {/* Main Nav Items */}
        <div className="flex flex-col gap-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPanelChange(item.id)}
              className={`flex items-center gap-2.5 w-full px-5 py-2.5 font-barlow-cond text-sm font-semibold letter-spacing-tight transition-all border-l-3 border-l-transparent ${
                activePanel === item.id
                  ? "text-white bg-accent border-l-gold"
                  : "text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base w-5 text-center flex-shrink-0">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-4 my-2"></div>

        {/* Additional Items */}
        <div className="flex flex-col gap-0">
          {additionalItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPanelChange(item.id)}
              className={`flex items-center gap-2.5 w-full px-5 py-2.5 font-barlow-cond text-sm font-semibold letter-spacing-tight transition-all border-l-3 border-l-transparent ${
                activePanel === item.id
                  ? "text-white bg-accent border-l-gold"
                  : "text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base w-5 text-center flex-shrink-0">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-4 my-2"></div>

        {/* System Items */}
        <div className="flex flex-col gap-0">
          {systemItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPanelChange(item.id)}
              className={`flex items-center gap-2.5 w-full px-5 py-2.5 font-barlow-cond text-sm font-semibold letter-spacing-tight transition-all border-l-3 border-l-transparent ${
                activePanel === item.id
                  ? "text-white bg-accent border-l-gold"
                  : "text-muted hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base w-5 text-center flex-shrink-0">
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="mt-auto w-full px-5 py-4 flex items-center gap-2.5 text-muted font-barlow-cond text-sm font-semibold transition-colors border-t border-border hover:text-red"
      >
        <span>⎋</span>
        Log Out
      </button>
    </nav>
  );
}
