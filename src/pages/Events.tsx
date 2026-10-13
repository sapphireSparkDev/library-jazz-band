import { Link } from "react-router-dom";
import { EventCard } from "@/components/EventCard";
import PageHeader from "@/components/PageHeader";
import { useEvents } from "@/lib/useEvents";
import { dateParts, eventPath, scrollToShowAlerts } from "@/lib/events";

// Same density as the Musicians grid: more shows across on wider screens.
const EVENT_GRID =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

const Events = () => {
  const { upcoming, past, loading } = useEvents();

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-10 md:px-6">
      <PageHeader eyebrow="The season" title="Live Performances" />

      <section className="mt-10">
        <h2 className="ljb-cap mb-5">Upcoming</h2>
        {loading ? (
          <div className={EVENT_GRID}>
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="ljb-card h-72 animate-pulse" />
            ))}
          </div>
        ) : upcoming.length > 0 ? (
          <div className={EVENT_GRID}>
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="ljb-card flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center">
            <p className="flex-1 font-light text-ljb-cream/80">
              No shows on the calendar right now. Get an email when the next one
              is announced.
            </p>
            <button
              type="button"
              onClick={scrollToShowAlerts}
              className="ljb-pill-gold"
            >
              Get show alerts
            </button>
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="mt-16">
          {/* Partition so the archive reads as separate from what's coming up */}
          <div className="mb-4 flex items-center gap-4">
            <div className="ljb-hairline flex-1" />
            <h2 className="ljb-cap text-ljb-cream/55">Past shows</h2>
            <div className="ljb-hairline flex-1" />
          </div>
          <ul className="opacity-80">
            {past.map((event) => {
              const { monthYear } = dateParts(event.date);
              return (
                <li key={event.id} className="border-b border-ljb-gold/15">
                  <Link
                    to={eventPath(event)}
                    className="group flex items-baseline gap-4 py-3 text-ljb-cream/85 hover:text-ljb-gold-light"
                  >
                    <span className="w-20 shrink-0 text-sm font-light text-ljb-gold">
                      {monthYear}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {event.title}
                    </span>
                    <span className="text-ljb-gold transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Events;
