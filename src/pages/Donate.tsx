import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import zelleQR from "../lib/assets/Zelle_forwebsite.jpeg";
import PageHeader from "@/components/PageHeader";
import { useEvents } from "@/lib/useEvents";
import { eventPath } from "@/lib/events";

// The band's Square donation link. Donors pick the amount and pay on
// Square's own page, so the site needs no payment server.
// VITE_SQUARE_DONATION_URL overrides the default link if set.
const SQUARE_DONATION_URL =
  (import.meta.env.VITE_SQUARE_DONATION_URL as string | undefined) ||
  "https://square.link/u/cMmuO3Or";

// ArtsWestchester 2026 matching-gift form (Google Form).
const ARTS_WESTCHESTER_FORM_URL =
  "https://docs.google.com/forms/d/1tR_kx_wxNZYGRYhz2N-uLu_lEION8DgvQix5eG3kJSs/viewform";

// The challenge notices hide themselves once the deadline has passed.
const ARTS_WESTCHESTER_DEADLINE = new Date(2026, 11, 15, 23, 59, 59);
const ARTS_WESTCHESTER_DEADLINE_LABEL = "December 15, 2026";

// Always open on desktop; collapsible on mobile.
const WayToGive = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="ljb-card flex flex-col gap-2 p-5">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center rounded-none bg-transparent p-0 text-left lg:pointer-events-none"
      >
        <span className="ljb-cap flex-1">{title}</span>
        <ChevronDown
          size={18}
          className={`text-ljb-gold transition-transform lg:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`${open ? "block" : "hidden"} text-sm font-light text-ljb-cream/75 lg:block`}
      >
        {children}
      </div>
    </div>
  );
};

const Donate = () => {
  const { upcoming } = useEvents();
  const nextShow = upcoming[0];
  const challengeOpen = new Date() <= ARTS_WESTCHESTER_DEADLINE;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
      <PageHeader eyebrow="Keep the music free" title="Support the LJB!" />
      <p className="mx-auto mt-5 max-w-xl text-center font-light leading-relaxed text-ljb-cream/75">
        Our library shows are free, but running the band is not! Your support
        will help us add more shows, invite guest artists, and record our music.
      </p>

      {challengeOpen && (
        <a
          href="#artsw-challenge"
          className="ljb-card mx-auto mt-8 flex max-w-xl flex-col items-center gap-1 px-5 py-4 text-center outline outline-1 outline-ljb-gold/60 hover:outline-ljb-gold"
        >
          <span className="ljb-cap">ArtsWestchester Challenge 2026</span>
          <span className="font-bebasNeue text-2xl tracking-wide text-ljb-cream">
            Deadline: {ARTS_WESTCHESTER_DEADLINE_LABEL}
          </span>
          <span className="text-sm font-light text-ljb-cream/75">
            Give and fill out the form by the deadline so ArtsWestchester can
            match your gift.
          </span>
        </a>
      )}

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Give online */}
        <div className="ljb-card flex flex-col gap-4 p-6 md:p-8">
          <div className="flex items-baseline gap-3">
            <h2 className="flex-1 font-bebasNeue text-3xl tracking-wide">
              Give online
            </h2>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ljb-cream/45">
              Square
            </span>
          </div>
          <p className="font-light text-ljb-cream/75">
            Give any amount through Square's secure checkout. Pay by card, Apple
            Pay or Google Pay.
          </p>
          <a
            href={SQUARE_DONATION_URL}
            target="_blank"
            rel="noreferrer"
            className="ljb-pill-gold py-3 text-base"
          >
            Donate with Square ↗
          </a>
          <p className="text-center text-xs font-light text-ljb-cream/50">
            Opens Square in a new tab. A tax-deductible receipt is emailed to
            you.
          </p>
          {challengeOpen && (
            <>
              <div className="ljb-hairline" />
              <div
                id="artsw-challenge"
                className="flex scroll-mt-24 flex-col gap-3"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="ljb-cap flex-1">
                    ArtsWestchester 2026 match
                  </span>
                  <span className="text-xs font-normal uppercase tracking-[0.15em] text-ljb-gold-light">
                    Deadline {ARTS_WESTCHESTER_DEADLINE_LABEL}
                  </span>
                </div>
                <p className="text-sm font-light text-ljb-cream/75">
                  ArtsWestchester may match your gift. After you donate, fill
                  out the 2026 donation form by{" "}
                  {ARTS_WESTCHESTER_DEADLINE_LABEL} so your gift can be counted.
                </p>
                <a
                  href={ARTS_WESTCHESTER_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="ljb-pill-ghost whitespace-normal py-2.5 text-center"
                >
                  Fill out the 2026 donation form ↗
                </a>
              </div>
            </>
          )}
        </div>

        {/* Other ways to give */}
        <div className="flex flex-col gap-4">
          <span className="ljb-cap">Other ways to give</span>
          <WayToGive title="Zelle">
            <div className="flex items-start gap-4">
              <p className="flex-1">To Nancy Maron, using this QR code.</p>
              <img
                src={zelleQR}
                alt="Zelle QR code for Nancy Maron"
                className="h-24 w-24 rounded-lg bg-white p-1"
              />
            </div>
          </WayToGive>
          <WayToGive title="Check">
            <p>
              Library Jazz Band, Inc. · 69 Oakland Avenue, Yonkers, NY 10710
            </p>
          </WayToGive>
          <WayToGive title="At a show">
            <p>
              Find us at the table ·{" "}
              <Link
                to={nextShow ? eventPath(nextShow) : "/events"}
                className="text-ljb-gold hover:text-ljb-gold-light"
              >
                Next show →
              </Link>
            </p>
          </WayToGive>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-sm font-light text-ljb-cream/60">
        Library Jazz Band, Inc. is a 501(c)(3). Donations are tax deductible to
        the extent allowed by law.
      </p>
    </div>
  );
};

export default Donate;
