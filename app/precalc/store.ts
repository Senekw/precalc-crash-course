// Local persistence for the AP Precalculus section.
// Everything stays on this device, matching the rest of the app.
// Deliberately minimal: attempts, spaced-repetition state, read topics.
// No streaks, timers, or countdown state.

import { useEffect, useState } from "react";
import type { PrecalcAttempt, SRCardState } from "./types";

export type PrecalcProgress = {
  attempts: PrecalcAttempt[];
  srState: Record<string, SRCardState>;
  readTopics: string[];
};

const KEY = "bc-bridge-precalc-v1";

export const emptyProgress: PrecalcProgress = {
  attempts: [],
  srState: {},
  readTopics: [],
};

function load(): PrecalcProgress {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<PrecalcProgress>;
    return {
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
      srState: parsed.srState ?? {},
      readTopics: Array.isArray(parsed.readTopics) ? parsed.readTopics : [],
    };
  } catch {
    return emptyProgress;
  }
}

export function usePrecalcProgress() {
  const [progress, setProgress] = useState<PrecalcProgress>(emptyProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setProgress(load());
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress, hydrated]);

  function recordAttempt(attempt: PrecalcAttempt) {
    setProgress((current) => ({
      ...current,
      attempts: [...current.attempts, attempt].slice(-2000),
    }));
  }

  function updateSRCard(termId: string, state: SRCardState) {
    setProgress((current) => ({ ...current, srState: { ...current.srState, [termId]: state } }));
  }

  function markTopicRead(topicId: string) {
    setProgress((current) =>
      current.readTopics.includes(topicId)
        ? current
        : { ...current, readTopics: [...current.readTopics, topicId] },
    );
  }

  function resetPrecalcProgress() {
    setProgress(emptyProgress);
    window.localStorage.removeItem(KEY);
  }

  return { progress, hydrated, recordAttempt, updateSRCard, markTopicRead, resetPrecalcProgress };
}
