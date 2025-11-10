import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/lib/types/events";
import eventsData from "@/data/events.json";
import musiciansData from "@/data/musicians.json";

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    // Scroll to top when component mounts or slug changes
    window.scrollTo(0, 0);

    // Find the event by slug
    const foundEvent = eventsData.find((e) => e.slug === slug) as Event;
    setEvent(foundEvent || null);
  }, [slug]);

  if (!event) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-amber-500 text-xl">Event not found</div>
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
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const eventMusicians = event.musicians
    .map((musicianId) => musiciansData.find((m) => m.id === musicianId))
    .filter(
      (musician): musician is NonNullable<typeof musician> =>
        musician !== undefined,
    );

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="pt-16">
        {" "}
        {/* Space for nav bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
          {/* Media and Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Media Section */}
            <div className="lg:col-span-2">
              <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                {currentMedia ? (
                  currentMedia.type === "image" ? (
                    <img
                      src={currentMedia.url || "/placeholder-image.jpg"}
                      alt={currentMedia.alt || event.title}
                      className="w-full h-96 object-cover"
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
            </div>

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

                <div className="flex items-start">
                  <MapPin className="text-amber-500 mr-3 mt-1" size={40} />
                  <div>
                    <p className="text-black font-medium">{event.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Program Section */}
          {event.programImage && (
            <div className="mb-12">
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

          {/* Musicians Section */}
          {eventMusicians.length > 0 && (
            <div>
              <h2 className="text-amber-500 font-bebasNeue text-3xl mb-6">
                Meet the Musicians
              </h2>
              <div className="bg-white p-6 rounded-lg max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventMusicians.map((musician) => (
                    <div
                      key={musician.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center mb-3">
                        <img
                          src={musician.photo}
                          alt={musician.name}
                          className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                        <div>
                          <h3 className="font-bold text-black">
                            {musician.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {musician.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {musician.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
