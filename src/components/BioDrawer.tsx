import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Event, Musician } from "@/lib/types/events";
import { resolveImagePath } from "@/lib/utils";
import { dateParts, eventPath } from "@/lib/events";

export const MusicianPhoto = ({
  musician,
  className = "",
}: {
  musician: Musician;
  className?: string;
}) =>
  musician.photo ? (
    <img
      src={resolveImagePath(musician.photo)}
      alt={`Photo of ${musician.name}`}
      className={`object-cover ${className}`}
    />
  ) : (
    // Musicians without a photo get an LJB logo tile
    <div
      className={`ljb-hero-glow flex items-center justify-center font-aboreto tracking-[0.2em] text-ljb-gold/80 ${className}`}
      aria-label={musician.name}
    >
      LJB
    </div>
  );

const BioContent = ({
  musician,
  upcoming,
}: {
  musician: Musician;
  upcoming: Event[];
}) => {
  const playsAt = upcoming.filter((event) =>
    event.musicians?.includes(musician.id),
  );
  return (
    <div className="flex flex-col gap-3">
      <span className="ljb-cap">{musician.instrument || musician.section}</span>
      <h2 className="font-bebasNeue text-3xl leading-none tracking-wide text-ljb-cream">
        {musician.name}
      </h2>
      {musician.role && (
        <p className="text-sm text-ljb-gold-light">{musician.role}</p>
      )}
      <div className="ljb-hairline my-1" />
      <p className="text-sm font-light leading-relaxed text-ljb-cream/80">
        {musician.bio || "Bio coming soon."}
      </p>
      {playsAt.length > 0 && (
        <p className="text-sm text-ljb-cream/70">
          Plays{" "}
          {playsAt.map((event, i) => {
            const { month, day } = dateParts(event.date);
            return (
              <span key={event.id}>
                {i > 0 && ", "}
                <Link
                  to={eventPath(event)}
                  className="text-ljb-gold underline-offset-2 hover:underline"
                >
                  {month} {day}
                </Link>
              </span>
            );
          })}
        </p>
      )}
    </div>
  );
};

// Desktop: a panel that sits beside the grid.
export const BioPanel = ({
  musician,
  upcoming,
}: {
  musician: Musician | null;
  upcoming: Event[];
}) => (
  <aside className="ljb-card sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto p-6 lg:block">
    {musician ? (
      <BioContent musician={musician} upcoming={upcoming} />
    ) : (
      <div className="flex flex-col gap-2">
        <span className="ljb-cap">Bios</span>
        <p className="text-sm font-light text-ljb-cream/70">
          Choose a musician to read their bio.
        </p>
      </div>
    )}
  </aside>
);

// Mobile, or anywhere without room for a side panel: a sheet that slides up.
export const BioSheet = ({
  musician,
  upcoming,
  onClose,
  className = "lg:hidden",
}: {
  musician: Musician | null;
  upcoming: Event[];
  onClose: () => void;
  className?: string;
}) => {
  useEffect(() => {
    if (!musician) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [musician, onClose]);

  if (!musician) return null;

  return (
    <div className={`fixed inset-0 z-40 ${className}`}>
      <button
        type="button"
        aria-label="Close bio"
        className="absolute inset-0 h-full w-full rounded-none bg-black/60 p-0"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={musician.name}
        className="absolute inset-x-0 bottom-0 mx-auto max-h-[80vh] max-w-xl overflow-y-auto rounded-t-3xl bg-ljb-raised p-6 pb-10 shadow-[0_-12px_30px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom duration-300"
      >
        <div className="mb-4 flex items-start gap-4">
          <MusicianPhoto
            musician={musician}
            className="h-20 w-20 shrink-0 rounded-xl text-sm"
          />
          <button
            type="button"
            aria-label="Close bio"
            onClick={onClose}
            className="ml-auto rounded-full bg-white/5 p-2 text-ljb-gold"
          >
            <X size={18} />
          </button>
        </div>
        <BioContent musician={musician} upcoming={upcoming} />
      </div>
    </div>
  );
};
