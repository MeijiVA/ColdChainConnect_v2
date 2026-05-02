import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { TrucksInTransit } from "./pages/TrucksInTransit";
import { Sales } from "./pages/Sales";
import { Payroll } from "./pages/Payroll";
import { Customer } from "./pages/Customer";
import { EmployeeManagement } from "./pages/EmployeeManagement";
import { PlaceholderPanel } from "./pages/PlaceholderPanel";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import NotFound from "./pages/NotFound";
import { InventoryProvider } from "./contexts/InventoryContext";


const queryClient = new QueryClient();

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePanel, setActivePanel] = useState("dashboard");
  const [inventoryData, setInventoryData] = useState<Record<string, { id: string; quantity: number }>>({});

  const handleMissingItem = useCallback((sku: string, quantity: number) => {
    setInventoryData((prev) => ({
      ...prev,
      [sku]: { id: sku, quantity },
    }));
  }, []);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderPanel = () => {
    switch (activePanel) {
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <Inventory missingItemsData={inventoryData} />;
      case "sales":
        return <Sales />;
      case "customers":
        return <Customer />;
      case "employees":
        return <EmployeeManagement />;
      case "payroll":
        return <Payroll />;
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
    <InventoryProvider onMissingItem={handleMissingItem}>
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
    </InventoryProvider>
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
