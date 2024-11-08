import { buttonVariants } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

import "../styles/NavBar.css";

const NavBar = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <div>
      <nav className="bg-neutral-900">
          <div className="flex flex-row items-center justify-end space-x-10 p-10 text-2xl" style={{ fontFamily: "Diplomatica SC" }}>
            <Link
              className={buttonVariants({ variant: "link" })}
              to="/"
            >
              Home
            </Link>
            {/**
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
             */}
            <Link
              className={buttonVariants({ variant: "default" })}
              to="/donate"
            >
              Donate
            </Link>
          </div>
      </nav>
    </div>
  );
};

export default NavBar;
