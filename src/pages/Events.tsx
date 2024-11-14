import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LJBRob from "../lib/assets/LJBRob.webp";
import AWLogo from "../lib/assets/artsWestchesterLogo.png";

const Events = () => {
  return (
    <div>
      <img src={LJBRob} />
      <div className="absolute inset-y-0 left-10 top-16 bg-neutral-900/75 p-10 w-2/6 h-full">
        <h1 className="font-roboto text-4xl tracking-wide text-amber-400 mb-4 place-self-center ">
          Events
        </h1>
        <h2 className="font-roboto text-2xl tracking-wide text-amber-400 mb-4">
          2024
        </h2>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-roboto text-lg">
              <span>It's Showtime: LJB Takes on Broadway</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-md text-indigo-900 font-bold">
              Sunday, November 17 at 2pm
            </h2>
            <span className="text-sm font-robotoThin">
              Greenburgh Public Library/ 300 Tarrytown Rd, Elmsford, NY 10523
            </span>
          </CardContent>
          <CardContent>
            <h2 className="text-md text-indigo-900 font-bold">
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
        <h2 className="font-roboto text-2xl tracking-wide text-amber-400 mb-4">
          2025
        </h2>
        <Card>
          <CardHeader>
            <CardTitle className="font-roboto  text-lg">
              <span>Hitting the Low Notes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-md text-indigo-900 font-bold">
              April 2025 [Date TBD]
            </h2>

            <p className="line-clamp-7 font-robotoThin  text-sm text-center">
              This concert will feature the tuba and the baritone and bass
              saxophones. Joining us will be tuba virtuoso Joseph Daley, veteran
              of Liberation Music Orchestra, Taj Mahal and many more, performing
              his works and others.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex absolute inset-y-0 right-10 top-36 bg-neutral-900/75 p-10 w-2/6 h-2/4 rounded-xl items-center font-robotoThin  text-sm text-center">
        <Card>
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
