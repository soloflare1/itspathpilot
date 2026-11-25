import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Card, CardTitle, PageHeader } from "@/components/pp/ui";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — PathPilot" }, { name: "description", content: "Manage your PathPilot profile and learning preferences." }, { property: "og:title", content: "Settings — PathPilot" }, { property: "og:description", content: "Profile and preferences." }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Aisha Rahman");
  const [goal, setGoal] = useState("45");
  const [prefs, setPrefs] = useState({ reminders: true, weekly: true, sounds: false });
  return (
    <>
      <PageHeader title="Settings" sub="Changes are kept in this browser session only" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle title="Profile" />
          <label className="block text-xs text-muted-foreground">Display name<input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-muted/50 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary" /></label>
          <label className="mt-4 block text-xs text-muted-foreground">Daily study goal (minutes)
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-muted/50 px-3 py-2.5 text-sm text-foreground">{["30", "45", "60", "90"].map((g) => <option key={g}>{g}</option>)}</select></label>
          <button onClick={() => toast.success("Profile saved", { description: `${name} · ${goal} min/day` })} className="mt-5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground">Save changes</button>
        </Card>
        <Card>
          <CardTitle title="Notifications" />
          {([["reminders", "Daily study reminders"], ["weekly", "Weekly progress report"], ["sounds", "Sound effects"]] as const).map(([k, l]) => (
            <div key={k} className="flex items-center justify-between border-b border-border py-3.5 last:border-0"><span className="text-sm">{l}</span>
              <Switch checked={prefs[k]} onCheckedChange={(v) => { setPrefs({ ...prefs, [k]: v }); toast(`${l} ${v ? "enabled" : "disabled"}`); }} /></div>
          ))}
        </Card>
      </div>
    </>
  );
}
