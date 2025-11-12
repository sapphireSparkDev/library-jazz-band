import BioCard from "./BioCard";

interface Musician {
  id: string;
  name: string;
  role: string;
  instrument: string;
  photo: string;
  bio: string;
  isHidden: boolean;
  section: string;
}

interface MusiciansListProps {
  musicians: Musician[];
}

const MusiciansList = ({ musicians }: MusiciansListProps) => {
  // Group musicians by section
  const musiciansBySection = musicians.reduce(
    (acc, musician) => {
      if (!acc[musician.section]) {
        acc[musician.section] = [];
      }
      acc[musician.section].push(musician);
      return acc;
    },
    {} as Record<string, Musician[]>,
  );

  // Define section order for consistent display
  const sectionOrder = [
    "Piano",
    "Bass",
    "Drums",
    "Saxophones",
    "Trumpets",
    "Trombones",
    "Tuba",
    "French Horns",
    "Percussion",
  ];

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-amber-500 font-bebasNeue text-3xl lg:text-4xl text-center mb-8">
          Our Musicians
        </h2>

        {sectionOrder.map((section) => {
          const sectionMusicians = musiciansBySection[section];
          if (!sectionMusicians || sectionMusicians.length === 0) return null;

          return (
            <div key={section} className="mb-12">
              <h3 className="text-xl lg:text-2xl text-amber-500 font-bold mb-6 text-left">
                {section.toUpperCase()}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {sectionMusicians.map((musician) => (
                  <BioCard
                    key={musician.id}
                    name={musician.name}
                    imagePath={musician.photo}
                    role={musician.role || musician.instrument}
                    bio={musician.bio}
                    hasPhoto={!!musician.photo}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MusiciansList;
