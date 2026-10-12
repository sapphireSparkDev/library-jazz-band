import { Link } from "react-router-dom";
import { Event } from "@/lib/types/events";
import { admissionInfo, downloadCalendarFile, eventPath } from "@/lib/events";
import { cn } from "@/lib/utils";

export const AdmissionTag = ({
  event,
  className,
}: {
  event: Event;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center whitespace-nowrap rounded-full bg-ljb-gold/10 px-3 py-1 font-roboto text-xs font-normal text-ljb-gold-light",
      className,
    )}
  >
    {admissionInfo(event).tag}
  </span>
);

export const CalendarButton = ({
  event,
  label = "+ Calendar",
  className = "ljb-pill-ghost",
}: {
  event: Event;
  label?: string;
  className?: string;
}) => (
  <button
    type="button"
    className={className}
    onClick={() => downloadCalendarFile(event)}
  >
    {label}
  </button>
);

// The RSVP or ticket button. Falls back to the event page when no link is set.
export const AdmissionLink = ({
  event,
  className = "ljb-pill-gold",
}: {
  event: Event;
  className?: string;
}) => {
  const { actionLabel, actionUrl } = admissionInfo(event);
  if (!actionLabel) return null;
  return actionUrl ? (
    <a href={actionUrl} target="_blank" rel="noreferrer" className={className}>
      {actionLabel}
    </a>
  ) : (
    <Link to={eventPath(event)} className={className}>
      {actionLabel}
    </Link>
  );
};
