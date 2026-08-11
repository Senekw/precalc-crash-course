// Attempt analytics for a course mode: accuracy by unit and topic,
// predicted score from the course's real section weights, and the
// next-action recommendation engine. Generic twin of
// app/precalc/analytics.ts; weights and cut points come from the
// course's ScoringConfig instead of being hard-coded.

import type {
  CourseAttempt,
  CourseBundle,
  FRQAttempt,
  MCQAttempt,
  ScoringConfig,
} from "../../../content/courseTypes";

export type UnitStats = Record<string, { correct: number; total: number; accuracy: number }>;

export const isMcqAttempt = (a: CourseAttempt): a is MCQAttempt => a.type === "mcq";
export const isFrqAttempt = (a: CourseAttempt): a is FRQAttempt => a.type === "frq";

export function mcqAccuracy(attempts: CourseAttempt[]): number {
  const mcq = attempts.filter(isMcqAttempt);
  if (mcq.length === 0) return 0;
  return mcq.filter((a) => a.correct).length / mcq.length;
}

export function accuracyByUnit(attempts: CourseAttempt[], unitIds: number[]): UnitStats {
  const stats: UnitStats = {};
  for (const u of unitIds) stats[u] = { correct: 0, total: 0, accuracy: 0 };
  for (const a of attempts) {
    if (!isMcqAttempt(a)) continue;
    if (!stats[a.unitId]) stats[a.unitId] = { correct: 0, total: 0, accuracy: 0 };
    stats[a.unitId].total += 1;
    if (a.correct) stats[a.unitId].correct += 1;
  }
  for (const key of Object.keys(stats)) {
    const s = stats[key];
    s.accuracy = s.total === 0 ? 0 : s.correct / s.total;
  }
  return stats;
}

export function accuracyByTopic(attempts: CourseAttempt[]): UnitStats {
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

// Average FRQ fraction earned (0..1); each attempt normalized by its own
// available points so mixed-point FRQ banks average cleanly.
export function avgFrqFraction(attempts: CourseAttempt[]): number {
  const frq = attempts.filter(isFrqAttempt).filter((a) => a.grade.totalAvailable > 0);
  if (frq.length === 0) return 0;
  return frq.reduce((sum, a) => sum + a.grade.totalScore / a.grade.totalAvailable, 0) / frq.length;
}

export function frqStatsByType(attempts: CourseAttempt[], typeKeys: string[]) {
  const out: Record<string, { count: number; avgFraction: number }> = {};
  for (const t of typeKeys) {
    const of = attempts.filter(isFrqAttempt).filter((a) => a.frqType === t);
    out[t] = {
      count: of.length,
      avgFraction: of.length === 0 ? 0 : avgFrqFraction(of),
    };
  }
  return out;
}

export function recentAttempts(attempts: CourseAttempt[], days: number): CourseAttempt[] {
  const cutoff = Date.now() - days * 864e5;
  return attempts.filter((a) => new Date(a.attemptedAt).getTime() >= cutoff);
}

export type Prediction = {
  score: number; // 5..1
  label: string; // "5" or "A" depending on the scale
  pct: number;
  hasEnoughData: boolean;
};

const GRADE_LABELS: Record<number, string> = { 5: "A", 4: "B", 3: "C", 2: "D", 1: "F" };

export function predictedScore(attempts: CourseAttempt[], scoring: ScoringConfig): Prediction {
  const recent = recentAttempts(attempts, 90);
  const mcqPct = mcqAccuracy(recent);
  const frqPct = avgFrqFraction(recent);
  const mcqCount = recent.filter(isMcqAttempt).length;
  const frqCount = recent.filter(isFrqAttempt).length;
  const mcqComponent = mcqCount >= 5 ? mcqPct : 0.4;
  const frqComponent = frqCount >= 1 ? frqPct : 0.3;
  const composite = scoring.mcqWeight * mcqComponent + scoring.frqWeight * frqComponent;
  const { cuts } = scoring;
  const score =
    composite >= cuts.five ? 5 : composite >= cuts.four ? 4 : composite >= cuts.three ? 3 : composite >= cuts.two ? 2 : 1;
  return {
    score,
    label: scoring.scale.kind === "grade" ? GRADE_LABELS[score] : String(score),
    pct: composite,
    hasEnoughData: mcqCount >= scoring.minMcq && frqCount >= scoring.minFrq,
  };
}

export type NextAction = {
  kind: string;
  reason: string;
  cta: string;
  target: { view: "frq" } | { view: "mcq"; unitId?: number; count: number };
  unitId?: number;
};

export function nextAction(attempts: CourseAttempt[], bundle: CourseBundle): NextAction {
  const frqLabel = bundle.frq.length ? "FRQ" : null;
  const last14 = recentAttempts(attempts, 14);
  const last7 = recentAttempts(attempts, 7);
  const frqShare = Math.round(bundle.scoring.frqWeight * 100);
  if (frqLabel && last14.filter(isFrqAttempt).length === 0) {
    return {
      kind: "frq",
      reason:
        "No FRQ in 14+ days. Free response is " +
        frqShare +
        "% of your score on " +
        bundle.examName +
        " and the hardest section to walk in cold.",
      cta: "Practice an FRQ",
      target: { view: "frq" },
    };
  }
  const unitIds = bundle.units.map((u) => u.id);
  const byUnit = accuracyByUnit(attempts, unitIds);
  const weak = Object.keys(byUnit)
    .filter((u) => byUnit[u].total >= 5 && byUnit[u].accuracy < 0.6)
    .sort((a, b) => byUnit[a].accuracy - byUnit[b].accuracy)[0];
  if (weak && last7.filter((a) => isMcqAttempt(a) && String(a.unitId) === weak).length < 5) {
    return {
      kind: "unit-mcq-weak",
      reason:
        "Unit " + weak + " accuracy is " + (byUnit[weak].accuracy * 100).toFixed(0) + "%. You haven't drilled it this week.",
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
