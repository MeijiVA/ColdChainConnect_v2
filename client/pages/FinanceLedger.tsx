import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type TabType = "expenses" | "operations" | "maintenance" | "receivables";

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
}

interface OperationalCost {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
}

interface MaintenanceRecord {
  id: string;
  date: string;
  truck: string;
  serviceProvider: string;
  service: string;
  cost: number;
  mileage: number;
  nextServiceDue: string;
  status: "completed" | "scheduled" | "pending";
}

interface AccountsReceivable {
  id: string;
  salesId: string;
  customerId: string;
  customerName: string;
  date: string;
  amount: number;
  status: "paid" | "unpaid";
  dueDate: string;
}

// Mock data
const mockExpenses: Expense[] = [
  {
    id: "1",
    date: "2024-01-15",
    category: "Maintenance",
    description: "Truck #T001 Oil Change",
    amount: 150,
    status: "approved",
  },
  {
    id: "2",
    date: "2024-01-14",
    category: "Maintenance",
    description: "Truck #T002 Brake Pads Replacement",
    amount: 320,
    status: "approved",
  },
  {
    id: "3",
    date: "2024-01-13",
    category: "Maintenance",
    description: "Truck #T003 Tire Replacement",
    amount: 800,
    status: "pending",
  },
];

const mockOperationalCosts: OperationalCost[] = [
  {
    id: "1",
    date: "2024-01-15",
    category: "Fuel",
    description: "Fuel for Truck #T001 - 250L",
    amount: 625,
    status: "approved",
  },
  {
    id: "2",
    date: "2024-01-14",
    category: "Tolls",
    description: "Highway tolls - Route A-5",
    amount: 45,
    status: "approved",
  },
  {
    id: "3",
    date: "2024-01-13",
    category: "Office Supplies",
    description: "Office supplies and stationery",
    amount: 120,
    status: "pending",
  },
  {
    id: "4",
    date: "2024-01-12",
    category: "Fuel",
    description: "Fuel for Truck #T002 - 300L",
    amount: 750,
    status: "approved",
  },
];

const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: "1",
    date: "2024-01-15",
    truck: "T001",
    serviceProvider: "Quick Fix Auto",
    service: "Oil Change & Filter Replacement",
    cost: 150,
    mileage: 125000,
    nextServiceDue: "2024-03-15",
    status: "completed",
  },
  {
    id: "2",
    date: "2024-01-10",
    truck: "T002",
    serviceProvider: "Professional Mechanics",
    service: "Brake System Inspection & Pad Replacement",
    cost: 320,
    mileage: 98500,
    nextServiceDue: "2024-07-10",
    status: "completed",
  },
  {
    id: "3",
    date: "2024-01-20",
    truck: "T003",
    serviceProvider: "TireMaster Pro",
    service: "All-Terrain Tire Replacement",
    cost: 800,
    mileage: 156200,
    nextServiceDue: "2024-01-20",
    status: "scheduled",
  },
  {
    id: "4",
    date: "2024-02-05",
    truck: "T001",
    serviceProvider: "Quick Fix Auto",
    service: "Transmission Fluid Check",
    cost: 75,
    mileage: 127000,
    nextServiceDue: "2024-04-05",
    status: "pending",
  },
];

const mockAccountsReceivable: AccountsReceivable[] = [
  {
    id: "1",
    salesId: "SLS-001",
    customerId: "CUST-001",
    customerName: "Restaurant ABC",
    date: "2024-01-15",
    amount: 4500,
    status: "paid",
    dueDate: "2024-01-22",
  },
  {
    id: "2",
    salesId: "SLS-002",
    customerId: "CUST-002",
    customerName: "Cafe XYZ",
    date: "2024-01-14",
    amount: 2800,
    status: "unpaid",
    dueDate: "2024-01-21",
  },
  {
    id: "3",
    salesId: "SLS-003",
    customerId: "CUST-003",
    customerName: "Supermarket DEF",
    date: "2024-01-13",
    amount: 6200,
    status: "unpaid",
    dueDate: "2024-01-20",
  },
  {
    id: "4",
    salesId: "SLS-004",
    customerId: "CUST-001",
    customerName: "Restaurant ABC",
    date: "2024-01-12",
    amount: 3500,
    status: "paid",
    dueDate: "2024-01-19",
  },
];

export function FinanceLedger() {
  const [activeTab, setActiveTab] = useState<TabType>("expenses");
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [operationalCosts, setOperationalCosts] = useState<OperationalCost[]>(
    mockOperationalCosts
  );
  const [maintenanceRecords, setMaintenanceRecords] = useState<
    MaintenanceRecord[]
  >(mockMaintenanceRecords);
  const [accountsReceivable, setAccountsReceivable] = useState<
    AccountsReceivable[]
  >(mockAccountsReceivable);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Form states
  const [expenseForm, setExpenseForm] = useState({
    date: "",
    category: "Maintenance",
    description: "",
    amount: "",
  });

  const [operationalForm, setOperationalForm] = useState({
    date: "",
    category: "Fuel",
    description: "",
    amount: "",
  });

  const [maintenanceForm, setMaintenanceForm] = useState({
    date: "",
    truck: "",
    serviceProvider: "",
    service: "",
    cost: "",
    mileage: "",
    nextServiceDue: "",
  });

  const handleAddExpense = async () => {
    if (
      !expenseForm.date ||
      !expenseForm.description ||
      !expenseForm.amount
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newExpense: Expense = {
        id: String(expenses.length + 1),
        date: expenseForm.date,
        category: expenseForm.category,
        description: expenseForm.description,
        amount: parseFloat(expenseForm.amount),
        status: "pending",
      };
      setExpenses([newExpense, ...expenses]);
      setExpenseForm({
        date: "",
        category: "Maintenance",
        description: "",
        amount: "",
      });
      setShowAddForm(false);
      toast({
        title: "Success",
        description: "Expense logged successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddOperational = async () => {
    if (
      !operationalForm.date ||
      !operationalForm.description ||
      !operationalForm.amount
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newCost: OperationalCost = {
        id: String(operationalCosts.length + 1),
        date: operationalForm.date,
        category: operationalForm.category,
        description: operationalForm.description,
        amount: parseFloat(operationalForm.amount),
        status: "pending",
      };
      setOperationalCosts([newCost, ...operationalCosts]);
      setOperationalForm({
        date: "",
        category: "Fuel",
        description: "",
        amount: "",
      });
      setShowAddForm(false);
      toast({
        title: "Success",
        description: "Operational cost logged successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add operational cost.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddMaintenance = async () => {
    if (
      !maintenanceForm.date ||
      !maintenanceForm.truck ||
      !maintenanceForm.serviceProvider ||
      !maintenanceForm.service ||
      !maintenanceForm.cost ||
      !maintenanceForm.mileage
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newRecord: MaintenanceRecord = {
        id: String(maintenanceRecords.length + 1),
        date: maintenanceForm.date,
        truck: maintenanceForm.truck,
        serviceProvider: maintenanceForm.serviceProvider,
        service: maintenanceForm.service,
        cost: parseFloat(maintenanceForm.cost),
        mileage: parseInt(maintenanceForm.mileage),
        nextServiceDue: maintenanceForm.nextServiceDue,
        status: "pending",
      };
      setMaintenanceRecords([newRecord, ...maintenanceRecords]);
      setMaintenanceForm({
        date: "",
        truck: "",
        serviceProvider: "",
        service: "",
        cost: "",
        mileage: "",
        nextServiceDue: "",
      });
      setShowAddForm(false);
      toast({
        title: "Success",
        description: "Maintenance record added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add maintenance record.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleUpdateReceivableStatus = (id: string, newStatus: "paid" | "unpaid") => {
    setAccountsReceivable(
      accountsReceivable.map((ar) =>
        ar.id === id ? { ...ar, status: newStatus } : ar
      )
    );
    toast({
      title: "Success",
      description: `Payment status updated to ${newStatus}.`,
    });
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalOperational = operationalCosts.reduce((sum, c) => sum + c.amount, 0);
  const totalMaintenance = maintenanceRecords.reduce((sum, r) => sum + r.cost, 0);

  return (
    <div className="flex-1 px-4 md:px-6 lg:px-7 py-4 md:py-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-navy mb-2">Finance Ledger</h1>
          <p className="text-gray-600">
            Track expenses, operational costs, maintenance records, and accounts receivable
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Total Expenses
            </h3>
            <p className="text-3xl font-bold text-navy">
              ₱{totalExpenses.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {expenses.length} entries
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Operational Costs
            </h3>
            <p className="text-3xl font-bold text-navy">
              ₱{totalOperational.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {operationalCosts.length} entries
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Maintenance Costs
            </h3>
            <p className="text-3xl font-bold text-navy">
              ₱{totalMaintenance.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {maintenanceRecords.length} records
            </p>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("expenses")}
            className={`px-4 py-3 font-semibold transition-all border-b-2 ${
              activeTab === "expenses"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-navy"
            }`}
          >
            Maintenance Expenses
          </button>
          <button
            onClick={() => setActiveTab("operations")}
            className={`px-4 py-3 font-semibold transition-all border-b-2 ${
              activeTab === "operations"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-navy"
            }`}
          >
            Operational Costs
          </button>
          <button
            onClick={() => setActiveTab("maintenance")}
            className={`px-4 py-3 font-semibold transition-all border-b-2 ${
              activeTab === "maintenance"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-navy"
            }`}
          >
            Maintenance Records
          </button>
          <button
            onClick={() => setActiveTab("receivables")}
            className={`px-4 py-3 font-semibold transition-all border-b-2 ${
              activeTab === "receivables"
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-navy"
            }`}
          >
            Accounts Receivable
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "expenses" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-navy">
                Maintenance Expenses
              </h2>
              <Button
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  if (showAddForm) {
                    setActiveTab("expenses");
                  }
                }}
                className="bg-accent hover:bg-accent-dark text-white"
              >
                {showAddForm ? "Cancel" : "+ Add Expense"}
              </Button>
            </div>

            {showAddForm && (
              <Card className="p-6 mb-4 bg-off-white">
                <h3 className="font-bold text-navy mb-4">
                  Log New Maintenance Expense
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) =>
                        setExpenseForm({ ...expenseForm, date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Category
                    </label>
                    <select
                      value={expenseForm.category}
                      onChange={(e) =>
                        setExpenseForm({
                          ...expenseForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-border rounded bg-white text-navy"
                    >
                      <option>Maintenance</option>
                      <option>Repairs</option>
                      <option>Parts</option>
                      <option>Inspection</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Description
                  </label>
                  <Input
                    value={expenseForm.description}
                    onChange={(e) =>
                      setExpenseForm({
                        ...expenseForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="e.g., Truck #T001 Oil Change"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Amount (₱)
                  </label>
                  <Input
                    type="number"
                    value={expenseForm.amount}
                    onChange={(e) =>
                      setExpenseForm({ ...expenseForm, amount: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setShowAddForm(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddExpense}
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent-dark text-white"
                  >
                    {isSubmitting ? "Saving..." : "Save Expense"}
                  </Button>
                </div>
              </Card>
            )}

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-off-white">
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Description
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr
                        key={expense.id}
                        className="border-b border-border hover:bg-off-white"
                      >
                        <td className="py-3 px-4 text-gray-700">
                          {expense.date}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {expense.category}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {expense.description}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-navy">
                          ₱{expense.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                              expense.status
                            )}`}
                          >
                            {expense.status.charAt(0).toUpperCase() +
                              expense.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "operations" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-navy">
                Operational Costs
              </h2>
              <Button
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  if (showAddForm) {
                    setActiveTab("operations");
                  }
                }}
                className="bg-accent hover:bg-accent-dark text-white"
              >
                {showAddForm ? "Cancel" : "+ Add Cost"}
              </Button>
            </div>

            {showAddForm && (
              <Card className="p-6 mb-4 bg-off-white">
                <h3 className="font-bold text-navy mb-4">
                  Log New Operational Cost
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={operationalForm.date}
                      onChange={(e) =>
                        setOperationalForm({
                          ...operationalForm,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Category
                    </label>
                    <select
                      value={operationalForm.category}
                      onChange={(e) =>
                        setOperationalForm({
                          ...operationalForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-border rounded bg-white text-navy"
                    >
                      <option>Fuel</option>
                      <option>Tolls</option>
                      <option>Office Supplies</option>
                      <option>Utilities</option>
                      <option>Insurance</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Description
                  </label>
                  <Input
                    value={operationalForm.description}
                    onChange={(e) =>
                      setOperationalForm({
                        ...operationalForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="e.g., Fuel for Truck #T001 - 250L"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Amount (₱)
                  </label>
                  <Input
                    type="number"
                    value={operationalForm.amount}
                    onChange={(e) =>
                      setOperationalForm({
                        ...operationalForm,
                        amount: e.target.value,
                      })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setShowAddForm(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddOperational}
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent-dark text-white"
                  >
                    {isSubmitting ? "Saving..." : "Save Cost"}
                  </Button>
                </div>
              </Card>
            )}

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-off-white">
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Description
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {operationalCosts.map((cost) => (
                      <tr
                        key={cost.id}
                        className="border-b border-border hover:bg-off-white"
                      >
                        <td className="py-3 px-4 text-gray-700">
                          {cost.date}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {cost.category}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {cost.description}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-navy">
                          ₱{cost.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                              cost.status
                            )}`}
                          >
                            {cost.status.charAt(0).toUpperCase() +
                              cost.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "maintenance" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-navy">
                Maintenance Records
              </h2>
              <Button
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  if (showAddForm) {
                    setActiveTab("maintenance");
                  }
                }}
                className="bg-accent hover:bg-accent-dark text-white"
              >
                {showAddForm ? "Cancel" : "+ Add Record"}
              </Button>
            </div>

            {showAddForm && (
              <Card className="p-6 mb-4 bg-off-white">
                <h3 className="font-bold text-navy mb-4">
                  Add Truck Maintenance Record
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Service Date
                    </label>
                    <Input
                      type="date"
                      value={maintenanceForm.date}
                      onChange={(e) =>
                        setMaintenanceForm({
                          ...maintenanceForm,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Truck ID
                    </label>
                    <Input
                      value={maintenanceForm.truck}
                      onChange={(e) =>
                        setMaintenanceForm({
                          ...maintenanceForm,
                          truck: e.target.value,
                        })
                      }
                      placeholder="e.g., T001"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Service Provider
                    </label>
                    <Input
                      value={maintenanceForm.serviceProvider}
                      onChange={(e) =>
                        setMaintenanceForm({
                          ...maintenanceForm,
                          serviceProvider: e.target.value,
                        })
                      }
                      placeholder="e.g., Quick Fix Auto"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Mileage
                    </label>
                    <Input
                      type="number"
                      value={maintenanceForm.mileage}
                      onChange={(e) =>
                        setMaintenanceForm({
                          ...maintenanceForm,
                          mileage: e.target.value,
                        })
                      }
                      placeholder="Current mileage"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-navy mb-2">
                    Service/Repair Details
                  </label>
                  <Input
                    value={maintenanceForm.service}
                    onChange={(e) =>
                      setMaintenanceForm({
                        ...maintenanceForm,
                        service: e.target.value,
                      })
                    }
                    placeholder="e.g., Oil Change & Filter Replacement"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Cost (₱)
                    </label>
                    <Input
                      type="number"
                      value={maintenanceForm.cost}
                      onChange={(e) =>
                        setMaintenanceForm({
                          ...maintenanceForm,
                          cost: e.target.value,
                        })
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Next Service Due
                    </label>
                    <Input
                      type="date"
                      value={maintenanceForm.nextServiceDue}
                      onChange={(e) =>
                        setMaintenanceForm({
                          ...maintenanceForm,
                          nextServiceDue: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setShowAddForm(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddMaintenance}
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent-dark text-white"
                  >
                    {isSubmitting ? "Saving..." : "Save Record"}
                  </Button>
                </div>
              </Card>
            )}

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-off-white">
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Truck
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Service Provider
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Service
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Cost
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Mileage
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Next Due
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceRecords.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b border-border hover:bg-off-white"
                      >
                        <td className="py-3 px-4 text-gray-700">
                          {record.date}
                        </td>
                        <td className="py-3 px-4 font-semibold text-navy">
                          {record.truck}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {record.serviceProvider}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {record.service}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-navy">
                          ₱{record.cost.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {record.mileage.toLocaleString()} mi
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {record.nextServiceDue}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                              record.status
                            )}`}
                          >
                            {record.status.charAt(0).toUpperCase() +
                              record.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "receivables" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-navy">
                Accounts Receivable
              </h2>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-off-white">
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Sales ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Customer ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Customer Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Date
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-navy">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Due Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-navy">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsReceivable.map((ar) => (
                      <tr
                        key={ar.id}
                        className="border-b border-border hover:bg-off-white"
                      >
                        <td className="py-3 px-4 text-navy font-semibold">
                          {ar.salesId}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {ar.customerId}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {ar.customerName}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {ar.date}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-navy">
                          ₱{ar.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {ar.dueDate}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <select
                            value={ar.status}
                            onChange={(e) =>
                              handleUpdateReceivableStatus(ar.id, e.target.value as "paid" | "unpaid")
                            }
                            className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold border-none cursor-pointer ${
                              ar.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
