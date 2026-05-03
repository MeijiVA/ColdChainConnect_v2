import { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activePanel, onPanelChange, onLogout }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "inventory", label: "Inventory Management" },
    { id: "sales", label: "Sales Tracking" },
    { id: "customers", label: "Customers" },
    { id: "employees", label: "Employees" },
  ];

  const additionalItems = [
    { id: "payroll", label: "Payroll" },
    { id: "expenses", label: "Expenses & Finance" },
    { id: "trucks", label: "Trucks in Transit" },
    { id: "reports", label: "Reports" },
  ];

  const systemItems: typeof additionalItems = [];

  return (
    <nav className="w-72 bg-navy text-white flex flex-col items-center flex-shrink-0 h-full">
      {/* Profile Section - Fixed at Top */}
      <div className="flex flex-col items-center gap-1.5 py-8 px-6 w-full flex-shrink-0">
        <button
          onClick={() => onPanelChange("settings")}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-2 to-navy-light flex items-center justify-center text-3xl font-bold border-2 border-accent-2 hover:border-gold hover:shadow-lg transition-all cursor-pointer"
          title="Go to Settings"
        >
          👤
        </button>
        <div className="font-rajdhani text-lg font-semibold text-center text-white">
          Mizael Anton M.
        </div>
        <div className="bg-white text-navy text-xs font-semibold px-3 py-1 rounded-full">
          Assistant
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <div className="w-full flex-1 flex flex-col gap-3 px-6 overflow-y-auto">
        {/* Main Nav Items */}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            style={activePanel === item.id ? { background: "linear-gradient(to right, #0546D7, #2B2CA5)" } : {}}
            className={`flex items-center justify-center px-6 py-3.5 rounded-full font-barlow text-sm font-semibold transition-all ${
              activePanel === item.id
                ? "text-white shadow-lg"
                : "text-white/70 bg-white/10 hover:bg-white/20 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}

        {/* Additional Items */}
        {additionalItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            style={activePanel === item.id ? { background: "linear-gradient(to right, #0546D7, #2B2CA5)" } : {}}
            className={`flex items-center justify-center px-6 py-3.5 rounded-full font-barlow text-sm font-semibold transition-all ${
              activePanel === item.id
                ? "text-white shadow-lg"
                : "text-white/70 bg-white/10 hover:bg-white/20 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}

        {/* System Items */}
        {systemItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            style={activePanel === item.id ? { background: "linear-gradient(to right, #0546D7, #2B2CA5)" } : {}}
            className={`flex items-center justify-center px-6 py-3.5 rounded-full font-barlow text-sm font-semibold transition-all ${
              activePanel === item.id
                ? "text-white shadow-lg"
                : "text-white/70 bg-white/10 hover:bg-white/20 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Logout - Fixed at Bottom */}
      <button
        onClick={onLogout}
        className="w-full px-6 py-4 flex items-center justify-center gap-2 text-white font-barlow text-sm font-semibold transition-all bg-transparent hover:bg-white/10 flex-shrink-0 mx-6"
      >
        <span>⎋</span>
        Log Out
      </button>
    </nav>
  );
}
