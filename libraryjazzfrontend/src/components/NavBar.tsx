import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <div>
      <nav className="bg-neutral-700">
        <div className="flex items-center space-x-16 w-screen mx-auto px-4">
          <div className="flex flex-col items-center justify-between h-12">
            <span className="text-amber-400">Library</span>
            <span className="text-amber-400">Jazz Band</span>
          </div>
          <div className="flex space-x-6">
            <Button variant="outline">About Us</Button>
            <Button variant="outline">Our Music</Button>
            <Button variant="outline">Events</Button>
            <Button variant="outline">Contact</Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
