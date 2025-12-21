import { useState } from "react";

const BudgetForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    month: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.category || !form.amount || !form.month) return;

    onCreate({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      category: "",
      amount: "",
      month: "",
      description: "",
    });
  };

  // Shared input styles (keeps UI consistent)
  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2.5 mt-1 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12"
    >
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Create New Budget
      </h2>

      {/* Main Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Category
          </label>
          <input
            className={inputClass}
            placeholder="e.g. Marketing"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Budget Amount
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder="₹ 0.00"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />
        </div>

        {/* Month */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Month
          </label>
          <input
            className={inputClass}
            placeholder="May 2025"
            value={form.month}
            onChange={(e) =>
              setForm({ ...form, month: e.target.value })
            }
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="text-sm font-medium text-gray-600">
          Description (Optional)
        </label>
        <textarea
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Add any additional details..."
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          className="border border-gray-300 px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
        >
          Create Budget
        </button>
      </div>
    </form>
  );
};

export default BudgetForm;
