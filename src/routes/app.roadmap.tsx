import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Clock, Signal, Lock, CheckCircle2, CircleDot, AlertTriangle } from "lucide-react";
import { topics, topicById, statusMeta, type Topic, type NodeStatus } from "@/lib/data";
import { useStore, studyTopic } from "@/lib/store";
import { PageHeader, Bar } from "@/components/pp/ui";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/roadmap")({
  head: () => ({ meta: [{ title: "My Roadmap — PathPilot" }, { name: "description", content: "Your personalized, prerequisite-ordered learning roadmap." }, { property: "og:title", content: "My Roadmap — PathPilot" }, { property: "og:description", content: "Follow the path built around your knowledge." }] }),
  component: Roadmap,
});

const icons: Record<NodeStatus, typeof Lock> = { mastered: CheckCircle2, progress: CircleDot, improve: AlertTriangle, locked: Lock };
const filters = ["all", "mastered", "progress", "improve", "locked"] as const;

function Roadmap() {
  const s = useStore();
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [detail, setDetail] = useState<Topic | null>(null);
  const list = topics.filter((t) => filter === "all" || s.status[t.id] === filter);
  const done = topics.filter((t) => s.status[t.id] === "mastered").length;

  return (
    <>
      <PageHeader title="My Roadmap" sub={`Mathematics · ${done} of ${topics.length} topics mastered`} />
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn("rounded-full border px-3.5 py-1.5 text-xs transition", filter === f ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
            {f === "all" ? "All topics" : statusMeta[f].label}
          </button>
        ))}
      </div>
      <ol className="relative space-y-4 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-border">
        {list.length === 0 && <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No topics in this state yet.</p>}
        {list.map((t) => {
          const st = s.status[t.id]!; const m = statusMeta[st]; const I = icons[st];
          return (
            <li key={t.id} className="relative flex gap-4 animate-in fade-in">
              <span className={cn("relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 bg-background", m.ring)}><I className={cn("size-4", m.color)} /></span>
              <div className={cn("flex-1 rounded-2xl border border-border bg-card p-5", st === "locked" && "opacity-60")}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2"><h3 className="font-semibold">{t.title}</h3><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", m.color, "bg-muted")}>{m.label}</span></div>
                    <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Signal className="size-3.5" />{t.difficulty}</span><span className="flex items-center gap-1"><Clock className="size-3.5" />{t.minutes} min</span></div>
                </div>
                <div className="mt-4 flex items-center gap-3"><div className="flex-1"><Bar value={s.mastery[t.id]!} className={m.bg} /></div><span className="w-10 text-right text-xs">{s.mastery[t.id]}%</span></div>
                <p className="mt-3 text-xs text-muted-foreground">Prerequisites: {t.prereqs.length ? t.prereqs.map((p) => topicById(p).title).join(", ") : "None"}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {st === "mastered" ? (
                    <button onClick={() => { studyTopic(t.id, 2); toast.success(`Reviewed ${t.title}`); }} className="rounded-lg border border-border px-3.5 py-2 text-xs font-semibold hover:bg-accent">Review Topic</button>
                  ) : (
                    <button disabled={st === "locked"} onClick={() => { studyTopic(t.id); toast.success(`Started ${t.title}`, { description: "Lesson completed · +8% mastery (simulated)" }); }} className="rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">{st === "locked" ? "Locked" : "Start Learning"}</button>
                  )}
                  <button onClick={() => setDetail(t)} className="rounded-lg px-3.5 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground">View Details</button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="border-border bg-popover">
          {detail && (<>
            <DialogHeader><DialogTitle>{detail.title}</DialogTitle><DialogDescription>{detail.description}</DialogDescription></DialogHeader>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[["Mastery", `${s.mastery[detail.id]}%`], ["Difficulty", detail.difficulty], ["Time", `${detail.minutes}m`]].map(([k, v]) => <div key={k} className="rounded-lg bg-muted p-3"><p className="text-[11px] text-muted-foreground">{k}</p><p className="mt-1 text-sm font-semibold">{v}</p></div>)}
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm">{detail.action}</div>
            <Link to="/app/map" search={{ topic: detail.id }} className="rounded-lg bg-foreground py-2.5 text-center text-sm font-semibold text-background">Open in Knowledge Map</Link>
          </>)}
        </DialogContent>
      </Dialog>
    </>
  );
}
