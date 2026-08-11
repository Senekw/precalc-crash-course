// Local persistence for a course mode, namespaced per course id.
// Mirrors app/precalc/store.ts: attempts, spaced-repetition state, read
// topics. Everything stays on this device. No streaks, timers, or
// countdown state.

import { useEffect, useState } from "react";
import type { SRCardState } from "../../precalc/types";
import type { CourseAttempt } from "../../../content/courseTypes";

export type CourseProgress = {
  attempts: CourseAttempt[];
  srState: Record<string, SRCardState>;
  readTopics: string[];
};

export const emptyProgress: CourseProgress = {
  attempts: [],
  srState: {},
  readTopics: [],
};

export function storageKey(courseId: string): string {
  return "course-" + courseId + "-v1";
}

function load(key: string): CourseProgress {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<CourseProgress>;
    return {
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
      srState: parsed.srState ?? {},
      readTopics: Array.isArray(parsed.readTopics) ? parsed.readTopics : [],
    };
  } catch {
    return emptyProgress;
  }
}

export function useCourseProgress(courseId: string) {
  const key = storageKey(courseId);
  const [progress, setProgress] = useState<CourseProgress>(emptyProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setProgress(load(key));
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(key, JSON.stringify(progress));
  }, [key, progress, hydrated]);

  function recordAttempt(attempt: CourseAttempt) {
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

  function resetProgress() {
    setProgress(emptyProgress);
    window.localStorage.removeItem(key);
  }

  return { progress, hydrated, recordAttempt, updateSRCard, markTopicRead, resetProgress };
}
