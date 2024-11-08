import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import AboutPage from "./pages/AboutPage";
import Donate from "./pages/Donate";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
            <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
