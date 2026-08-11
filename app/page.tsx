"use client";

// Home: course switcher. One card per mode from the registry, showing
// name, period, and locally stored progress. Course content renders on
// each course's own route.

import { useEffect, useState } from "react";
import Link from "next/link";
import { courses } from "./courses/registry";
import { lessons } from "./curriculum";

type ProgressLine = { headline: string; detail: string; pct: number | null };

// Engine-based modes persist under course-<id>-v1 (see app/courses/engine/store.ts).
function readCourseProgress(courseId: string, counts: { lessons: number; mcqs: number; frqs: number; cards: number }): ProgressLine {
  const empty: ProgressLine = {
    headline: "Not started",
    detail: counts.lessons + " lessons · " + counts.mcqs + " MCQs · " + counts.frqs + " FRQs",
    pct: 0,
  };
  try {
    const raw = window.localStorage.getItem("course-" + courseId + "-v1");
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as { attempts?: unknown[]; readTopics?: string[] };
    const attempts = parsed.attempts?.length ?? 0;
    const read = parsed.readTopics?.length ?? 0;
    if (attempts + read === 0) return empty;
    const pct = counts.lessons ? Math.min(100, Math.round((read / counts.lessons) * 100)) : 0;
    return {
      headline: pct + "% read",
      detail: read + "/" + counts.lessons + " lessons read · " + attempts + " attempts",
      pct,
    };
  } catch {
    return empty;
  }
}

function readPrecalcProgress(): ProgressLine {
  try {
    const bridgeRaw = window.localStorage.getItem("bc-bridge-progress-v1");
    const pcRaw = window.localStorage.getItem("bc-bridge-precalc-v1");
    const bridge = bridgeRaw ? (JSON.parse(bridgeRaw) as { completed?: string[] }) : null;
    const pc = pcRaw ? (JSON.parse(pcRaw) as { attempts?: unknown[]; readTopics?: string[] }) : null;
    const completed = bridge?.completed?.length ?? 0;
    const attempts = pc?.attempts?.length ?? 0;
    const readTopics = pc?.readTopics?.length ?? 0;
    const pct = Math.round(((readTopics / 44) * 100 + (completed / lessons.length) * 100) / 2);
    return {
      headline: attempts + readTopics + completed > 0 ? pct + "% studied" : "Not started",
      detail: readTopics + "/44 topics read · " + attempts + " attempts · bridge " + completed + "/" + lessons.length,
      pct,
    };
  } catch {
    return { headline: "Not started", detail: "44 topics · 103 MCQs · 23 FRQs", pct: 0 };
  }
}

export default function CourseSwitcher() {
  const [precalcProgress, setPrecalcProgress] = useState<ProgressLine | null>(null);
  const [courseProgress, setCourseProgress] = useState<Record<string, ProgressLine>>({});

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setPrecalcProgress(readPrecalcProgress());
      const lines: Record<string, ProgressLine> = {};
      for (const course of courses) {
        if (course.status === "live" && course.counts) {
          lines[course.id] = readCourseProgress(course.id, course.counts);
        }
      }
      setCourseProgress(lines);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="switcher-shell">
      <header className="switcher-head">
        <div className="brand-mark">∫</div>
        <div>
          <h1>Study modes</h1>
          <p>One mode per class. Pick a course; progress saves locally on this device.</p>
        </div>
      </header>
      <div className="switcher-grid">
        {courses.map((course) => {
          const isLive = course.status === "live";
          const progress = isLive ? (course.id === "precalc" ? precalcProgress : courseProgress[course.id] ?? null) : null;
          return (
            <Link className="switcher-card card" href={course.route} key={course.id} style={{ borderTopColor: course.color }}>
              <div className="switcher-card-head">
                <strong>{course.name}</strong>
                <span className="pill">{course.period}</span>
              </div>
              <p className="switcher-units">
                {course.units.length} {course.unitLabel}
                {course.units.length === 1 ? "" : "s"}
                {course.id === "art-history" ? " · 250 works" : ""}
                {course.extras?.length
                  ? " · " + course.extras.length + " course-wide module" + (course.extras.length === 1 ? "" : "s")
                  : ""}
              </p>
              {isLive ? (
                <div className="switcher-progress">
                  <div className="bar">
                    <span style={{ width: (progress?.pct ?? 0) + "%" }} />
                  </div>
                  <small>{progress ? progress.headline + " · " + progress.detail : "Loading progress…"}</small>
                </div>
              ) : (
                <div className="switcher-progress">
                  <span className="pill switcher-pending">Scaffold · content pending</span>
                </div>
              )}
              <span className="switcher-open">Open {isLive ? "course" : "skeleton"} →</span>
            </Link>
          );
        })}
      </div>
      <p className="switcher-footnote">
        Full parity contract for every mode: docs/COURSE_TEMPLATE.md in the repository.
      </p>
    </div>
  );
}
