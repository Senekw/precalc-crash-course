"use client";

// Practice exams and unit tests. Full-length blueprints render in the
// official format: MCQ sections launch the section simulator with the
// right pool, count, and mode; FRQ sections open their exact assigned
// questions. Unit tests do the same at unit scope. Times shown are the
// official timings as text; there are no countdown timers.

import { MathText } from "../../../precalc/math";
import type { CourseGo } from "../nav";
import type { CourseBundle, ExamSection } from "../../../../content/courseTypes";

function SectionRow({
  bundle,
  section,
  go,
}: {
  bundle: CourseBundle;
  section: ExamSection;
  go: CourseGo;
}) {
  return (
    <div className="exam-section">
      <div className="exam-section-copy">
        <strong>{section.name}</strong>
        <small>
          {section.minutes} min
          {section.notes ? " · " + section.notes : ""}
        </small>
      </div>
      {section.kind === "mcq" && section.mcq ? (
        <button
          className="button button-secondary"
          type="button"
          onClick={() =>
            go("mcq", {
              mcq: {
                count: section.mcq!.count,
                mode: "sim",
                tag: section.mcq!.modeTag,
                unitIds: section.mcq!.unitIds,
              },
            })
          }
        >
          Start section →
        </button>
      ) : (
        <div className="button-row">
          {(section.frqIds ?? [])
            .filter((id) => bundle.frq.some((q) => q.id === id))
            .map((id) => (
              <button key={id} className="button button-secondary" type="button" onClick={() => go("frq", { frqId: id })}>
                {id.replace(/^[a-z-]*frq-/, "Q").toUpperCase()} →
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export function ExamsPage({ bundle, go }: { bundle: CourseBundle; go: CourseGo }) {
  return (
    <>
      <div className="section-header">
        <div>
          <h1>Practice exams &amp; unit tests</h1>
          <p>
            {bundle.exams.length} full-length blueprint{bundle.exams.length === 1 ? "" : "s"} in the official format,
            plus a test for every {bundle.unitLabel}.
          </p>
        </div>
      </div>

      {bundle.exams.map((exam) => (
        <section className="card exam-card" key={exam.id}>
          <div className="panel-heading">
            <div>
              <span className="eyebrow">
                {exam.totalMinutes} MINUTES · {exam.totalPoints} POINTS
              </span>
              <h2>{exam.title}</h2>
            </div>
          </div>
          <p className="muted-copy">
            <MathText text={exam.description} />
          </p>
          <div className="exam-sections">
            {exam.sections.map((section) => (
              <SectionRow bundle={bundle} section={section} go={go} key={section.name} />
            ))}
          </div>
          {exam.scoreCurve ? (
            <div className="exam-curve">
              <span className="eyebrow">SCORE CURVE (ESTIMATE)</span>
              <div className="exam-curve-row">
                <span>5: {exam.scoreCurve.score5Min}+ pts</span>
                <span>4: {exam.scoreCurve.score4Min}+</span>
                <span>3: {exam.scoreCurve.score3Min}+</span>
                <span>2: {exam.scoreCurve.score2Min}+</span>
              </div>
            </div>
          ) : null}
        </section>
      ))}

      {bundle.unitTests.length ? (
        <section className="lesson-unit">
          <div className="unit-heading">
            <div>
              <span className="eyebrow">UNIT TESTS</span>
              <h2>One per {bundle.unitLabel}, in the exam format</h2>
            </div>
            <span>{bundle.unitTests.length} tests</span>
          </div>
          {bundle.unitTests.map((test) => {
            const unit = bundle.units.find((u) => u.id === test.unitId);
            return (
              <section className="card exam-card" key={test.unitId}>
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">
                      {test.minutes} MINUTES · MASTERY GATE {test.masteryPct}%
                    </span>
                    <h2>
                      {test.unitId}: {test.title}
                    </h2>
                  </div>
                </div>
                <p className="muted-copy">
                  <MathText text={test.description} />
                </p>
                <div className="exam-sections">
                  <div className="exam-section">
                    <div className="exam-section-copy">
                      <strong>MCQ section</strong>
                      <small>
                        {test.mcq.count} questions from {unit ? unit.title : "this unit"} · feedback held to the end
                      </small>
                    </div>
                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={() =>
                        go("mcq", {
                          mcq: { unitId: test.unitId, count: test.mcq.count, mode: "sim", tag: test.mcq.modeTag },
                        })
                      }
                    >
                      Start MCQs →
                    </button>
                  </div>
                  {test.frqIds.length ? (
                    <div className="exam-section">
                      <div className="exam-section-copy">
                        <strong>Free-response section</strong>
                        <small>{test.frqIds.length} assigned questions</small>
                      </div>
                      <div className="button-row">
                        {test.frqIds
                          .filter((id) => bundle.frq.some((q) => q.id === id))
                          .map((id) => (
                            <button
                              key={id}
                              className="button button-secondary"
                              type="button"
                              onClick={() => go("frq", { frqId: id })}
                            >
                              {id.replace(/^[a-z-]*frq-/, "Q").toUpperCase()} →
                            </button>
                          ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            );
          })}
        </section>
      ) : null}
    </>
  );
}
