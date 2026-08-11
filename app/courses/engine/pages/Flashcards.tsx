"use client";

// Flashcards with spaced repetition. Due cards come first, then up to
// 25 new cards. Ratings feed the SM-2 scheduler shared with the precalc
// mode: Again 1d, Hard ~2d, Good scheduled, Easy far out.

import { useMemo, useState } from "react";
import { MathBlock, MathText } from "../../../precalc/math";
import { isDue, newCardState, rateCard } from "../../../precalc/sr";
import type { SRCardState, SRRating } from "../../../precalc/types";
import type { CourseGo } from "../nav";
import type { CourseBundle } from "../../../../content/courseTypes";

const NEW_CARDS_PER_SESSION = 25;

export function FlashcardsPage({
  bundle,
  go,
  unitId,
  srState,
  updateSRCard,
}: {
  bundle: CourseBundle;
  go: CourseGo;
  unitId?: number;
  srState: Record<string, SRCardState>;
  updateSRCard: (termId: string, state: SRCardState) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [bump, setBump] = useState(0);

  const queue = useMemo(() => {
    const pool = unitId ? bundle.flashcards.filter((c) => c.unitId === unitId) : bundle.flashcards;
    const due = [];
    const fresh = [];
    for (const card of pool) {
      const state = srState[card.id];
      if (state) {
        if (isDue(state)) due.push(card);
      } else {
        fresh.push(card);
      }
    }
    return [...due, ...fresh.slice(0, NEW_CARDS_PER_SESSION)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitId, srState, bump, bundle]);

  const card = queue[0] ?? null;

  function rate(rating: SRRating) {
    if (!card) return;
    const next = rateCard(srState[card.id] ?? newCardState(card.id), rating);
    updateSRCard(card.id, next);
    setRevealed(false);
    setReviewedCount((n) => n + 1);
    setBump((n) => n + 1);
  }

  if (!card) {
    return (
      <>
        <div className="section-header">
          <div>
            <h1>Flashcards</h1>
            <p>
              {reviewedCount > 0
                ? reviewedCount + " cards reviewed. Nothing else is due right now."
                : "No cards due. Pick a " + bundle.unitLabel + " to drill new terms."}
            </p>
          </div>
        </div>
        <div className="lesson-grid">
          {bundle.units.map((unit) => {
            const count = bundle.flashcards.filter((c) => c.unitId === unit.id).length;
            if (!count) return null;
            return (
              <button className="lesson-row card" type="button" key={unit.id} onClick={() => go("cards", { unitId: unit.id })}>
                <span className="lesson-number">{unit.id}</span>
                <span className="lesson-row-copy">
                  <strong>
                    {unit.id}: {unit.title}
                  </strong>
                  <small>{count} terms</small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
            );
          })}
          <button className="lesson-row card" type="button" onClick={() => go("cards", {})}>
            <span className="lesson-number">∀</span>
            <span className="lesson-row-copy">
              <strong>All {bundle.unitLabel}s</strong>
              <small>{bundle.flashcards.length} terms with spaced repetition</small>
            </span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="section-header">
        <div>
          <h1>{unitId ? "Flashcards · " + bundle.unitLabel + " " + unitId : "Flashcards"}</h1>
          <p>{queue.length} cards in this session. Active recall + spaced repetition.</p>
        </div>
        <div className="section-actions">
          <button className="button button-ghost" type="button" onClick={() => go("cards", {})}>
            {unitId ? "All " + bundle.unitLabel + "s" : ""}
          </button>
        </div>
      </div>
      <section className="card flashcard">
        <div className="question-meta">
          <span className="pill">
            {bundle.unitLabel} {card.unitId} · Topic {card.topicId}
          </span>
          <span className="pill">Importance {card.importance}/3</span>
        </div>
        <h2 className="flashcard-term">{card.term}</h2>
        {revealed ? (
          <div className="flashcard-answer">
            <div>
              <span className="eyebrow">DEFINITION</span>
              <p>
                <MathText text={card.definition} />
              </p>
            </div>
            {card.formula ? (
              <div>
                <span className="eyebrow">FORMULA</span>
                <MathBlock>{card.formula}</MathBlock>
              </div>
            ) : null}
            {card.code ? (
              <div>
                <span className="eyebrow">SYNTAX</span>
                <pre className="mcq-stimulus course-code-pre">{card.code}</pre>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flashcard-reveal">
            <button className="button button-secondary" type="button" onClick={() => setRevealed(true)}>
              Reveal definition
            </button>
          </div>
        )}
        {revealed ? (
          <div className="sr-grid">
            <button type="button" className="sr-again" onClick={() => rate("again")}>
              <strong>Again</strong>
              <small>1d</small>
            </button>
            <button type="button" className="sr-hard" onClick={() => rate("hard")}>
              <strong>Hard</strong>
              <small>~2d</small>
            </button>
            <button type="button" className="sr-good" onClick={() => rate("good")}>
              <strong>Good</strong>
              <small>scheduled</small>
            </button>
            <button type="button" className="sr-easy" onClick={() => rate("easy")}>
              <strong>Easy</strong>
              <small>far out</small>
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}
