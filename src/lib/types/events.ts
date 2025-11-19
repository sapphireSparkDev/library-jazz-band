export interface MediaItem {
  type: "image" | "video";
  url: string;
  alt?: string;
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
