import { Link } from "react-router-dom";

import "../styles/Landing.css";
import arrow from "../lib/assets/arrowAmber.png";
import image from "../lib/assets/bigBand.jpg";

const Landing = () => {
  return (
    <div className="image-container">
      <img src={image} alt="Image" className="image" />
      <div className="text">
        <h1 className="mb-80"> The Library Jazz Band</h1>
        <Link
          to="/about"
          className="text-amber-400 hover:text-yellow-500 shadow-sm mt-10 font-serif flex flex-col items-center"
        >
          <span>Learn More</span>
          <img src={arrow} alt="arrow down" className="size-10 animate-bounce" />
        </Link>
      </div>
    </div>
  );
};

export default Landing;
