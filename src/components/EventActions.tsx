import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Event } from "@/lib/types/events";
import {
  admissionInfo,
  downloadCalendarFile,
  eventPath,
  googleCalendarUrl,
  outlookCalendarUrl,
} from "@/lib/events";
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
      "inline-flex min-w-0 max-w-full items-center break-words rounded-full leading-snug bg-ljb-gold/10 px-3 py-1 font-roboto text-xs font-normal text-ljb-gold-light",
      className,
    )}
  >
    {admissionInfo(event).tag}
  </span>
);

const menuItemClass =
  "block w-full whitespace-nowrap rounded-lg px-3 py-2 text-left font-roboto text-sm font-normal text-ljb-cream hover:bg-ljb-gold/10 hover:text-ljb-gold-light focus:bg-ljb-gold/10 focus:text-ljb-gold-light focus:outline-none";

// Opens a small menu to add the show to Google, Apple or Outlook calendars.
export const CalendarButton = ({
  event,
  label = "+ Calendar",
  className = "ljb-pill-ghost",
  wrapperClassName,
  align = "left",
  opensUp = false,
}: {
  event: Event;
  label?: string;
  className?: string;
  wrapperClassName?: string;
  align?: "left" | "right";
  opensUp?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
    const closeOnOutside = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrapperRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative inline-flex", wrapperClassName)}
    >
      <button
        type="button"
        className={className}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {label}
      </button>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="Add to calendar"
          className={cn(
            "absolute z-30 min-w-full rounded-xl bg-ljb-raised p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.55)] ring-1 ring-ljb-gold/30",
            opensUp ? "bottom-full mb-2" : "top-full mt-2",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          <a
            role="menuitem"
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noreferrer"
            className={menuItemClass}
            onClick={close}
          >
            Google Calendar
          </a>
          <button
            type="button"
            role="menuitem"
            className={menuItemClass}
            onClick={() => {
              downloadCalendarFile(event);
              close();
            }}
          >
            Apple Calendar
          </button>
          <a
            role="menuitem"
            href={outlookCalendarUrl(event)}
            target="_blank"
            rel="noreferrer"
            className={menuItemClass}
            onClick={close}
          >
            Outlook
          </a>
          <button
            type="button"
            role="menuitem"
            className={cn(menuItemClass, "text-ljb-cream/60")}
            onClick={() => {
              downloadCalendarFile(event);
              close();
            }}
          >
            Other (download .ics)
          </button>
        </div>
      )}
    </div>
  );
};

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
