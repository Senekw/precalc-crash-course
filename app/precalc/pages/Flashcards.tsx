"use client";

// Flashcards with spaced repetition. Due cards come first, then up to
// 25 new cards. Ratings feed the SM-2 scheduler ported from the source
// app: Again 1d, Hard ~2d, Good scheduled, Easy far out.

import { useMemo, useState } from "react";
import { MathBlock, MathText } from "../math";
import { flashcards, flashcardsByUnit } from "../data/flashcards";
import { precalcUnits } from "../data/topics";
import { isDue, newCardState, rateCard } from "../sr";
import type { PrecalcGo } from "../nav";
import type { SRCardState, SRRating } from "../types";

const NEW_CARDS_PER_SESSION = 25;

export function FlashcardsPage({
  go,
  unitId,
  srState,
  updateSRCard,
}: {
  go: PrecalcGo;
  unitId?: number;
  srState: Record<string, SRCardState>;
  updateSRCard: (termId: string, state: SRCardState) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [bump, setBump] = useState(0);

  const queue = useMemo(() => {
    const pool = unitId ? flashcardsByUnit[unitId] ?? [] : flashcards;
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
  }, [unitId, srState, bump]);

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
                : "No cards due. Pick a unit to drill new terms."}
            </p>
          </div>
        </div>
        <div className="lesson-grid">
          {precalcUnits.map((unit) => (
            <button className="lesson-row card" type="button" key={unit.id} onClick={() => go("pc-cards", { unitId: unit.id })}>
              <span className="lesson-number">{unit.id}</span>
              <span className="lesson-row-copy">
                <strong>Unit {unit.id}: {unit.title}</strong>
                <small>{flashcardsByUnit[unit.id]?.length ?? 0} terms</small>
              </span>
              <span aria-hidden="true">→</span>
            </button>
          ))}
          <button className="lesson-row card" type="button" onClick={() => go("pc-cards", {})}>
            <span className="lesson-number">∀</span>
            <span className="lesson-row-copy">
              <strong>All units</strong>
              <small>{flashcards.length} terms with spaced repetition</small>
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
          <h1>{unitId ? "Flashcards · Unit " + unitId : "Flashcards"}</h1>
          <p>{queue.length} cards in this session. Active recall + spaced repetition.</p>
        </div>
        <div className="section-actions">
          <button className="button button-ghost" type="button" onClick={() => go("pc-cards", {})}>
            {unitId ? "All units" : ""}
          </button>
        </div>
      </div>
      <section className="card flashcard">
        <div className="question-meta">
          <span className="pill">Unit {card.unitId} · Topic {card.topicId}</span>
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
