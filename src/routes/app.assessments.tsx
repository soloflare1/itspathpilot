import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Check, X, RotateCcw, ClipboardCheck, Trophy } from "lucide-react";
import { quiz, topicById } from "@/lib/data";
import { recordQuiz, scoreQuiz } from "@/lib/store";
import { Card, PageHeader, Bar } from "@/components/pp/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/assessments")({
  head: () => ({ meta: [{ title: "Diagnostic Assessment — PathPilot" }, { name: "description", content: "A short Mathematics diagnostic that pinpoints knowledge gaps." }, { property: "og:title", content: "Diagnostic Assessment — PathPilot" }, { property: "og:description", content: "Find your gaps in six questions." }] }),
  component: Assessment,
});

function Assessment() {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(quiz.map(() => null));
  const [done, setDone] = useState(false);
  const q = quiz[i]!;
  const answered = answers.filter((a) => a !== null).length;

  const submit = () => {
    if (answered < quiz.length && !confirm(`You have ${quiz.length - answered} unanswered question(s). Submit anyway?`)) return;
    const { score, perTopic } = scoreQuiz(answers);
    recordQuiz(score, perTopic);
    setDone(true);
    toast.success("Assessment submitted", { description: "Your knowledge map has been updated." });
  };
  const reset = () => { setAnswers(quiz.map(() => null)); setI(0); setDone(false); setStarted(true); };

  if (!started) return (
    <>
      <PageHeader title="Assessments" sub="Diagnostics that trace mistakes back to their root concept" />
      <Card className="mx-auto max-w-xl p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-brand shadow-glow"><ClipboardCheck className="size-6 text-primary-foreground" /></span>
        <h2 className="mt-5 text-xl font-semibold">Mathematics Diagnostic</h2>
        <p className="mt-2 text-sm text-muted-foreground">{quiz.length} multiple-choice questions · about 5 minutes · covers Arithmetic to Functions</p>
        <button onClick={() => setStarted(true)} className="mt-6 rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground">Start assessment</button>
      </Card>
    </>
  );

  if (done) {
    const { score, perTopic } = scoreQuiz(answers);
    const weak = Object.entries(perTopic).filter(([, r]) => r.c < r.t).map(([id]) => topicById(id));
    const pct = Math.round((score / quiz.length) * 100);
    return (
      <>
        <PageHeader title="Your Results" sub="Mathematics Diagnostic" />
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <Card className="text-center">
            <Trophy className="mx-auto size-8 text-warning" />
            <p className="mt-3 font-display text-5xl font-semibold">{score}<span className="text-2xl text-muted-foreground">/{quiz.length}</span></p>
            <p className="mt-1 text-sm text-muted-foreground">{pct}% correct</p>
            <div className="mt-4"><Bar value={pct} /></div>
            <p className="mt-6 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Suggested revision</p>
            <div className="mt-2 space-y-2 text-left">
              {weak.length ? weak.map((t) => <Link key={t.id} to="/app/map" search={{ topic: t.id }} className="block rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm hover:border-warning">{t.title}</Link>) : <p className="text-sm text-success">No gaps found — great work!</p>}
            </div>
            <button onClick={reset} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm hover:bg-accent"><RotateCcw className="size-4" />Retake</button>
          </Card>
          <Card>
            <h3 className="mb-4 font-semibold">Answer review</h3>
            <div className="space-y-3">
              {quiz.map((qq, k) => { const ok = answers[k] === qq.answer; return (
                <div key={k} className={cn("rounded-xl border p-4", ok ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5")}>
                  <div className="flex items-start gap-3">
                    <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", ok ? "bg-success" : "bg-destructive")}>{ok ? <Check className="size-3 text-background" /> : <X className="size-3 text-background" />}</span>
                    <div className="text-sm"><p className="font-medium">{qq.q}</p>
                      <p className="mt-1 text-muted-foreground">Your answer: {answers[k] !== null ? qq.options[answers[k]!] : "—"}{!ok && <> · Correct: <span className="text-success">{qq.options[qq.answer]}</span></>}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Concept: {topicById(qq.topic).title}</p></div>
                  </div>
                </div>
              ); })}
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Mathematics Diagnostic" sub={`Question ${i + 1} of ${quiz.length} · ${answered} answered`} />
      <Card className="mx-auto max-w-2xl p-6 sm:p-8">
        <div className="flex gap-1.5">
          {quiz.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Question ${k + 1}`} className={cn("h-1.5 flex-1 rounded-full transition", k === i ? "bg-primary" : answers[k] !== null ? "bg-cyan/60" : "bg-muted")} />)}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Concept: {topicById(q.topic).title}</p>
        <h2 key={i} className="mt-2 text-xl font-semibold animate-in fade-in">{q.q}</h2>
        <div className="mt-6 grid gap-3">
          {q.options.map((o, k) => (
            <button key={k} onClick={() => setAnswers((a) => a.map((x, j) => (j === i ? k : x)))}
              className={cn("flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition", answers[i] === k ? "border-primary bg-primary/10" : "border-border hover:border-primary/40 hover:bg-accent/40")}>
              <span className={cn("grid size-7 place-items-center rounded-lg text-xs font-semibold", answers[i] === k ? "bg-primary text-primary-foreground" : "bg-muted")}>{"ABCD"[k]}</span>{o}
            </button>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <button disabled={i === 0} onClick={() => setI(i - 1)} className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"><ChevronLeft className="size-4" />Previous</button>
          {i < quiz.length - 1
            ? <button onClick={() => setI(i + 1)} className="flex items-center gap-1 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background">Next<ChevronRight className="size-4" /></button>
            : <button onClick={submit} className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-primary-foreground">Submit</button>}
        </div>
      </Card>
    </>
  );
}
