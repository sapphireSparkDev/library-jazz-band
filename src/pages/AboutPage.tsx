import bigBand from "../lib/assets/LBJ.jpg";
import "../styles/About.css";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-screen h-1/5 flex flex-col justify-center items-center">
        <h1 className="text-amber-500 mb-10" style={{fontFamily: "Diplomatica SC"}}>About Library Jazz Band</h1>
        <img src={bigBand} alt="Library Jazz Band" className="w-3/5 h-1/2 rounded-md shadow-lg" />
      </div>
      
    </div>        
  );
};

export default AboutPage;
