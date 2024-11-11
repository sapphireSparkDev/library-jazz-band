import { Link } from "react-router-dom";
import AboutPage from "./AboutPage";

import "../styles/Landing.css";
import image from "../lib/assets/LBJ.jpg";

const Landing = () => {
  return (
    <div style={{ display: 'grid'}}>
      <div className="image-container">
        <img src={image} alt="Image" className="image" />
          <div className="text">
            <h1 className="mb-80"> The Library Jazz Band</h1>
            <Link to="#about" className="text-amber-400 hover:text-yellow-500 shadow-sm mt-10 font-serif flex flex-col items-center">
              <div className="mt-4">
                <span className="btn btn-text-stretch btn-text-stretch--orange">Learn More</span>
              </div>  
          </Link>
        </div>
      </div>
      <div id="about">
        <AboutPage/>
      </div>
    </div>
  );
};

export default Landing;
