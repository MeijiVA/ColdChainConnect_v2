import { createContext, useContext, ReactNode } from "react";

interface InventoryContextType {
  updateInventoryForMissingItem: (sku: string, quantity: number) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({
  children,
  onMissingItem,
}: {
  children: ReactNode;
  onMissingItem: (sku: string, quantity: number) => void;
}) {
  const value: InventoryContextType = {
    updateInventoryForMissingItem: onMissingItem,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within InventoryProvider");
  }
  return context;
}
