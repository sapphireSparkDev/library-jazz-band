// Centered page title: small gold label, cream title, gold hairline.
const PageHeader = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <span className="ljb-cap">{eyebrow}</span>
    <h1 className="font-bebasNeue text-5xl tracking-wide text-ljb-cream md:text-6xl">
      {title}
    </h1>
    <div className="ljb-hairline mt-1 w-36" />
  </div>
);

export default PageHeader;
