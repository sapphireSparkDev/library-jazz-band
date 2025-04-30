import anger from "../../lib/assets/Anger.png";
import avaric from "../../lib/assets/Avaric.png";
import envy from "../../lib/assets/Envy.png";
import gluttony from "../../lib/assets/Gluttony.png";
import lust from "../../lib/assets/lust.png";
import pride from "../../lib/assets/Pride.png";
import sloth from "../../lib/assets/Sloth.png";
import JoDa from "../../lib/assets/JoDa.png";
import hadro from "../../lib/assets/Hadro_bass sax.jpg";
import garrison from "../../lib/assets/Garrison_tenor.jpeg";
import burgie from "../../lib/assets/Burgie_tpt.jpeg";
import hirsch from "../../lib/assets/Hirsch_tpt.png";
import susman from "../../lib/assets/Susman_trombone.jpeg";
import levy from "../../lib/assets/LEvy_trombone.jpg";
import aliyah from "../../lib/assets/Alliyah_horn.png";
import cion from "../../lib/assets/CION_piano.jpeg";
import reeve from "../../lib/assets/Reeve_drums.webp";
import BioCard from "@/components/BioCard";
const HittingTheLowNotes = () => {
  const blankImg = "";
  return (
    <div>
      <div className="flex flex-col">
        {/** Image Container */}
        <div className="flex flex-row grow justify-around gap-4 lg:gap-6 ">
          <img src={envy} className="size-8 md:size-16 lg:size-32" />
          <img src={avaric} className="size-8 md:size-16 lg:size-32" />
          <img src={gluttony} className="size-8 md:size-16 lg:size-32" />
          <img src={pride} className="size-8 md:size-16 lg:size-32" />
          <img src={lust} className="size-8 md:size-16 lg:size-32" />
          <img src={sloth} className="size-8 md:size-16 lg:size-32" />
          <img src={anger} className="size-8 md:size-16 lg:size-32" />
        </div>
        {/** Program Container */}
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center bg-neutral-700 m-4 h-auto md:w-2/3 ">
            <h1 className="text-amber-500 font-bebasNeue text-2xl ml-4 mt-6 lg:text-4xl ">
              Hitting the Low Notes{" "}
            </h1>
            <h2 className="text-md lg:text-lg text-amber-500 ml-4 font-bold">
              April 30, 2025 at 6pm
            </h2>
            <h1 className="text-amber-500 font-bebasNeue text-2xl ml-4 mt-6 lg:text-4xl">
              Program
            </h1>
            <div className="grid grid-cols-2  text-amber-500 gap-6 m-4 w-1/2 justify-self-center text-center">
              <span>Hip Shakin’</span>
              <span className="text-white">Frank Foster</span>
              <span>Sir Teen Town</span>
              <span className="text-white">
                Bill Reeve. Based on Sir Duke/Teen Town
              </span>
              <span>Liberty City (1981)</span>
              <span className="text-white ">
                Jaco Pastorius, for the Word of Mouth Big Band
              </span>
              <span>Tip Toe (1970)</span>
              <span className="text-white">Thad Jones</span>
              <span>Moanin’ (1959)</span>
              <span className="text-white">
                Charles Mingus, arranged by Sy Johnson for the Mingus Dynasty
                Band
              </span>
              <span className="col-span-2 font-bold text-md">Intermission</span>
              <span className=" ml-4 text-center font-bold">
                The Seven Deadly Sins (2011)
              </span>
              <span className="text-white">Joseph Daley</span>
              <ol className="list-none text-white text-sm">
                <li>i. Invidia (Envy)</li>
                <li>ii. Avarita (Avarice)</li>
                <li>iii. Gula (Gluttony)</li>
                <li>iv. Superbia (Pride)</li>
                <li>v Lechery (Lust)</li>
                <li>vi. Desida (Sloth)</li>
                <li>vii. Ira (Anger)</li>
              </ol>
            </div>
          </div>

          {/** Biography Container */}
          <div className=" bg-white m-4 md:w-1/3 ">
            <div className="flex flex-col items-center">
              <img
                src={JoDa}
                className="w-32 h-auto lg:w-72 inline mt-4"
                alt="Picture of Joseph Daley"
              />

              <h1 className="text-amber-500 font-bebasNeue text-lg lg:text-2xl">
                Joseph Daley - Composer
              </h1>
              <p className="text-md indent-2 ml-4 mr-4 font-robotoThin mb-6 text-justify">
                After over 50 years of recognition as one of the consummate
                sidemen on the adventurous music scene – with remarkable artists
                like Sam Rivers, Carla Bley, Gil Evans, Charlie Haden, Muhal
                Richard Abrams, Taj Mahal and so many more – Joseph Daley has
                emerged as one of Jazz and contemporary music’s most
                extraordinary composers and leaders. Stunning musicians, fans
                and critics alike with his brilliant 2011 CD, The Seven Deadly
                Sins, featuring his Earth Tones Ensemble (a full Jazz orchestra
                augmented by six additional low-tone horns, and including a
                seven-member rhythm section and four special guests), this
                powerfully innovative music mines the same rich vein of musical
                expression as that of immortals like Charles Mingus, Duke
                Ellington and George Russell, receiving rave reviews and making
                several Best of Year lists.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        {/** Description Container */}
        <div className="bg-neutral-700 h-auto m-4 md:w-2/3 ">
          <h1 className="text-amber-500 font-bebasNeue text-2xl ml-4 mt-6 lg:text-4xl self-center">
            Hitting the Low Notes{" "}
          </h1>
          <h1 className="text-amber-500 font-bebasNeue ml-4 text-lg ">
            A Jazz Concert Honoring Sounds at the Low End of the Sonic Spectrum
          </h1>
          <h2 className="text-amber-500 font-bebasNeue text-lg  ml-4 lg:text-2xl self-center">
            featuring composer Joseph Daley’s 7 Deadly Sins
          </h2>
          <p className="font-robotoThin text-lg text-white m-6  text-justify">
            <strong className="text-amber-500 font-bebasNeue text-xl">
              Hitting The Low Notes,
            </strong>{" "}
            celebrates instruments from the lower end of the sonic spectrum,
            some not often seen in a jazz band.
          </p>
          <p className="font-robotoThin text-lg text-white m-6  text-justify">
            {" "}
            The first half of the program includes classics old and new by Jaco
            Pastorius, Charles Mingus, Thad Jones, and Frank Foster/the Count
            Basie Orchestra. Hip Shakin’ will get the party started and the toes
            tapping, in prime Basie style. Sir Teen Town, arranged by drummer
            Bill Reeve for the Library Jazz Band, is an exciting blending of two
            classics - Stevie Wonder’s Sir Duke and Jaco’s Teen Town. You’ll
            hear some blazing bass lines in there, as well as bari and bones
            taking on some iconic melody lines. Jaco Pastorius’ joyful Liberty
            City starts to open things up, with more playful improvisational
            sections throughout. Thad Jones’ fun and quirky Tip Toe lets the
            saxophone section skip lightly through the opening theme, before the
            mighty trombone section takes center stage with an extended soli
            section. Finally, Charles Mingus’ Moanin’. The bari and bass sax
            kick this off, and from low to high the rest of the instruments
            begin layering in lines and improvisations until the full group is
            at fever pitch. If the iconic hook that starts this tune is not
            already lodged in your musical mind, it will be once you hear it.{" "}
          </p>
          <p className="font-robotoThin text-lg text-white m-6  text-justify">
            The second half of the program marks a first for LJB, welcoming
            guest conductor Joseph Daley who will lead the ensemble as they
            perform his seminal composition, The Seven Deadly Sins. This
            seven-movement piece is based on the paintings of contemporary
            painter/musician Wade Schuman (pictured above).
          </p>
          <p className="font-robotoThin text-lg text-white m-6  text-justify mr-10 ml-10">
            {" "}
            "Daley was moved to compose this music by Wade Schuman's paintings,
            also depicting The Seven Deadly Sins. Surely Daley must have been
            faced with a singular conundrum, one that had to do with the
            eternally dark nature of sin and the paintings themselves, done in a
            style somewhat reminiscent of the Northern Renaissance work of the
            great Albrecht Dürer. Daley has resolved this by scoring the music
            for a complete range of brass and woodwinds—from the high register
            of the trumpet to the deep voices of the tuba and bass and baritone
            saxophones. Such is the gravitas of the voices that Daley has
            managed to capture, in one fell swoop, the dark nature of his
            subject, as well as give voice to his individual musicians, who
            annunciate the varying nature of each of the sins."{" "}
          </p>

          <p className="font-robotoThin text-lg text-white m-6 ml-20 text-justify">
            --Raul D' Gamma Rose, AAJ April, 2011
          </p>
          <p className="font-robotoThin text-lg text-white m-6  text-justify">
            For this performance, the 17-member Library Jazz Band will be joined
            by two French horns, tuba, bass saxophone, and expanded trumpet and
            percussion sections.
          </p>
        </div>

        {/** Musicians Container */}
        <div className="h-screen m-4 bg-white justify-items-center text-left md:w-1/3">
          <div className="sticky top-0 bg-white w-full">
            <h1 className="text-amber-500 font-bebasNeue text-2xl ml-4 mt-6 lg:text-4xl">
              Musicians
            </h1>
          </div>
          <div className="ml-4 mt-4 max-h-screen h-3/4 justify-items-center overflow-scroll">
            <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
              SAXOPHONES
            </h2>
            <BioCard
              imagePath={hadro}
              name={"Andrew Hadro"}
              role={"Bass Saxophone"}
              bio={
                "Andrew’s primary instrument is Baritone Saxophone, though he also performs on Bass Clarinet, Bb Clarinet, Flute, and is one of the only working musicians in New York City to play the Bass Saxophone and Contra-bass Clarinet. He performs baritone saxophone, bass clarinet and bass saxophone on the Bianca Reimagined by Dan Pugach, which recently won the Grammy for Best Large Jazz Ensemble."
              }
              hasPhoto={true}
            />
            <BioCard
              imagePath={garrison}
              name={"Matt Garrison"}
              role={"Tenor saxophone"}
              bio={
                'With confidence, lyricism, and a tonality that is suffused in warmth, saxophonist Matt Garrison fervently pursues the art-form of jazz as reflected in his own words, "I like to think that I am a translator of sorts. A jazz musician, in my opinion, is supposed to interpret the world around them and convert those situations and feelings into music." Matt has gigged or recorded with various players of note--the late Dennis Irwin, Eliot Zigmund, Pete Malinverni, Adam Nussbaum, Gene Jackson, Sam Yahel, Jeff Hirshfield, Jon Cowherd, Andy Laverne--and was once in a band with trumpeter great, Ray Vega. His newest project is entitled “The Hudson Calls,” a tribute to various rivertowns throughout the Hudson Valley.'
              }
              hasPhoto={true}
            />
            <BioCard
              imagePath={blankImg}
              name={"Nancy Maron"}
              role={"co-Founder/Artistic Director, Alto and Soprano saxophones"}
              bio={
                "Nancy plays alto, soprano, and tenor saxophones with Lehman College and Community Band, Yonkers Philharmonic, The Westchester Band, and rock cover band the Patroons."
              }
              hasPhoto={false}
            />
            <BioCard
              imagePath={blankImg}
              name={"Travis Sullivan"}
              role={"Alto saxophone"}
              bio={
                "Zoho Music and Posi-Tone recording artist Travis Sullivan is an alto saxophonist, pianist, composer and arranger. Hailed by Jazz Times as “a gifted alto saxophonist and improviser who has also developed a strong and commanding voice as a composer,”  his 18-piece Bjorkestra performs his arrangements of the renowned music of Icelandic pop goddess Bjork."
              }
              hasPhoto={false}
            />
            <BioCard
              imagePath={blankImg}
              name={"Karl Watson"}
              role={"Baritone saxophone"}
              bio={
                "Karl is a very active and versatile musician, performing professionally on a number of instruments in a wide variety of styles. At Lehman, he plays bass clarinet in the Community Band, saxophone in the Latin Jazz Band, clarinet in the Symphony Orchestra, and violin in the Chamber Orchestra and performs throughout the tri-state area.  Karl has been on staff in the Lehman Music Department since 1998."
              }
              hasPhoto={false}
            />
            <BioCard
              imagePath={blankImg}
              name={"Chris Ferdinand"}
              role={"Tenor saxophone"}
              bio={"Coming soon"}
              hasPhoto={false}
            />
            <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
              TROMBONES
            </h2>
            <BioCard
              imagePath={susman}
              name={"Rob Susman"}
              role={"Trombone"}
              bio={
                "Rob Susman has been a member of The Chico O’Farrill Afro-Cuban Jazz Orchestra, The Duke Ellington Legacy Band, Jay and the Americans, and The Symphonic Brass Alliance (representing Carnegie Hall Citywide) and has appeared with he Allman Brothers Band, Christina Aguilera, Ashford & Simpson, Frankie Avalon, Marshall Crenshaw, Neil Diamond, Chaka Kahn and many more. Rob has composed and arranged for PBS’s ‘Reading Rainbow’ The Imani Winds, The Boston Brass and the Oberlin Conservatory of Music. He currently has five recordings featuring his original works with Top Secret Lab, Funk Shui NYC, NoNoNonet, Tri Boro Trio, and his self-titled debut."
              }
              hasPhoto={true}
            />
            <BioCard
              imagePath={levy}
              name={"Howard Levy"}
              role={"Trombone"}
              bio={
                "Howard Levy has been performing as a trombonist in the NY tri-state area for many years with some of the industry's top ensembles, including The American Jazz Orchestra at Cooper Union, the Larry Elgart Orchestra, the Stan Rubin Orchestra, the Smithsonian Masterworks Orchestra, Tim Ouimette’s Arts On the Lake Jazz Ensemble and the Westchester Swing Band just to name a few. "
              }
              hasPhoto={true}
            />
            <BioCard
              imagePath={blankImg}
              name={"Dave Levitt"}
              role={"co-Founder, Conductor"}
              bio={
                "Dave Levitt is a fourth generation Klezmer musician. He started learning music at age 5 from his father Marty who was a well-known clarinetist and bandleader. Dave’s mother was also a performer who went by the name Harriet Kane. After graduating from LaGuardia H.S. of the Arts in New York City, Dave earned a scholarship to study at the Manhattan School of Music, where he received a Master’s Degree in Music. Besides working as a musician, Dave owned a rehearsal and recording studio in New York from 1995-2008."
              }
              hasPhoto={false}
            />
            <BioCard
              imagePath={blankImg}
              name={"Mike Fahn"}
              role={"Trombone"}
              bio={
                "Mike Fahn first started playing drums, (emulating his drummer dad); picked up the trumpet at age 5; and by age 13 switched to the baritone horn. His father loved Bob Brookmeyer and presented Mike with a valve trombone. Benefitting from the outstanding school music programs in Huntington Long Island, Mike learned to improvise on the deep well of jazz standards.He has played with Bob Cooper, Pete Christlieb, Maynard Ferguson, Conte Condoli, Peter Erskine, John Patitucci, Tom Kubis and many others."
              }
              hasPhoto={false}
            />
            <BioCard
              imagePath={blankImg}
              name={"Walter Barrett"}
              role={"Bass Trombone"}
              bio={
                "Walter Barrett performs as a free-lance musician throughout the New York area on Alto, Tenor & Bass Trombones, Bass Trumpet, Euphonium, and Tuba. He has performed with the Westchester Symphony, Yonkers Philharmonic, Philharmonic Symphony of Westchester, and the Hudson Valley Philharmonic. Walter has been featured as soloist with many local groups, including the Lehman College Community Band, White Plains Pops Band, Manhattan School of Music Trombone Ensemble, Yonkers Philharmonic, and the Westchester Band."
              }
              hasPhoto={false}
            />
            <BioCard
              imagePath={blankImg}
              name={"Owen Caprell"}
              role={"Bass Trombone"}
              bio={"Coming soon"}
              hasPhoto={false}
            />
            <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
              TRUMPETS
            </h2>
            <BioCard
              imagePath={hirsch}
              name={"Jordan Hirsch"}
              role={"Trumpet"}
              bio={
                "Jordan is a NYC based professional trumpet player with experience teaching performance and music appreciation on the middle school and high school level. Experience leading ensembles for private and corporate events, playing a wide variety of styles. Currently performing in the orchestra for the critically acclaimed NY Off-Broadway production of Fiddler on the Roof. "
              }
              hasPhoto={true}
            />
            <BioCard
              imagePath={burgie}
              name={"Kim Burgie"}
              role={"Trumpet/Flugelhorn"}
              bio={
                "Kim is a multi-Instrumentalist who plays trumpet/flugelhorn, jazz recorder and drums/percussion and has played at many of the top hotels, catering halls, night clubs and other venues in the tri-state area and around the world. When Kim is not working on original music or writing music for TV and motion pictures, he is a music teacher at a New York City high school in the South Bronx. Kim has 4 CD’s of his original music out there in the world (“In The Zone”, “Blessed Not Stressed”, “Fun” and “Fun 2.0”)."
              }
              hasPhoto={true}
            />
            <BioCard
              imagePath={blankImg}
              name={"Ron Horton"}
              role={"Trumpet"}
              bio={
                "Ron Horton is a trumpeter and composer with 4 CDs under his own name (Genius Envy-OmniTone, Subtextures-Fresh Sounds, Everything in a Dream-Fresh Sounds, It's a Gadget World-ABEAT), and has performed and/or recorded with Andrew Hill, Lee Konitz, Jane Ira Bloom, Jazz Composers Collective (Ben Allison, Frank Kimbrough, Ted Nash, Michael Blake) and others."
              }
              hasPhoto={false}
            />
            <BioCard
              imagePath={blankImg}
              name={"William Schaeffer"}
              role={"Co-Founder, Trumpet"}
              bio={
                "William is a lawyer working at the Inspector General’s Office of the New York City School Construction Authority. He performs regularly on trumpet with the Lehman College Community Band, the Westchester Band in Scarsdale, the New Westchester Symphony Orchestra in White Plains, the Manhattanville College Community Orchestra in Purchase, the St. Thomas Orchestra in Mamaroneck, the Cross Cultural Connection Pro-Am Ensemble in Peekskill, and the Patroons in Mount Vernon."
              }
              hasPhoto={false}
            />
            <BioCard
              imagePath={blankImg}
              name={"Rebecca Steinberg"}
              role={"Trumpet"}
              bio={"Coming soon"}
              hasPhoto={false}
            />
            <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
              FRENCH HORNS
            </h2>
            <BioCard
              imagePath={aliyah}
              name={"Aliyah Danielle"}
              role={"French Horn"}
              bio={
                "Aliyah enjoys a multifaceted career as a performer, composer, producer, and educator. Primarily performing as a singer and french horn player, she frequently experiments with genre-fusion and performs music influenced by funk, neo-soul, gospel, jazz, classical, and other contemporary styles. She received her Master of Music in Contemporary Performance (Production Concentration) from Berklee College of Music in Valencia, Spain, and also holds a Bachelor of Music in Music Education from Arizona State University in Tempe, Arizona. She is currently studying for her Master in Management with a specialization in leadership from Marquette University."
              }
              hasPhoto={true}
            />
            <BioCard
              imagePath={blankImg}
              name={"Hanan Rahman"}
              role={"French Horn"}
              bio={"Coming soon"}
              hasPhoto={false}
            />
            <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
              RHYTHM
            </h2>
            <BioCard
              imagePath={cion}
              name={"Sarah Cion"}
              role={"Co-Founder, Piano"}
              bio={
                "Sarah Jane Cion is the winner of the 17th Annual Great American Jazz Piano Competition and has appeared on NPR’s Piano Jazz with Marian McPartland. She has performed internationally, including at Japan’s Blue Note and the Kennedy Center’s Women in Jazz Festival, and her recordings feature jazz greats like Michael Brecker and Billy Hart. Her original music has been featured in films like The Mule and Thor: The Dark World. A Steinway artist and author of Modern Jazz Piano (Hal Leonard), Sarah performs regularly with top NYC big bands and leads her own trio."
              }
              hasPhoto={true}
            />
            <BioCard
              imagePath={blankImg}
              name={"Dan Asher"}
              role={"Bass"}
              bio={
                "Dan Asher has been busy performing and teaching in the New York area since 2001 at legendary venues including Birdland, the Blue Note, Smalls and the 55 Bar, covering a wide range of music, mainly Rock, R&B, Jazz and everything in between.  As an in-demand sideman, he performs regularly with artists such as Gabe Dixon, Southside Johnny and the Asbury Jukes and the Broadway Boys (including its new offshoot, Cruising Steady). A regular performer at the world-famous Baz Bar in St. Barth, he has performed most recently with Jimmy Buffett as well as legendary keyboardists David Bryan and Jay Oliver."
              }
              hasPhoto={false}
            />
            <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
              PERCUSSION
            </h2>
            <BioCard
              imagePath={reeve}
              name={"Bill Reeve"}
              role={"Drums/Percussion"}
              bio={
                "Bill Reeve has been playing big band music for 50 years. From 1984 to 1989, he directed the 4 o'clock Jazz Ensemble at the University of New Hampshire and in 1988, also conducted the 3 o'clock band. He has performed with many jazz legends including Clark Terry, Toshiko Akiyoshi/Lew Tabakin, Bob Mintzer, Peter Erskine, Alan Dawson, James Moody, Jimmy Heath, Milt Hinton, James Williams, Buddy DeFranco, Lee Konitz, Dick Johnson, Herb Pomeroy, Mike Metheny, and many others.  In addition, Bill is a talented graphic artist, and designer of the Library Jazz Band’s logo and music stands."
              }
              hasPhoto={true}
            />
            <BioCard
              imagePath={blankImg}
              name={"Arnaldo Buzak"}
              role={"Percussion"}
              bio={""}
              hasPhoto={false}
            />
            <BioCard
              imagePath={blankImg}
              name={"Graham Nalle"}
              role={"Percussion"}
              bio={""}
              hasPhoto={false}
            />
            <BioCard
              imagePath={blankImg}
              name={"Daniel Silva"}
              role={"Percussion"}
              bio={""}
              hasPhoto={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HittingTheLowNotes;
