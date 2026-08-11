"use client";

// Study guides: per-unit cram sheets built from topic summaries. Each
// topic card carries summary, key ideas, formulas, common mistakes, and
// the worked example. Unit page lists the unit's key terms, links into
// MCQ drill and flashcards, and launches the unit test with its mastery
// gate threshold.

import { useState } from "react";
import { MathBlock, MathText } from "../../../precalc/math";
import { accuracyByUnit } from "../analytics";
import type { CourseProgress } from "../store";
import type { CourseGo } from "../nav";
import type { CourseBundle } from "../../../../content/courseTypes";

const TERM_PREVIEW_COUNT = 12;

export function StudyGuidesPage({
  bundle,
  go,
  unitId,
  progress,
}: {
  bundle: CourseBundle;
  go: CourseGo;
  unitId?: number;
  progress: CourseProgress;
}) {
  const [showAllTerms, setShowAllTerms] = useState(false);
  const unit = unitId ? bundle.units.find((u) => u.id === unitId) ?? null : null;

  if (!unit) {
    return (
      <>
        <div className="section-header">
          <div>
            <h1>Study guides</h1>
            <p>
              {bundle.units.length} {bundle.unitLabel}
              {bundle.units.length === 1 ? "" : "s"},{" "}
              {bundle.units.reduce((sum, u) => sum + u.subTopics.length, 0)} topics. Each topic includes summary, key
              ideas, formulas, and the mistakes that cost points.
            </p>
          </div>
        </div>
        <div className="lesson-grid">
          {bundle.units.map((u) => (
            <button className="lesson-row card" type="button" key={u.id} onClick={() => go("study", { unitId: u.id })}>
              <span className="lesson-number">{u.id}</span>
              <span className="lesson-row-copy">
                <strong>
                  {u.id}: {u.title}
                </strong>
                <small>
                  {u.weight} · {u.subTopics.length} topics ·{" "}
                  {bundle.flashcards.filter((c) => c.unitId === u.id).length} key terms
                </small>
              </span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </>
    );
  }

  const terms = bundle.flashcards.filter((c) => c.unitId === unit.id);
  const unitIndex = bundle.units.findIndex((u) => u.id === unit.id);
  const prevUnit = unitIndex > 0 ? bundle.units[unitIndex - 1] : null;
  const nextUnit = unitIndex < bundle.units.length - 1 ? bundle.units[unitIndex + 1] : null;
  const unitTest = bundle.unitTests.find((t) => t.unitId === unit.id);
  const unitStats = accuracyByUnit(progress.attempts, [unit.id])[unit.id];
  const mastered = unitTest && unitStats.total >= 10 && unitStats.accuracy * 100 >= unitTest.masteryPct;

  return (
    <article className="lesson-detail">
      <button className="back-link" type="button" onClick={() => go("study")}>
        ← All {bundle.unitLabel}s
      </button>
      <div className="lesson-detail-head">
        <div>
          <span className="pill">
            {bundle.unitLabel.toUpperCase()} {unit.id} · {unit.weight.toUpperCase()}
          </span>
          <h1>{unit.title}</h1>
          <p>
            <MathText text={unit.description} />
          </p>
        </div>
      </div>

      <section className="objectives card accent-card subtle-accent">
        <span className="eyebrow">BIG IDEAS</span>
        <ul>
          {unit.bigIdeas.map((idea) => (
            <li key={idea}>
              <MathText text={idea} />
            </li>
          ))}
        </ul>
      </section>

      <div className="button-row guide-actions">
        <button
          className="button button-secondary"
          type="button"
          onClick={() => go("mcq", { mcq: { unitId: unit.id, count: 15, mode: "drill" } })}
        >
          Drill 15 MCQs →
        </button>
        <button className="button button-secondary" type="button" onClick={() => go("cards", { unitId: unit.id })}>
          Flashcards →
        </button>
        {unitTest ? (
          <button
            className="button button-secondary"
            type="button"
            onClick={() => go("mcq", { mcq: { unitId: unit.id, count: unitTest.mcq.count, mode: "sim", tag: unitTest.mcq.modeTag } })}
          >
            Unit test MCQ section →
          </button>
        ) : null}
      </div>

      {unitTest ? (
        <section className="card frq-context">
          <span className="eyebrow">MASTERY GATE</span>
          <p>
            {unitTest.title}: score {unitTest.masteryPct}%+ on this unit&apos;s MCQs (10+ attempts) to count it
            mastered.{" "}
            {unitStats.total
              ? "You are at " + Math.round(unitStats.accuracy * 100) + "% on " + unitStats.total + " attempts" + (mastered ? " — gate cleared. ✓" : ".")
              : "No attempts yet."}
          </p>
        </section>
      ) : null}

      {unit.subTopics.map((topic) => (
        <section className="guide-topic card" key={topic.id}>
          <div className="guide-topic-head">
            <span className="pill">{topic.number}</span>
            <h2>{topic.title}</h2>
          </div>
          <p className="guide-summary">
            <MathText text={topic.summary} />
          </p>
          <div className="guide-columns">
            <div>
              <span className="eyebrow">KEY IDEAS</span>
              <ul>
                {topic.keyIdeas.map((idea) => (
                  <li key={idea}>
                    <MathText text={idea} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="eyebrow">FORMULAS</span>
              {topic.formulas.length ? (
                topic.formulas.map((formula) => <MathBlock key={formula}>{formula}</MathBlock>)
              ) : (
                <p className="muted-copy">No new formulas in this topic.</p>
              )}
            </div>
          </div>
          <div className="guide-mistakes">
            <span className="eyebrow">COMMON MISTAKES</span>
            <ul>
              {topic.commonMistakes.map((mistake) => (
                <li key={mistake}>
                  <span aria-hidden="true">×</span>
                  <MathText text={mistake} />
                </li>
              ))}
            </ul>
          </div>
          {topic.workedExample ? (
            <div className="guide-example">
              <span className="eyebrow">WORKED EXAMPLE</span>
              <p className="guide-example-problem">
                <MathText text={topic.workedExample.problem} />
              </p>
              <p className="guide-example-solution">
                <MathText text={topic.workedExample.solution} />
              </p>
            </div>
          ) : null}
          <button className="text-link" type="button" onClick={() => go("tutor", { topicId: topic.id })}>
            Open the full lesson →
          </button>
        </section>
      ))}

      <section className="guide-terms">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">KEY TERMS</span>
            <h2>{terms.length} terms in this {bundle.unitLabel}</h2>
          </div>
          <button className="text-link" type="button" onClick={() => go("cards", { unitId: unit.id })}>
            Drill flashcards →
          </button>
        </div>
        <div className="card guide-terms-list">
          {(showAllTerms ? terms : terms.slice(0, TERM_PREVIEW_COUNT)).map((term) => (
            <div className="guide-term" key={term.id}>
              <div className="guide-term-head">
                <strong>{term.term}</strong>
                <span className="pill">Topic {term.topicId}</span>
              </div>
              <p>
                <MathText text={term.definition} />
              </p>
              {term.formula ? <MathBlock>{term.formula}</MathBlock> : null}
              {term.code ? <pre className="mcq-stimulus course-code-pre">{term.code}</pre> : null}
            </div>
          ))}
          {terms.length > TERM_PREVIEW_COUNT ? (
            <button className="guide-terms-toggle" type="button" onClick={() => setShowAllTerms((v) => !v)}>
              {showAllTerms ? "Collapse" : "Show all " + terms.length + " terms"}
            </button>
          ) : null}
        </div>
      </section>

      <nav className="lesson-pager" aria-label="Unit navigation">
        {prevUnit ? (
          <button className="pager-card card" type="button" onClick={() => go("study", { unitId: prevUnit.id })}>
            <span className="pager-direction">← PREVIOUS {bundle.unitLabel.toUpperCase()}</span>
            <strong>
              {prevUnit.id}: {prevUnit.title}
            </strong>
            <small>{prevUnit.subTopics.length} topics</small>
          </button>
        ) : (
          <div className="pager-card card is-placeholder">
            <span className="pager-direction">START OF THE COURSE</span>
            <strong>This is the first {bundle.unitLabel}</strong>
            <small>Everything builds from here.</small>
          </div>
        )}
        {nextUnit ? (
          <button className="pager-card card is-next" type="button" onClick={() => go("study", { unitId: nextUnit.id })}>
            <span className="pager-direction">NEXT {bundle.unitLabel.toUpperCase()} →</span>
            <strong>
              {nextUnit.id}: {nextUnit.title}
            </strong>
            <small>{nextUnit.subTopics.length} topics</small>
          </button>
        ) : (
          <button className="pager-card card is-next" type="button" onClick={() => go("exams")}>
            <span className="pager-direction">END OF THE {bundle.unitLabel.toUpperCase()}S →</span>
            <strong>Take a full practice exam</strong>
            <small>{bundle.exams.length} full-length blueprint{bundle.exams.length === 1 ? "" : "s"}</small>
          </button>
        )}
      </nav>
    </article>
  );
}
