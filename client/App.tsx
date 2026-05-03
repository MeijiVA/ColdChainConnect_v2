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
import { Customer } from "./pages/Customer";
import { EmployeeManagement } from "./pages/EmployeeManagement";
import { Payroll } from "./pages/Payroll";
import { Settings } from "./pages/Settings";
import { FinanceLedger } from "./pages/FinanceLedger";
import { Reports } from "./pages/Reports";
import { PlaceholderPanel } from "./pages/PlaceholderPanel";
import { TrucksInTransit } from "./pages/TrucksInTransit";
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
        return <Customer />;
      case "employees":
        return <EmployeeManagement />;
      case "payroll":
        return <Payroll />;
      case "expenses":
        return <FinanceLedger />;
      case "trucks":
        return <TrucksInTransit />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar - Full Width */}
      <Topbar
        userName="Mizael Anton"
        onSettingsClick={() => setActivePanel("settings")}
      />

      {/* Sidebar (Fixed) + Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar - Fixed Left */}
        <div className="hidden md:block fixed left-0 top-16 w-72 h-[calc(100vh-4rem)] z-20">
          <Sidebar
            activePanel={activePanel}
            onPanelChange={setActivePanel}
            onLogout={() => setIsLoggedIn(false)}
          />
        </div>

        {/* Main Content Area - Offset for Sidebar */}
        <div className="hidden md:block md:w-72 flex-shrink-0" />
        <div className="flex-1 flex flex-col bg-off-white min-w-0">
          {/* Panel Content */}
          {renderPanel()}
        </div>
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
