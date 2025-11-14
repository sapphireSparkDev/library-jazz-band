import "../styles/background.css";
import trumpet from "../lib/assets/trumpet.webp";
import LJBSarah from "../lib/assets/LJB_SarahJaneCion.webp";
import trumpetGuys from "../lib/assets/trumpetguys.webp";
import artsW from "../lib/assets/artsWestchesterLogo.png";
import challengeGrantLogo from "../lib/assets/2025-ChallengeGrant LOGO.png";
import zelleQR from "../lib/assets/Zelle_forwebsite.jpeg";
import donationForm from "../lib/assets/2025-ChallengeForm.pdf";

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
        <img src={artsW} className="size-1/3" />
        <img src={challengeGrantLogo} className="size-1/3 mb-4" />
        <div className="text-center mb-10">
          <a
            href={donationForm}
            download
            className="inline-block bg-amber-500 text-white px-6 py-3 rounded-lg font-bold text-lg mb-4 hover:bg-amber-600 transition-colors"
          >
            Download Donation Form
          </a>
          <p className="font-bold text-xl mb-2">Deadline: December 15th</p>
          <p className="text-lg">
            We welcome your donation any time! But if you choose to donate
            before 15 December, and submit the form below, ArtsWestchester will
            match the donations of first-time donors! If you have already
            donated, ArtsWestchester will match any amount you donated that is
            higher than your past donation.
          </p>
        </div>
        <div className="flex flex-col items-center text-lg ">
          <h2 className=" font-roboto">To donate:</h2>
          <ol className="list-disc list-inside lg:indent-14 md:indent-8">
            <li>
              Come to one of our shows where you can donate and complete the
              form.
            </li>
            <li>
              Complete the form and send with your check to <br />
              <p style={{ marginLeft: "25px" }}>
                LIBRARY JAZZ BAND, INC. 69 Oakland Avenue Yonkers, NY 10710
              </p>
            </li>
            <li>
              ZELLE to Nancy Maron using this QR code or <br />
              <p style={{ marginLeft: "25px" }}>
                email form to maronnancy@gmail.com
              </p>
            </li>
          </ol>
          <img
            src={zelleQR}
            className="w-48 h-48 mt-4 mb-4"
            alt="Zelle QR Code"
          />
          <span className="mt-6 mb-6">
            As of August 2025, LIBRARY JAZZ BAND INC is recognized as a not for
            profit organization. Your donations are tax deducitble to the extent
            allowed by law
          </span>
        </div>
      </div>
    </div>
  );
};
export default Donate;
