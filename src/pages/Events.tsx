import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LJBRobAlt from "../lib/assets/LJB_RobSusman.webp";
import LJBRob from "../lib/assets/LJBRob.webp";
import AWLogo from "../lib/assets/artsWestchesterLogo.png";

const Events = () => {
  return (
    <div>
      <picture>
        <source srcSet={LJBRob} media="(min-width: 1400px)" />
        <img src={LJBRobAlt} className="hidden lg:block" />
      </picture>
      <div className="absolute inset-y-12 lg:inset-y-0 lg:left-10 lg:top-16 bg-neutral-900 lg:bg-neutral-900/75 p-10 w-screen lg:w-2/6 h-max">
        <h1 className="text-amber-500 font-bebasNeue text-2xl lg:text-4xl tracking-wide mb-4 place-self-center ">
          Events
        </h1>
        <h2 className="font-roboto text-lg lg:text-2xl  tracking-wide text-amber-400 mb-4">
          2025
        </h2>
        <Card>
          <CardHeader>
            <CardTitle className="font-roboto text-md lg:text-lg text-center">
              <span>Hitting the Low Notes, featuring composer Joseph Daley’s 7 Deadly Sins</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
            April 30, 2025 at 6pm
            </h2>
            <span className="text-sm font-robotoThin">Riverfront Library Auditorium, Yonkers, NY 10701</span>
          </CardContent>
          <CardContent className="font-robotoThin text-sm text-center">
          Hitting The Low Notes, celebrates instruments from the lower end of the sonic spectrum, some not often seen in a jazz band. 
          For this performance, the 17-member Library Jazz Band will be joined by two French horns, tuba, bass saxophone, 
          and expanded trumpet and percussion sections.
          </CardContent>
          <CardContent className="font-robotoThin text-sm text-center">
          For the first time, the ensemble welcomes a guest conductor. The 75-year-old jazz 
          elder Joseph Daley will lead the ensemble as they perform his seminal composition, The Seven Deadly Sins, 
          a seven-movement piece based on the paintings of contemporary painter/musician Wade Schuman.
          </CardContent>
          <CardContent className="font-robotoThin text-sm text-center">
          Rounding out the program will be classics old and new by Jaco Pastorius, Charles Mingus, Thad Jones, 
          and Frank Foster/the Count Basie Orchestra. 
          </CardContent>
        </Card>

        <details>
          <summary className="text-sm lg:text-md text-amber-400 font-bold mt-4 mb-4">
            <span>See Past Events</span>
          </summary>
          <h2 className="font-roboto text-lg lg:text-2xl  tracking-wide text-amber-400 mb-4">
          2024
        </h2>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-roboto text-md lg:text-lg">
              <span>It's Showtime: LJB Takes on Broadway</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
              Sunday, November 17 at 2pm
            </h2>
            <span className="text-sm font-robotoThin">
              Greenburgh Public Library/ 300 Tarrytown Rd, Elmsford, NY 10523
            </span>
          </CardContent>
          <CardContent>
            <h2 className="text-sm lg:text-md text-indigo-900 font-bold">
              Sunday, November 24 at 2pm
            </h2>
            <span className="text-sm font-robotoThin">
              Grinton I. Will Branch/1500 Central Park Avenue, Yonkers, NY 10710
            </span>
          </CardContent>
          <CardContent>
            <p className="font-robotoThin text-sm text-center">
              A salute to music from the Broadway stage including tunes from
              West Side Story, Chicago, Pippin, Gypsy, Porgy & Bess, from the
              best bands and arrangers including Count Basie, Duke Ellington,
              Buddy Rich, Chico O’Farrill. For this show, we are delighted to be
              joined by vocalist Amy London.
            </p>
          </CardContent>
        </Card>
        </details>
        
      
        <div className="relative lg:hidden">
          <div className="flex absolute -inset-x-10 inset-y-40 bg-neutral-900/75 p-10 w-screen h-2/4 rounded-xl items-center font-robotoThin  text-sm text-center">
            <Card className="mt-20 md:mt-32">
              <CardHeader>
                <img src={AWLogo}></img>
              </CardHeader>
              <CardContent>
                <p>
                  Library Jazz Band’s 2024 - 2025 Season is made possible with
                  funds from Arts Alive, a regrant program of ArtsWestchester
                  with support from the Office of the Governor, the New York
                  State Legislature, and the New York State Council on the Arts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="hidden lg:block absolute inset-y-0 right-10 top-96 bg-neutral-900/75 p-10 w-1/6 lg:w-2/6 2xl:w-1/6 h-fit rounded-xl items-center font-robotoThin mt-6 text-sm text-center">
        <Card className="">
          <CardHeader>
            <img src={AWLogo}></img>
          </CardHeader>
          <CardContent>
            <p>
              Library Jazz Band’s 2024 - 2025 Season is made possible with funds
              from Arts Alive, a regrant program of ArtsWestchester with support
              from the Office of the Governor, the New York State Legislature,
              and the New York State Council on the Arts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Events;
