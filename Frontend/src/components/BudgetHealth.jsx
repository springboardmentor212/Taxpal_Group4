const BudgetHealth = ({ status }) => {
  const styles =
    status === "At Risk"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <div className={`px-4 py-2 rounded-full text-sm font-medium ${styles}`}>
      Budget Health · {status}
    </div>
  );
};

export default BudgetHealth;
