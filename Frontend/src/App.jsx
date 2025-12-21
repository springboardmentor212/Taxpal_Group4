import { Toaster } from "react-hot-toast";
import Budgets from "./pages/Budgets";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Budgets />
    </>
  );
}

export default App;

