const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const TaxSummary = ({ result, loading }) => {
  // 1️⃣ Loading state
  if (loading) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <p className="text-gray-500">Calculating tax…</p>
      </div>
    );
  }

  // 2️⃣ No result yet
  if (!result) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-2">Tax Summary</h3>
       <p className="text-sm text-gray-500">
  Enter your quarterly income and deductions, then click
  <span className="font-medium"> Calculate Estimated Tax</span>.
</p>

      </div>
    );
  }

  // 3️⃣ Safe destructuring (ONLY after result exists)
  const {
    taxable_income = 0,
    base_tax = 0,
    cess = 0,
    estimated_tax = 0
  } = result;

  // 4️⃣ Render summary
  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="font-semibold mb-4">Tax Summary</h3>

      <div className="space-y-2 text-sm">
        <p>Taxable Income: {formatCurrency(taxable_income)}</p>
        <p>Base Tax: {formatCurrency(base_tax)}</p>
        <p>Cess: {formatCurrency(cess)}</p>
        <p className="font-bold mt-2">
          Estimated Tax: {formatCurrency(estimated_tax)}
        </p>
        {estimated_tax === 0 && (
  <p className="text-sm text-gray-500 mt-2">
    No tax payable as income falls under the basic exemption limit.
  </p>
)}

      </div>
    </div>
  );
};

export default TaxSummary;
