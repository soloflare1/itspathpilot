import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { MousePointerClick, ArrowRight } from "lucide-react";
import { KnowledgeGraph, Legend } from "@/components/pp/KnowledgeGraph";
import { topicById, statusMeta } from "@/lib/data";
import { useStore, studyTopic } from "@/lib/store";
import { Card, PageHeader, Bar } from "@/components/pp/ui";

export const Route = createFileRoute("/app/map")({
  validateSearch: (s: Record<string, unknown>): { topic?: string } => (typeof s.topic === "string" ? { topic: s.topic } : {}),
  head: () => ({ meta: [{ title: "Knowledge Map — PathPilot" }, { name: "description", content: "Interactive map of Mathematics concepts and their prerequisites." }, { property: "og:title", content: "Knowledge Map — PathPilot" }, { property: "og:description", content: "See how every concept connects." }] }),
  component: MapPage,
});

function MapPage() {
  const { topic } = Route.useSearch();
  const navigate = useNavigate({ from: "/app/map" });
  const s = useStore();
  const t = topic ? topicById(topic) : undefined;
  const st = t ? s.status[t.id]! : undefined;

  return (
    <>
      <PageHeader title="Knowledge Map" sub="Mathematics · arrows point from prerequisite to dependent concept" right={<Legend />} />
      <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <Card className="overflow-x-auto p-6">
          <div className="relative px-8 py-6"><div className="pointer-events-none absolute inset-0 grid-bg rounded-xl" /><KnowledgeGraph selected={topic} onSelect={(id) => navigate({ search: { topic: id } })} /></div>
        </Card>
        <Card className="h-fit">
          {t && st ? (
            <div key={t.id} className="animate-in fade-in slide-in-from-right-2">
              <span className={`text-xs font-semibold ${statusMeta[st].color}`}>{statusMeta[st].label}</span>
              <h2 className="mt-1 text-xl font-semibold">{t.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-5 mb-2 flex justify-between text-sm"><span className="text-muted-foreground">Mastery</span><span className="font-semibold">{s.mastery[t.id]}%</span></div>
              <Bar value={s.mastery[t.id]!} className={statusMeta[st].bg} />
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prerequisites</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {t.prereqs.length ? t.prereqs.map((p) => (
                  <button key={p} onClick={() => navigate({ search: { topic: p } })} className="rounded-md border border-border px-2.5 py-1 text-xs hover:border-primary">{topicById(p).title} · {s.mastery[p]}%</button>
                )) : <span className="text-xs text-muted-foreground">None — this is a foundation topic.</span>}
              </div>
              <div className="mt-5 rounded-xl border border-primary/30 bg-primary/10 p-3.5">
                <p className="text-xs font-semibold text-primary">Recommended action</p>
                <p className="mt-1 text-sm">{t.action}</p>
              </div>
              <button disabled={st === "locked"} onClick={() => { studyTopic(t.id); toast.success(`Practiced ${t.title}`, { description: "Mastery +8% (simulated)" }); }} className="mt-5 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40">
                {st === "locked" ? "Locked" : st === "mastered" ? "Review topic" : "Practice now"}
              </button>
              <Link to="/app/roadmap" className="mt-2 flex items-center justify-center gap-1 py-2 text-xs text-muted-foreground hover:text-foreground">View in roadmap <ArrowRight className="size-3" /></Link>
            </div>
          ) : (
            <div className="py-10 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-accent"><MousePointerClick className="size-5 text-primary" /></span>
              <p className="mt-4 font-semibold">Select a concept</p>
              <p className="mt-1 text-sm text-muted-foreground">Click any node to see mastery, prerequisites and what to do next.</p>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
