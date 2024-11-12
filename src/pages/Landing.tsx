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
          <h1 className="mb-96 font-aboreto text-5xl"> The Library Jazz Band</h1>
          <Link to="#about" className="text-amber-400 hover:text-yellow-500 shadow-sm mb-14 font-serif flex flex-col items-center">
            <div className="mt-10">
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
