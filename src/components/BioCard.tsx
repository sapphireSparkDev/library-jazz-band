import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
    <div className="w-3/4 mb-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {hasPhoto ? (
              <img src={imagePath} width={300} height={300} alt="hello" />
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl text-amber-500 font-bold">{name}</p>
            <p className="text-indigo-900 font-bold mb-4">{role}</p>
            <details>
              <summary>
                <span className="text-sm">Read more</span>
              </summary>
              <p>{bio}</p>
            </details>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavBar;
