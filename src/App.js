import "./App.css"
import { Route, Routes } from "react-router-dom";
import LegendLibrary from "./components/legendLibrary/LegendLibrary";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/LegendLibrary" element={<LegendLibrary />} />
      </Routes>
    </div>
  );
}

export default App;
