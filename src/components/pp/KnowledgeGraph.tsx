import { topics, statusMeta } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Lock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function KnowledgeGraph({ selected, onSelect }: { selected?: string | undefined; onSelect?: (id: string) => void }) {
  const s = useStore();
  return (
    <div className="relative aspect-[16/10] w-full min-w-[560px]">
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0L10 5L0 10z" fill="var(--muted-foreground)" />
          </marker>
        </defs>
        {topics.flatMap((t) =>
          t.prereqs.map((p) => {
            const a = topics.find((x) => x.id === p)!;
            const active = selected === t.id || selected === p;
            return (
              <line key={p + t.id} x1={a.x} y1={a.y} x2={t.x} y2={t.y}
                stroke={active ? "var(--cyan)" : "var(--muted-foreground)"}
                strokeOpacity={active ? 0.9 : 0.35} strokeWidth={active ? 0.5 : 0.3}
                strokeDasharray={s.status[t.id] === "locked" ? "1.5 1.5" : "2 1"}
                className={active ? "animate-dash" : ""} vectorEffect="non-scaling-stroke" />
            );
          }),
        )}
      </svg>
      {topics.map((t) => {
        const st = s.status[t.id]!;
        const m = statusMeta[st];
        const pct = s.mastery[t.id]!;
        return (
          <button key={t.id} onClick={() => onSelect?.(t.id)}
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
            className={cn("absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 transition-transform hover:scale-105 focus:outline-none", selected === t.id && "scale-110")}>
            <span className={cn("relative grid size-14 place-items-center rounded-full border-2 bg-background font-display text-sm font-semibold", m.ring, selected === t.id && "shadow-glow ring-4 ring-primary/25")}>
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2.5" className={m.color}
                  strokeDasharray={`${pct * 0.974} 100`} strokeLinecap="round" />
              </svg>
              {st === "locked" ? <Lock className="size-4 text-muted-foreground" /> : st === "mastered" ? <Check className="size-5 text-success" /> : <span className={m.color}>{pct}%</span>}
            </span>
            <span className="whitespace-nowrap rounded-md glass px-2 py-0.5 text-xs font-medium">{t.title}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Legend() {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
      {Object.values(statusMeta).map((m) => (
        <span key={m.label} className="flex items-center gap-1.5"><span className={cn("size-2.5 rounded-full", m.bg)} />{m.label}</span>
      ))}
    </div>
  );
}
