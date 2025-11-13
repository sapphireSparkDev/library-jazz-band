import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Import all assets from the assets directory
const assetModules = import.meta.glob(
  "/src/lib/assets/**/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

// Create a mapping of original filenames to their resolved URLs
export const assetMap: Record<string, string> = {};

// Populate the asset map
Object.entries(assetModules).forEach(([path, module]) => {
  const filename = path.split("/").pop();
  if (filename && module) {
    assetMap[filename] = module as string;
  }
});

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

  // Extract filename from path
  const filename = imagePath.split("/").pop();

  // If we have a mapping for this filename, use it
  if (filename && assetMap[filename]) {
    return assetMap[filename];
  }

  // For any other relative paths, assume they're already correct
  return imagePath;
}
