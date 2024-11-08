import trumpet from "../lib/assets/trumpet.jpg";
import LJBSarah from "../lib/assets/LJB_SarahJaneCion.png";
import trumpetGuys from "../lib/assets/trumpetguys.jpg";
import form from "../lib/assets/Donar-Form.pdf";
import { buttonVariants } from "@/components/ui/button";

const Donate = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1
        className="text-amber-500 mb-10"
        style={{ fontFamily: "Diplomatica SC" }}
      >
        Support the LJB!
      </h1>
      <div className="flex flex-row justify-center items-center space-x-10 mb-10">
        <img src={trumpet} className=" w-50 h-64 rounded-lg shadow-lg"></img>
        <img src={LJBSarah} className=" w-50 h-64 rounded-lg shadow-lg"></img>
        <img
          src={trumpetGuys}
          className=" w-50 h-64 rounded-lg shadow-lg"
        ></img>
      </div>
      <div className="flex flex-col justify-items-center w-3/6 items-center">
        <p
          className="text-center text-lg mb-16"
          style={{ fontFamily: "Diplomatica SC" }}
        >
          ArtsWestchester will <b>MATCH</b> your donation from now until
          December 10! Our library shows are free… but running the band is not!
          We offer three original programs a year, rehearse year-round, and pay
          our musicians a (very) modest honorarium. This is in many ways a labor
          of love. So far, generous funding from ArtsWestchester has helped us
          program our seasons in advance. The Yonkers Public Library has been an
          outstanding partner, permitting us to rehearse there twice a month,
          and helping to promote our shows. We want to keep growing! To add more
          performances, invite guest artists, license new music, widely promote
          our concert schedule, consider recording our music! To do this, we
          need to find additional sources of support. If you would like to
          support our work, please consider a donation. If the donation is
          received by December 10th ArtsWestchester has agreed to match it!
        </p>
        <div className="flex flex-col items-center text-lg"  style={{ fontFamily: "Diplomatica SC" }}>
          <h2>There are <b>two</b> steps:</h2>
          <ol className="list-decimal">
            <li>
              Complete this form (or print out and mail this form to [address])
            </li>
            <li>
              We accept donations via
              <ol className="list-disc list-inside indent-6">
                <li>Check</li>
                <li>Zelle</li>
              </ol>
            </li>
          </ol> 
        </div>
      </div>

      <div className="mb-10">
        <a
          href={form}
          className={buttonVariants({ variant: "default" })}
          download
        >
          <i className="fa fa-download"></i>Download Form
        </a>
      </div>
    </div>
  );
};
export default Donate;
