import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LJBRob from "../lib/assets/LJBRob.webp";
const Events = () => {
  return (
    <div>
      <img src={LJBRob} />
      <div className="absolute inset-y-0 left-10 top-16 bg-neutral-950/75 p-10 w-2/6 h-screen">
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
            <span className="text-sm">
              Greenburgh Public Library/ 300 Tarrytown Rd, Elmsford, NY 10523
            </span>
          </CardContent>
          <CardContent>
            <h2 className="text-md text-indigo-900 font-bold">
              Sunday, November 24 at 2pm
            </h2>
            <span className="text-sm">
              Grinton I. Will Branch/1500 Central Park Avenue, Yonkers, NY 10710
            </span>
          </CardContent>
        </Card>
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

            <p className="line-clamp-7">
              This concert will feature instruments many audience members may
              not have seen in this setting before: the tuba and the baritone
              and bass saxophones. Joining us for this show will be tuba and
              baritone horn virtuoso Joseph Daley, veteran of Liberation Music
              Orchestra and band member of so many adventurous greats including
              Sam Rivers, Carla Bley, Gil Evans, Charlie Haden, Muhal Richard
              Abrams, Taj Mahal and many more.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Events;
