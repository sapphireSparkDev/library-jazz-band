import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>    
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />}>
              <Route path="/about" element={<AboutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <div className="sticky top-0">
        </div>
      </div>
    </>
  );
}

export default App;
