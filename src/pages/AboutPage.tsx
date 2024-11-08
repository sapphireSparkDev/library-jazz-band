import bigBand from "../lib/assets/LBJ.jpg";
import "../styles/About.css";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-screen h-1/5 flex flex-col justify-center items-center">
        <h1
          className="text-amber-500 mb-10"
          style={{ fontFamily: "Diplomatica SC" }}
        >
          About Library Jazz Band
        </h1>
        <img
          src={bigBand}
          alt="Library Jazz Band"
          className="w-3/5 h-1/2 rounded-md shadow-lg"
        />
      </div>
      <div className="w-3/6 mt-6 justify-items-center">
        <h2 className="font-bold text-xl mb-2 text-center">
          LJB: A Jazz Orchestra for the Community
        </h2>
        <p
          className="text-center text-lg mb-20"
          style={{ fontFamily: "Diplomatica SC" }}
        >
          Founded in 2021 by Nancy Maron and Sarah Cion, LJB was created in
          response to the decline of local big bands following the COVID-19
          pandemic. Recognizing a gap in the musical landscape, they set out to
          revive the big band tradition in their community. LJB is a dynamic
          17-piece jazz orchestra, featuring five saxophones, four trombones,
          four trumpets, piano, bass, drums, and a conductor. Our collective
          brings together a talented group of musicians from Yonkers, the Bronx,
          and Westchester, including both seasoned professionals and passionate,
          experienced amateurs. What unites us is a shared love for the big band
          format and a commitment to bringing vibrant, live jazz music to the
          community.
        </p>
      </div>
      <div
        className="flex flex-row text-md space-x-16 font-bold"
        style={{ fontFamily: "Diplomatica SC" }}
      >
        <span className="inline-block">
          Giving musicians a place to keep growing as artists
        </span>
        <span className="inline-block">
          Making America’s own music enjoyable and accessible to a wide audience
        </span>
        <span className="inline-block">
          Honoring the richness of jazz music and its history
        </span>
      </div>

      <div className="flex flex-row text-center space-x-16 text-md p-5"  style={{ fontFamily: "Diplomatica SC" }} >
      <p className="inline-block w-3/5">
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
