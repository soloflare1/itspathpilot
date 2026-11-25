import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight, Compass, EyeOff, Route as RouteIcon, Radar, Map, LineChart, Target, ClipboardCheck,
  Network, Gauge, Sparkles, Menu, X, Check, Boxes, Link2, FlaskConical, Flame, TrendingUp,
} from "lucide-react";
import { Logo, SampleBadge } from "@/components/pp/Logo";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PathPilot — Personalized Learning Roadmaps & Knowledge Gap Discovery" },
      { name: "description", content: "Discover what you know, uncover what you don't, and follow a learning roadmap designed around your knowledge." },
      { property: "og:title", content: "PathPilot — Your Learning Journey, Finally Understood" },
      { property: "og:description", content: "Find your gaps. Follow your path. Own your future." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const nav = [
  { label: "Home", href: "#top" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Technology", href: "#technology" },
];

function Landing() {
  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  return (
    <div id="top" className="relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] grid-bg opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {nav.map((n) => <a key={n.href} href={n.href} className="transition-colors hover:text-foreground">{n.label}</a>)}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <button onClick={() => setSignIn(true)} className="rounded-lg px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground">Sign In</button>
            <Link to="/app" className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90">Get Started</Link>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <div className="border-t border-border px-5 py-4 md:hidden animate-in slide-in-from-top-2">
            {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2.5 text-sm">{n.label}</a>)}
            <div className="mt-3 flex gap-2">
              <button onClick={() => { setOpen(false); setSignIn(true); }} className="flex-1 rounded-lg border border-border py-2 text-sm">Sign In</button>
              <Link to="/app" className="flex-1 rounded-lg bg-foreground py-2 text-center text-sm font-semibold text-background">Get Started</Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-cyan" /> AetherMind 2026 · EdTech prototype
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[56px]">
            Your Learning Journey, <span className="text-gradient">Finally Understood.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Discover what you know, uncover what you don't, and follow a learning roadmap designed around your knowledge.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/app/roadmap" className="group inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110">
              Explore Your Roadmap <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a href="#how" className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-semibold hover:bg-accent">See How It Works</a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            {["No sign-up needed for demo", "Frontend prototype", "Sample data"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><Check className="size-3.5 text-success" />{t}</span>
            ))}
          </div>
        </div>
        <HeroPreview />
      </section>

      {/* PROBLEM */}
      <Section eyebrow="The problem" title="Students work hard. Just not always on the right things.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Compass, t: "Studying without direction", d: "Hours spent re-reading chapters with no sense of what actually moves the needle." },
            { icon: EyeOff, t: "Hidden knowledge gaps", d: "A shaky grasp of fractions quietly sabotages algebra months later." },
            { icon: RouteIcon, t: "No clear progression", d: "Syllabi list topics, but not the order that fits what you already know." },
          ].map((p) => (
            <div key={p.t} className="rounded-2xl border border-border bg-card p-6">
              <p.icon className="size-5 text-destructive" />
              <h3 className="mt-4 font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SOLUTION */}
      <Section eyebrow="The solution" title="One platform that sees your knowledge as a connected map.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Radar, t: "Knowledge Gap Discovery", d: "Diagnostics trace wrong answers back to the prerequisite concept causing them.", c: "text-violet" },
            { icon: Map, t: "Personalized Learning Roadmap", d: "An ordered path through exactly the topics you need, nothing you've already mastered.", c: "text-cyan" },
            { icon: LineChart, t: "Continuous Progress Tracking", d: "Mastery updates as you learn, so your roadmap always reflects where you are today.", c: "text-success" },
          ].map((p) => (
            <div key={p.t} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40">
              <div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
              <span className="grid size-10 place-items-center rounded-xl bg-accent"><p.icon className={`size-5 ${p.c}`} /></span>
              <h3 className="mt-5 font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW */}
      <Section id="how" eyebrow="How it works" title="Three steps from confusion to clarity.">
        <div className="relative grid gap-6 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent md:block" />
          {[
            { n: "01", icon: ClipboardCheck, t: "Assess", d: "Take a short diagnostic that evaluates your understanding topic by topic." },
            { n: "02", icon: Target, t: "Discover", d: "See exactly which concepts are mastered, shaky, or missing entirely." },
            { n: "03", icon: TrendingUp, t: "Progress", d: "Follow your roadmap, close gaps in order, and watch mastery grow." },
          ].map((s) => (
            <div key={s.n} className="relative">
              <span className="relative z-10 grid size-14 place-items-center rounded-2xl border border-primary/40 bg-background shadow-glow"><s.icon className="size-6 text-primary" /></span>
              <p className="mt-6 font-mono text-xs text-muted-foreground">{s.n}</p>
              <h3 className="mt-1 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FEATURES */}
      <Section id="features" eyebrow="Features" title="Everything you need to learn what matters next.">
        <div className="grid gap-4 md:grid-cols-6">
          <Feature className="md:col-span-4" icon={Network} title="Knowledge Mapping" desc="Every concept connected to its prerequisites, so gaps are visible at a glance." to="/app/map">
            <MiniMap />
          </Feature>
          <Feature className="md:col-span-2" icon={Gauge} title="Topic Mastery" desc="Precise, per-topic mastery scores." to="/app">
            <div className="space-y-2.5">
              {[["Fractions", 82, "bg-success"], ["Algebra", 61, "bg-cyan"], ["Linear Eq.", 38, "bg-warning"]].map(([l, v, c]) => (
                <div key={l as string}><div className="mb-1 flex justify-between text-xs"><span>{l}</span><span className="text-muted-foreground">{v}%</span></div>
                  <div className="h-1.5 rounded-full bg-muted"><div className={`h-full rounded-full ${c}`} style={{ width: `${v}%` }} /></div></div>
              ))}
            </div>
          </Feature>
          <Feature className="md:col-span-2" icon={RouteIcon} title="Smart Roadmaps" desc="An ordered path built around you." to="/app/roadmap">
            <div className="space-y-2">
              {["Algebra Foundations", "Linear Equations", "Functions"].map((t, i) => (
                <div key={t} className="flex items-center gap-2 rounded-lg bg-muted/60 px-3 py-2 text-xs"><span className="grid size-5 place-items-center rounded-full bg-primary/20 text-[10px] text-primary">{i + 1}</span>{t}</div>
              ))}
            </div>
          </Feature>
          <Feature className="md:col-span-2" icon={ClipboardCheck} title="Interactive Assessments" desc="Diagnostics that pinpoint gaps." to="/app/assessments">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {["7/8", "4/12", "1/2", "5/8"].map((o, i) => <div key={o} className={`rounded-lg border px-3 py-2 ${i === 0 ? "border-success/50 bg-success/10 text-success" : "border-border"}`}>{o}</div>)}
            </div>
          </Feature>
          <Feature className="md:col-span-2" icon={LineChart} title="Learning Analytics" desc="Trends that tell a story." to="/app/analytics">
            <div className="flex h-20 items-end gap-1.5">
              {[30, 42, 38, 55, 48, 66, 72].map((h, i) => <div key={i} className="flex-1 rounded-t bg-brand opacity-80" style={{ height: `${h}%` }} />)}
            </div>
          </Feature>
        </div>
      </Section>

      {/* TECH */}
      <Section id="technology" eyebrow="Future technology" title="A roadmap for intelligent learning.">
        <p className="-mt-6 mb-8 max-w-2xl text-sm text-muted-foreground">
          The current prototype uses rule-based logic and sample data only. The technologies below are <strong className="text-foreground">proposed future integrations</strong> — none are implemented or called in this demo.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkles, t: "Google Gemini", d: "Adaptive explanations and question generation tailored to each gap." },
            { icon: Boxes, t: "Hugging Face", d: "Open models for classifying misconceptions from student answers." },
            { icon: Link2, t: "LangChain", d: "Orchestrating multi-step tutoring flows across learning resources." },
            { icon: FlaskConical, t: "Google AI Studio", d: "Rapid prototyping and evaluation of tutoring prompts." },
          ].map((t) => (
            <div key={t.t} className="rounded-2xl border border-dashed border-border bg-card/50 p-6">
              <div className="flex items-center justify-between"><t.icon className="size-5 text-cyan" /><SampleBadge label="Planned" /></div>
              <h3 className="mt-4 font-semibold">{t.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 p-10 text-center sm:p-16">
          <div className="absolute inset-0 bg-brand opacity-[0.12]" />
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="relative">
            <h2 className="text-3xl font-semibold sm:text-4xl">Your next learning breakthrough starts here.</h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">Take the diagnostic, see your knowledge map, and get a path you can actually follow.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/app" className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background">Open the dashboard <ArrowRight className="size-4" /></Link>
              <Link to="/app/assessments" className="rounded-xl glass px-5 py-3 text-sm font-semibold hover:bg-accent">Take the diagnostic</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">Find your gaps. Follow your path. Own your future.</p>
          </div>
          <div className="text-sm"><p className="font-semibold">Product</p>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <Link to="/app" className="block hover:text-foreground">Dashboard</Link>
              <Link to="/app/map" className="block hover:text-foreground">Knowledge Map</Link>
              <Link to="/app/roadmap" className="block hover:text-foreground">Roadmap</Link>
            </div></div>
          <div className="text-sm"><p className="font-semibold">Project</p>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <a href="#how" className="block hover:text-foreground">How It Works</a>
              <a href="#technology" className="block hover:text-foreground">Technology</a>
              <span className="block">AetherMind 2026 · EdTech</span>
            </div></div>
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">© 2026 PathPilot. Frontend prototype — all data shown is sample data.</div>
      </footer>

      <Dialog open={signIn} onOpenChange={setSignIn}>
        <DialogContent className="border-border bg-popover">
          <DialogHeader>
            <DialogTitle>Sign in to PathPilot</DialogTitle>
            <DialogDescription>This prototype has no real accounts. Continue as the demo student to explore with sample data.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <input disabled value="aisha.rahman@demo.pathpilot" className="w-full rounded-lg border border-input bg-muted px-3 py-2.5 text-sm text-muted-foreground" />
            <Link to="/app" onClick={() => toast.success("Signed in as demo student")} className="block w-full rounded-lg bg-brand py-2.5 text-center text-sm font-semibold text-primary-foreground">Continue as Demo Student</Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">{eyebrow}</p>
      <h2 className="mt-3 mb-12 max-w-2xl text-3xl font-semibold leading-tight sm:text-[34px]">{title}</h2>
      {children}
    </section>
  );
}

function Feature({ className, icon: Icon, title, desc, to, children }: { className?: string; icon: typeof Network; title: string; desc: string; to: "/app" | "/app/map" | "/app/roadmap" | "/app/assessments" | "/app/analytics"; children: React.ReactNode }) {
  return (
    <Link to={to} className={`group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/40 ${className}`}>
      <div className="flex items-center gap-2"><Icon className="size-4 text-primary" /><h3 className="font-semibold">{title}</h3><ArrowRight className="ml-auto size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" /></div>
      <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-6 flex-1">{children}</div>
    </Link>
  );
}

function MiniMap() {
  const n = [[8, 50, "bg-success"], [28, 25, "bg-success"], [48, 60, "bg-cyan"], [68, 28, "bg-warning"], [88, 55, "bg-warning"]] as const;
  return (
    <div className="relative h-36">
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {n.slice(1).map((p, i) => <line key={i} x1={n[i]![0]} y1={n[i]![1]} x2={p[0]} y2={p[1]} stroke="var(--primary)" strokeOpacity=".5" strokeDasharray="2 1.5" vectorEffect="non-scaling-stroke" />)}
      </svg>
      {n.map(([x, y, c], i) => <span key={i} className={`absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-background ${c}`} style={{ left: `${x}%`, top: `${y}%` }} />)}
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="relative animate-in fade-in zoom-in-95 duration-700">
      <div className="rounded-2xl glass p-4 shadow-glow">
        <div className="flex items-center gap-1.5 pb-3"><span className="size-2.5 rounded-full bg-muted" /><span className="size-2.5 rounded-full bg-muted" /><span className="size-2.5 rounded-full bg-muted" /><span className="ml-3 text-[11px] text-muted-foreground">pathpilot.app/roadmap</span></div>
        <div className="rounded-xl border border-border bg-background/80 p-5">
          <div className="flex items-center justify-between"><p className="text-sm font-semibold">Mathematics Roadmap</p><SampleBadge /></div>
          <div className="mt-5 space-y-3">
            {[
              ["Basic Arithmetic", "Mastered", 94, "bg-success"],
              ["Fractions", "Mastered", 82, "bg-success"],
              ["Algebra Foundations", "In progress", 61, "bg-cyan"],
              ["Linear Equations", "Gap detected", 38, "bg-warning"],
              ["Functions", "Up next", 22, "bg-warning"],
            ].map(([t, s, v, c], i) => (
              <div key={t as string} className="flex items-center gap-3">
                <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-bold text-background ${c}`}>{i + 1}</span>
                <div className="flex-1"><div className="flex justify-between text-xs"><span className="font-medium">{t}</span><span className="text-muted-foreground">{s}</span></div>
                  <div className="mt-1 h-1 rounded-full bg-muted"><div className={`h-full rounded-full ${c}`} style={{ width: `${v}%` }} /></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -left-6 -bottom-8 hidden w-48 rounded-xl glass p-4 shadow-glow animate-float sm:block">
        <p className="text-[11px] text-muted-foreground">Overall mastery</p>
        <p className="mt-1 font-display text-2xl font-semibold">62%<span className="ml-2 text-xs text-success">+8%</span></p>
        <div className="mt-2 flex h-8 items-end gap-1">{[40, 45, 42, 52, 55, 58, 62].map((h, i) => <div key={i} className="flex-1 rounded-sm bg-cyan/70" style={{ height: `${h * 0.5}px` }} />)}</div>
      </div>
      <div className="absolute -right-4 -top-6 hidden rounded-xl glass px-4 py-3 shadow-glow animate-float [animation-delay:1.5s] sm:block">
        <p className="flex items-center gap-2 text-xs"><Flame className="size-4 text-warning" /><span className="font-semibold">12-day streak</span></p>
      </div>
    </div>
  );
}
