import { Event } from "@/lib/types/events";

// Event dates are stored as local wall-clock values ("2025-11-16" or
// "2025-11-16T13:00"), so parse them without any timezone conversion.
export const parseEventDate = (dateString: string) => {
  const [datePart, timePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart ? timePart.split(":").map(Number) : [0, 0];
  return {
    date: new Date(year, month - 1, day, hours, minutes),
    hasTime: Boolean(timePart),
  };
};

// A show stays "upcoming" for the whole day it happens.
export const isUpcoming = (event: Event) => {
  const { date } = parseEventDate(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

export const splitEvents = (events: Event[]) => {
  const visible = events.filter((event) => !event.isHidden);
  const byDate = (a: Event, b: Event) =>
    parseEventDate(a.date).date.getTime() -
    parseEventDate(b.date).date.getTime();
  return {
    upcoming: visible.filter(isUpcoming).sort(byDate),
    past: visible
      .filter((event) => !isUpcoming(event))
      .sort((a, b) => byDate(b, a)),
  };
};

// "7pm" or "1:30pm"
export const formatTime = (date: Date) => {
  const hour12 = date.getHours() % 12 || 12;
  const ampm = date.getHours() >= 12 ? "pm" : "am";
  const minutes = date.getMinutes();
  return minutes
    ? `${hour12}:${minutes.toString().padStart(2, "0")}${ampm}`
    : `${hour12}${ampm}`;
};

// "Saturday night", "Sunday afternoon"
export const dayLabel = (dateString: string) => {
  const { date, hasTime } = parseEventDate(dateString);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  if (!hasTime) return weekday;
  const hour = date.getHours();
  const part = hour >= 17 ? "night" : hour >= 12 ? "afternoon" : "morning";
  return `${weekday} ${part}`;
};

// "Sat, Nov 14 · 7pm"
export const formatShortDate = (dateString: string) => {
  const { date, hasTime } = parseEventDate(dateString);
  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return hasTime ? `${day} · ${formatTime(date)}` : day;
};

export const dateParts = (dateString: string) => {
  const { date, hasTime } = parseEventDate(dateString);
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    day: date.getDate(),
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    time: hasTime ? formatTime(date) : "",
    monthYear: date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
  };
};

export const eventPath = (event: Event) =>
  event.slug === "hitting-the-low-notes"
    ? "/events/lowNotes"
    : `/events/${event.slug}`;

export const firstImage = (event: Event) =>
  event.media?.find((m) => m.type === "image" && m.url);

export const directionsUrl = (location: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

export const admissionInfo = (event: Event) => {
  const kind = event.admission ?? "free";
  if (kind === "rsvp") {
    return {
      kind,
      short: "RSVP",
      tag: event.admissionNote || "RSVP required",
      actionLabel: "RSVP",
      actionUrl: event.admissionUrl,
    };
  }
  if (kind === "tickets") {
    return {
      kind,
      short: "tickets",
      tag: event.admissionNote || "Tickets",
      actionLabel: "Get tickets",
      actionUrl: event.admissionUrl,
    };
  }
  return {
    kind,
    short: "free",
    tag: event.admissionNote || "Free · no RSVP needed",
    actionLabel: "",
    actionUrl: undefined,
  };
};

const icsStamp = (date: Date, withTime: boolean) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const day = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  return withTime
    ? `${day}T${pad(date.getHours())}${pad(date.getMinutes())}00`
    : day;
};

const icsEscape = (text: string) =>
  text
    .replace(/\\/g, "\\\\")
    .replace(/([,;])/g, "\\$1")
    .replace(/\n/g, "\\n");

// Downloads an .ics file, which every calendar app can import.
export const downloadCalendarFile = (event: Event) => {
  const { date, hasTime } = parseEventDate(event.date);
  const end = new Date(date);
  if (hasTime) {
    end.setHours(end.getHours() + 2);
  } else {
    end.setDate(end.getDate() + 1);
  }
  const dateLine = (key: string, value: Date) =>
    hasTime
      ? `${key}:${icsStamp(value, true)}`
      : `${key};VALUE=DATE:${icsStamp(value, false)}`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Library Jazz Band//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@libraryjazzband`,
    `DTSTAMP:${icsStamp(new Date(), true)}`,
    dateLine("DTSTART", date),
    dateLine("DTEND", end),
    `SUMMARY:${icsEscape(event.title.trim())}`,
    `LOCATION:${icsEscape(event.location)}`,
    `DESCRIPTION:${icsEscape(`${window.location.origin}${eventPath(event)}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.slug}.ics`;
  link.click();
  URL.revokeObjectURL(url);
};

export const shareEvent = async (event: Event) => {
  const url = `${window.location.origin}${eventPath(event)}`;
  if (navigator.share) {
    try {
      await navigator.share({ title: event.title.trim(), url });
    } catch {
      // The person closed the share sheet.
    }
    return "shared";
  }
  await navigator.clipboard?.writeText(url);
  return "copied";
};

// Scrolls to the newsletter signup in the footer
export const scrollToShowAlerts = () =>
  document
    .getElementById("show-alerts")
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
