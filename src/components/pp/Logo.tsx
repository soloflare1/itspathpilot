import { Link } from "@tanstack/react-router";
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="PathPilot home">
      <span className="relative grid size-8 place-items-center rounded-lg bg-brand shadow-glow">
        <svg viewBox="0 0 24 24" className="size-4.5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="18" r="2" /><circle cx="19" cy="6" r="2" /><path d="M7 17c4-1 3-9 10-10" />
        </svg>
      </span>
      {!compact && <span className="font-display text-[17px] font-semibold tracking-tight">Path<span className="text-gradient">Pilot</span></span>}
    </Link>
  );
}
export function SampleBadge({ label = "Sample data" }: { label?: string }) {
  return <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warning">{label}</span>;
}
