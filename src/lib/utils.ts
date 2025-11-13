import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to resolve image paths for both development and production
export function resolveImagePath(imagePath: string): string {
  if (!imagePath) return "";

  // If it's already a full URL or data URL, return as-is
  if (
    imagePath.startsWith("http") ||
    imagePath.startsWith("data:") ||
    imagePath.startsWith("/assets/")
  ) {
    return imagePath;
  }

  // Handle paths that start with /src/lib/assets/
  if (imagePath.startsWith("/src/lib/assets/")) {
    const filename = imagePath.split("/").pop();
    return `/assets/${filename}`;
  }

  // Handle paths that start with src/lib/assets/
  if (imagePath.startsWith("src/lib/assets/")) {
    const filename = imagePath.split("/").pop();
    return `/assets/${filename}`;
  }

  // For any other relative paths, assume they're already correct
  return imagePath;
}
