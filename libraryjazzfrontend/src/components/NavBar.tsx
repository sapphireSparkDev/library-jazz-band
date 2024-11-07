import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

import LJB_Logo from "../assets/LJB_Logo.png";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div>
      <nav className="bg-neutral-900 backdrop-filter backdrop-blur-lg bg-opacity-30 ">
        <div className="flex items-center space-x-16 w-screen px-4 h-1/6 justify-end">
          <div className="flex flex-col items-center justify-start ">
            <Link to="/">
              <img className="size-1/6 mt-4" src={LJB_Logo} alt="Library Jazz Band Logo" />
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link
              className="btn btn-text-stretch btn-text-stretch--orange"
              to="/about"
            >
              About
            </Link>
            <Link
              className="btn btn-text-stretch btn-text-stretch--orange"
              to="/music"
            >
              Our Music
            </Link>
            <Link
              className="btn btn-text-stretch btn-text-stretch--orange"
              to="/events"
            >
              Events
            </Link>
            <Link
              className="btn btn-text-stretch btn-text-stretch--orange"
              to="/contact"
            >
              Contact Us
            </Link>
            <Link
              className={buttonVariants({ variant: "default" })}
              to="/donate"
            >Donate</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
