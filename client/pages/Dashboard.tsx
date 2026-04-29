export function Dashboard() {
  return (
    <div className="flex-1 px-4 md:px-6 lg:px-7 py-4 md:py-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-rajdhani text-3xl font-bold text-white letter-spacing-tight">
            Dashboard
          </h1>
          <p className="text-xs text-muted mt-1">
            Real-time operational overview
          </p>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard
          label="Total Products"
          value="9"
          subtitle="Active SKUs in inventory"
          colorIndex={0}
        />
        <StatCard
          label="Total Customers"
          value="10"
          subtitle="Registered retail partners"
          colorIndex={1}
        />
        <StatCard
          label="Total Sales"
          value="38"
          subtitle="Transactions this period"
          colorIndex={2}
        />
        <StatCard
          label="Profits Generated"
          value="₱43,505.60"
          subtitle="Net revenue this month"
          colorIndex={3}
          isGreen
        />
      </div>

      {/* Alerts */}
      <div className="mb-4 space-y-2">
        <Alert
          type="danger"
          icon="⚠️"
          title="4 products"
          message="are below the reorder threshold of 100 units. Immediate restocking recommended."
        />
        <Alert
          type="warning"
          icon="🕐"
          title="2 products"
          message="are nearing expiry within 7 days. Review Products Expiring section below."
        />
      </div>

      {/* Lowest Stock Widget */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-4">
        <h3 className="font-rajdhani text-base font-semibold text-off-white mb-3.5">
          Lowest Stock Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <StockCard sku="7702031" qty="14" name="Hungarian Sausage w/Cheese" status="critical" />
          <StockCard sku="7700169" qty="38" name="FF Bossing Cheesedog KingSize" status="warning" />
          <StockCard sku="7700165" qty="56" name="FF Bossing Hatdogs KingSize" status="warning" />
          <StockCard sku="7702041" qty="73" name="FF Bossing Chicken Hd Regular" status="ok" />
        </div>
      </div>

      {/* Latest Transactions + Expiring Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Latest Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-5">
          <h3 className="font-rajdhani text-base font-semibold text-off-white mb-3.5">
            Latest Transactions
          </h3>
          <div className="overflow-x-auto text-xs md:text-sm">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3.5 py-2.5 text-left border-b border-border whitespace-nowrap">
                    Sales ID
                  </th>
                  <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3.5 py-2.5 text-left border-b border-border whitespace-nowrap">
                    Amount
                  </th>
                  <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3.5 py-2.5 text-left border-b border-border whitespace-nowrap">
                    # Products
                  </th>
                  <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3.5 py-2.5 text-left border-b border-border whitespace-nowrap">
                    Customer
                  </th>
                  <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3.5 py-2.5 text-left border-b border-border whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "SLS-006", amount: "₱12,024.48", products: "16", customer: "CUS-003", status: "Paid", color: "green" },
                  { id: "SLS-005", amount: "₱17,300.96", products: "14", customer: "CUS-007", status: "Paid", color: "green" },
                  { id: "SLS-004", amount: "₱3,123.80", products: "2", customer: "CUS-002", status: "Paid", color: "green" },
                  { id: "SLS-003", amount: "₱1,060.20", products: "2", customer: "CUS-001", status: "Paid", color: "green" },
                  { id: "SLS-002", amount: "₱2,499.04", products: "2", customer: "CUS-005", status: "Unpaid", color: "red" },
                ].map((row) => (
                  <tr key={row.id} className="border-b border-border hover:bg-white/3">
                    <td className="px-3.5 py-2.5 text-sm text-off-white whitespace-nowrap">{row.id}</td>
                    <td className="px-3.5 py-2.5 text-sm text-off-white whitespace-nowrap">{row.amount}</td>
                    <td className="px-3.5 py-2.5 text-sm text-off-white whitespace-nowrap">{row.products}</td>
                    <td className="px-3.5 py-2.5 text-sm text-off-white whitespace-nowrap">{row.customer}</td>
                    <td className="px-3.5 py-2.5 text-sm whitespace-nowrap">
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

        {/* Expiring Products */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h3 className="font-rajdhani text-base font-semibold text-off-white mb-3.5">
            Products Expiring Soon
          </h3>
          <div className="overflow-x-auto text-xs md:text-sm">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-2 py-2.5 text-left border-b border-border whitespace-nowrap">
                    SKU Code
                  </th>
                  <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-2 py-2.5 text-left border-b border-border whitespace-nowrap">
                    Qty
                  </th>
                  <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-2 py-2.5 text-left border-b border-border whitespace-nowrap">
                    Expiry
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sku: "7700165", qty: "56", expiry: "May 05, 2026", color: "red" },
                  { sku: "7702031", qty: "14", expiry: "May 12, 2026", color: "gold" },
                  { sku: "7700169", qty: "38", expiry: "May 18, 2026", color: "gold" },
                ].map((row) => (
                  <tr key={row.sku} className="border-b border-border">
                    <td className="px-2 py-2.5 text-sm text-off-white">{row.sku}</td>
                    <td className="px-2 py-2.5 text-sm text-off-white">{row.qty}</td>
                    <td className="px-2 py-2.5 text-sm">
                      <span className={`badge-${row.color}`}>{row.expiry}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sales Activity Chart */}
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="font-rajdhani text-base font-semibold text-off-white mb-2.5">
              Sales Activity (Last 7 Days)
            </h4>
            <div className="flex items-end gap-1.5 h-32 px-2">
              {[40, 90, 60, 120, 80, 50, 30].map((height, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-t-sm transition-all ${
                    idx < 5 ? "bg-accent-2" : "bg-navy-light"
                  }`}
                  style={{ height: `${height}%` }}
                  title={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
  colorIndex,
  isGreen,
}: {
  label: string;
  value: string;
  subtitle: string;
  colorIndex: number;
  isGreen?: boolean;
}) {
  const colors = ["accent-2", "gold", "green", "purple"];
  const color = colors[colorIndex] || "accent-2";

  return (
    <div className="bg-white border border-border rounded-2xl p-4.5 flex flex-col gap-1 relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5">
      <div
        className={`absolute top-0 left-0 right-0 h-0.75 rounded-3xl rounded-b-none bg-${color}`}
      ></div>
      <div className="text-xs text-muted font-semibold letter-spacing-tight uppercase">
        {label}
      </div>
      <div
        className={`font-rajdhani text-3xl font-bold text-navy leading-none ${isGreen ? "text-green" : ""}`}
      >
        {value}
      </div>
      <div className="text-xs text-muted mt-0.5">{subtitle}</div>
    </div>
  );
}

function Alert({
  type,
  icon,
  title,
  message,
}: {
  type: "danger" | "warning";
  icon: string;
  title: string;
  message: string;
}) {
  const bgColor =
    type === "danger"
      ? "bg-red/10 border-red/30 text-red"
      : "bg-gold/10 border-gold/30 text-gold";

  return (
    <div className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border ${bgColor}`}>
      <span>{icon}</span>
      <div className="text-sm">
        <strong>{title}</strong> {message}
      </div>
    </div>
  );
}

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

  return (
    <div className="bg-navy-mid border border-border rounded-2xl p-3.5">
      <div className="text-xs text-muted mb-1">[{sku}]</div>
      <div className={`font-rajdhani text-4xl font-bold ${statusColors[status]}`}>
        {qty}
      </div>
      <div className="text-xs text-muted mt-0.5">{name}</div>
    </div>
  );
}
