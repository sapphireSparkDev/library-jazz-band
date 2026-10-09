import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/events", label: "Events" },
  { to: "/our-mission", label: "Mission" },
  { to: "/our-musicians", label: "Musicians" },
];

// Desktop: the current page gets a thin gold underline
const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `border-b pb-0.5 transition-colors hover:text-ljb-gold-light ${
    isActive
      ? "border-ljb-gold text-ljb-gold"
      : "border-transparent text-ljb-cream"
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-ljb-gold-light ${
    isActive ? "text-ljb-gold" : "text-ljb-cream"
  }`;

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const onDonate = pathname === "/donate";

  // Close the mobile menu after navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="relative w-full bg-ljb-night/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 font-sree text-lg md:px-6">
        <Link
          to="/"
          className="mr-auto font-aboreto text-sm tracking-[0.15em] text-ljb-gold hover:text-ljb-gold-light md:text-base"
        >
          <span className="hidden sm:inline">Library Jazz Band</span>
          <span className="sm:hidden">LJB</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={desktopLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* On the donate page itself the button switches to the outline style */}
        <Link
          to="/donate"
          aria-current={onDonate ? "page" : undefined}
          className={`${onDonate ? "ljb-pill-ghost" : "ljb-pill-gold"} px-4 py-1.5 md:px-5`}
        >
          Donate
        </Link>

        <button
          type="button"
          className="-mr-2 bg-transparent p-2 text-ljb-gold hover:border-transparent md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu opens as a floating card */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="ljb-card absolute inset-x-3 top-full z-40 mt-2 flex flex-col gap-4 p-6 font-sree text-xl md:hidden"
        >
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={mobileLinkClass}>
              {link.label}
            </NavLink>
          ))}
          <div className="ljb-hairline" />
          <Link to="/donate" className="ljb-pill-gold">
            Donate
          </Link>
        </div>
      )}
      <div className="ljb-hairline" />
    </nav>
  );
};

export default NavBar;
