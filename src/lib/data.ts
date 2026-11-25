// All data in this file is SAMPLE DATA for the PathPilot prototype (AetherMind 2026).
export type NodeStatus = "mastered" | "progress" | "improve" | "locked";

export interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  mastery: number;
  status: NodeStatus;
  prereqs: string[];
  action: string;
  x: number;
  y: number;
}

export const topics: Topic[] = [
  { id: "arith", title: "Basic Arithmetic", description: "Operations, order of operations and number sense.", difficulty: "Beginner", minutes: 45, mastery: 94, status: "mastered", prereqs: [], action: "Mastered — use occasional spaced review to retain it.", x: 12, y: 50 },
  { id: "frac", title: "Fractions", description: "Equivalent fractions, operations and ratio reasoning.", difficulty: "Beginner", minutes: 60, mastery: 82, status: "mastered", prereqs: ["arith"], action: "Strong foundation. Try mixed-number word problems for depth.", x: 30, y: 28 },
  { id: "alg", title: "Algebra Foundations", description: "Variables, expressions and simplifying terms.", difficulty: "Intermediate", minutes: 90, mastery: 61, status: "progress", prereqs: ["arith", "frac"], action: "Continue the 'Combining like terms' lesson to reach 75%.", x: 48, y: 55 },
  { id: "lin", title: "Linear Equations", description: "Solving one- and two-step equations and graphing lines.", difficulty: "Intermediate", minutes: 120, mastery: 38, status: "improve", prereqs: ["alg"], action: "Knowledge gap found: revisit isolating variables before moving on.", x: 66, y: 30 },
  { id: "func", title: "Functions", description: "Domain, range, notation and function families.", difficulty: "Advanced", minutes: 150, mastery: 22, status: "improve", prereqs: ["lin"], action: "Close the Linear Equations gap first, then start function notation.", x: 84, y: 52 },
  { id: "quad", title: "Quadratic Equations", description: "Factoring, completing the square and the quadratic formula.", difficulty: "Advanced", minutes: 180, mastery: 0, status: "locked", prereqs: ["alg", "func"], action: "Locked — unlocks when Functions reaches 60% mastery.", x: 72, y: 80 },
];

export const topicById = (id: string) => topics.find((t) => t.id === id)!;

export const statusMeta: Record<NodeStatus, { label: string; color: string; ring: string; bg: string }> = {
  mastered: { label: "Mastered", color: "text-success", ring: "border-success", bg: "bg-success" },
  progress: { label: "In Progress", color: "text-cyan", ring: "border-cyan", bg: "bg-cyan" },
  improve: { label: "Needs Improvement", color: "text-warning", ring: "border-warning", bg: "bg-warning" },
  locked: { label: "Locked", color: "text-muted-foreground", ring: "border-muted-foreground/40", bg: "bg-muted-foreground" },
};

export const weekly = [
  { day: "Mon", minutes: 42, goal: 45 },
  { day: "Tue", minutes: 58, goal: 45 },
  { day: "Wed", minutes: 30, goal: 45 },
  { day: "Thu", minutes: 65, goal: 45 },
  { day: "Fri", minutes: 48, goal: 45 },
  { day: "Sat", minutes: 72, goal: 45 },
  { day: "Sun", minutes: 25, goal: 45 },
];

export const progressOverTime = [
  { week: "W1", mastery: 34 }, { week: "W2", mastery: 39 }, { week: "W3", mastery: 43 },
  { week: "W4", mastery: 47 }, { week: "W5", mastery: 52 }, { week: "W6", mastery: 55 },
  { week: "W7", mastery: 58 }, { week: "W8", mastery: 62 },
];

export const subjects = [
  { subject: "Mathematics", score: 62 },
  { subject: "Physics", score: 71 },
  { subject: "Chemistry", score: 55 },
  { subject: "Biology", score: 78 },
  { subject: "English", score: 84 },
];

export const recentActivity = [
  { title: "Completed lesson: Equivalent Fractions", time: "2 hours ago", kind: "lesson" },
  { title: "Diagnostic quiz: Algebra Foundations — 7/10", time: "Yesterday", kind: "quiz" },
  { title: "Reviewed: Order of Operations", time: "2 days ago", kind: "review" },
  { title: "Unlocked: Linear Equations", time: "3 days ago", kind: "unlock" },
];

export interface Question { q: string; options: string[]; answer: number; topic: string; }
export const quiz: Question[] = [
  { q: "What is 3/4 + 1/8?", options: ["4/12", "7/8", "1/2", "5/8"], answer: 1, topic: "frac" },
  { q: "Simplify: 4x + 3 − 2x + 5", options: ["2x + 8", "6x + 8", "2x − 2", "6x + 2"], answer: 0, topic: "alg" },
  { q: "Solve for x: 2x + 6 = 14", options: ["x = 10", "x = 3", "x = 4", "x = 8"], answer: 2, topic: "lin" },
  { q: "What is the slope of y = −3x + 2?", options: ["2", "3", "−2", "−3"], answer: 3, topic: "lin" },
  { q: "If f(x) = x² + 1, what is f(3)?", options: ["7", "10", "9", "6"], answer: 1, topic: "func" },
  { q: "Evaluate: 8 + 2 × (6 − 1)", options: ["50", "18", "20", "15"], answer: 1, topic: "arith" },
];
