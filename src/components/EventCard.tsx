import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Event } from "@/lib/types/events";
import { resolveImagePath } from "@/lib/utils";
import {
  admissionInfo,
  eventPath,
  firstImage,
  formatShortDate,
} from "@/lib/events";
import { AdmissionLink, AdmissionTag, CalendarButton } from "./EventActions";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const image = firstImage(event);
  const isFree = admissionInfo(event).kind === "free";

  return (
    <article className="ljb-card flex h-full flex-col gap-2.5 p-2.5">
      <Link
        to={eventPath(event)}
        className="relative block aspect-video overflow-hidden rounded-xl bg-ljb-deep"
      >
        {image ? (
          <img
            src={resolveImagePath(image.url)}
            alt={image.alt || event.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        ) : (
          <div className="ljb-hero-glow flex h-full w-full items-center justify-center font-aboreto text-3xl tracking-[0.2em] text-ljb-gold/70">
            LJB
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 px-1.5 pb-1.5">
        <span className="ljb-cap tracking-[0.2em]">
          {formatShortDate(event.date)}
        </span>
        <Link
          to={eventPath(event)}
          className="font-bebasNeue text-2xl leading-tight tracking-wide text-ljb-cream hover:text-ljb-gold-light"
        >
          {event.title}
        </Link>
        <span className="flex items-start gap-1.5 text-sm font-light text-ljb-cream/75">
          <MapPin size={15} className="mt-0.5 shrink-0 text-ljb-gold" />
          {event.location}
        </span>

        <div className="mt-auto flex flex-col items-start gap-2 pt-3">
          <AdmissionTag event={event} />
          <div className="flex flex-wrap items-center gap-2">
            {isFree ? (
              <>
                <Link to={eventPath(event)} className="ljb-pill-gold">
                  Details
                </Link>
                <CalendarButton event={event} label="+ Cal" />
              </>
            ) : (
              <AdmissionLink event={event} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
