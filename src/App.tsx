import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import Donate from "./pages/Donate";
import AboutPage from "./pages/AboutPage";
import Events from "./pages/Events";
import Footer from "./components/Footer";
import HittingTheLowNotes from "./pages/playbills/HittingTheLowNotes";

function App() {
  return (
    <>
      <div className="w-screen">
        <BrowserRouter>
          <div className="sticky top-0 z-10">
            <NavBar />
          </div>
          <Routes>
            <Route path="/" element={<Landing/> } />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/events/lowNotes" element={<HittingTheLowNotes />} />
            <Route path="*" element={<Landing />} />
          </Routes>
          <div className="static">
          <Footer />
          </div>
        </BrowserRouter>
       
      </div>
    </>
  );
}

export default App;
