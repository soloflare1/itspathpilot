import { createFileRoute, Link } from "@tanstack/react-router";
import { ResponsiveContainer, BarChart, Bar as RBar, XAxis, Tooltip, CartesianGrid } from "recharts";
import { Gauge, CheckCircle2, Flame, Clock, ArrowRight, PlayCircle, BookOpen, ClipboardCheck, RotateCcw, Unlock } from "lucide-react";
import { toast } from "sonner";
import { topics, statusMeta, weekly, recentActivity } from "@/lib/data";
import { useStore, overallMastery, studyTopic } from "@/lib/store";
import { Card, CardTitle, Bar, PageHeader, tooltipStyle } from "@/components/pp/ui";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview — PathPilot" }, { name: "description", content: "Your mastery, streak, and next steps at a glance." }, { property: "og:title", content: "Overview — PathPilot" }, { property: "og:description", content: "Your mastery, streak, and next steps." }] }),
  component: Overview,
});

const kindIcon = { lesson: BookOpen, quiz: ClipboardCheck, review: RotateCcw, unlock: Unlock };

function Overview() {
  const s = useStore();
  const completed = Object.values(s.status).filter((x) => x === "mastered").length;
  const mins = weekly.reduce((a, b) => a + b.minutes, 0);
  const current = topics.find((t) => s.status[t.id] === "progress") ?? topics.find((t) => s.status[t.id] === "improve")!;
  const next = topics.filter((t) => s.status[t.id] === "improve" || s.status[t.id] === "progress").sort((a, b) => s.mastery[a.id]! - s.mastery[b.id]!);

  const stats = [
    { icon: Gauge, label: "Overall Mastery", value: `${overallMastery(s)}%`, sub: "+8% this month", c: "text-violet" },
    { icon: CheckCircle2, label: "Topics Completed", value: `${completed}/${topics.length}`, sub: "Mathematics track", c: "text-success" },
    { icon: Flame, label: "Learning Streak", value: `${s.streak} days`, sub: "Best: 21 days", c: "text-warning" },
    { icon: Clock, label: "Weekly Study", value: `${(mins / 60).toFixed(1)} h`, sub: `${Math.round((mins / 315) * 100)}% of 5.25h goal`, c: "text-cyan" },
  ];

  return (
    <>
      <PageHeader title="Welcome back, Aisha" sub="Here's where your learning stands today." right={<Link to="/app/assessments" className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground">Take diagnostic</Link>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((x) => (
          <Card key={x.label}>
            <div className="flex items-center justify-between text-xs text-muted-foreground">{x.label}<x.icon className={`size-4 ${x.c}`} /></div>
            <p className="mt-3 font-display text-2xl font-semibold">{x.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{x.sub}</p>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardTitle title="Knowledge Gap Snapshot" sub="Topic-wise mastery · Mathematics" right={<Link to="/app/map" className="text-xs text-primary hover:underline">Open map</Link>} />
          <div className="space-y-4">
            {topics.map((t) => {
              const st = statusMeta[s.status[t.id]!];
              return (
                <div key={t.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm"><span>{t.title}</span><span className="flex items-center gap-3"><span className={`text-xs ${st.color}`}>{st.label}</span><span className="w-9 text-right text-xs text-muted-foreground">{s.mastery[t.id]}%</span></span></div>
                  <Bar value={s.mastery[t.id]!} className={st.bg} />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/20 blur-3xl" />
          <CardTitle title="Continue Learning" sub="Picked up where you left off" />
          <span className="grid size-11 place-items-center rounded-xl bg-accent"><PlayCircle className="size-5 text-cyan" /></span>
          <p className="mt-4 font-semibold">{current.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{current.description}</p>
          <div className="mt-5 mb-2 flex justify-between text-xs"><span className="text-muted-foreground">Progress</span><span>{s.mastery[current.id]}%</span></div>
          <Bar value={s.mastery[current.id]!} />
          <button onClick={() => { studyTopic(current.id); toast.success(`Lesson completed: ${current.title}`, { description: "+8% mastery (simulated)" }); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 text-sm font-semibold text-background hover:opacity-90">Continue <ArrowRight className="size-4" /></button>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardTitle title="Recommended Next Steps" sub="Ordered by prerequisite impact" />
          <div className="space-y-2">
            {next.slice(0, 3).map((t, i) => (
              <Link key={t.id} to="/app/map" search={{ topic: t.id }} className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary/40 hover:bg-accent/40">
                <span className="grid size-7 place-items-center rounded-lg bg-primary/15 text-xs font-semibold text-primary">{i + 1}</span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{t.title}</p><p className="text-xs text-muted-foreground">{t.minutes} min · {t.difficulty}</p></div>
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle title="Weekly Activity" sub="Minutes studied per day" />
          <div className="h-52">
            <ResponsiveContainer>
              <BarChart data={weekly}><CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
                <RBar dataKey="minutes" fill="var(--violet)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardTitle title="Recent Activity" />
          <div className="space-y-4">
            {recentActivity.map((a) => { const I = kindIcon[a.kind as keyof typeof kindIcon]; return (
              <div key={a.title} className="flex gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted"><I className="size-4 text-muted-foreground" /></span><div><p className="text-sm">{a.title}</p><p className="text-xs text-muted-foreground">{a.time}</p></div></div>
            ); })}
          </div>
        </Card>
      </div>
    </>
  );
}
