"use client";

// Chronological timeline (AP Art History): every required work sorted by
// date, with era groupings, linking into the full work entries.

import type { CourseGo } from "../nav";
import type { CourseBundle } from "../../../../content/courseTypes";

type Era = { label: string; from: number; to: number };

const ERAS: Era[] = [
  { label: "Before 500 B.C.E.", from: -Infinity, to: -500 },
  { label: "500 B.C.E. to 1 C.E.", from: -500, to: 1 },
  { label: "1 to 500 C.E.", from: 1, to: 500 },
  { label: "500 to 1000 C.E.", from: 500, to: 1000 },
  { label: "1000 to 1400 C.E.", from: 1000, to: 1400 },
  { label: "1400 to 1600 C.E.", from: 1400, to: 1600 },
  { label: "1600 to 1800 C.E.", from: 1600, to: 1800 },
  { label: "1800 to 1900 C.E.", from: 1800, to: 1900 },
  { label: "1900 to 1980 C.E.", from: 1900, to: 1980 },
  { label: "1980 to the present", from: 1980, to: Infinity },
];

export function TimelinePage({
  bundle,
  go,
  readTopics,
}: {
  bundle: CourseBundle;
  go: CourseGo;
  readTopics: string[];
}) {
  const works = bundle.lessons
    .filter((l) => l.work)
    .slice()
    .sort((a, b) => (a.work!.sortYear - b.work!.sortYear) || (a.work!.workNumber - b.work!.workNumber));

  return (
    <>
      <div className="section-header">
        <div>
          <h1>Timeline</h1>
          <p>All {works.length} required works in chronological order. Use it to anchor cross-cultural comparisons.</p>
        </div>
      </div>
      {ERAS.map((era) => {
        const eraWorks = works.filter((l) => l.work!.sortYear >= era.from && l.work!.sortYear < era.to);
        if (!eraWorks.length) return null;
        return (
          <section className="lesson-unit" key={era.label}>
            <div className="unit-heading">
              <div>
                <span className="eyebrow">ERA</span>
                <h2>{era.label}</h2>
              </div>
              <span>{eraWorks.length} works</span>
            </div>
            <div className="lesson-grid">
              {eraWorks.map((lesson) => {
                const unit = bundle.units.find((u) => u.id === lesson.unitId);
                return (
                  <button
                    className={"lesson-row card " + (readTopics.includes(lesson.topicId) ? "is-done" : "")}
                    type="button"
                    key={lesson.topicId}
                    onClick={() => go("tutor", { topicId: lesson.topicId })}
                  >
                    <span className="lesson-number">
                      {readTopics.includes(lesson.topicId) ? "✓" : lesson.work?.workNumber}
                    </span>
                    <span className="lesson-row-copy">
                      <strong>{lesson.title}</strong>
                      <small>
                        {lesson.work?.date} · {lesson.work?.artist} · CA{lesson.unitId} {unit ? "· " + unit.title : ""}
                      </small>
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
