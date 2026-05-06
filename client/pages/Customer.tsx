import { useState } from "react";

interface CustomerRecord {
  id: string;
  customerId: string;
  name: string;
  phoneNumber: string;
  address: string;
  paymentTerms: string;
  registrationDate: string;
  status: "active" | "inactive";
  totalPurchases: number;
  totalAmount: number;
  lastPurchaseDate?: string;
}

export function Customer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerRecord | null>(null);

  const [customers, setCustomers] = useState<CustomerRecord[]>([
    {
      id: "1",
      customerId: "CUST-001",
      name: "Aling Maria's Store",
      phoneNumber: "09175551234",
      address: "123 Rizal Street, Maynila, Metro Manila",
      paymentTerms: "30 Days Credit",
      registrationDate: "2025-01-15",
      status: "active",
      totalPurchases: 12,
      totalAmount: 45678.90,
      lastPurchaseDate: "2025-12-05",
    },
    {
      id: "2",
      customerId: "CUST-002",
      name: "Sari-Sari Store ng Ading",
      phoneNumber: "09087654321",
      address: "456 Osmeña Avenue, Cebu City",
      paymentTerms: "Cash",
      registrationDate: "2025-02-01",
      status: "active",
      totalPurchases: 8,
      totalAmount: 28950.50,
      lastPurchaseDate: "2025-12-02",
    },
    {
      id: "3",
      customerId: "CUST-003",
      name: "KM5 Convenience Store",
      phoneNumber: "09209876543",
      address: "789 Quezon Blvd, Quezon City",
      paymentTerms: "Cash on Delivery",
      registrationDate: "2025-01-20",
      status: "active",
      totalPurchases: 15,
      totalAmount: 67234.75,
      lastPurchaseDate: "2025-12-01",
    },
    {
      id: "4",
      customerId: "CUST-004",
      name: "Mang Ben Palengke",
      phoneNumber: "09325558888",
      address: "321 Macapagal Avenue, Las Piñas",
      paymentTerms: "Cash",
      registrationDate: "2025-03-10",
      status: "inactive",
      totalPurchases: 5,
      totalAmount: 12450.00,
      lastPurchaseDate: "2025-11-15",
    },
    {
      id: "5",
      customerId: "CUST-005",
      name: "Aling Nena Store",
      phoneNumber: "09415559999",
      address: "654 EDSA, Mandaluyong",
      paymentTerms: "15 Days Credit",
      registrationDate: "2025-02-28",
      status: "active",
      totalPurchases: 10,
      totalAmount: 38920.25,
      lastPurchaseDate: "2025-12-01",
    },
    {
      id: "6",
      customerId: "CUST-006",
      name: "Ate Rosa Sari-Sari",
      phoneNumber: "09187773333",
      address: "987 Espanya Blvd, Sampaloc, Manila",
      paymentTerms: "30 Days Credit",
      registrationDate: "2025-01-05",
      status: "active",
      totalPurchases: 11,
      totalAmount: 42156.80,
      lastPurchaseDate: "2025-12-03",
    },
    {
      id: "7",
      customerId: "CUST-007",
      name: "Jose's Mini Mart",
      phoneNumber: "09332224444",
      address: "111 Magsaysay Road, Davao City",
      paymentTerms: "Cash",
      registrationDate: "2025-04-12",
      status: "inactive",
      totalPurchases: 3,
      totalAmount: 8540.00,
    },
    {
      id: "8",
      customerId: "CUST-008",
      name: "Corner Store ng Kuya",
      phoneNumber: "09447775555",
      address: "222 Pulaski Street, Iloilo City",
      paymentTerms: "7 Days Credit",
      registrationDate: "2025-03-05",
      status: "active",
      totalPurchases: 7,
      totalAmount: 23670.50,
      lastPurchaseDate: "2025-12-04",
    },
    {
      id: "9",
      customerId: "CUST-009",
      name: "Nanay's Tiangge",
      phoneNumber: "09558886666",
      address: "333 Paseo de Santa Rosa, Laguna",
      paymentTerms: "COD",
      registrationDate: "2025-02-20",
      status: "active",
      totalPurchases: 9,
      totalAmount: 34125.75,
      lastPurchaseDate: "2025-11-28",
    },
    {
      id: "10",
      customerId: "CUST-0010",
      name: "Downtown Convenience",
      phoneNumber: "09669997777",
      address: "444 Pasong Tamo, Makati",
      paymentTerms: "30 Days Credit",
      registrationDate: "2025-01-25",
      status: "active",
      totalPurchases: 16,
      totalAmount: 72340.20,
      lastPurchaseDate: "2025-12-01",
    },
  ]);

  const itemsPerPage = 10;

  // Filter and search
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phoneNumber.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate totals
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const inactiveCustomers = customers.filter((c) => c.status === "inactive").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalAmount, 0);

  // Generate next Customer ID
  const getNextCustomerId = () => {
    const lastId = customers.reduce((max, c) => {
      const num = parseInt(c.customerId.split("-")[1]);
      return num > max ? num : max;
    }, 0);
    return `CUST-${String(lastId + 1).padStart(3, "0")}`;
  };

  // Handle add/edit customer
  const handleSaveCustomer = (newCustomer: CustomerRecord) => {
    if (editingCustomer) {
      setCustomers(
        customers.map((c) =>
          c.id === editingCustomer.id ? newCustomer : c
        )
      );
      setEditingCustomer(null);
    } else {
      setCustomers([...customers, newCustomer]);
    }
    setIsAddModalOpen(false);
  };

  // Handle delete customer
  const handleDeleteCustomer = (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  // Handle status toggle
  const handleStatusToggle = (id: string) => {
    setCustomers(
      customers.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "inactive" : "active" }
          : c
      )
    );
  };

  return (
    <div className="flex-1 px-4 md:px-6 lg:px-7 py-4 md:py-6 overflow-y-auto scrollbar-hide space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-rajdhani text-3xl font-bold text-navy letter-spacing-tight">
            Customer Management
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage all registered retail partners and sari-sari stores
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Customers"
          value={totalCustomers.toString()}
          subtitle="All customers"
          icon="🧑‍🤝‍🧑"
          color="blue"
        />
        <SummaryCard
          label="Active"
          value={activeCustomers.toString()}
          subtitle={`${activeCustomers} customers`}
          icon="✅"
          color="green"
        />
        <SummaryCard
          label="Inactive"
          value={inactiveCustomers.toString()}
          subtitle={`${inactiveCustomers} customers`}
          icon="⏸"
          color="gold"
        />
        <SummaryCard
          label="Total Revenue"
          value={`₱${totalRevenue.toLocaleString("en-PH", { maximumFractionDigits: 2 })}`}
          subtitle="From all customers"
          icon="💰"
          color="green"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex gap-2 ml-auto">
          <button className="px-4 py-2 bg-white border border-border text-navy rounded-lg font-semibold text-sm hover:bg-off-white">
            ⬇ Import
          </button>
          <button className="px-4 py-2 bg-white border border-border text-navy rounded-lg font-semibold text-sm hover:bg-off-white">
            ⬆ Export
          </button>
          <button
            onClick={() => {
              setEditingCustomer(null);
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 bg-accent-2 text-white rounded-lg font-semibold text-sm hover:opacity-90"
          >
            ＋ Add Customer
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex items-center bg-navy-mid border border-border rounded-lg px-3 gap-2">
          <span className="text-muted">🔍</span>
          <input
            type="text"
            placeholder="Search by ID, name, or phone number…"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 bg-transparent border-none text-white placeholder-muted py-2 outline-none text-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value as "all" | "active" | "inactive");
            setCurrentPage(1);
          }}
          className="px-3 py-2 bg-navy-mid border border-border text-white rounded-lg text-sm outline-none cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto text-xs md:text-sm">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                  Customer ID
                </th>
                <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                  Name
                </th>
                <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap hidden sm:table-cell">
                  Phone
                </th>
                <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap hidden md:table-cell">
                  Payment Terms
                </th>
                <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap hidden lg:table-cell">
                  Total Purchases
                </th>
                <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                  Total Amount
                </th>
                <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                  Status
                </th>
                <th className="bg-navy-mid text-muted font-barlow-cond text-xs font-bold letter-spacing-wider uppercase px-3 py-3 text-left border-b border-border whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-border hover:bg-off-white/50 transition-colors"
                >
                  <td className="px-3 py-3 whitespace-nowrap">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-3 py-3 text-navy font-semibold">{customer.customerId}</td>
                  <td className="px-3 py-3 text-navy font-semibold">{customer.name}</td>
                  <td className="px-3 py-3 text-navy hidden sm:table-cell">
                    {customer.phoneNumber}
                  </td>
                  <td className="px-3 py-3 text-navy hidden md:table-cell text-xs">
                    {customer.paymentTerms}
                  </td>
                  <td className="px-3 py-3 text-navy hidden lg:table-cell">
                    {customer.totalPurchases}
                  </td>
                  <td className="px-3 py-3 text-navy font-semibold">
                    ₱{customer.totalAmount.toLocaleString("en-PH", {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusToggle(customer.id)}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold cursor-pointer badge-${
                        customer.status === "active" ? "green" : "gold"
                      }`}
                    >
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </button>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditingCustomer(customer);
                          setIsAddModalOpen(true);
                        }}
                        className="px-2 py-1 bg-gold text-white rounded text-xs font-semibold hover:opacity-90"
                        title="Edit"
                      >
                        ✏
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="px-2 py-1 bg-red text-white rounded text-xs font-semibold hover:opacity-90"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <div className="text-xs text-muted">
            Page {currentPage} of {totalPages} · {filteredCustomers.length} items
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-border rounded text-xs font-semibold disabled:opacity-50"
            >
              ← Prev
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-border rounded text-xs font-semibold disabled:opacity-50"
            >
              Next →
            </button>
            <span className="px-3 py-1 text-xs text-muted">
              Page: {currentPage} of {totalPages}
            </span>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <CustomerModal
          customer={editingCustomer}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingCustomer(null);
          }}
          onSave={handleSaveCustomer}
          nextCustomerId={getNextCustomerId()}
        />
      )}
    </div>
  );
}

function CustomerModal({
  customer,
  onClose,
  onSave,
  nextCustomerId,
}: {
  customer: CustomerRecord | null;
  onClose: () => void;
  onSave: (customer: CustomerRecord) => void;
  nextCustomerId: string;
}) {
  const [formData, setFormData] = useState<CustomerRecord>(
    customer || {
      id: Date.now().toString(),
      customerId: nextCustomerId,
      name: "",
      phoneNumber: "",
      address: "",
      paymentTerms: "Cash",
      registrationDate: new Date().toISOString().split("T")[0],
      status: "active",
      totalPurchases: 0,
      totalAmount: 0,
    }
  );

  const handleSave = () => {
    if (!formData.name || !formData.phoneNumber || !formData.address) {
      alert("Please fill in all required fields");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-border max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-navy-mid px-6 py-4 flex items-center justify-between border-b border-border">
          <h2 className="font-rajdhani text-lg font-bold text-white">
            {customer ? "Edit Customer" : "Register New Customer"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:opacity-70 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer ID and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Customer ID
              </label>
              <input
                type="text"
                value={formData.customerId}
                disabled
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-off-white text-navy font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "active" | "inactive",
                  })
                }
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="font-rajdhani text-sm font-bold text-navy mb-3">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Aling Maria's Store"
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    placeholder="09XXXXXXXXX"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Registration Date *
                  </label>
                  <input
                    type="date"
                    value={formData.registrationDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Street address, city, province"
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent-2 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="font-rajdhani text-sm font-bold text-navy mb-3">
              Payment Information
            </h3>
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">
                Payment Terms *
              </label>
              <select
                value={formData.paymentTerms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentTerms: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-accent-2"
              >
                <option value="Cash">Cash</option>
                <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                <option value="7 Days Credit">7 Days Credit</option>
                <option value="15 Days Credit">15 Days Credit</option>
                <option value="30 Days Credit">30 Days Credit</option>
                <option value="60 Days Credit">60 Days Credit</option>
              </select>
            </div>
          </div>

          {/* Purchase History (Read-only for existing customers) */}
          {customer && (
            <div className="bg-off-white rounded-lg p-4">
              <h3 className="font-rajdhani text-sm font-bold text-navy mb-3">
                Purchase History
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted">Total Purchases</div>
                  <div className="font-rajdhani text-lg font-bold text-navy">
                    {customer.totalPurchases}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted">Total Amount</div>
                  <div className="font-rajdhani text-lg font-bold text-navy">
                    ₱{customer.totalAmount.toLocaleString("en-PH", {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>
              {customer.lastPurchaseDate && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-xs text-muted">Last Purchase</div>
                  <div className="text-sm text-navy font-semibold">
                    {new Date(customer.lastPurchaseDate).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-off-white px-6 py-4 flex justify-end gap-2 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-lg font-semibold text-sm hover:bg-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-accent-2 text-white rounded-lg font-semibold text-sm hover:opacity-90"
          >
            {customer ? "Update" : "Register"} Customer
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  subtitle,
  icon,
  color,
}: {
  label: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}) {
  return (
    <div className={`bg-white border border-border rounded-2xl p-5 flex flex-col gap-2`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-xs text-muted font-semibold letter-spacing-tight uppercase">
            {label}
          </div>
          <div className={`font-rajdhani text-2xl font-bold mt-2 text-${color}`}>
            {value}
          </div>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      <div className="text-xs text-muted mt-1">{subtitle}</div>
    </div>
  );
}
