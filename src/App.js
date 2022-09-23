import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, Library, Editor } from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LegendLibrary" element={<Library />} />
        <Route path="/editor/:projectID" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
