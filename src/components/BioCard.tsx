import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { resolveImagePath } from "@/lib/utils";

const NavBar = ({
  name,
  imagePath,
  role,
  bio,
  hasPhoto,
}: {
  name: string;
  imagePath: string;
  role: string;
  bio: string;
  hasPhoto: boolean;
}) => {
  return (
    <div className="w-full mb-4 mt-4">
      <Card className="bg-white rounded-none">
        <CardHeader>
          <CardTitle>
            {hasPhoto ? (
              <img
                src={resolveImagePath(imagePath)}
                width={350}
                height={350}
                className="w-full h-auto max-w-full object-cover rounded-none"
                alt={`Photo of ${name}`}
              />
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl lg:text-3xl text-amber-500 font-bold mb-2">
              {name}
            </p>
            <p className="text-indigo-900 font-bold text-lg mb-4">{role}</p>
            <details>
              <summary className="cursor-pointer text-amber-500 font-bold hover:text-amber-400">
                <span className="text-base">Read more</span>
              </summary>
              <p className="mt-2 text-gray-700">{bio}</p>
            </details>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavBar;
