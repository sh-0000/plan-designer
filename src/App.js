import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LegendLibrary from "./components/legendLibrary/LegendLibrary";
import Dashboard from "./components/dashboard/Dashboard";
import Editor from "./components/editor/Editor";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/LegendLibrary" element={<LegendLibrary />} />
        <Route path="/editor/:projectID" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
