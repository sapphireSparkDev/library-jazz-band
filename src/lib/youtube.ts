// Pulls the video ID out of the YouTube link formats people paste:
// youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
export const youtubeId = (url: string) => {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be")
      return parsed.pathname.slice(1).split("/")[0] || null;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const v = parsed.searchParams.get("v");
      if (v) return v;
      const match = parsed.pathname.match(/^\/(shorts|embed|live)\/([\w-]+)/);
      return match ? match[2] : null;
    }
  } catch {
    // Not a URL
  }
  return null;
};

export const youtubeEmbedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0`;

export const youtubeThumbnail = (id: string) =>
  `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
