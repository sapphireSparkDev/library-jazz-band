import { Link } from "react-router-dom";

import image from "../lib/assets/LBJ.webp";
import danAsher from "../lib/assets/LJB_DanAsher.webp";
import { useEvents } from "@/lib/useEvents";
import {
  admissionInfo,
  dateParts,
  downloadCalendarFile,
  eventPath,
  scrollToShowAlerts,
} from "@/lib/events";
import { Event } from "@/lib/types/events";

const NextShowCard = ({ event }: { event: Event }) => {
  const { month, day, weekday, time } = dateParts(event.date);
  const admission = admissionInfo(event);

  return (
    <div className="ljb-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
      <div className="hidden flex-col items-center border-r border-ljb-gold/35 pr-6 font-bebasNeue leading-none text-ljb-gold sm:flex">
        <span className="text-xl tracking-wide">{month}</span>
        <span className="text-5xl">{day}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="ljb-cap">
          <span className="sm:hidden">
            Next · {month} {day} ·{" "}
          </span>
          <span className="hidden sm:inline">Next show · </span>
          {admission.short}
        </span>
        <Link
          to={eventPath(event)}
          className="font-bebasNeue text-2xl tracking-wide text-ljb-cream hover:text-ljb-gold-light md:text-3xl"
        >
          {event.title}
        </Link>
        <span className="truncate text-sm font-light text-ljb-cream/70">
          {[weekday, time, event.location].filter(Boolean).join(" · ")}
        </span>
      </div>
      <div className="flex gap-2 sm:flex-col">
        <Link to={eventPath(event)} className="ljb-pill-gold flex-1">
          Details
        </Link>
        <button
          type="button"
          className="ljb-pill-ghost flex-1"
          onClick={() => downloadCalendarFile(event)}
        >
          + Calendar
        </button>
      </div>
    </div>
  );
};

const NoShowCard = () => (
  <div className="ljb-card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
    <div className="flex flex-1 flex-col gap-1">
      <span className="ljb-cap">Next show</span>
      <span className="font-bebasNeue text-2xl tracking-wide md:text-3xl">
        New dates coming soon
      </span>
      <span className="text-sm font-light text-ljb-cream/70">
        Get an email as soon as the next show is announced.
      </span>
    </div>
    <button
      type="button"
      onClick={scrollToShowAlerts}
      className="ljb-pill-gold"
    >
      Get show alerts
    </button>
  </div>
);

const Landing = () => {
  const { upcoming, loading } = useEvents();
  const nextShow = upcoming[0];

  return (
    <div className="pb-6">
      {/* Hero */}
      <div className="px-3 md:px-4">
        <div className="ljb-hero-glow relative mx-auto h-[62vh] min-h-[360px] max-w-6xl overflow-hidden rounded-2xl md:h-[70vh]">
          <picture>
            <source srcSet={danAsher} media="(max-width: 1024px)" />
            <img
              src={image}
              alt="The entire Library Jazz Band on stage"
              className="h-full w-full object-cover opacity-60 sepia-[.35]"
            />
          </picture>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(74,38,34,0.35)_0%,rgba(26,15,18,0.85)_85%)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 pb-10 text-center">
            <span className="ljb-cap">Live big band jazz · Westchester</span>
            <h1 className="font-aboreto text-3xl leading-tight text-ljb-cream md:text-5xl">
              The Library Jazz Band
            </h1>
            <div className="ljb-hairline w-48" />
          </div>
        </div>
      </div>

      {/* Next show, floating over the bottom of the hero */}
      <div className="relative mx-auto -mt-10 max-w-3xl px-6 md:-mt-12">
        {loading ? (
          <div className="ljb-card h-28 animate-pulse" />
        ) : nextShow ? (
          <NextShowCard event={nextShow} />
        ) : (
          <NoShowCard />
        )}
      </div>

      {/* Donate prompt */}
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-6 py-14 text-center">
        <span className="ljb-cap">Keep the shows free</span>
        <p className="font-light text-ljb-cream/80">
          Your gift helps us add shows, invite guest artists and record our
          music.
        </p>
        <Link to="/donate" className="ljb-pill-ghost mt-1">
          Support the band
        </Link>
      </div>
    </div>
  );
};

export default Landing;
