"use client";

// Practice exams: four full-length AP Precalculus blueprints.
// MCQ sections launch the section simulator with the right pool and count;
// FRQ sections open their exact assigned questions. Times shown are the
// official section timings so you can run them on your own clock.

import { MathText } from "../math";
import { practiceExams } from "../data/exams";
import { frqById } from "../data/frq";
import type { PrecalcGo } from "../nav";
import type { ExamSection } from "../types";

function mcqCountFor(section: ExamSection): number {
  const match = /(\d+)\s+questions/.exec(section.notes ?? "");
  if (match) return Number(match[1]);
  return section.name.toLowerCase().includes("part a") ? 28 : 12;
}

function calcFor(section: ExamSection): "no-calc" | "calc-required" {
  return section.name.toLowerCase().includes("no calculator") ? "no-calc" : "calc-required";
}

export function ExamsPage({ go }: { go: PrecalcGo }) {
  return (
    <>
      <div className="section-header">
        <div>
          <h1>Practice exams</h1>
          <p>Four full-length simulations in the official format: 40 MCQs in two calculator modes, then four FRQs, 64 points total.</p>
        </div>
      </div>
      {practiceExams.map((exam) => (
        <section className="card exam-card" key={exam.id}>
          <div className="panel-heading">
            <div>
              <span className="eyebrow">{exam.totalMinutes} MINUTES · {exam.totalPoints} POINTS</span>
              <h2>{exam.title}</h2>
            </div>
          </div>
          <p className="muted-copy">
            <MathText text={exam.description} />
          </p>
          <div className="exam-sections">
            {exam.sections.map((section) => (
              <div className="exam-section" key={section.name}>
                <div className="exam-section-copy">
                  <strong>{section.name}</strong>
                  <small>
                    {section.minutes} min
                    {section.notes ? " · " + section.notes : ""}
                    {section.kind === "frq" && section.questionIds.length
                      ? " · " + section.questionIds.map((id) => id.replace("frq-", "").toUpperCase()).join(", ")
                      : ""}
                  </small>
                </div>
                {section.kind === "mcq" ? (
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() =>
                      go("pc-mcq", {
                        mcq: { count: mcqCountFor(section), mode: "sim", calc: calcFor(section) },
                      })
                    }
                  >
                    Start section →
                  </button>
                ) : (
                  <div className="button-row">
                    {section.questionIds
                      .filter((id) => frqById[id])
                      .map((id) => (
                        <button key={id} className="button button-secondary" type="button" onClick={() => go("pc-frq", { frqId: id })}>
                          {id.replace("frq-", "Q").toUpperCase()} →
                        </button>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="exam-curve">
            <span className="eyebrow">SCORE CURVE</span>
            <div className="exam-curve-row">
              <span>5: {exam.scoreCurve.score5Min}+ pts</span>
              <span>4: {exam.scoreCurve.score4Min}+</span>
              <span>3: {exam.scoreCurve.score3Min}+</span>
              <span>2: {exam.scoreCurve.score2Min}+</span>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
