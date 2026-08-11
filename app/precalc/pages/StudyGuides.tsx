"use client";

// Study guides: per-unit cram sheets built from the 44 topic summaries.
// Each topic card carries summary, key ideas, formulas, common mistakes,
// and the worked example. Unit page also lists the unit's key terms.

import { useState } from "react";
import { MathBlock, MathText } from "../math";
import { precalcUnits, unitById } from "../data/topics";
import { flashcardsByUnit } from "../data/flashcards";
import type { PrecalcGo } from "../nav";

const TERM_PREVIEW_COUNT = 12;

export function StudyGuidesPage({ go, unitId }: { go: PrecalcGo; unitId?: number }) {
  const [showAllTerms, setShowAllTerms] = useState(false);
  const unit = unitId ? unitById[unitId] : null;

  if (!unit) {
    return (
      <>
        <div className="section-header">
          <div>
            <h1>Study guides</h1>
            <p>Three units, 44 sub-topics. Each topic includes summary, key ideas, formulas, and the mistakes that cost points.</p>
          </div>
        </div>
        <div className="lesson-grid">
          {precalcUnits.map((u) => (
            <button className="lesson-row card" type="button" key={u.id} onClick={() => go("pc-study", { unitId: u.id })}>
              <span className="lesson-number">{u.id}</span>
              <span className="lesson-row-copy">
                <strong>Unit {u.id}: {u.title}</strong>
                <small>{u.weight} of the exam · {u.subTopics.length} sub-topics · {flashcardsByUnit[u.id]?.length ?? 0} key terms</small>
              </span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </>
    );
  }

  const terms = flashcardsByUnit[unit.id] ?? [];
  const prevUnit = unit.id > 1 ? unitById[unit.id - 1] : null;
  const nextUnit = unit.id < 3 ? unitById[unit.id + 1] : null;

  return (
    <article className="lesson-detail">
      <button className="back-link" type="button" onClick={() => go("pc-study")}>
        ← All units
      </button>
      <div className="lesson-detail-head">
        <div>
          <span className="pill">UNIT {unit.id} · {unit.weight} OF THE EXAM</span>
          <h1>{unit.title}</h1>
          <p>{unit.description}</p>
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
        <button className="button button-secondary" type="button" onClick={() => go("pc-mcq", { mcq: { unitId: unit.id, count: 15, mode: "drill" } })}>
          Drill 15 MCQs →
        </button>
        <button className="button button-secondary" type="button" onClick={() => go("pc-cards", { unitId: unit.id })}>
          Flashcards →
        </button>
      </div>

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
          <button className="text-link" type="button" onClick={() => go("pc-tutor", { topicId: topic.id })}>
            Open the full lesson →
          </button>
        </section>
      ))}

      <section className="guide-terms">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">KEY TERMS</span>
            <h2>{terms.length} terms in this unit</h2>
          </div>
          <button className="text-link" type="button" onClick={() => go("pc-cards", { unitId: unit.id })}>
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
          <button className="pager-card card" type="button" onClick={() => go("pc-study", { unitId: prevUnit.id })}>
            <span className="pager-direction">← PREVIOUS UNIT</span>
            <strong>Unit {prevUnit.id}: {prevUnit.title}</strong>
            <small>{prevUnit.subTopics.length} sub-topics</small>
          </button>
        ) : (
          <div className="pager-card card is-placeholder">
            <span className="pager-direction">START OF THE COURSE</span>
            <strong>This is Unit 1</strong>
            <small>Everything builds from here.</small>
          </div>
        )}
        {nextUnit ? (
          <button className="pager-card card is-next" type="button" onClick={() => go("pc-study", { unitId: nextUnit.id })}>
            <span className="pager-direction">NEXT UNIT →</span>
            <strong>Unit {nextUnit.id}: {nextUnit.title}</strong>
            <small>{nextUnit.subTopics.length} sub-topics</small>
          </button>
        ) : (
          <button className="pager-card card is-next" type="button" onClick={() => go("pc-exams")}>
            <span className="pager-direction">END OF THE UNITS →</span>
            <strong>Take a full practice exam</strong>
            <small>4 full-length simulations</small>
          </button>
        )}
      </nav>
    </article>
  );
}
