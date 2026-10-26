type ExpressDevLogoProps = {
  className?: string;
  markOnly?: boolean;
  light?: boolean;
};

const ExpressDevLogo = ({
  className = "",
  markOnly = false,
  light = false,
}: ExpressDevLogoProps) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <svg
      viewBox="0 0 40 40"
      className="h-9 w-9 shrink-0"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="8" fill="#0891B2" />
      <path
        d="M10 26V14h8.2c2.6 0 4.2 1.4 4.2 3.5 0 1.4-.8 2.5-2.1 3 .9.4 1.5 1.4 1.5 2.6 0 2.3-1.8 3.9-4.6 3.9H10zm3.1-9.4v2.8h4.5c1.1 0 1.8-.6 1.8-1.4s-.7-1.4-1.8-1.4h-4.5zm0 5.2v3h5c1.2 0 2-.6 2-1.5s-.8-1.5-2-1.5h-5z"
        fill="#F8FAFC"
      />
      <path d="M28 14h2.4v12H28V14z" fill="#FB923C" />
    </svg>
    {!markOnly ? (
      <div className="leading-none">
        <span
          className={`block font-display text-lg font-semibold tracking-tight ${
            light ? "text-white" : "text-foreground"
          }`}
        >
          Express<span className="text-primary"> Dev</span>
        </span>
        <span
          className={`mt-0.5 block text-[10px] font-medium uppercase tracking-[0.18em] ${
            light ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          Software &amp; GenAI
        </span>
      </div>
    ) : null}
  </div>
);

export default ExpressDevLogo;
