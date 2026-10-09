import { useCallback, useEffect, useMemo, useState } from "react";
import { musiciansAPI } from "@/lib/api";
import { Musician } from "@/lib/types/events";
import { sectionOrder, sortMusicians } from "@/lib/musicians";
import { useEvents } from "@/lib/useEvents";
import PageHeader from "@/components/PageHeader";
import { BioPanel, BioSheet, MusicianPhoto } from "@/components/BioDrawer";

const OurMusicians = () => {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("All");
  const [selected, setSelected] = useState<Musician | null>(null);
  const { upcoming } = useEvents();

  useEffect(() => {
    musiciansAPI
      .getAll()
      .then((data: Musician[]) => setMusicians(sortMusicians(data)))
      .catch((error: unknown) => {
        console.error("Failed to load musicians:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  // Only offer chips for sections that have someone in them
  const sections = useMemo(
    () =>
      sectionOrder.filter((name) => musicians.some((m) => m.section === name)),
    [musicians],
  );

  const shown =
    section === "All"
      ? musicians
      : musicians.filter((musician) => musician.section === section);

  const closeSheet = useCallback(() => setSelected(null), []);

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-10 md:px-6">
      <PageHeader eyebrow="The band" title="Our Musicians" />

      <div
        className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0"
        role="group"
        aria-label="Filter by section"
      >
        {["All", ...sections].map((name) => (
          <button
            key={name}
            type="button"
            className="ljb-chip shrink-0"
            aria-pressed={section === name}
            onClick={() => setSection(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_300px]">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {loading
            ? Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="ljb-card aspect-[3/4] animate-pulse" />
              ))
            : shown.map((musician) => {
                const isSelected = selected?.id === musician.id;
                return (
                  <button
                    key={musician.id}
                    type="button"
                    onClick={() => setSelected(musician)}
                    aria-pressed={isSelected}
                    className={`ljb-card flex flex-col gap-1 p-1.5 text-left transition-shadow ${
                      isSelected
                        ? "outline outline-2 outline-ljb-gold"
                        : "outline-none hover:outline hover:outline-1 hover:outline-ljb-gold/50"
                    }`}
                  >
                    <MusicianPhoto
                      musician={musician}
                      className="aspect-square w-full rounded-xl text-2xl"
                    />
                    <span className="flex flex-col gap-0.5 px-2 pb-2 pt-1">
                      <span className="font-roboto text-sm font-bold text-ljb-cream">
                        {musician.name}
                      </span>
                      <span className="text-xs font-light text-ljb-cream/65">
                        {musician.instrument}
                      </span>
                    </span>
                  </button>
                );
              })}
        </div>

        <BioPanel musician={selected} upcoming={upcoming} />
      </div>

      <BioSheet musician={selected} upcoming={upcoming} onClose={closeSheet} />
    </div>
  );
};

export default OurMusicians;
