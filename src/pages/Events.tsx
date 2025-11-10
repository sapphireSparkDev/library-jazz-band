import { useState, useEffect, useRef } from "react";
import { EventCard } from "@/components/EventCard";
import { Event } from "@/lib/types/events";
import { eventsAPI } from "@/lib/api";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState<"upcoming" | "past">(
    "upcoming",
  );
  const headerRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const pastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load events from API and sort them
    const loadEvents = async () => {
      try {
        const eventsData = await eventsAPI.getAll();
        const sortedEvents = eventsData
          .filter((event: Event) => !event.isHidden)
          .sort((a: Event, b: Event) => {
            const now = new Date();
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);

            const aIsUpcoming = aDate >= now;
            const bIsUpcoming = bDate >= now;

            // First, separate upcoming and past events
            if (aIsUpcoming && !bIsUpcoming) return -1;
            if (!aIsUpcoming && bIsUpcoming) return 1;

            // Then sort within each group
            if (aIsUpcoming) {
              // Upcoming: closest to today first
              return aDate.getTime() - bDate.getTime();
            } else {
              // Past: most recent first
              return bDate.getTime() - aDate.getTime();
            }
          });

        setEvents(sortedEvents);
      } catch (error) {
        console.error("Failed to load events:", error);
        // Fallback to empty array if API fails
        setEvents([]);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        const opacity = Math.max(0, 1 - scrollPosition / headerHeight);
        setHeaderOpacity(opacity);
      }

      // Determine which section is currently in view
      if (upcomingRef.current && pastRef.current) {
        const upcomingTop = upcomingRef.current.getBoundingClientRect().top;
        const pastTop = pastRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        // If upcoming section is in view or past section hasn't reached the top yet
        if (
          upcomingTop < viewportHeight * 0.5 ||
          pastTop > viewportHeight * 0.5
        ) {
          setActiveSection("upcoming");
        } else {
          setActiveSection("past");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToUpcoming = () => {
    if (upcomingRef.current) {
      upcomingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToPast = () => {
    if (pastRef.current) {
      pastRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate >= now;
  });

  const pastEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate < now;
  });

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header Section with Photo */}
      <div
        ref={headerRef}
        className="relative"
        style={{ opacity: headerOpacity }}
      >
        <div className="pt-16">
          {" "}
          {/* Space for nav bar */}
          <div className="mx-4 md:mx-8 lg:mx-16">
            <img
              src="/src/lib/assets/LJBRob.webp"
              alt="Library Jazz Band performing"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center pt-16">
              <h1 className="text-amber-500 font-bebasNeue text-4xl md:text-5xl lg:text-6xl font-bold text-center">
                Live Performances
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="sticky top-16 z-10 bg-neutral-900 pt-4 pb-4">
        <div className="mx-4 md:mx-8 lg:mx-16">
          <div className="flex space-x-4">
            <button
              onClick={scrollToUpcoming}
              className={`px-6 py-3 font-medium transition-colors ${
                activeSection === "upcoming"
                  ? "bg-amber-500 text-black hover:bg-amber-400"
                  : "bg-amber-700 text-white hover:bg-amber-600"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={scrollToPast}
              className={`px-6 py-3 font-medium transition-colors ${
                activeSection === "past"
                  ? "bg-amber-500 text-black hover:bg-amber-400"
                  : "bg-amber-700 text-white hover:bg-amber-600"
              }`}
            >
              Past
            </button>
          </div>
        </div>
      </div>

      {/* All Events Grid */}
      <div className="mx-4 md:mx-8 lg:mx-16 mt-8 pb-16">
        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <div ref={upcomingRef} className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div ref={pastRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* No Events Message */}
        {events.length === 0 && (
          <div className="text-center text-amber-500 py-16">
            <p className="text-xl">No events to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
