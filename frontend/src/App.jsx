import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaxEstimator from "./pages/TaxEstimator";
import TaxCalendar from "./components/TaxCalendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaxEstimator />} />
        <Route path="/calendar" element={<TaxCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
