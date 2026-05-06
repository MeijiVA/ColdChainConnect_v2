import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type ReportTab = "sales" | "inventory" | "customer" | "supplier" | "performance" | "profit";
type DateRange = "daily" | "weekly" | "monthly";

interface SalesReport {
  period: string;
  totalRevenue: number;
  totalTransactions: number;
  averageTransaction: number;
  topProduct: string;
  topProductSales: number;
}

interface InventoryReport {
  sku: string;
  productName: string;
  currentStock: number;
  reorderLevel: number;
  expiryDate: string;
  status: "in-stock" | "low-stock" | "expiring";
  value: number;
}

interface CustomerReport {
  customerId: string;
  customerName: string;
  totalPurchases: number;
  totalSpent: number;
  lastPurchaseDate: string;
  frequency: string;
}

interface SupplierReport {
  supplierId: string;
  supplierName: string;
  productsSupplied: number;
  totalInventoryValue: number;
  lastRestock: string;
  reorderDue: string;
}

interface PerformanceMetric {
  productName: string;
  unitsSold: number;
  revenue: number;
  growth: number;
  ranking: number;
}

interface ProfitData {
  productName: string;
  unitPrice: number;
  costPrice: number;
  profitMargin: number;
  quantitySold: number;
  totalProfit: number;
}

// Mock Data
const mockSalesReports: SalesReport[] = [
  {
    period: "2024-01-15 (Today)",
    totalRevenue: 4250,
    totalTransactions: 12,
    averageTransaction: 354.17,
    topProduct: "Premium Chicken Breast",
    topProductSales: 1200,
  },
  {
    period: "2024-01-08 - 2024-01-14 (This Week)",
    totalRevenue: 28450,
    totalTransactions: 82,
    averageTransaction: 346.95,
    topProduct: "Frozen Fish",
    topProductSales: 8200,
  },
  {
    period: "January 2024 (This Month)",
    totalRevenue: 125680,
    totalTransactions: 356,
    averageTransaction: 353.06,
    topProduct: "Ice Cream Varieties",
    topProductSales: 35400,
  },
];

const mockInventoryReports: InventoryReport[] = [
  {
    sku: "SKU-2301",
    productName: "Premium Chicken Breast",
    currentStock: 45,
    reorderLevel: 50,
    expiryDate: "2024-01-25",
    status: "low-stock",
    value: 2700,
  },
  {
    sku: "SKU-3405",
    productName: "Frozen Fish",
    currentStock: 120,
    reorderLevel: 80,
    expiryDate: "2024-01-22",
    status: "expiring",
    value: 7200,
  },
  {
    sku: "SKU-5102",
    productName: "Ice Cream Varieties",
    currentStock: 300,
    reorderLevel: 100,
    expiryDate: "2024-03-15",
    status: "in-stock",
    value: 9000,
  },
  {
    sku: "SKU-1450",
    productName: "Beef Cuts",
    currentStock: 75,
    reorderLevel: 60,
    expiryDate: "2024-01-28",
    status: "in-stock",
    value: 4500,
  },
];

const mockCustomerReports: CustomerReport[] = [
  {
    customerId: "CUST-001",
    customerName: "Restaurant ABC",
    totalPurchases: 45,
    totalSpent: 15750,
    lastPurchaseDate: "2024-01-15",
    frequency: "Daily",
  },
  {
    customerId: "CUST-002",
    customerName: "Cafe XYZ",
    totalPurchases: 32,
    totalSpent: 11200,
    lastPurchaseDate: "2024-01-14",
    frequency: "3x/Week",
  },
  {
    customerId: "CUST-003",
    customerName: "Supermarket DEF",
    totalPurchases: 28,
    totalSpent: 18900,
    lastPurchaseDate: "2024-01-13",
    frequency: "2x/Week",
  },
];

const mockSupplierReports: SupplierReport[] = [
  {
    supplierId: "SUPP-001",
    supplierName: "Quality Meats Co.",
    productsSupplied: 8,
    totalInventoryValue: 24500,
    lastRestock: "2024-01-10",
    reorderDue: "2024-01-20",
  },
  {
    supplierId: "SUPP-002",
    supplierName: "Seafood Wholesale",
    productsSupplied: 5,
    totalInventoryValue: 18300,
    lastRestock: "2024-01-12",
    reorderDue: "2024-01-22",
  },
  {
    supplierId: "SUPP-003",
    supplierName: "Frozen Foods Ltd",
    productsSupplied: 12,
    totalInventoryValue: 32100,
    lastRestock: "2024-01-08",
    reorderDue: "2024-01-18",
  },
];

const mockPerformanceMetrics: PerformanceMetric[] = [
  {
    productName: "Ice Cream Varieties",
    unitsSold: 1250,
    revenue: 35400,
    growth: 12.5,
    ranking: 1,
  },
  {
    productName: "Frozen Fish",
    unitsSold: 890,
    revenue: 28900,
    growth: 8.3,
    ranking: 2,
  },
  {
    productName: "Premium Chicken Breast",
    unitsSold: 750,
    revenue: 25200,
    growth: 5.8,
    ranking: 3,
  },
  {
    productName: "Beef Cuts",
    unitsSold: 620,
    revenue: 18600,
    growth: 3.2,
    ranking: 4,
  },
];

const mockProfitData: ProfitData[] = [
  {
    productName: "Ice Cream Varieties",
    unitPrice: 28.32,
    costPrice: 18.5,
    profitMargin: 34.5,
    quantitySold: 1250,
    totalProfit: 12277.5,
  },
  {
    productName: "Frozen Fish",
    unitPrice: 32.47,
    costPrice: 19.2,
    profitMargin: 40.8,
    quantitySold: 890,
    totalProfit: 11807.04,
  },
  {
    productName: "Premium Chicken Breast",
    unitPrice: 33.6,
    costPrice: 19.5,
    profitMargin: 42.1,
    quantitySold: 750,
    totalProfit: 10626,
  },
  {
    productName: "Beef Cuts",
    unitPrice: 30,
    costPrice: 17.8,
    profitMargin: 40.7,
    quantitySold: 620,
    totalProfit: 7597.6,
  },
];

export function Reports() {
  const [activeTab, setActiveTab] = useState<ReportTab>("sales");
  const [dateRange, setDateRange] = useState<DateRange>("monthly");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: "excel" | "pdf", reportType: string) => {
    setIsExporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: `${reportType} exported as ${format.toUpperCase()} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export report.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateDocument = async (docType: string) => {
    setIsExporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: `${docType} generated and ready for printing.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate document.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      case "expiring":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 px-4 md:px-6 lg:px-7 py-4 md:py-6 overflow-y-auto scrollbar-hide">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-navy mb-2">Reports & Documents</h1>
          <p className="text-gray-600">
            Generate comprehensive reports, track metrics, and export data
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4 overflow-x-auto">
          {[
            { id: "sales", label: "Sales Reports", icon: "📊" },
            { id: "inventory", label: "Inventory", icon: "📦" },
            { id: "customer", label: "Customer", icon: "👥" },
            { id: "supplier", label: "Supplier", icon: "🏭" },
            { id: "performance", label: "Performance", icon: "📈" },
            { id: "profit", label: "Profit", icon: "💰" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ReportTab)}
              className={`px-4 py-2 whitespace-nowrap font-semibold transition-all rounded-lg ${
                activeTab === tab.id
                  ? "bg-accent text-white"
                  : "bg-off-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sales Reports */}
        {activeTab === "sales" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-navy">Sales Reports</h2>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as DateRange)}
                  className="px-3 py-2 border border-border rounded bg-white text-navy"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <p className="text-gray-600 mb-6">
                Detailed breakdown of sales performance
              </p>

              <div className="space-y-4">
                {mockSalesReports.map((report, idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-lg p-4 hover:bg-off-white transition-colors"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Period</p>
                        <p className="font-semibold text-navy">{report.period}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Total Revenue</p>
                        <p className="font-semibold text-navy">
                          ₱{report.totalRevenue.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Transactions</p>
                        <p className="font-semibold text-navy">
                          {report.totalTransactions}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Avg Transaction</p>
                        <p className="font-semibold text-navy">
                          ₱{report.averageTransaction.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Top Product</p>
                        <p className="font-semibold text-navy text-sm">
                          {report.topProduct}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  onClick={() =>
                    handleExport("excel", "Sales Report")
                  }
                  disabled={isExporting}
                  className="bg-accent hover:bg-accent-dark text-white"
                >
                  📥 Export to Excel
                </Button>
                <Button
                  onClick={() =>
                    handleExport("pdf", "Sales Report")
                  }
                  disabled={isExporting}
                  variant="outline"
                >
                  📄 Export to PDF
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Inventory Reports */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <Card className="p-6 overflow-hidden">
              <h2 className="text-2xl font-bold text-navy mb-4">
                Inventory Reports
              </h2>
              <p className="text-gray-600 mb-6">
                Current stock levels, product details, and expiry dates
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-off-white">
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        SKU
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Product
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Current Stock
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Reorder Level
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Expiry Date
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Value
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInventoryReports.map((item, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-off-white">
                        <td className="py-3 px-4 font-mono text-gray-700">
                          {item.sku}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {item.productName}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700 font-semibold">
                          {item.currentStock}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {item.reorderLevel}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {item.expiryDate}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700 font-semibold">
                          ₱{item.value.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                              item.status
                            )}`}
                          >
                            {item.status
                              .replace("-", " ")
                              .split(" ")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  onClick={() =>
                    handleExport("excel", "Inventory Report")
                  }
                  disabled={isExporting}
                  className="bg-accent hover:bg-accent-dark text-white"
                >
                  📥 Export to Excel
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Customer Reports */}
        {activeTab === "customer" && (
          <div className="space-y-6">
            <Card className="p-6 overflow-hidden">
              <h2 className="text-2xl font-bold text-navy mb-4">
                Customer Purchase History
              </h2>
              <p className="text-gray-600 mb-6">
                Customer transaction details and purchase patterns
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-off-white">
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Customer ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Customer Name
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Total Purchases
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Total Spent
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Last Purchase
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Frequency
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCustomerReports.map((customer, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-off-white">
                        <td className="py-3 px-4 font-mono text-gray-700">
                          {customer.customerId}
                        </td>
                        <td className="py-3 px-4 text-gray-700 font-medium">
                          {customer.customerName}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700 font-semibold">
                          {customer.totalPurchases}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700 font-semibold">
                          ₱{customer.totalSpent.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {customer.lastPurchaseDate}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {customer.frequency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  onClick={() =>
                    handleExport("excel", "Customer Report")
                  }
                  disabled={isExporting}
                  className="bg-accent hover:bg-accent-dark text-white"
                >
                  📥 Export to Excel
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Supplier Reports */}
        {activeTab === "supplier" && (
          <div className="space-y-6">
            <Card className="p-6 overflow-hidden">
              <h2 className="text-2xl font-bold text-navy mb-4">
                Supplier-wise Inventory
              </h2>
              <p className="text-gray-600 mb-6">
                Inventory sourced from each supplier
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-off-white">
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Supplier ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Supplier Name
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Products
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Inventory Value
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Last Restock
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Reorder Due
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSupplierReports.map((supplier, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-off-white">
                        <td className="py-3 px-4 font-mono text-gray-700">
                          {supplier.supplierId}
                        </td>
                        <td className="py-3 px-4 text-gray-700 font-medium">
                          {supplier.supplierName}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700 font-semibold">
                          {supplier.productsSupplied}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700 font-semibold">
                          ₱{supplier.totalInventoryValue.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {supplier.lastRestock}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {supplier.reorderDue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  onClick={() =>
                    handleExport("excel", "Supplier Report")
                  }
                  disabled={isExporting}
                  className="bg-accent hover:bg-accent-dark text-white"
                >
                  📥 Export to Excel
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Performance Metrics */}
        {activeTab === "performance" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-navy mb-4">
                Sales Performance Metrics
              </h2>
              <p className="text-gray-600 mb-6">
                Sales performance by product and time period
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {mockPerformanceMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-lg p-4 hover:bg-off-white transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-navy">
                          #{metric.ranking} {metric.productName}
                        </p>
                        <p className="text-xs text-gray-600">Top Performer</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        metric.growth > 10
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        ↑ {metric.growth}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-600">Units Sold</p>
                        <p className="font-semibold text-navy">
                          {metric.unitsSold.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Revenue</p>
                        <p className="font-semibold text-navy">
                          ₱{metric.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    handleExport("excel", "Performance Metrics")
                  }
                  disabled={isExporting}
                  className="bg-accent hover:bg-accent-dark text-white"
                >
                  📥 Export to Excel
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Profit Tracking */}
        {activeTab === "profit" && (
          <div className="space-y-6">
            <Card className="p-6 overflow-hidden">
              <h2 className="text-2xl font-bold text-navy mb-4">
                Profit Tracking & Margins
              </h2>
              <p className="text-gray-600 mb-6">
                Profit margins and total profit per product
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-off-white">
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Product
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Unit Price
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Cost Price
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Profit Margin
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Qty Sold
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Total Profit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProfitData.map((profit, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-off-white">
                        <td className="py-3 px-4 text-gray-700 font-medium">
                          {profit.productName}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700 font-semibold">
                          ₱{profit.unitPrice.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          ₱{profit.costPrice.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            {profit.profitMargin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700 font-semibold">
                          {profit.quantitySold}
                        </td>
                        <td className="py-3 px-4 text-right text-navy font-bold">
                          ₱{profit.totalProfit.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-off-white font-bold border-t border-border">
                      <td colSpan={5} className="py-3 px-4 text-right">
                        Total Profit:
                      </td>
                      <td className="py-3 px-4 text-right text-navy">
                        ₱{(mockProfitData.reduce((sum, p) => sum + p.totalProfit, 0)).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  onClick={() =>
                    handleExport("excel", "Profit Report")
                  }
                  disabled={isExporting}
                  className="bg-accent hover:bg-accent-dark text-white"
                >
                  📥 Export to Excel
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Document Generation Section */}
        <Card className="p-6 mt-8">
          <h2 className="text-2xl font-bold text-navy mb-4">Document Generation</h2>
          <p className="text-gray-600 mb-6">
            Generate printable documents and receipts
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => handleGenerateDocument("Sales Receipt")}
              disabled={isExporting}
              variant="outline"
              className="h-auto py-4"
            >
              <div className="text-left w-full">
                <div className="font-semibold text-navy">📜 Sales Receipt</div>
                <div className="text-xs text-gray-600">Generate printable sales receipts</div>
              </div>
            </Button>
            <Button
              onClick={() => handleGenerateDocument("Invoice")}
              disabled={isExporting}
              variant="outline"
              className="h-auto py-4"
            >
              <div className="text-left w-full">
                <div className="font-semibold text-navy">📋 Invoice</div>
                <div className="text-xs text-gray-600">Generate customer invoices</div>
              </div>
            </Button>
            <Button
              onClick={() => handleGenerateDocument("Inventory Summary")}
              disabled={isExporting}
              variant="outline"
              className="h-auto py-4"
            >
              <div className="text-left w-full">
                <div className="font-semibold text-navy">📦 Inventory Summary</div>
                <div className="text-xs text-gray-600">Generate inventory snapshot documents</div>
              </div>
            </Button>
            <Button
              onClick={() => handleGenerateDocument("Performance Report")}
              disabled={isExporting}
              variant="outline"
              className="h-auto py-4"
            >
              <div className="text-left w-full">
                <div className="font-semibold text-navy">📊 Performance Report</div>
                <div className="text-xs text-gray-600">Generate performance summary documents</div>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
