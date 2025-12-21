const BudgetTable = ({
  budgets,
  onDelete,
  onAddExpense,
  onEdit,
}) => {
  if (!budgets || budgets.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center text-gray-500">
        <p className="text-sm">No budgets yet</p>
        <p className="text-xs mt-1">
          Create one to start tracking expenses
        </p>
      </div>
    );
  }

  // ➕ Spend handler
  const handleSpend = (id) => {
    const amount = prompt("Enter amount spent:");

    if (!amount || isNaN(amount) || Number(amount) <= 0) return;

    onAddExpense(id, Number(amount));
  };

  // ✏️ Edit handler
  const handleEdit = (budget) => {
    const newAmount = prompt(
      "Update budget amount:",
      budget.amount
    );

    if (!newAmount || isNaN(newAmount)) return;

    onEdit(budget._id, {
      amount: Number(newAmount),
    });
  };

  // 🗑 Delete handler
  const handleDelete = (id) => {
    if (!window.confirm("Delete this budget?")) return;
    onDelete(id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-center">Budget</th>
            <th className="px-6 py-4 text-center">Spent</th>
            <th className="px-6 py-4 text-center">Remaining</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {budgets.map((b) => {
            const spent = b.spent || 0;
            const remaining = b.amount - spent;

            return (
              <tr
                key={b._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                {/* CATEGORY */}
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {b.category}
                  </div>
                  {b.description && (
                    <div className="text-sm text-gray-500">
                      {b.description}
                    </div>
                  )}
                </td>

                {/* BUDGET */}
                <td className="px-6 py-4 text-center">
                  ₹{b.amount}
                </td>

                {/* SPENT */}
                <td className="px-6 py-4 text-center">
                  ₹{spent}
                </td>

                {/* REMAINING */}
                <td className="px-6 py-4 text-center">
                  ₹{remaining}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        b.status === "On Track"
                          ? "bg-green-100 text-green-700"
                          : b.status === "At Risk"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {b.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleSpend(b._id)}
                      className="px-3 py-1.5 text-sm border rounded-lg text-blue-600 hover:bg-blue-50"
                    >
                      + Spend
                    </button>

                    <button
                      onClick={() => handleEdit(b)}
                      className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-100"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => handleDelete(b._id)}
                      className="px-3 py-1.5 text-sm border rounded-lg hover:bg-red-50 text-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
