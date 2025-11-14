import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Event } from "@/lib/types/events";
import { resolveImagePath } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const currentMedia = event.media[currentMediaIndex];
  const hasMultipleMedia = event.media.length > 1;

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % event.media.length);
    setIsPlaying(false);
  };

  const prevMedia = () => {
    setCurrentMediaIndex(
      (prev) => (prev - 1 + event.media.length) % event.media.length,
    );
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatDate = (dateString: string) => {
    // Parse the date string and ensure it's treated as local time
    const [datePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="bg-white border-0 shadow-lg overflow-hidden flex flex-col rounded-none h-full">
      {/* Media Section */}
      <div className="relative aspect-video bg-gray-200 overflow-hidden">
        {currentMedia ? (
          currentMedia.type === "image" ? (
            <img
              src={
                resolveImagePath(currentMedia.url) || "/placeholder-image.jpg"
              }
              alt={currentMedia.alt || event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full bg-black">
              <video
                src={currentMedia.url}
                className="w-full h-full object-cover"
                muted={isMuted}
                controls={false}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <button
                  onClick={togglePlayPause}
                  className="bg-amber-500 text-black p-2 rounded-full hover:bg-amber-400 transition-colors"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors"
                >
                  {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
            <span>Image Coming Soon</span>
          </div>
        )}

        {/* Navigation Arrows */}
        {hasMultipleMedia && (
          <>
            <button
              onClick={prevMedia}
              className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors text-xs"
            >
              ←
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors text-xs"
            >
              →
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {hasMultipleMedia && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {event.media.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMediaIndex(index)}
                className={`w-1.5 h-1.5 rounded-full ${
                  index === currentMediaIndex
                    ? "bg-amber-500"
                    : "bg-white bg-opacity-50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-3 flex flex-col flex-1">
        {/* Top Content */}
        <div className="flex-1">
          {/* Date */}
          <div className="flex items-center text-amber-600 text-sm font-bold mb-1">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(event.date)}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-black text-sm mb-1 line-clamp-2">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-black text-xs mb-2 line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Bottom Content - Aligned to bottom */}
        <div>
          {/* Location */}
          <div className="flex items-center text-black text-xs mb-3">
            <MapPin size={12} className="mr-1" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          {/* More Details Button */}
          <Link
            to={
              event.slug === "hitting-the-low-notes"
                ? "/events/lowNotes"
                : `/events/${event.slug}`
            }
            className="block w-full bg-amber-500 text-black text-center py-1 px-3 text-xs font-medium hover:bg-amber-400 transition-colors"
          >
            More Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
