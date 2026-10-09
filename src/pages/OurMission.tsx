import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import rob from "../lib/assets/LJB_saxSection.webp";
import karl from "../lib/assets/LJBKarl.webp";
import kim from "../lib/assets/LJBKim.webp";

const pillars = [
  {
    title: "Giving musicians a place to keep growing as artists",
    body: "Our members don't just play, they contribute their own arrangements and compositions and we help local composers rehearse new works.",
  },
  {
    title:
      "Making America's own music enjoyable and accessible to a wide audience",
    body: 'In addition to classic big band arrangements by the greats, we also program some unexpected "jazz" adaptations such as tunes by Rolling Stones and Stevie Wonder. Our summer 2024 show, BIG BAND: Small Screen featured jazz renditions of music from cartoons and television.',
  },
  {
    title: "Honoring the richness of jazz music and its history",
    body: "Jazz is America's very own music. Participating in keeping it alive and growing is a wonderful way to remind all of us just how important it is to keep instrumental music in our schools. Learning music is not easy, but is a lifelong practice and a gift that should be accessible to everyone. This music provides an accessible point of entry for listeners of all ages and backgrounds.",
  },
];

// Always open on desktop; collapsible on mobile.
const Pillar = ({ title, body }: { title: string; body: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="ljb-card flex flex-col gap-3 p-5 md:p-6">
      {/* Short gold rule tops each pillar */}
      <div className="h-px w-6 bg-ljb-gold" />
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-start gap-3 rounded-none bg-transparent p-0 text-left md:pointer-events-none"
      >
        <span className="flex-1 font-roboto font-bold leading-snug text-ljb-cream">
          {title}
        </span>
        <ChevronDown
          size={18}
          className={`mt-0.5 shrink-0 text-ljb-gold transition-transform md:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <p
        className={`${open ? "block" : "hidden"} text-sm font-light leading-relaxed text-ljb-cream/75 md:block`}
      >
        {body}
      </p>
    </div>
  );
};

const OurMission = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
      <div className="flex flex-col items-center gap-8">
        <PageHeader eyebrow="About the band" title="Our Mission" />
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          <img
            src={rob}
            alt="The LJB saxophone section"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
          />
          <img
            src={kim}
            alt="The Library Jazz Band in performance"
            className="hidden aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_12px_30px_rgba(0,0,0,0.45)] sm:block"
          />
          <img
            src={karl}
            alt="A Library Jazz Band musician on stage"
            className="hidden aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_12px_30px_rgba(0,0,0,0.45)] sm:block"
          />
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-4 md:items-center md:text-center">
        <h2 className="font-bebasNeue text-3xl tracking-wide md:text-4xl">
          LJB: A Jazz Orchestra for the Community
        </h2>
        <p className="font-light leading-relaxed text-ljb-cream/80">
          LJB was created in 2021 to address a gap in the musical landscape by
          reviving the big band tradition in their community. We are a dynamic
          17-piece jazz orchestra, featuring five saxophones, four trombones,
          four trumpets, piano, bass, drums, plus conductor. Our collective of
          seasoned professionals and passionate, experienced amateurs is united
          by a shared love for the big band format and our commitment to
          bringing vibrant, live jazz music to the community.
        </p>
      </div>

      <div className="ljb-hairline mx-auto my-12 max-w-3xl" />

      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {pillars.map((pillar) => (
          <Pillar key={pillar.title} {...pillar} />
        ))}
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link to="/our-musicians" className="ljb-pill-gold">
          Meet the musicians
        </Link>
        <Link to="/events" className="ljb-pill-ghost">
          See a show
        </Link>
      </div>
    </div>
  );
};

export default OurMission;
