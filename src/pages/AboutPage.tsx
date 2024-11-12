import rob from "../lib/assets/LJB_saxSection.webp";
import karl from "../lib/assets/LJBKarl.webp";
import kim from "../lib/assets/LJBKim.webp";
import "../styles/About.css";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-screen h-1/5 flex flex-col justify-center items-center">
        <h1 className="text-amber-500 mb-10 font-bebasNeue text-3xl">
          About Library Jazz Band
        </h1>
        <div className="flex flex-row space-x-10 mb-10">
          <img src={rob} className=" w-50 h-64 rounded-lg shadow-lg"></img>
          <img src={kim} className=" w-50 h-64 rounded-lg shadow-lg"></img>
          <img src={karl} className=" w-50 h-64 rounded-lg shadow-lg"></img>
        </div>
      </div>
      <div className="w-3/6 justify-items-center">
        <h2 className="font-bold text-xl mb-6 text-center">
          LJB: A Jazz Orchestra for the Community
        </h2>
        <p className="text-center text-lg mb-10 font-roboto">
          LJB was created in 2021 to address a gap in the musical landscape by
          reviving the big band tradition in their community. We are a dynamic
          17-piece jazz orchestra, featuring five saxophones, four trombones,
          four trumpets, piano, bass, drums, plus conductor. Our collective of
          seasoned professionals and passionate, experienced amateurs is united
          by a shared love for the big band format and our commitment to
          bringing vibrant, live jazz music to the community.
        </p>

        <span className="font-roboto text-xl">What Guides Us:</span>
      </div>

      <div className="grid grid-rows-2 grid-cols-3 h-20 mt-14 auto-cols-max justify-items-center gap-6 text-center font-roboto">
        <span className="inline-block self-center font-bold ">
          Giving musicians a place to keep growing as artists
        </span>
        <span className="inline-block self-center font-bold">
          Making America’s own music enjoyable and accessible to a wide audience
        </span>
        <span className="inline-block self-center  font-bold">
          Honoring the richness of jazz music and its history
        </span>
        <p className="inline-block w-3/5 self-start">
          Our members don’t just play, they contribute their own arrangements
          and compositions and we help local composers rehearse new works.{" "}
        </p>
        <p className="inline-block  w-3/5">
          In addition to classic big band arrangements by the greats, we also
          program some unexpected “jazz” adaptations such as tunes by Rolling
          Stones and Stevie Wonder. Our summer 2024 show, BIG BAND: Small Screen
          featured jazz renditions of music from cartoons and television.{" "}
        </p>
        <p className="inline-block  w-3/5">
          Jazz is America’s very own music. Participating in keeping it alive
          and growing is a wonderful way to remind all of us just how important
          it is to keep instrumental music in our schools. Learning music is not
          easy, but is a lifelong practice and a gift that should be accessible
          to everyone. This music provides an accessible point of entry for
          listeners of all ages and backgrounds.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
