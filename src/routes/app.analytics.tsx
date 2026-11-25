import { createFileRoute, Link } from "@tanstack/react-router";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar as RBar, RadialBarChart, RadialBar, PolarRadiusAxis } from "recharts";
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import { topics, weekly, subjects, progressOverTime } from "@/lib/data";
import { useStore, overallMastery } from "@/lib/store";
import { Card, CardTitle, PageHeader, Bar, tooltipStyle } from "@/components/pp/ui";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Learning Analytics — PathPilot" }, { name: "description", content: "Mastery trends, subject performance and learning goals." }, { property: "og:title", content: "Learning Analytics — PathPilot" }, { property: "og:description", content: "See your learning story in data." }] }),
  component: Analytics,
});

const axis = { tickLine: false, axisLine: false, tick: { fill: "var(--muted-foreground)", fontSize: 11 } };

function Analytics() {
  const s = useStore();
  const o = overallMastery(s);
  const ranked = [...topics].filter((t) => s.status[t.id] !== "locked").sort((a, b) => s.mastery[b.id]! - s.mastery[a.id]!);
  const goals = [
    { t: "Reach 60% in Linear Equations", v: Math.min(100, Math.round((s.mastery.lin! / 60) * 100)) },
    { t: "Study 5 hours this week", v: 82 },
    { t: "Complete 2 diagnostics", v: s.lastScore !== null ? 100 : 50 },
  ];
  return (
    <>
      <PageHeader title="Learning Analytics" sub="All figures are sample data for demonstration" />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardTitle title="Overall Mastery" sub="Across Mathematics" />
          <div className="relative h-52">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="72%" outerRadius="100%" data={[{ v: o }]} startAngle={90} endAngle={-270}>
                <PolarRadiusAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
                <RadialBar dataKey="v" cornerRadius={20} fill="var(--violet)" background={{ fill: "var(--muted)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center"><div className="text-center"><p className="font-display text-4xl font-semibold">{o}%</p><p className="text-xs text-success">+28 pts in 8 weeks</p></div></div>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <CardTitle title="Learning Progress Over Time" sub="Weekly mastery average" />
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={progressOverTime}>
                <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--cyan)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--cyan)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="week" {...axis} /><YAxis {...axis} width={30} />
                <Tooltip contentStyle={tooltipStyle} /><Area dataKey="mastery" stroke="var(--cyan)" strokeWidth={2} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardTitle title="Subject-wise Performance" />
          <div className="h-60">
            <ResponsiveContainer>
              <RadarChart data={subjects}><PolarGrid stroke="var(--border)" /><PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                <Radar dataKey="score" stroke="var(--violet)" fill="var(--violet)" fillOpacity={0.3} /></RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <CardTitle title="Weekly Learning Activity" sub="Minutes studied vs. 45-min daily goal" />
          <div className="h-60">
            <ResponsiveContainer>
              <BarChart data={weekly}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="day" {...axis} /><YAxis {...axis} width={30} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)" }} />
                <RBar dataKey="goal" fill="var(--muted)" radius={[6, 6, 0, 0]} /><RBar dataKey="minutes" fill="var(--cyan)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <CardTitle title="Strongest Topics" right={<TrendingUp className="size-4 text-success" />} />
          <div className="space-y-3">{ranked.slice(0, 3).map((t) => <div key={t.id}><div className="mb-1 flex justify-between text-sm"><span>{t.title}</span><span className="text-muted-foreground">{s.mastery[t.id]}%</span></div><Bar value={s.mastery[t.id]!} className="bg-success" /></div>)}</div>
        </Card>
        <Card>
          <CardTitle title="Requires Improvement" right={<TrendingDown className="size-4 text-warning" />} />
          <div className="space-y-3">{ranked.slice(-3).reverse().map((t) => <Link key={t.id} to="/app/map" search={{ topic: t.id }} className="block"><div className="mb-1 flex justify-between text-sm"><span>{t.title}</span><span className="text-muted-foreground">{s.mastery[t.id]}%</span></div><Bar value={s.mastery[t.id]!} className="bg-warning" /></Link>)}</div>
        </Card>
        <Card>
          <CardTitle title="Next Learning Goals" right={<Target className="size-4 text-primary" />} />
          <div className="space-y-3">{goals.map((g) => <div key={g.t}><div className="mb-1 flex justify-between text-sm"><span>{g.t}</span><span className="text-muted-foreground">{g.v}%</span></div><Bar value={g.v} /></div>)}</div>
        </Card>
      </div>
    </>
  );
}
