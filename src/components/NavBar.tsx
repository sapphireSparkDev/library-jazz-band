import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="z-50">
      <nav className="bg-neutral-900 backdrop-filter backdrop-blur-lg bg-opacity-30 w-full z-50">
        <div className="flex flex-row items-center justify-end space-x-6 p-6 text-2xl font-sree z-50">
          <Link className={buttonVariants({ variant: "link" })} to="/">
            Home
          </Link>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              className={buttonVariants({ variant: "link" })}
              onClick={() => setIsAboutOpen(!isAboutOpen)}
            >
              About
            </button>
            {isAboutOpen && (
              <div className="absolute left-0 top-full w-48 bg-neutral-900 rounded-none shadow-lg z-100">
                <Link
                  to="/our-mission"
                  className="block px-4 py-2 text-amber-500 hover:text-amber-400 transition-colors font-sree text-xl"
                  onClick={() => setIsAboutOpen(false)}
                >
                  Our Mission
                </Link>
                <Link
                  to="/our-musicians"
                  className="block px-4 py-2 text-amber-500 hover:text-amber-400 transition-colors font-sree text-xl"
                  onClick={() => setIsAboutOpen(false)}
                >
                  Our Musicians
                </Link>
              </div>
            )}
          </div>

          <Link className={buttonVariants({ variant: "link" })} to="/events">
            Events
          </Link>
          {/*
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
