import { useEffect, useState } from "react";
import { Event } from "@/lib/types/events";
import { eventsAPI } from "@/lib/api";
import { splitEvents } from "@/lib/events";

// Loads every event and splits them into upcoming (soonest first) and past
// (most recent first). Hidden events are left out.
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    eventsAPI
      .getAll()
      .then((data: Event[]) => {
        if (!cancelled) setEvents(data);
      })
      .catch((error: unknown) => {
        console.error("Failed to load events:", error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...splitEvents(events), loading };
};
