import Sidebar from "../components/Sidebar";
import BudgetForm from "../components/BudgetForm";
import BudgetTable from "../components/BudgetTable";
import { useBudgets } from "../hooks/useBudgets";

const Budgets = () => {
  const {
    budgets,
    addBudget,
    removeBudget,
    addExpense,
    editBudget,
  } = useBudgets();

const budgetHealth = () => {
  if (budgets.length === 0) return "Good";

  if (budgets.some((b) => b.status === "Over Budget")) {
    return "Over Budget";
  }

  if (budgets.some((b) => b.status === "At Risk")) {
    return "At Risk";
  }

  return "Good";
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 px-12 py-10 bg-gray-50">

        {/* Page Header */}
        <div className="flex justify-between items-center mb-12">
  <div>
    <h1 className="text-2xl font-bold text-gray-900">
      Budgets
    </h1>
    <p className="text-sm text-gray-500 mt-1">
      Track, manage, and control your monthly spending
    </p>
  </div>

  <div className="bg-white px-4 py-2 rounded-full shadow-sm border text-sm flex items-center gap-2">
    <span className="text-gray-500">Budget Health</span>
   <span
  className={`font-semibold ${
    budgetHealth() === "Good"
      ? "text-green-600"
      : budgetHealth() === "At Risk"
      ? "text-yellow-600"
      : "text-red-600"
  }`}
>
  {budgetHealth()}
</span>
  </div>
</div>


        {/* Create Budget Section */}
        <section className="mb-12">
          <BudgetForm onCreate={addBudget} />
        </section>

        {/* Table Section */}
        <section>
          <BudgetTable
            budgets={budgets}
            onDelete={removeBudget}
            onAddExpense={addExpense}
            onEdit={editBudget}
          />
        </section>
      </main>
    </div>
  );
};

export default Budgets;
