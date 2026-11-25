import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { LayoutDashboard, Route as RouteIcon, Network, ClipboardCheck, BarChart3, Settings, Bell, Search, Menu, X, LogOut } from "lucide-react";
import { Logo } from "@/components/pp/Logo";
import { topics } from "@/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "Dashboard — PathPilot" }, { name: "description", content: "Your PathPilot student dashboard." }] }),
  component: AppLayout,
});

const items = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/roadmap", label: "My Roadmap", icon: RouteIcon },
  { to: "/app/map", label: "Knowledge Map", icon: Network },
  { to: "/app/assessments", label: "Assessments", icon: ClipboardCheck },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

const notifications = [
  { t: "Gap detected in Linear Equations", d: "Recommended: review isolating variables", time: "1h" },
  { t: "You hit a 12-day streak", d: "Keep it going today", time: "5h" },
  { t: "New diagnostic available", d: "Algebra Foundations check-in", time: "1d" },
];

function AppLayout() {
  const [mobile, setMobile] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = q ? topics.filter((t) => t.title.toLowerCase().includes(q.toLowerCase())) : [];

  const Side = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5"><Logo /></div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {items.map((i) => (
          <Link key={i.to} to={i.to} onClick={() => setMobile(false)} activeOptions={{ exact: "exact" in i }}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 transition hover:bg-sidebar-accent hover:text-sidebar-foreground"
            activeProps={{ className: "bg-sidebar-accent !text-sidebar-foreground font-medium" }}>
            <i.icon className="size-4" />{i.label}
          </Link>
        ))}
      </nav>
      <div className="m-3 rounded-xl border border-border bg-brand/10 p-4">
        <p className="text-xs font-semibold">Prototype mode</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">All data is sample data. Progress resets on reload.</p>
      </div>
      <Link to="/" className="mx-3 mb-4 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent"><LogOut className="size-4" />Exit demo</Link>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">{Side}</aside>
      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setMobile(false)} />
          <aside className="relative h-full w-64 border-r border-sidebar-border bg-sidebar animate-in slide-in-from-left">
            <button className="absolute right-3 top-5" onClick={() => setMobile(false)} aria-label="Close menu"><X className="size-5" /></button>
            {Side}
          </aside>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/75 px-4 backdrop-blur-xl sm:px-6">
          <button className="lg:hidden" onClick={() => setMobile(true)} aria-label="Open menu"><Menu className="size-5" /></button>
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search topics…" className="w-full rounded-lg border border-input bg-muted/50 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary" />
            {q && (
              <div className="absolute mt-2 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-glow">
                {results.length ? results.map((r) => (
                  <button key={r.id} onClick={() => { setQ(""); navigate({ to: "/app/map", search: { topic: r.id } }); }} className="block w-full px-3 py-2 text-left text-sm hover:bg-accent">{r.title}</button>
                )) : <p className="px-3 py-3 text-sm text-muted-foreground">No topics match "{q}"</p>}
              </div>
            )}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Popover>
              <PopoverTrigger className="relative grid size-9 place-items-center rounded-lg hover:bg-accent" aria-label="Notifications">
                <Bell className="size-4.5" /><span className="absolute right-2 top-2 size-2 rounded-full bg-cyan" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 border-border bg-popover p-0">
                <p className="border-b border-border px-4 py-3 text-sm font-semibold">Notifications</p>
                {notifications.map((n) => (
                  <div key={n.t} className="border-b border-border/60 px-4 py-3 last:border-0"><div className="flex justify-between text-sm"><span>{n.t}</span><span className="text-xs text-muted-foreground">{n.time}</span></div><p className="text-xs text-muted-foreground">{n.d}</p></div>
                ))}
                <button onClick={() => toast("All notifications marked as read")} className="w-full py-2.5 text-xs text-primary hover:bg-accent">Mark all as read</button>
              </PopoverContent>
            </Popover>
            <Link to="/app/settings" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-brand text-xs font-bold text-primary-foreground">AR</span>
              <span className="hidden text-left sm:block"><span className="block text-sm font-medium leading-tight">Aisha Rahman</span><span className="block text-[11px] text-muted-foreground">Grade 9 · Demo</span></span>
            </Link>
          </div>
        </header>
        <main className={cn("mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300")}><Outlet /></main>
      </div>
    </div>
  );
}
