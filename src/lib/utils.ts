import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to resolve image paths
export const resolveImagePath = (url: string) => {
  // If the URL is already a full URL (http/https), return as-is
  if (url?.startsWith("http://") || url?.startsWith("https://")) {
    return url;
  }

  // For local paths starting with /src, convert to import
  if (url?.startsWith("/src/")) {
    // Remove /src/ prefix and add to base path
    return url.replace("/src/", "/");
  }

  return url;
};

// Helper function to get YouTube video ID from URL
export const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\/\s]+)/,
    /youtube\.com\/shorts\/([^&?\/\s]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
};

// Helper function to get Vimeo video ID from URL
export const getVimeoVideoId = (url: string): string | null => {
  if (!url) return null;

  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

// Helper function to detect if URL is an external video embed
export const getVideoEmbedUrl = (
  url: string,
): { type: "youtube" | "vimeo" | "direct"; embedUrl: string } | null => {
  if (!url) return null;

  const youtubeId = getYouTubeVideoId(url);
  if (youtubeId) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    };
  }

  const vimeoId = getVimeoVideoId(url);
  if (vimeoId) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoId}`,
    };
  }

  // If it's a direct video URL (uploaded file or direct link)
  return {
    type: "direct",
    embedUrl: resolveImagePath(url),
  };
};
