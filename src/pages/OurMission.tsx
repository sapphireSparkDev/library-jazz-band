import rob from "../lib/assets/LJB_saxSection.webp";
import karl from "../lib/assets/LJBKarl.webp";
import kim from "../lib/assets/LJBKim.webp";
import "../styles/background.css";

const OurMission = () => {
  return (
    <div className="flex flex-col items-center w-screen background">
      <div className="w-screen h-1/5 flex flex-col justify-center items-center">
        <h1 className="text-amber-500 mb-10 font-bebasNeue text-center tracking-wide text-4xl">
          Our Mission
        </h1>
        <div className="flex flex-row xl:space-x-10 md:space-x-0  mb-10">
          <img
            src={rob}
            className=" w-50 h-64 rounded-lg shadow-lg hidden xl:block"
          ></img>
          <img
            src={kim}
            className=" w-25 h-32 rounded-lg shadow-lg lg:w-50 lg:h-64"
          ></img>
          <img
            src={karl}
            className=" w-50 h-64 rounded-lg shadow-lg hidden xl:block"
          ></img>
        </div>
      </div>
      <div className="w-3/6 justify-items-center">
        <h2 className="font-bold text-xl mb-6 text-center">
          LJB: A Jazz Orchestra for the Community
        </h2>
        <p className="text-center text-lg mb-14 font-roboto lg:w-fit w-fit">
          LJB was created in 2021 to address a gap in the musical landscape by
          reviving the big band tradition in their community. We are a dynamic
          17-piece jazz orchestra, featuring five saxophones, four trombones,
          four trumpets, piano, bass, drums, plus conductor. Our collective of
          seasoned professionals and passionate, experienced amateurs is united
          by a shared love for the big band format and our commitment to
          bringing vibrant, live jazz music to the community.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 auto-rows-auto gap-x-6 justify-items-center text-center pl-5 pr-5">
        <div className="flex flex-col">
          <span className="font-roboto mb-10">
            Giving musicians a place to keep growing as artists
          </span>
          <p className="font-robotoThi mb-10">
            Our members don't just play, they contribute their own arrangements
            and compositions and we help local composers rehearse new works.{" "}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-roboto mb-4">
            Making America's own music enjoyable and accessible to a wide
            audience
          </span>
          <p className="font-robotoThin mb-10 ">
            In addition to classic big band arrangements by the greats, we also
            program some unexpected "jazz" adaptations such as tunes by Rolling
            Stones and Stevie Wonder. Our summer 2024 show, BIG BAND: Small
            Screen featured jazz renditions of music from cartoons and
            television.{" "}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-roboto mb-10 ">
            Honoring the richness of jazz music and its history
          </span>

          <p className="font-robotoThin mb-10 ">
            Jazz is America's very own music. Participating in keeping it alive
            and growing is a wonderful way to remind all of us just how
            important it is to keep instrumental music in our schools. Learning
            music is not easy, but is a lifelong practice and a gift that should
            be accessible to everyone. This music provides an accessible point
            of entry for listeners of all ages and backgrounds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
