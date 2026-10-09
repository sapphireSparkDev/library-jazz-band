export interface MediaItem {
  type: "image" | "video";
  url: string;
  alt?: string;
}

// How people get in: a free show, a free show that needs an RSVP, or a ticketed show.
export type Admission = "free" | "rsvp" | "tickets";

// A YouTube link shown under "Watch clips" on the event page
export interface VideoClip {
  url: string;
  title?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO format: "2024-11-17"
  location: string;
  media: MediaItem[];
  programImage?: string; // URL to program screenshot
  musicians: string[]; // Array of musician IDs
  isUpcoming: boolean;
  isHidden: boolean;
  slug: string; // URL-friendly identifier
  admission?: Admission; // defaults to "free"
  admissionUrl?: string; // RSVP or ticket link
  admissionNote?: string; // e.g. "Tickets $15", overrides the default label
  videos?: VideoClip[]; // YouTube links, added in admin
}

export interface Musician {
  id: string;
  name: string;
  role: string;
  instrument: string;
  photo: string;
  bio: string;
  isHidden: boolean;
  section: string;
  sortOrder: number;
}
