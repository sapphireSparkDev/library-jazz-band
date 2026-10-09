import { useState } from "react";
import { VideoClip } from "@/lib/types/events";
import { youtubeEmbedUrl, youtubeId, youtubeThumbnail } from "@/lib/youtube";

// Shows a YouTube player. With several clips, the thumbnails switch the video.
const WatchClips = ({ videos }: { videos: VideoClip[] }) => {
  const clips = videos
    .map((clip) => ({ ...clip, id: youtubeId(clip.url) }))
    .filter((clip): clip is VideoClip & { id: string } => Boolean(clip.id));
  const [current, setCurrent] = useState(0);

  if (clips.length === 0) return null;
  const active = clips[Math.min(current, clips.length - 1)];

  return (
    <section className="flex flex-col gap-3">
      <h2 className="ljb-cap">Watch clips</h2>
      <div className="aspect-video overflow-hidden rounded-2xl bg-black">
        <iframe
          key={active.id}
          src={youtubeEmbedUrl(active.id)}
          title={active.title || "Library Jazz Band video"}
          className="h-full w-full"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {clips.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {clips.map((clip, i) => (
            <button
              key={`${clip.id}-${i}`}
              type="button"
              onClick={() => setCurrent(i)}
              aria-pressed={i === current}
              aria-label={`Play ${clip.title || `clip ${i + 1}`}`}
              className={`aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-ljb-deep p-0 ${
                i === current
                  ? "outline outline-1 outline-ljb-gold"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={youtubeThumbnail(clip.id)}
                alt=""
                className="aspect-video w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default WatchClips;
