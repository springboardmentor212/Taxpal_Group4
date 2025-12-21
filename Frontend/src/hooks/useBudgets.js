import { useEffect, useState } from "react";
import {
  getBudgets,
  createBudget,
  deleteBudget,
  updateBudget,
} from "../services/api";

export const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        setLoading(true);
        const res = await getBudgets();
        setBudgets(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  // ADD BUDGET
  const addBudget = async (budget) => {
    const res = await createBudget(budget);
    setBudgets((prev) => [res.data, ...prev]);
  };

  // ❌ DELETE
  const removeBudget = async (id) => {
    await deleteBudget(id);
    setBudgets((prev) => prev.filter((b) => b._id !== id));
  };

  // ➕ SPEND (THIS WAS MISSING)
  const addExpense = async (id, amount) => {
  try {
    const res = await updateBudget(id, {
      spentIncrement: amount,
    });

    // 🔥 Use backend response (includes updated status)
    setBudgets((prev) =>
      prev.map((b) =>
        b._id === id ? res.data : b
      )
    );
  } catch (err) {
    console.error("Failed to add expense", err);
  }
};


  // ✏️ EDIT
  const editBudget = async (id, data) => {
  try {
    const res = await updateBudget(id, data);

    setBudgets((prev) =>
      prev.map((b) =>
        b._id === id ? res.data : b
      )
    );
  } catch (err) {
    console.error("Failed to edit budget", err);
  }
};


  return {
    budgets,
    loading,
    addBudget,
    removeBudget,
    addExpense,
    editBudget,
  };
};
