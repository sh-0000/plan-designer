import "./App.css";
import { Route, Routes } from "react-router-dom";
import LegendLibrary from "./components/legendLibrary/LegendLibrary";
import Dashboard from "./components/dashboard/Dashboard";
import Editor from "./components/editor/Editor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/LegendLibrary" element={<LegendLibrary />} />
        <Route path="/editor/:projectID" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
