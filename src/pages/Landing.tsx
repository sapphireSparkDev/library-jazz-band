import { Link } from "react-router-dom";

import "../styles/Landing.css";
import image from "../lib/assets/LBJ.webp";
import danAsher from "../lib/assets/LJB_DanAsher.webp";

const Landing = () => {
  return (
    <div className="grid">
      <div className="inline-block bg-neutral-900 h-screen relative pr-6 pl-6 pb-8">
        <picture>
          <source srcSet={danAsher} media="(max-width: 600px)" />
          <img
            src={image}
            alt="The entire library jazz band"
            className="w-screen h-3/4 block rounded-md shadow-lg shadow-black"
          />
        </picture>

        <div className="text">
          <h1 className=" font-aboreto text-5xl mb-28">
            {" "}
            The Library Jazz Band
          </h1>
          <Link
            to="/about"
            className="text-amber-400 hover:text-yellow-500 shadow-sm mb-14 font-serif flex flex-col items-center"
          >
            <div className="md:mt-56 lg:mt-96">
              <span className="btn btn-text-stretch btn-text-stretch--orange">
                Learn More
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
