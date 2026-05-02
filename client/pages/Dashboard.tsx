import { useState } from "react";

export function Dashboard() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">(
    "monthly"
  );

  // Sample data for demonstration
  const dashboardData = {
    totalProducts: 9,
    totalCustomers: 10,
    lowStockCount: 4,
    expiringCount: 2,
    pendingOrders: 3,
    totalSuppliers: 5,
  };

  const periodData = {
    daily: {
      totalSales: 38,
      netRevenue: 12024.48,
      amount: "₱3,200.45",
      transactions: 5,
      trend: "+12%",
    },
    weekly: {
      totalSales: 156,
      netRevenue: 68950.80,
      amount: "₱18,950.80",
      transactions: 22,
      trend: "+8%",
    },
    monthly: {
      totalSales: 580,
      netRevenue: 189505.60,
      amount: "₱43,505.60",
      transactions: 95,
      trend: "+15%",
    },
    yearly: {
      totalSales: 7200,
      netRevenue: 2340000.00,
      amount: "₱580,000.00",
      transactions: 1200,
      trend: "+22%",
    },
  };

  const currentPeriodData = periodData[period];

  return (
    <div className="flex-1 px-4 md:px-6 lg:px-7 py-4 md:py-6 overflow-y-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-rajdhani text-3xl font-bold text-navy letter-spacing-tight">
            Dashboard
          </h1>
          <p className="text-xs text-muted mt-1">
            Real-time operational overview and key metrics
          </p>
        </div>
        <div className="text-xs text-muted">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Quick Actions - At the Top */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="font-rajdhani text-lg font-bold text-navy mb-4 letter-spacing-tight">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="px-4 py-3 bg-accent-2 text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            📋 Generate Report
          </button>
          <button className="px-4 py-3 bg-green text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            ➕ New Transaction
          </button>
          <button className="px-4 py-3 bg-gold text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            📦 Manage Inventory
          </button>
          <button className="px-4 py-3 bg-navy text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            🚚 Track Trucks
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 justify-start">
        {(["daily", "weekly", "monthly", "yearly"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              period === p
                ? "bg-accent-2 text-white"
                : "bg-white border border-border text-navy hover:bg-off-white"
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Products"
            value={dashboardData.totalProducts.toString()}
            subtitle="Active SKUs in inventory"
            colorIndex={0}
            icon="📦"
            trend="+2"
          />
          <StatCard
            label="Total Customers"
            value={dashboardData.totalCustomers.toString()}
            subtitle="Registered retail partners"
            colorIndex={1}
            icon="🧑‍🤝‍🧑"
            trend="+1"
          />
          <StatCard
            label="Total Sales"
            value={currentPeriodData.totalSales.toString()}
            subtitle="transactions processed"
            colorIndex={2}
            icon="💳"
            trend="+5"
          />
          <StatCard
            label="Net Revenue"
            value={currentPeriodData.amount}
            subtitle="total earnings"
            colorIndex={3}
            icon="💰"
            isGreen
          />
        </div>

      {/* REQ-DASH-008: Alerts Section */}
      <div className="space-y-2">
        <Alert
          type="danger"
          icon="⚠️"
          title={`${dashboardData.lowStockCount} products`}
          message="are below the reorder threshold of 100 units. Immediate restocking recommended."
          count={dashboardData.lowStockCount}
        />
        <Alert
          type="warning"
          icon="🕐"
          title={`${dashboardData.expiringCount} products`}
          message="are nearing expiry within 7 days. Review Products Expiring section below."
          count={dashboardData.expiringCount}
        />
        <Alert
          type="warning"
          icon="📋"
          title={`${dashboardData.pendingOrders} pending orders`}
          message="awaiting processing. Review supplier orders for quick fulfillment."
          count={dashboardData.pendingOrders}
        />
      </div>

      {/* Sales Summary Section - REQ-DASH-002 */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-rajdhani text-xl font-bold text-navy letter-spacing-tight">
              Sales Summary
            </h2>
            <p className="text-xs text-muted mt-1">
              {period.charAt(0).toUpperCase() + period.slice(1)} breakdown
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SalesMetricCard
            label={`${period.charAt(0).toUpperCase() + period.slice(1)} Sales`}
            value={currentPeriodData.amount}
            subtext={`${currentPeriodData.transactions} transactions`}
            color="accent-2"
          />
          <SalesMetricCard
            label="Growth Trend"
            value={currentPeriodData.trend}
            subtext="vs previous period"
            color="green"
          />
          <SalesMetricCard
            label="Avg Transaction"
            value={`₱${Math.round(parseFloat(currentPeriodData.amount.replace(/₱|,/g, "")) / currentPeriodData.transactions).toLocaleString()}`}
            subtext="per transaction"
            color="gold"
          />
        </div>

        {/* Sales Chart */}
        <div>
          <h3 className="font-rajdhani text-sm font-semibold text-navy mb-4">
            Sales Activity ({period === "daily" ? "Hourly" : period === "weekly" ? "Daily" : period === "monthly" ? "Weekly" : "Monthly"})
          </h3>
          <div className="flex items-end gap-1.5 h-40 px-2 bg-off-white rounded-lg p-4">
            {[40, 90, 60, 120, 80, 50, 30].map((height, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-t-sm transition-all relative group cursor-pointer hover:opacity-80`}
                style={{
                  height: `${height}%`,
                  backgroundColor:
                    idx < 5
                      ? "hsl(var(--accent2))"
                      : "hsl(var(--navy-light))",
                }}
                title={
                  period === "daily"
                    ? `${9 + idx}:00 - ${(height * 100).toFixed(0)} units`
                    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]
                }
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {height}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* REQ-DASH-003: Inventory Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Inventory Status */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="font-rajdhani text-xl font-bold text-navy mb-4 letter-spacing-tight">
              Inventory Status
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <InventoryStatusCard
                label="Total Items"
                value="9"
                subtext="SKUs tracked"
                icon="📦"
                color="accent-2"
              />
              <InventoryStatusCard
                label="Low Stock"
                value="4"
                subtext="Need restocking"
                icon="⚠️"
                color="red"
              />
              <InventoryStatusCard
                label="Expiring Soon"
                value="2"
                subtext="within 7 days"
                icon="🕐"
                color="gold"
              />
            </div>

            <h3 className="font-rajdhani text-sm font-semibold text-navy mb-3">
              Lowest Stock Items
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <StockCard
                sku="7702031"
                qty="14"
                name="Hungarian Sausage w/Cheese"
                status="critical"
              />
              <StockCard
                sku="7700169"
                qty="38"
                name="FF Bossing Cheesedog KingSize"
                status="warning"
              />
              <StockCard
                sku="7700165"
                qty="56"
                name="FF Bossing Hatdogs KingSize"
                status="warning"
              />
              <StockCard
                sku="7702041"
                qty="73"
                name="FF Bossing Chicken Hd Regular"
                status="ok"
              />
            </div>
          </div>

          {/* REQ-DASH-007: Activity Feed - Recent Transactions */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="font-rajdhani text-xl font-bold text-navy mb-4 letter-spacing-tight">
              Recent Transactions
            </h2>
            <div className="overflow-x-auto text-xs md:text-sm">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                      Sales ID
                    </th>
                    <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap hidden sm:table-cell">
                      Customer
                    </th>
                    <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                      Amount
                    </th>
                    <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "SLS-006",
                      customer: "CUS-003",
                      amount: "₱12,024.48",
                      status: "Paid",
                      color: "green",
                    },
                    {
                      id: "SLS-005",
                      customer: "CUS-007",
                      amount: "₱17,300.96",
                      status: "Paid",
                      color: "green",
                    },
                    {
                      id: "SLS-004",
                      customer: "CUS-002",
                      amount: "₱3,123.80",
                      status: "Paid",
                      color: "green",
                    },
                    {
                      id: "SLS-003",
                      customer: "CUS-001",
                      amount: "₱1,060.20",
                      status: "Paid",
                      color: "green",
                    },
                    {
                      id: "SLS-002",
                      customer: "CUS-005",
                      amount: "₱2,499.04",
                      status: "Unpaid",
                      color: "red",
                    },
                  ].map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-border hover:bg-off-white/50 transition-colors"
                    >
                      <td className="px-3 py-3 text-navy font-semibold whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="px-3 py-3 text-navy hidden sm:table-cell">
                        {row.customer}
                      </td>
                      <td className="px-3 py-3 text-navy font-semibold whitespace-nowrap">
                        {row.amount}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold badge-${row.color}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* REQ-DASH-004: Customer Stats */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="font-rajdhani text-xl font-bold text-navy mb-4 letter-spacing-tight">
              Customer Statistics
            </h2>
            <div className="space-y-4">
              <StatItem
                label="Total Customers"
                value="10"
                icon="👥"
                color="accent-2"
              />
              <StatItem
                label="Active Customers"
                value="9"
                icon="✅"
                color="green"
              />
              <StatItem
                label="Inactive Customers"
                value="1"
                icon="⏸️"
                color="gold"
              />
              <StatItem
                label="New This Month"
                value="2"
                icon="🆕"
                color="accent-2"
              />
            </div>
          </div>

          {/* REQ-DASH-005: Supplier Stats */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="font-rajdhani text-xl font-bold text-navy mb-4 letter-spacing-tight">
              Supplier Information
            </h2>
            <div className="space-y-4">
              <StatItem
                label="Total Suppliers"
                value="5"
                icon="🏭"
                color="accent-2"
              />
              <StatItem
                label="Active Suppliers"
                value="5"
                icon="✅"
                color="green"
              />
              <StatItem
                label="Pending Orders"
                value="3"
                icon="📦"
                color="gold"
              />
              <StatItem
                label="Total SKUs"
                value="9"
                icon="📋"
                color="accent-2"
              />
            </div>
          </div>

          {/* REQ-DASH-008: Products Expiring Soon */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="font-rajdhani text-lg font-bold text-navy mb-4 letter-spacing-tight">
              Expiring Soon
            </h2>
            <div className="space-y-2">
              {[
                {
                  sku: "7700165",
                  name: "FF Bossing Hatdogs",
                  expiry: "May 05, 2026",
                  color: "red",
                },
                {
                  sku: "7702031",
                  name: "Hungarian Sausage",
                  expiry: "May 12, 2026",
                  color: "gold",
                },
                {
                  sku: "7700169",
                  name: "FF Bossing Cheesedog",
                  expiry: "May 18, 2026",
                  color: "gold",
                },
              ].map((item) => (
                <div
                  key={item.sku}
                  className={`p-3 rounded-lg border-l-4 border-${item.color} bg-${item.color}/5`}
                >
                  <div className="font-semibold text-navy text-xs">{item.sku}</div>
                  <div className="text-xs text-muted mt-0.5">{item.name}</div>
                  <div className={`text-xs font-bold text-${item.color} mt-1`}>
                    {item.expiry}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Component: Stat Card
function StatCard({
  label,
  value,
  subtitle,
  colorIndex,
  icon,
  trend,
  isGreen,
}: {
  label: string;
  value: string;
  subtitle: string;
  colorIndex: number;
  icon?: string;
  trend?: string;
  isGreen?: boolean;
}) {
  const colors = ["accent-2", "gold", "green", "red"];
  const color = colors[colorIndex] || "accent-2";

  return (
    <div className="bg-white border border-border rounded-2xl p-5 flex flex-col gap-2 relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
      <div
        className={`absolute top-0 left-0 right-0 h-1 rounded-3xl rounded-b-none bg-${color}`}
      ></div>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-xs text-muted font-semibold letter-spacing-tight uppercase">
            {label}
          </div>
          <div
            className={`font-rajdhani text-3xl font-bold text-navy leading-none ${isGreen ? "text-green" : ""}`}
          >
            {value}
          </div>
        </div>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted mt-1">{subtitle}</div>
        {trend && (
          <span className="text-xs font-semibold text-green bg-green/10 px-2 py-1 rounded">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

// Component: Alert
function Alert({
  type,
  icon,
  title,
  message,
  count,
}: {
  type: "danger" | "warning";
  icon: string;
  title: string;
  message: string;
  count: number;
}) {
  const bgColor =
    type === "danger"
      ? "bg-red/10 border-red/30 text-red"
      : "bg-gold/10 border-gold/30 text-gold";

  return (
    <div
      className={`flex items-start gap-3 px-4 py-4 rounded-lg border ${bgColor} hover:shadow-md transition-shadow`}
    >
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <p className="text-sm mt-1 opacity-90">{message}</p>
      </div>
      <div
        className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ${type === "danger" ? "bg-red text-white" : "bg-gold text-white"}`}
      >
        {count}
      </div>
    </div>
  );
}

// Component: Stock Card
function StockCard({
  sku,
  qty,
  name,
  status,
}: {
  sku: string;
  qty: string;
  name: string;
  status: "critical" | "warning" | "ok";
}) {
  const statusColors = {
    critical: "text-red",
    warning: "text-gold",
    ok: "text-green",
  };

  const bgColors = {
    critical: "bg-red/10",
    warning: "bg-gold/10",
    ok: "bg-green/10",
  };

  return (
    <div
      className={`${bgColors[status]} border border-border rounded-xl p-3 hover:shadow-md transition-shadow`}
    >
      <div className="text-xs text-muted font-semibold">{sku}</div>
      <div className={`font-rajdhani text-3xl font-bold ${statusColors[status]} mt-1`}>
        {qty}
      </div>
      <div className="text-xs text-muted mt-2 line-clamp-2">{name}</div>
    </div>
  );
}

// Component: Sales Metric Card
function SalesMetricCard({
  label,
  value,
  subtext,
  color,
}: {
  label: string;
  value: string;
  subtext: string;
  color: string;
}) {
  return (
    <div className={`bg-${color}/10 border border-${color}/30 rounded-xl p-4`}>
      <div className="text-xs text-muted font-semibold uppercase letter-spacing-tight">
        {label}
      </div>
      <div className={`font-rajdhani text-2xl font-bold text-${color} mt-2`}>
        {value}
      </div>
      <div className="text-xs text-muted mt-2">{subtext}</div>
    </div>
  );
}

// Component: Inventory Status Card
function InventoryStatusCard({
  label,
  value,
  subtext,
  icon,
  color,
}: {
  label: string;
  value: string;
  subtext: string;
  icon: string;
  color: string;
}) {
  return (
    <div className={`bg-${color}/10 border border-${color}/30 rounded-lg p-4 text-center`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className={`font-rajdhani text-2xl font-bold text-${color}`}>
        {value}
      </div>
      <div className="text-xs text-muted mt-2">{label}</div>
      <div className="text-xs text-muted mt-0.5">{subtext}</div>
    </div>
  );
}

// Component: Stat Item
function StatItem({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-off-white rounded-lg hover:bg-navy/5 transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <div className="text-sm text-muted">{label}</div>
      </div>
      <div className={`font-rajdhani text-lg font-bold text-${color}`}>
        {value}
      </div>
    </div>
  );
}
