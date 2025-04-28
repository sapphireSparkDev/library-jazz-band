import anger from "../../lib/assets/Anger.png";
import avaric from "../../lib/assets/avaric.png";
import envy from "../../lib/assets/envy.png";
import gluttony from "../../lib/assets/gluttony.png";
import lust from "../../lib/assets/lust.png";
import pride from "../../lib/assets/pride.png";
import sloth from "../../lib/assets/sloth.png";
import JoDa from "../../lib/assets/JoDa.png";

const HittingTheLowNotes = () => {
  return (
    <div>
      <div className="flex flex-col">
        {/** Image Container */}
        <div className="hidden md:flex flex-row grow justify-around gap-6 ">
          <img src={anger} className="size-20 lg:size-32" />
          <img src={avaric} className="size-20 lg:size-32" />
          <img src={envy} className="size-20 lg:size-32" />
          <img src={gluttony} className="size-20 lg:size-32" />
          <img src={lust} className="size-20 lg:size-32" />
          <img src={pride} className="size-20 lg:size-32" />
          <img src={sloth} className="size-20 lg:size-32" />
        </div>
        <div className="flex flex-col md:flex-row">
            {/** Description Container */}
          <div className="bg-neutral-700 h-auto m-4 md:w-2/3 ">
            <h1 className="text-amber-500 font-bebasNeue text-2xl ml-4 mt-6 lg:text-4xl self-center">
              Hitting the Low Notes,{" "}
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
              For this performance, the 17-member Library Jazz Band will be
              joined by two French horns, tuba, bass saxophone, and expanded
              trumpet and percussion sections. For the first time, the ensemble
              welcomes a guest conductor. The 75-year-old jazz elder Joseph
              Daley will lead the ensemble as they perform his seminal
              composition, The Seven Deadly Sins, a seven-movement piece based
              on the paintings of contemporary painter/musician Wade Schuman.{" "}
            </p>
            <p className="font-robotoThin text-lg text-white m-6  text-justify">
              Rounding out the program will be classics old and new by Jaco
              Pastorius, Charles Mingus, Thad Jones, and Frank Foster/the Count
              Basie Orchestra.
            </p>
          </div>
          <div className="bg-white m-4 md:w-1/3 justify-items-center">
            <div className="bg-amber-500 m-6">
              <img
                src={JoDa}
                className="size-20 lg:size-56 inline"
                alt="Picture of Joseph Daley"
              />
            </div>

            <h1 className="text-amber-500 font-bebasNeue text-lg lg:text-2xl">
              Joseph Daley - Composer
            </h1>
            <p className="text-md indent-2 ml-4 mr-4 font-robotoThin mb-6 text-justify">
              After over 50 years of recognition as one of the consummate
              sidemen on the adventurous music scene – with remarkable artists
              like Sam Rivers, Carla Bley, Gil Evans, Charlie Haden, Muhal
              Richard Abrams, Taj Mahal and so many more – Joseph Daley has
              emerged as one of Jazz and contemporary music’s most extraordinary
              composers and leaders. Stunning musicians, fans and critics alike
              with his brilliant 2011 CD, The Seven Deadly Sins, featuring his
              Earth Tones Ensemble (a full Jazz orchestra augmented by six
              additional low-tone horns, and including a seven-member rhythm
              section and four special guests), this powerfully innovative music
              mines the same rich vein of musical expression as that of
              immortals like Charles Mingus, Duke Ellington and George Russell,
              receiving rave reviews and making several Best of Year lists.
            </p>
          </div>
        </div>
      </div>
      {/** Program Container */}
      <div className="flex flex-col md:flex-row font-robotoThin">
        <div className="bg-neutral-700 m-4 h-auto justify-items-center md:w-2/3 ">
        <h1 className="text-amber-500 font-bebasNeue text-2xl ml-4 mt-6 lg:text-4xl ">
              Hitting the Low Notes,{" "}
            </h1>
            <h2 className="text-md lg:text-lg text-amber-500 ml-4 font-bold">
            April 30, 2025 at 6pm
            </h2>
          <h1 className="text-amber-500 font-bebasNeue text-2xl ml-4 mt-6 lg:text-4xl">
            Program
          </h1>
          <div className="grid grid-cols-2 text-white gap-6 m-4 w-1/2 justify-items-center text-center">
            <span>Hip Shakin’</span>
            <span>Frank Foster</span>
            <span>Sir Teen Town</span>
            <span>Bill Reeve. Based on Sir Duke/Teen Town</span>
            <span>Liberty City (1981)</span>
            <span>Jaco Pastorius, for the Word of Mouth Big Band</span>
            <span>Tip Toe (1970)</span>
            <span>Thad Jones</span>
            <span>Moanin’ (1959)</span>
            <span>
              Charles Mingus, arranged by Sy Johnson for the Mingus Dynasty Band
            </span>
          </div>
          <h2 className="text-md lg:text-lg text-amber-500 ml-4 font-bold">
            The Seven Deadly Sins (2011) Joseph Daley
          </h2>
          <ol type="I" className="list-decimal text-white">
            <li className="text-white"> Invidia (Envy)</li>
            <li>Avarita (Avarice)</li>
            <li>Gula (Gluttony)</li>
            <li>Superbia (Pride)</li>
            <li>Lechery (Lust)</li>
            <li>Desida (Sloth)</li>
            <li>Ira (Anger)</li>
          </ol>
        </div>
        <div className="h-auto md:w-1/3 m-4 bg-white justify-items-center text-center">
          <h1 className="text-amber-500 font-bebasNeue text-2xl ml-4 mt-6 lg:text-4xl">
            Musicians
          </h1>
          <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
            SAXOPHONES
          </h2>
          <ul className="mb-4">
            <li>Nancy Maron, soprano</li>
            <li>Travis Sullivan, alto</li>
            <li>Matt Garrison, tenor</li>
            <li>Chris Ferdinand, tenor</li>
            <li>Karl Watson, bari</li>
            <li>Andrew Hadro, bass</li>
          </ul>

          <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
            TRUMPETS
          </h2>
          <ul className="mb-4">
            <li>Jordan Hirsch</li>
            <li>Ron Horton</li>
            <li>Kim Burgie</li>
            <li>William Schaeffer</li>
            <li>Rebecca Steinberg</li>
          </ul>

          <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
            TROMBONES
          </h2>
          <ul className="mb-4">
            <li>Rob Susman</li>
            <li>Dave Levitt</li>
            <li>John Roth</li>
            <li>Djorkaeff Zentla, bass trombone</li>
          </ul>

          <h2 className="text-sm lg:text-md text-indigo-900 font-bold">TUBA</h2>
          <ul className="mb-4">
            <li>Walter Barrett</li>
          </ul>

          <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
            FRENCH HORNS
          </h2>
          <ul className="mb-4">
            <li>Aliyah Danielle</li>
            <li>Hanan Rahman</li>
          </ul>

          <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
            PIANO
          </h2>
          <ul className="mb-4">
            <li>Sarah Jane Cion</li>
          </ul>

          <h2 className="text-sm lg:text-md text-indigo-900 font-bold">BASS</h2>
          <ul className="mb-4">
            <li>Dan Asher</li>
          </ul>

          <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
            DRUMS
          </h2>
          <ul className="mb-4">
            <li>Bill Reeve</li>
          </ul>

          <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
            PERCUSSION
          </h2>
          <ul className="mb-4">
            <li>Arnaldo Buzack</li>
            <li>Graham Nalle</li>
            <li>Daniel Silva</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HittingTheLowNotes;
