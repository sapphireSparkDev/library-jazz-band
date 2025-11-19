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
  sortOrder: number;
}

interface MusiciansListProps {
  musicians: Musician[];
  layout?: "about" | "event";
}

const MusiciansList = ({ musicians, layout = "about" }: MusiciansListProps) => {
  // Filter out hidden musicians and sort by sortOrder
  const visibleMusicians = musicians
    .filter((musician) => !musician.isHidden)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Group musicians by section and sort within each section
  const musiciansBySection = visibleMusicians.reduce(
    (acc, musician) => {
      if (!acc[musician.section]) {
        acc[musician.section] = [];
      }
      acc[musician.section].push(musician);
      return acc;
    },
    {} as Record<string, Musician[]>,
  );

  // Sort musicians within each section by sortOrder
  Object.keys(musiciansBySection).forEach((section) => {
    musiciansBySection[section].sort((a, b) => a.sortOrder - b.sortOrder);
  });

  // Define section order for consistent display
  const sectionOrder = [
    "Rhythm",
    "Saxophones",
    "Trumpets",
    "Trombones",
    "Tuba",
    "French Horns",
    "Percussion",
  ];

  if (layout === "about") {
    return (
      <div className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
  }

  // Event layout (default for backward compatibility)
  return (
    <div className="w-full">
      <div className="max-w-full">
        {/* Title is now handled by the parent component */}

        {sectionOrder.map((section) => {
          const sectionMusicians = musiciansBySection[section];
          if (!sectionMusicians || sectionMusicians.length === 0) return null;

          return (
            <div key={section} className="mb-12">
              <h3 className="text-xl lg:text-2xl text-amber-500 font-bold mb-6 text-left">
                {section.toUpperCase()}
              </h3>

              <div className="grid grid-cols-1 gap-6 justify-items-center">
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
