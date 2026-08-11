// Attempt analytics: accuracy by unit and topic, predicted AP score,
// and the next-action recommendation engine.
// Ports of the source app's helpers; thresholds and weights are unchanged
// (62.5% MCQ / 37.5% FRQ composite, 5/4/3/2 cut points at .70/.58/.45/.34).

import type { FRQAttempt, FRQType, MCQAttempt, PrecalcAttempt } from "./types";

export type UnitStats = Record<string, { correct: number; total: number; accuracy: number }>;

export const isMcqAttempt = (a: PrecalcAttempt): a is MCQAttempt => a.type === "mcq";
export const isFrqAttempt = (a: PrecalcAttempt): a is FRQAttempt => a.type === "frq";

export function mcqAccuracy(attempts: PrecalcAttempt[]): number {
  const mcq = attempts.filter(isMcqAttempt);
  if (mcq.length === 0) return 0;
  return mcq.filter((a) => a.correct).length / mcq.length;
}

export function accuracyByUnit(attempts: PrecalcAttempt[]): UnitStats {
  const stats: UnitStats = {};
  for (let u = 1; u <= 3; u++) stats[u] = { correct: 0, total: 0, accuracy: 0 };
  for (const a of attempts) {
    if (!isMcqAttempt(a)) continue;
    stats[a.unitId].total += 1;
    if (a.correct) stats[a.unitId].correct += 1;
  }
  for (const key of Object.keys(stats)) {
    const s = stats[key];
    s.accuracy = s.total === 0 ? 0 : s.correct / s.total;
  }
  return stats;
}

export function accuracyByTopic(attempts: PrecalcAttempt[]): UnitStats {
  const stats: UnitStats = {};
  for (const a of attempts) {
    if (!isMcqAttempt(a)) continue;
    if (!stats[a.topicId]) stats[a.topicId] = { correct: 0, total: 0, accuracy: 0 };
    stats[a.topicId].total += 1;
    if (a.correct) stats[a.topicId].correct += 1;
  }
  for (const key of Object.keys(stats)) {
    stats[key].accuracy = stats[key].total === 0 ? 0 : stats[key].correct / stats[key].total;
  }
  return stats;
}

export function avgFrqScore(attempts: PrecalcAttempt[]): number {
  const frq = attempts.filter(isFrqAttempt);
  if (frq.length === 0) return 0;
  return frq.reduce((sum, a) => sum + a.grade.totalScore, 0) / frq.length;
}

export function frqStatsByType(attempts: PrecalcAttempt[]) {
  const types: FRQType[] = ["function-concepts", "modeling-non-periodic", "modeling-periodic", "symbolic-manipulations"];
  const out: Record<FRQType, { count: number; avg: number }> = {} as Record<FRQType, { count: number; avg: number }>;
  for (const t of types) {
    const of = attempts.filter(isFrqAttempt).filter((a) => a.frqType === t);
    out[t] = { count: of.length, avg: of.length === 0 ? 0 : of.reduce((s, a) => s + a.grade.totalScore, 0) / of.length };
  }
  return out;
}

export function recentAttempts(attempts: PrecalcAttempt[], days: number): PrecalcAttempt[] {
  const cutoff = Date.now() - days * 864e5;
  return attempts.filter((a) => new Date(a.attemptedAt).getTime() >= cutoff);
}

export function predictedScore(attempts: PrecalcAttempt[]) {
  const recent = recentAttempts(attempts, 90);
  const mcqPct = mcqAccuracy(recent);
  const frqPct = avgFrqScore(recent) / 6;
  const mcqCount = recent.filter(isMcqAttempt).length;
  const frqCount = recent.filter(isFrqAttempt).length;
  const mcqComponent = mcqCount >= 5 ? mcqPct : 0.4;
  const frqComponent = frqCount >= 1 ? frqPct : 0.3;
  const composite = 0.625 * mcqComponent + 0.375 * frqComponent;
  const score = composite >= 0.7 ? 5 : composite >= 0.58 ? 4 : composite >= 0.45 ? 3 : composite >= 0.34 ? 2 : 1;
  return { score, pct: composite, hasEnoughData: mcqCount >= 10 && frqCount >= 1 };
}

export type NextAction = {
  kind: string;
  reason: string;
  cta: string;
  target: { view: "frq" } | { view: "mcq"; unitId?: number; count: number };
  unitId?: number;
};

export function nextAction(attempts: PrecalcAttempt[]): NextAction {
  const last14 = recentAttempts(attempts, 14);
  const last7 = recentAttempts(attempts, 7);
  if (last14.filter(isFrqAttempt).length === 0) {
    return {
      kind: "frq",
      reason: "No timed FRQ in 14+ days. FRQs are 37.5% of your score and the trickiest section to walk in cold.",
      cta: "Practice an FRQ",
      target: { view: "frq" },
    };
  }
  const byUnit = accuracyByUnit(attempts);
  const weak = Object.keys(byUnit)
    .filter((u) => byUnit[u].total >= 5 && byUnit[u].accuracy < 0.6)
    .sort((a, b) => byUnit[a].accuracy - byUnit[b].accuracy)[0];
  if (weak && last7.filter((a) => isMcqAttempt(a) && String(a.unitId) === weak).length < 5) {
    return {
      kind: "unit-mcq-weak",
      reason: "Unit " + weak + " accuracy is " + (byUnit[weak].accuracy * 100).toFixed(0) + "%. You haven't drilled it this week.",
      cta: "Drill 15 MCQs on Unit " + weak,
      target: { view: "mcq", unitId: Number(weak), count: 15 },
      unitId: Number(weak),
    };
  }
  const lowest = Object.keys(byUnit)
    .filter((u) => byUnit[u].total > 0)
    .sort((a, b) => byUnit[a].accuracy - byUnit[b].accuracy)[0];
  if (lowest) {
    return {
      kind: "unit-mcq",
      reason: "Unit " + lowest + " is your lowest at " + (byUnit[lowest].accuracy * 100).toFixed(0) + "%.",
      cta: "Drill 10 MCQs on Unit " + lowest,
      target: { view: "mcq", unitId: Number(lowest), count: 10 },
      unitId: Number(lowest),
    };
  }
  return {
    kind: "unit-mcq",
    reason: "Let's get a baseline. Start with 15 mixed MCQs across all units.",
    cta: "Start 15-question drill",
    target: { view: "mcq", count: 15 },
  };
}

export function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + "m ago";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h ago";
  const days = Math.floor(hours / 24);
  if (days < 30) return days + "d ago";
  return new Date(iso).toLocaleDateString();
}
