import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center h-1/5 font-roboto text-amber-400">
      <h1 className="mb-4 mt-4">2024 Library Jazz Band</h1>
      <Link className="mb-4" to="https://www.facebook.com/libraryjazzband">
        We have a newsletter! Sign Up Here.
      </Link>
      <div className="flex flex-row space-x-4">
        <Button variant="outline" size="icon">
          <Link to="">
            <FaFacebookSquare />
          </Link>
        </Button>
        <Button variant="outline" size="icon">
          <Link to="https://www.instagram.com/thelibraryjazzband">
            <FaInstagram />
          </Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
