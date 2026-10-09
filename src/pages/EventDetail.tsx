import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Event, Musician } from "@/lib/types/events";
import { eventsAPI, musiciansAPI } from "@/lib/api";
import { resolveImagePath } from "@/lib/utils";
import {
  admissionInfo,
  dayLabel,
  directionsUrl,
  formatShortDate,
  isUpcoming,
  shareEvent,
} from "@/lib/events";
import { sortMusicians } from "@/lib/musicians";
import { useEvents } from "@/lib/useEvents";
import {
  AdmissionLink,
  AdmissionTag,
  CalendarButton,
} from "@/components/EventActions";
import { BioSheet, MusicianPhoto } from "@/components/BioDrawer";
import WatchClips from "@/components/WatchClips";

const HEADSHOTS_SHOWN = 11;

const MediaCarousel = ({ event }: { event: Event }) => {
  const media = (event.media || []).filter((m) => m.url);
  const [index, setIndex] = useState(0);
  const current = media[index];

  if (!current) {
    return (
      <div className="ljb-hero-glow flex aspect-video items-center justify-center rounded-2xl font-aboreto text-4xl tracking-[0.2em] text-ljb-gold/70">
        LJB
      </div>
    );
  }

  const step = (delta: number) =>
    setIndex((prev) => (prev + delta + media.length) % media.length);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-ljb-deep">
      {current.type === "image" ? (
        <img
          src={resolveImagePath(current.url)}
          alt={current.alt || event.title}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <video
          src={resolveImagePath(current.url)}
          className="aspect-video w-full bg-black object-cover"
          controls
          muted
          playsInline
        />
      )}

      {media.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => step(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-ljb-cream hover:bg-black/70"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => step(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-ljb-cream hover:bg-black/70"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {media.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show photo ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full p-0 ${
                  i === index ? "bg-ljb-gold" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [eventMusicians, setEventMusicians] = useState<Musician[]>([]);
  const [showAllMusicians, setShowAllMusicians] = useState(false);
  const [selected, setSelected] = useState<Musician | null>(null);
  const [shareNote, setShareNote] = useState("");
  const { upcoming } = useEvents();

  useEffect(() => {
    const loadEventData = async () => {
      setLoading(true);
      try {
        const [foundEvent, allMusicians] = await Promise.all([
          eventsAPI.getBySlug(slug!).catch(async () => {
            const events = await eventsAPI.getAll();
            return events.find((e: Event) => e.slug === slug) ?? null;
          }),
          musiciansAPI.getAll().catch(() => []),
        ]);

        setEvent(foundEvent);
        if (foundEvent) {
          const ids: string[] = foundEvent.musicians || [];
          setEventMusicians(
            sortMusicians(
              allMusicians.filter((m: Musician) => ids.includes(m.id)),
            ),
          );
        }
      } catch (error) {
        console.error("Failed to load event:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    loadEventData();
  }, [slug]);

  const closeSheet = useCallback(() => setSelected(null), []);

  if (loading) {
    return (
      <div className="mx-auto min-h-screen max-w-6xl px-4 pt-10 md:px-6">
        <div className="ljb-card aspect-video animate-pulse lg:w-3/5" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="ljb-cap">Event not found</span>
        <p className="font-light text-ljb-cream/75">
          We couldn't find that show. It may have moved or been renamed.
        </p>
        <Link to="/events" className="ljb-pill-gold">
          See all events
        </Link>
      </div>
    );
  }

  const admission = admissionInfo(event);
  const isFree = admission.kind === "free";
  const upcomingShow = isUpcoming(event);
  const visibleMusicians = showAllMusicians
    ? eventMusicians
    : eventMusicians.slice(0, HEADSHOTS_SHOWN);
  const hiddenCount = eventMusicians.length - visibleMusicians.length;

  const handleShare = async () => {
    const result = await shareEvent(event);
    if (result === "copied") {
      setShareNote("Link copied");
      setTimeout(() => setShareNote(""), 2000);
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-28 pt-8 md:px-6 lg:pb-16">
      <Link
        to="/events"
        className="text-sm text-ljb-gold hover:text-ljb-gold-light"
      >
        ← All events
      </Link>

      <div className="mt-5 grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Left: media, description, program */}
        <div className="flex min-w-0 flex-col gap-6">
          <MediaCarousel event={event} />

          {/* On small screens the key facts sit right under the photo */}
          <div className="flex flex-col gap-1 lg:hidden">
            <h1 className="font-bebasNeue text-4xl leading-none tracking-wide">
              {event.title}
            </h1>
            <span className="text-sm text-ljb-gold">
              {formatShortDate(event.date)}
            </span>
            <a
              href={directionsUrl(event.location)}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-light text-ljb-cream/75 underline-offset-2 hover:underline"
            >
              {event.location}
            </a>
          </div>

          {event.description && (
            <p className="whitespace-pre-line font-light leading-relaxed text-ljb-cream/85">
              {event.description.trim()}
            </p>
          )}

          {event.programImage && (
            <section className="flex flex-col gap-3">
              <h2 className="ljb-cap">Event program</h2>
              <a
                href={resolveImagePath(event.programImage)}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-2xl bg-white p-4"
                title="Open the program full size"
              >
                <img
                  src={resolveImagePath(event.programImage)}
                  alt={`${event.title} program`}
                  className="mx-auto h-auto max-w-full"
                />
              </a>
            </section>
          )}

          {/* Only appears once a YouTube link is added in admin */}
          {event.videos && event.videos.length > 0 && (
            <WatchClips videos={event.videos} />
          )}
        </div>

        {/* Right: info box, pinned while scrolling */}
        <aside className="ljb-card sticky top-24 hidden flex-col gap-3 p-6 lg:flex">
          <span className="ljb-cap">{dayLabel(event.date)}</span>
          <h1 className="font-bebasNeue text-4xl leading-none tracking-wide">
            {event.title}
          </h1>
          <div className="flex flex-col gap-1">
            <span>{formatShortDate(event.date)}</span>
            <span className="font-light text-ljb-cream/85">
              {event.location}
            </span>
            <a
              href={directionsUrl(event.location)}
              target="_blank"
              rel="noreferrer"
              className="self-start text-sm text-ljb-gold underline underline-offset-2 hover:text-ljb-gold-light"
            >
              Get directions
            </a>
          </div>
          {upcomingShow && (
            <>
              <AdmissionTag event={event} className="self-start" />
              <div className="flex flex-col gap-2">
                {isFree ? (
                  <CalendarButton
                    event={event}
                    label="+ Add to calendar"
                    className="ljb-pill-gold"
                  />
                ) : (
                  <>
                    <AdmissionLink event={event} />
                    <CalendarButton event={event} label="+ Add to calendar" />
                  </>
                )}
              </div>
            </>
          )}
          <button
            type="button"
            className="ljb-pill-ghost"
            onClick={handleShare}
          >
            {shareNote || "Share"}
          </button>
        </aside>
      </div>

      {eventMusicians.length > 0 && (
        <section className="mt-12">
          <h2 className="ljb-cap mb-5">Meet the musicians</h2>
          <div className="grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-6 lg:grid-cols-8">
            {visibleMusicians.map((musician) => (
              <button
                key={musician.id}
                type="button"
                onClick={() => setSelected(musician)}
                className="group flex flex-col items-center gap-2 bg-transparent p-0 text-center"
              >
                <MusicianPhoto
                  musician={musician}
                  className="h-16 w-16 rounded-full text-xs transition group-hover:opacity-80 md:h-20 md:w-20"
                />
                <span className="text-xs leading-tight text-ljb-cream/85">
                  {musician.name}
                </span>
              </button>
            ))}
            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={() => setShowAllMusicians(true)}
                className="flex flex-col items-center gap-2 bg-transparent p-0"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ljb-raised font-bebasNeue text-2xl text-ljb-gold md:h-20 md:w-20">
                  +{hiddenCount}
                </span>
                <span className="text-xs text-ljb-cream/60">Show all</span>
              </button>
            )}
          </div>
        </section>
      )}

      {/* Mobile: the action bar is pinned to the bottom of the screen */}
      {upcomingShow && (
        <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-3 rounded-t-2xl bg-ljb-raised/95 px-4 py-3 shadow-[0_-10px_24px_rgba(0,0,0,0.45)] backdrop-blur lg:hidden">
          <AdmissionTag event={event} />
          {isFree ? (
            <CalendarButton event={event} className="ljb-pill-gold flex-1" />
          ) : (
            <AdmissionLink event={event} className="ljb-pill-gold flex-1" />
          )}
        </div>
      )}

      <BioSheet
        musician={selected}
        upcoming={upcoming}
        onClose={closeSheet}
        className=""
      />
    </div>
  );
};

export default EventDetail;
