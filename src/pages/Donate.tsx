import "../styles/background.css";
import trumpet from "../lib/assets/trumpet.webp";
import LJBSarah from "../lib/assets/LJB_SarahJaneCion.webp";
import trumpetGuys from "../lib/assets/trumpetguys.webp";
import { Link } from "react-router-dom";

const Donate = () => {
  return (
    <div className="flex flex-col items-center w-screen background">
      <div className="w-screen h-1/5 flex flex-col justify-center items-center">
        <h1 className="text-amber-500 mb-10 font-bebasNeue tracking-wide text-4xl">
          Support the LJB!
        </h1>
        <div className="flex flex-row xl:space-x-10 md:space-x-0 mb-10">
          <img
            src={trumpet}
            className=" w-50 h-64 rounded-lg shadow-lg hidden xl:block md:mb-10 lg:mb-0"
          ></img>
          <img
            src={LJBSarah}
            className=" w-25 h-32 rounded-lg shadow-lg lg:w-50 lg:h-64"
          ></img>
          <img
            src={trumpetGuys}
            className=" w-50 h-64 hidden rounded-lg shadow-lg xl:block"
          ></img>
        </div>
      </div>

      <div className="flex flex-col justify-items-center w-3/6 items-center">
        <p className="text-center text-lg mb-4 font-roboto lg:w-fit w-screen">
          Our library shows are free, thanks to the generous support of
          ArtsWestchester and the Yonkers Public Library, but running the band
          is not! Your support will help us add more shows, invite guest
          artists, and record our music.
        </p>
        <Link
          to="https://artswestchester.org/grants/artswchallenge/"
          className=" mb-10"
        >
        </Link>
        <div className="flex flex-col items-center text-lg ">
            <h2 className=" font-roboto">To donate:</h2>
              <ol className="list-disc list-inside lg:indent-20 md:indent-14">
                <li>
                  Check (payable to Nancy Maron; send with form to 69 Oakland
                  Avenue Yonkers, NY 10710)
                </li>
                <li>Zelle (maronnancy@gmail.com)</li>
              </ol>
          <span className="mt-6 mb-6">
            [Note: LJB is in the process of becoming a not-for-profit, but does
            not have that status yet. Your donation this year is deeply
            appreciated, but not tax deductible. ]
          </span>
        </div>
      </div>
    </div>
  );
};
export default Donate;
