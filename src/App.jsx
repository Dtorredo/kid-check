import "./App.css";
import Homepage from "./Homepage";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GoingOutPage from "./GoingOut.jsx";
import ItemarkPage from "./Itemark.jsx";


function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {" "}
        {/* Add this container */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/main" element={<GoingOutPage />} />
          <Route path="/itemark" element={<ItemarkPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
