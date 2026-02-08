import './FinancialDashboard.css';
import IncomeForm from './IncomeForm';
import ExpensesForm from './ExpensesForm';
import TransactionsModal from './TransactionsModal';
import FinancialBarChart from './FinancialBarChart';
import ExpensePieChart from "./FinancialPieChart";
import {useState,useEffect} from 'react';
function FinancialDashboard(){
    const [view, setView] = useState("monthly");
    const [showIncomeForm, setShowIncomeForm] = useState(false);
    const [showExpenseForm, setShowExpenseForm]=useState(false);
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
       return saved ? JSON.parse(saved) : [];
    });
    const estimatedTax = (() => {
      const taxData = JSON.parse(localStorage.getItem("currentTax"));
      return taxData?.tax || 0;
    })();
    useEffect(() => {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);
    const addTransaction = (newEntry) => {
        setTransactions([...transactions, { ...newEntry, id: transactions.length + 1 }]);
    };
    const getChartData = () => {
    const grouped = {};
    transactions.forEach((t) => {
      const date = new Date(t.date);
      let key = "";
      if (view === "yearly") {
        key = date.getFullYear();
      } 
      else if (view === "monthly") {
        key = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
      } 
      else {
        const q = Math.floor(date.getMonth() / 3) + 1;
        key = `Q${q}-${date.getFullYear()}`;
      }
      if (!grouped[key]) {
        grouped[key] = { label: key, income: 0, expense: 0 };
      }
      if (t.type === "Income") {
        grouped[key].income += Number(t.amount);
      } else if (t.type === "Expense") {
        grouped[key].expense += Number(t.amount);
      }
    });
      return Object.values(grouped);
    };
    const getMonthlyTotals = () => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      let income = 0;
      let expense = 0;
      transactions.forEach(t => {
        const date = new Date(t.date);
        if (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        ) {
          if (t.type === "Income") {
            income += Number(t.amount);
          } 
          else if (t.type === "Expense") {
            expense += Number(t.amount);
          }
        }
      });
      return { income, expense };
    };
    const chartData = getChartData();
    const { income: monthlyIncome, expense: monthlyExpense } = getMonthlyTotals();
    const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpense) / monthlyIncome) * 100: 0;
    return (
        <>
          <div className="dashboard-header">
            <h2>Financial Dashboard</h2>
            <p>Welcome Back to Financial Dashboard</p>
          </div>
          <div className="dashboard-class">
              <div className="dashboard-buttons">
                <button onClick={() => setShowIncomeForm(true)}><i className="fa-solid fa-circle-plus"></i> Record Income</button>
                <button onClick={() => setShowExpenseForm(true)}><i className="fa-solid fa-circle-minus" id="expenses-button"></i> Record Expenses</button>
              </div>
          </div>
          <div className="income-boxes">
            <div className="stat-card">
              <div className="monthly-income">
                <p>Monthly Income</p>
                <i className="fa-solid fa-arrow-up" id="income"></i>
              </div>
              <h2>${monthlyIncome.toFixed(2)}</h2>
              <p className="stat-sub positive">+{(monthlyIncome / 100).toFixed(2)}% from last month</p>
            </div>
            <div className="stat-card">
              <div className="monthly-income">
                <p>Monthly Expenses</p>
                <i className="fa-solid fa-arrow-down" id="expenses"></i>
              </div>
              <h2>${monthlyExpense.toFixed(2)}</h2>
              <p className="stat-sub negative">-{(monthlyExpense / 100).toFixed(2)}% from last month</p>
            </div>
            <div className="stat-card">
              <div className="monthly-income">
                <p>Estimated Tax Due</p>
                <i className="fa-solid fa-circle-exclamation" id="tax"></i>
              </div>
              <h2>${estimatedTax.toFixed(2)}</h2>
              <p className="stat-sub warning">Based on earnings</p>
            </div>
            <div className="stat-card">
              <div className="monthly-income">
                <p>Savings Rate</p>
                <i className="fa-solid fa-piggy-bank" id="savings"></i>
              </div>
              <h2>{savingsRate.toFixed(1)}%</h2>
              <p className="stat-sub neutral">On track</p>
            </div>
          </div>
          <div className="charts">
            <div className="chart-left">
              <div className="yearly-chats">
                <p>Transactions </p>
                <div className="chart-buttons">
                  <button className="chart-btn" onClick={() => setView("yearly")}>
                    Yearly
                  </button>
                  <button className="chart-btn" onClick={() => setView("monthly")}>
                    Monthly
                  </button>
                  <button className="chart-btn" onClick={() => setView("quarterly")}>
                    Quarterly
                  </button>
                </div>
              </div>
              <br></br>
              <FinancialBarChart data={chartData} />
            </div>
            <div className="chart-right">
              <p className="chart-heading">Expense Breakdown</p>
              <br></br>
              <div className="expenses">
                <ExpensePieChart transactions={transactions} />
              </div>
            </div>
          </div>
          {showIncomeForm && <IncomeForm onSave={addTransaction} closeForm={() => setShowIncomeForm(false)}></IncomeForm>}
          {showExpenseForm && <ExpensesForm onSave={addTransaction} closeForm={()=>setShowExpenseForm(false)}/>}
          <div className="recent-transactions-header">
            <p>Recent Transactions</p>
            <button onClick={() => setShowAllTransactions(true)}><b>View All</b></button>
          </div>
          <br></br>
          <div className="recent-transactions">
            <div className="header-bars">
                <p>Sno</p>
                <p>Date</p>
                <p>Description</p>
                <p>Category</p>
                <p>Amount</p>
                <p>Type</p>
            </div>
            {transactions.map((t, index) => (
                    <div className="header-bars transaction-row" key={t.id}>
                        <p>{index + 1}</p>
                        <p>{t.date}</p>
                        <p>{t.description}</p>
                        <p>{t.category}</p>
                        <p style={{ color: t.type === 'Income' ? 'green' : 'red' }}>
                            {t.type === 'Income' ? `+${t.amount}` : `-${t.amount}`}
                        </p>
                        <p>{t.type}</p>
                    </div>
            ))}
            {showAllTransactions && (
                <TransactionsModal transactions={transactions} closeForm={() => setShowAllTransactions(false)} />
            )}
          </div>
        </>
    )
}
export default FinancialDashboard;