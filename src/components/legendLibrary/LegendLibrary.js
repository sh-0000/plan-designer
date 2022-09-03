import "./LegendLibrary.css"
import Navbar from "../Navbar";
import { Sidebar } from "./Sidebar";

const LegendLibrary = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ marginLeft: "15%", justifyContent: "center"}}>
        <h1>Legend Library</h1>
      </div>
    </>
  );
};

export default LegendLibrary;
