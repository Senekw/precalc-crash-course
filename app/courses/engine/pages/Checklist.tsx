"use client";

// Work checklist (AP Art History): every required work grouped by content
// area with per-area progress, read checkmarks, and links into the full
// work entries. "Read" state comes from the lesson read tracking.

import type { CourseGo } from "../nav";
import type { CourseBundle } from "../../../../content/courseTypes";

export function ChecklistPage({
  bundle,
  go,
  readTopics,
}: {
  bundle: CourseBundle;
  go: CourseGo;
  readTopics: string[];
}) {
  const works = bundle.lessons.filter((l) => l.work);
  const readCount = works.filter((l) => readTopics.includes(l.topicId)).length;

  return (
    <>
      <div className="section-header">
        <div>
          <h1>The {works.length}-work checklist</h1>
          <p>
            {readCount} of {works.length} works studied. Every required work, grouped by content area; open a work for
            its full identification and form / function / content / context entry.
          </p>
        </div>
      </div>

      <section className="strand-section">
        <div className="strand-grid">
          {bundle.units.map((unit) => {
            const unitWorks = works.filter((l) => l.unitId === unit.id);
            if (!unitWorks.length) return null;
            const done = unitWorks.filter((l) => readTopics.includes(l.topicId)).length;
            const pct = Math.round((done / unitWorks.length) * 100);
            return (
              <div className="strand-card card" key={unit.id}>
                <div>
                  <strong>
                    {unit.id}: {unit.title}
                  </strong>
                  <span>
                    {done}/{unitWorks.length}
                  </span>
                </div>
                <div className="bar">
                  <span style={{ width: pct + "%" }} />
                </div>
                <small>{pct}% studied</small>
              </div>
            );
          })}
        </div>
      </section>

      {bundle.units.map((unit) => {
        const unitWorks = works.filter((l) => l.unitId === unit.id);
        if (!unitWorks.length) return null;
        return (
          <section className="lesson-unit" key={unit.id}>
            <div className="unit-heading">
              <div>
                <span className="eyebrow">CONTENT AREA {unit.id}</span>
                <h2>{unit.title}</h2>
              </div>
              <span>{unitWorks.length} works</span>
            </div>
            <div className="lesson-grid">
              {unitWorks.map((lesson) => (
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
                      {lesson.work?.artist} · {lesson.work?.date}
                    </small>
                  </span>
                  <span aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
