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
