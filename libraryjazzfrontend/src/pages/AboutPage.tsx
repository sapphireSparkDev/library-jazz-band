import LBJ from "../assets/LBJ.jpg";
import LBJWally from "../assets/LBJWally.jpg";

const AboutPage = () => {
  return (
    <div>
      <div>
        <div>
          <img src={LBJ} alt="All members of the Library Jazz Band" />
        </div>
        <div className="flex flex-row">
          <div>
            <span>About Library Jazz Band</span>
            <p>
              LJB was created in 2021 when Nancy Maron and Sarah Cion noticed
              that in the aftermath of COVID, several long-time local big bands
              had ceased playing, and decided to fill that gap. We are a
              17-person music collective jazz orchestra including 5 saxophones,
              4 trombones, 4 trumpets, piano, bass, drums plus conductor. Our
              collective includes a core of outstanding regulars, musicians are
              from Yonkers, Bronx & Westchester, professionals and experienced
              amateurs who share a love of the big band format. This is not your
              grandparents’ big band! We honor and re-discover some of the great
              arrangements of the brightest lights of American music - Duke
              Ellington, Count Basie, Thad Jones, Oliver Nelson - but we also
              actively seek out new works of all genres and write and arrange
              our own music.{" "}
            </p>
          </div>
          <img
            className="w-3/6"
            src={LBJWally}
            alt="Two library jazz band trombone players"
          />
        </div>
        <div className="flex flex-col">
            <span>What Guides Us</span>
            <label>Giving musicians a place to keep growing as artists. </label>
            <p>
              Our members don’t just play, they contribute their own
              arrangements and compositions and we help local composers rehearse
              new works.{" "}
            </p>
            <label>
              Making America’s own music enjoyable and accessible to a wide
              audience.
            </label>
            <p>
              In addition to classic big band arrangements by the greats, we
              also program some unexpected “jazz” adaptations such as tunes by
              Rolling Stones and Stevie Wonder. Our summer 2024 show, BIG BAND:
              Small Screen featured jazz renditions of music from cartoons and
              television.{" "}
            </p>
            <label>Honoring the richness of jazz music and its history.</label>
            <p>
              Jazz is America’s very own music. Participating in keeping it
              alive and growing is a wonderful way to remind all of us just how
              important it is to keep instrumental music in our schools.
              Learning music is not easy, but is a lifelong practice and a gift
              that should be accessible to everyone. This music provides an
              accessible point of entry for listeners of all ages and
              backgrounds.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
