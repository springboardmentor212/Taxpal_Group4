import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import ReportPreview from "./ReportPreview.jsx";
function App() {
  const [transactions, setTransactions] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard transactions={transactions} setTransactions={setTransactions}/>}/>
        <Route path="/report-preview/:month" element={<ReportPreview transactions={transactions} />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;