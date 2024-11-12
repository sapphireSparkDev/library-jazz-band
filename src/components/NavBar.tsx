import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <div>
      <nav className="bg-neutral-900 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <div className="flex flex-row items-center justify-end space-x-6 p-6 text-2xl font-sree">
          <Link className={buttonVariants({ variant: "link" })} to="/">
            Home
          </Link>

          <Link className={buttonVariants({ variant: "link" })} to="/about">
            About
          </Link>
          {/* 
            <Link
              className={buttonVariants({ variant: "link" })}
              to="/events"
            >
              Events
            </Link>
            <Link
              className={buttonVariants({ variant: "link" })}
              to="/contact"
            >
              Contact Us
            </Link> */}
          <Link className={buttonVariants({ variant: "default" })} to="/donate">
            Donate
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
