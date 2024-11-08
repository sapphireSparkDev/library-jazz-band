import { buttonVariants } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

import "../styles/NavBar.css";

const NavBar = () => {
  const location = useLocation();

  if(location.pathname === "/") {
    return null
  } 

  return (
    <div>
      <nav className="bg-neutral-900">
        <div className="flex items-center space-x-16 w-screen px-4 h-1/6 justify-end">
          <div className="flex flex-col items-center justify-start "></div>
          <div className="flex flex-row space-x-6 mt-4">
              {/**
            <Link
              className="btn btn-text-stretch btn-text-stretch--orange"
              to="/about"
            >
              About
            </Link>
          
             * <Link
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
             */
}
            <Link
              className={buttonVariants({ variant: "default" })}
              to="/donate"
            >
              Donate
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
