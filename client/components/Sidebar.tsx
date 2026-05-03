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
    { id: "sales", label: "Sales Management" },
    { id: "customers", label: "Customer Management" },
    { id: "employees", label: "Employee Management" },
  ];

  const additionalItems = [
    { id: "payroll", label: "Payroll" },
    { id: "expenses", label: "Expenses & Finance" },
    { id: "trucks", label: "Trucks in Transit" },
    { id: "reports", label: "Reports" },
  ];

  const systemItems: typeof additionalItems = [];

  return (
    <nav className="hidden md:flex w-72 bg-navy text-white flex-col items-center py-8 px-6 gap-0 flex-shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="font-rajdhani text-3xl font-bold letter-spacing-wider text-white mb-8">
        ACDP
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center gap-3 pb-8 border-b border-white/20 w-full mb-4">
        <button
          onClick={() => onPanelChange("settings")}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-2 to-navy-light flex items-center justify-center text-3xl font-bold border-2 border-accent-2 hover:border-gold hover:shadow-lg transition-all cursor-pointer"
          title="Go to Settings"
        >
          👤
        </button>
        <div className="font-rajdhani text-sm font-semibold text-center text-white">
          Mizael Anton M.
        </div>
        <div className="bg-accent text-white text-xs font-semibold letter-spacing-wider px-4 py-1 rounded-full">
          Administrator
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full flex-1 flex flex-col gap-3">
        {/* Main Nav Items */}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            className={`flex items-center justify-center px-6 py-3.5 rounded-full font-barlow text-sm font-semibold transition-all ${
              activePanel === item.id
                ? "text-white bg-accent shadow-lg"
                : "text-white/70 bg-white/10 hover:bg-white/20 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}

        {/* Divider */}
        <div className="h-px bg-white/20 my-2"></div>

        {/* Additional Items */}
        {additionalItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            className={`flex items-center justify-center px-6 py-3.5 rounded-full font-barlow text-sm font-semibold transition-all ${
              activePanel === item.id
                ? "text-white bg-accent shadow-lg"
                : "text-white/70 bg-white/10 hover:bg-white/20 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}

        {/* Divider */}
        <div className="h-px bg-white/20 my-2"></div>

        {/* System Items */}
        {systemItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPanelChange(item.id)}
            className={`flex items-center justify-center px-6 py-3.5 rounded-full font-barlow text-sm font-semibold transition-all ${
              activePanel === item.id
                ? "text-white bg-accent shadow-lg"
                : "text-white/70 bg-white/10 hover:bg-white/20 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full px-6 py-3.5 flex items-center justify-center rounded-full text-white/70 font-barlow text-sm font-semibold transition-all bg-white/10 hover:bg-white/20 hover:text-white border-t border-white/20 mt-auto"
      >
        Log Out
      </button>
    </nav>
  );
}
