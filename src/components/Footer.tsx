import { FormEvent } from "react";
import { Link } from "react-router-dom";

const NEWSLETTER_URL = "https://lp.constantcontactpages.com/sl/Fx2eGn6";

const Footer = () => {
  // Sends people to the Constant Contact signup page. Swap this for Constant
  // Contact's inline form embed to sign people up without leaving the site.
  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(NEWSLETTER_URL, "_blank", "noopener");
  };

  return (
    <footer className="bg-ljb-night font-roboto text-sm font-light text-ljb-cream/70">
      <div className="ljb-hairline mx-4 md:mx-6" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div id="show-alerts" className="flex flex-col gap-3">
          <span className="ljb-cap">Show alerts</span>
          <p>One email before each show.</p>
          <form className="flex gap-2" onSubmit={handleSignup}>
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="email"
              className="ljb-input max-w-xs"
            />
            <button type="submit" className="ljb-pill-gold">
              Join
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-2">
          <span className="ljb-cap">Visit</span>
          <Link to="/events" className="hover:text-ljb-gold-light">
            Events
          </Link>
          <Link to="/our-mission" className="hover:text-ljb-gold-light">
            Mission
          </Link>
          <Link to="/our-musicians" className="hover:text-ljb-gold-light">
            Musicians
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <span className="ljb-cap">Follow</span>
          <a
            href="https://www.facebook.com/libraryjazzband"
            className="hover:text-ljb-gold-light"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/thelibraryjazzband"
            className="hover:text-ljb-gold-light"
          >
            Instagram
          </a>
          <span className="mt-2 text-xs text-ljb-cream/45">
            © {new Date().getFullYear()} Library Jazz Band, Inc. · 501(c)(3)
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
