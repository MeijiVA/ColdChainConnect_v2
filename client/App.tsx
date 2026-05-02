import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { Sales } from "./pages/Sales";
import { Employees } from "./pages/Employees";
import { TrucksInTransit } from "./pages/TrucksInTransit";
import { PlaceholderPanel } from "./pages/PlaceholderPanel";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePanel, setActivePanel] = useState("dashboard");

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderPanel = () => {
    switch (activePanel) {
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <Inventory />;
      case "sales":
        return <Sales />;
      case "customers":
        return (
          <PlaceholderPanel
            title="Customer Management"
            description="All registered retail partners and sari-sari stores"
            icon="🧑‍🤝‍🧑"
            panelId="customers"
          />
       );
      case "ar":
        return (
          <PlaceholderPanel
            title="Accounts Receivable"
            description="Monitor credit balances and aging reports"
            icon="📋"
            panelId="ar"
          />
        );
      case "customers":
        return (
          <PlaceholderPanel
            title="Customer Management"
            description="All registered retail partners and sari-sari stores"
            icon="🧑‍🤝‍🧑"
            panelId="customers"
          />
        );
      case "employees":
        return (
          <PlaceholderPanel
            title="Employee Management"
            description="Manage staff accounts and access levels"
            icon="🪪"
            panelId="employees"
          />
        );
      case "payroll":
        return (
          <PlaceholderPanel
            title="Payroll"
            description="Employee salaries & agent commission management"
            icon="💰"
            panelId="payroll"
          />
        );
      case "expenses":
        return (
          <PlaceholderPanel
            title="Expenses & Finance"
            description="Track operational costs and truck maintenance"
            icon="🧾"
            panelId="expenses"
          />
        );
      case "trucks":
        return <TrucksInTransit />;
      case "reports":
        return (
          <PlaceholderPanel
            title="Reports"
            description="Generate and export business reports"
            icon="📑"
            panelId="reports"
          />
        );
      case "notifications":
        return (
          <PlaceholderPanel
            title="Notifications"
            description="System alerts and activity feed"
            icon="🔔"
            panelId="notifications"
          />
        );
      case "audit":
        return (
          <PlaceholderPanel
            title="Audit Log"
            description="Complete activity trail — Administrator access only"
            icon="🕵️"
            panelId="audit"
          />
        );
      case "settings":
        return (
          <PlaceholderPanel
            title="Settings"
            description="Profile, security, and system configuration"
            icon="⚙️"
            panelId="settings"
          />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-off-white min-w-0">
        {/* Topbar */}
        <Topbar userName="Mizael Anton" />

        {/* Panel Content */}
        {renderPanel()}
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.hasChildNodes()) {
  createRoot(rootElement).render(<App />);
}
