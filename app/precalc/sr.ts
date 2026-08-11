// Spaced-repetition scheduler for flashcards.
// Direct port of the source app's SM-2 variant: same intervals, same ease factors.

import type { SRCardState, SRRating } from "./types";

export function newCardState(termId: string): SRCardState {
  return {
    termId,
    easeFactor: 2.5,
    intervalDays: 0,
    dueDate: new Date().toISOString(),
    lastReviewed: null,
    reps: 0,
    lapses: 0,
  };
}

export function rateCard(state: SRCardState, rating: SRRating, now = new Date()): SRCardState {
  const { intervalDays } = state;
  let { easeFactor, reps, lapses } = state;
  let nextInterval: number;
  switch (rating) {
    case "again":
      lapses += 1;
      reps = 0;
      nextInterval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      break;
    case "hard":
      reps += 1;
      nextInterval = reps === 1 ? 2 : Math.max(1, Math.round(intervalDays * 1.2));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      break;
    case "good":
      reps += 1;
      nextInterval = reps === 1 ? 1 : reps === 2 ? 4 : Math.round(intervalDays * easeFactor);
      break;
    case "easy":
      reps += 1;
      nextInterval = reps === 1 ? 4 : Math.round(intervalDays * easeFactor * 1.3);
      easeFactor = Math.min(3, easeFactor + 0.15);
      break;
  }
  const due = new Date(now);
  due.setDate(due.getDate() + nextInterval);
  return {
    termId: state.termId,
    easeFactor,
    intervalDays: nextInterval,
    dueDate: due.toISOString(),
    lastReviewed: now.toISOString(),
    reps,
    lapses,
  };
}

export function isDue(state: SRCardState, now = new Date()): boolean {
  return new Date(state.dueDate).getTime() <= now.getTime();
}
