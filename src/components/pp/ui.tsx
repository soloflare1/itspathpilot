import { cn } from "@/lib/utils";
import { SampleBadge } from "./Logo";
export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>{children}</div>;
}
export function CardTitle({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return <div className="mb-5 flex items-start justify-between gap-3"><div><h3 className="font-semibold">{title}</h3>{sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}</div>{right}</div>;
}
export function PageHeader({ title, sub, right }: { title: string; sub: string; right?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div><div className="flex items-center gap-2"><h1 className="text-2xl font-semibold">{title}</h1><SampleBadge /></div><p className="mt-1 text-sm text-muted-foreground">{sub}</p></div>
      {right}
    </div>
  );
}
export function Bar({ value, className }: { value: number; className?: string }) {
  return <div className="h-2 overflow-hidden rounded-full bg-muted"><div className={cn("h-full rounded-full transition-all duration-700", className ?? "bg-brand")} style={{ width: `${value}%` }} /></div>;
}
export const tooltipStyle = { background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12, color: "var(--foreground)" };
