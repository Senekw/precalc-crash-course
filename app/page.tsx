"use client";

// Home: course switcher. One card per mode from the registry, showing
// name, period, and locally stored progress. Course content renders on
// each course's own route.

import { useEffect, useState } from "react";
import Link from "next/link";
import { courses } from "./courses/registry";
import { lessons } from "./curriculum";

type ProgressLine = { headline: string; detail: string; pct: number | null };

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

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPrecalcProgress(readPrecalcProgress()));
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
          const progress = isLive ? precalcProgress : null;
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
