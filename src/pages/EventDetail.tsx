import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/lib/types/events";
import { eventsAPI, musiciansAPI } from "@/lib/api";
import MusiciansList from "@/components/MusiciansList";

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [eventMusicians, setEventMusicians] = useState<any[]>([]);

  useEffect(() => {
    // Scroll to top when component mounts or slug changes
    window.scrollTo(0, 0);

    // Find the event by slug from API
    const loadEvent = async () => {
      setLoading(true);
      try {
        console.log("Loading event for slug:", slug);
        const foundEvent = await eventsAPI.getBySlug(slug!);
        console.log("Found event:", foundEvent);
        setEvent(foundEvent);
      } catch (error) {
        console.error("Failed to load event:", error);
        // Fallback to getAll if getBySlug fails
        try {
          const events = await eventsAPI.getAll();
          const fallbackEvent = events.find((e: Event) => e.slug === slug);
          setEvent(fallbackEvent || null);
        } catch (fallbackError) {
          console.error("Fallback also failed:", fallbackError);
          setEvent(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [slug]);

  useEffect(() => {
    const loadMusicians = async () => {
      if (!event) {
        setEventMusicians([]);
        return;
      }

      try {
        const allMusicians = await musiciansAPI.getAll();
        const musicians = event.musicians
          .map((musicianId) =>
            allMusicians.find((m: any) => m.id === musicianId),
          )
          .filter(
            (musician): musician is NonNullable<typeof musician> =>
              musician !== undefined,
          );
        setEventMusicians(musicians);
      } catch (error) {
        console.error("Failed to load musicians:", error);
        setEventMusicians([]);
      }
    };

    loadMusicians();
  }, [event]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-amber-500 text-xl">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-amber-500 text-xl bg-white p-8 rounded-lg shadow-lg text-center">
          <div>Event not found</div>
          <div className="text-sm text-gray-600 mt-2">
            Slug: {slug}
            <br />
            Make sure the backend server is running on port 3001
          </div>
        </div>
      </div>
    );
  }

  const currentMedia = event.media[currentMediaIndex];
  const hasMultipleMedia = event.media.length > 1;

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % event.media.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex(
      (prev) => (prev - 1 + event.media.length) % event.media.length,
    );
  };

  const formatDate = (dateString: string) => {
    // Parse the date string and ensure it's treated as local time
    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="pt-16">
        {" "}
        {/* Space for nav bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Top: Media, Bottom: Program */}
            <div className="lg:col-span-2 space-y-8">
              {/* Media Section */}
              <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                {currentMedia && currentMedia.url ? (
                  currentMedia.type === "image" ? (
                    <img
                      src={currentMedia.url}
                      alt={currentMedia.alt || event.title}
                      className="w-full h-96 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-image.jpg";
                      }}
                    />
                  ) : (
                    <div className="relative w-full h-96 bg-black">
                      <video
                        src={currentMedia.url}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                      />
                    </div>
                  )
                ) : (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-200 text-gray-500">
                    <span>Image Coming Soon</span>
                  </div>
                )}

                {/* Navigation Arrows */}
                {hasMultipleMedia && (
                  <>
                    <button
                      onClick={prevMedia}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextMedia}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-colors"
                    >
                      →
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {hasMultipleMedia && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {event.media.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentMediaIndex
                            ? "bg-amber-500"
                            : "bg-white bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Event Program Section */}
              {event.programImage && (
                <div>
                  <h2 className="text-amber-500 font-bebasNeue text-3xl mb-6">
                    Event Program
                  </h2>
                  <div className="bg-white p-6 rounded-lg">
                    <img
                      src={event.programImage}
                      alt={`${event.title} Program`}
                      className="max-w-full h-auto mx-auto"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Top: Details, Bottom: Musicians */}
            <div className="space-y-8">
              {/* Details Section */}
              <div className="bg-white p-6 rounded-lg h-fit">
                <h1 className="text-2xl font-bold text-black mb-4">
                  {event.title}
                </h1>
                <p className="text-gray-700 mb-6">{event.description}</p>

                <div className="border-t border-gray-200 pt-4"></div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="text-amber-500 mr-3" size={20} />
                    <div>
                      <p className="text-black font-medium">
                        {formatDate(event.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="text-amber-500 mr-3 mt-1" size={40} />
                    <div>
                      <p className="text-black font-medium">{event.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Musicians Section */}
              {eventMusicians.length > 0 && (
                <div>
                  <h2 className="text-amber-500 font-bebasNeue text-3xl mb-6">
                    Meet the Musicians
                  </h2>
                  <div className="w-full">
                    <MusiciansList musicians={eventMusicians} layout="event" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
