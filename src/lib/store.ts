import { useSyncExternalStore } from "react";
import { topics, quiz, type NodeStatus } from "./data";

// Frontend-only state (resets on reload). No backend.
interface State {
  mastery: Record<string, number>;
  status: Record<string, NodeStatus>;
  lastScore: number | null;
  streak: number;
}
let state: State = {
  mastery: Object.fromEntries(topics.map((t) => [t.id, t.mastery])),
  status: Object.fromEntries(topics.map((t) => [t.id, t.status])),
  lastScore: null,
  streak: 12,
};
const subs = new Set<() => void>();
const set = (s: Partial<State>) => { state = { ...state, ...s }; subs.forEach((f) => f()); };

export function useStore() {
  return useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => state, () => state);
}

export function statusFor(m: number, prev: NodeStatus): NodeStatus {
  if (prev === "locked" && m === 0) return "locked";
  if (m >= 80) return "mastered";
  if (m >= 50) return "progress";
  return "improve";
}

export function studyTopic(id: string, gain = 8) {
  const m = Math.min(100, (state.mastery[id] ?? 0) + gain);
  const status = { ...state.status, [id]: statusFor(m, "progress") };
  // unlock quadratics when functions >= 60
  if ((id === "func" ? m : state.mastery["func"] ?? 0) >= 60 && status["quad"] === "locked") status["quad"] = "improve";
  set({ mastery: { ...state.mastery, [id]: m }, status });
}

export function recordQuiz(score: number, perTopic: Record<string, { c: number; t: number }>) {
  const mastery = { ...state.mastery };
  const status = { ...state.status };
  for (const [id, r] of Object.entries(perTopic)) {
    if (status[id] === "locked") continue;
    const pct = Math.round((r.c / r.t) * 100);
    mastery[id] = Math.round((mastery[id] ?? 0) * 0.7 + pct * 0.3);
    status[id] = statusFor(mastery[id]!, status[id]!);
  }
  set({ mastery, status, lastScore: score });
}

export const overallMastery = (s: State) => {
  const v = Object.values(s.mastery);
  return Math.round(v.reduce((a, b) => a + b, 0) / v.length);
};

export function scoreQuiz(answers: (number | null)[]) {
  const perTopic: Record<string, { c: number; t: number }> = {};
  let score = 0;
  quiz.forEach((q, i) => {
    const r = (perTopic[q.topic] ??= { c: 0, t: 0 });
    r.t++;
    if (answers[i] === q.answer) { r.c++; score++; }
  });
  return { score, perTopic };
}

