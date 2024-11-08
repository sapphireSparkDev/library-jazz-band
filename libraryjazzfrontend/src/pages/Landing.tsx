import "../styles/Landing.css";
import image from "../lib/assets/bigBand.jpg";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="image-container">
      <img src={image} alt="Image" className="image" />
      <div className="text">
        <h1>Library Jazz Band</h1>
        <Button size="lg">Learn More</Button>
      </div>
    </div>
  );
};

export default Landing;
