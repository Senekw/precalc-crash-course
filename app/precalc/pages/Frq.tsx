"use client";

// FRQ practice: the four College Board question types, 6 points each.
// Write the full response, then grade yourself part by part against the
// model solution and the scoring notes. Scores are recorded for progress.

import { useMemo, useState } from "react";
import { MathText } from "../math";
import { FunctionGraph } from "../FunctionGraph";
import { frqBank, frqByType, frqTypeLabels } from "../data/frq";
import type { FRQAttempt, FRQType, PrecalcFRQ } from "../types";

const FRQ_TYPE_ORDER: FRQType[] = [
  "function-concepts",
  "modeling-non-periodic",
  "modeling-periodic",
  "symbolic-manipulations",
];

function FrqRunner({
  frq,
  onExit,
  recordAttempt,
}: {
  frq: PrecalcFRQ;
  onExit: () => void;
  recordAttempt: (attempt: FRQAttempt) => void;
}) {
  const [response, setResponse] = useState("");
  const [grading, setGrading] = useState(false);
  const [partScores, setPartScores] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);
  const [startedAt] = useState(() => Date.now());

  const totalAvailable = frq.parts.reduce((sum, part) => sum + part.pointsAvailable, 0);
  const totalScore = frq.parts.reduce((sum, part) => sum + (partScores[part.letter] ?? 0), 0);
  const allScored = frq.parts.every((part) => partScores[part.letter] !== undefined);

  function save() {
    recordAttempt({
      id: frq.id + "-" + Date.now(),
      type: "frq",
      questionId: frq.id,
      responseText: response,
      grade: { totalScore, totalAvailable, partScores },
      timeSpentSec: Math.floor((Date.now() - startedAt) / 1000),
      attemptedAt: new Date().toISOString(),
      unitId: frq.unitId,
      frqType: frq.type,
    });
    setSaved(true);
  }

  return (
    <div className="frq-runner">
      <button className="back-link" type="button" onClick={onExit}>
        ← All FRQs
      </button>
      <div className="lesson-detail-head">
        <div>
          <span className="pill">{frqTypeLabels[frq.type]}</span>
          <span className="pill">{frq.calcMode === "calc-required" ? "Calculator" : "No calculator"}</span>
          <span className="pill">{totalAvailable} points</span>
          <h1>FRQ {frq.id.replace("frq-", "").toUpperCase()}</h1>
        </div>
      </div>

      <section className="card frq-context">
        <span className="eyebrow">CONTEXT</span>
        <p>
          <MathText text={frq.context} />
        </p>
        {frq.contextSetup ? <pre className="mcq-stimulus">{frq.contextSetup}</pre> : null}
        {frq.graph ? <FunctionGraph {...frq.graph} width={frq.graph.width ?? 460} height={frq.graph.height ?? 240} /> : null}
      </section>

      {frq.parts.map((part) => (
        <section className="card frq-part" key={part.letter}>
          <div className="frq-part-head">
            <span className="lesson-number">{part.letter}</span>
            <div>
              <p>
                <MathText text={part.task} />
              </p>
              <small>
                Points {part.pointName} · {part.pointsAvailable} available
              </small>
            </div>
          </div>
          {grading ? (
            <div className="frq-grading">
              <div>
                <span className="eyebrow">MODEL SOLUTION</span>
                <p>
                  <MathText text={part.modelSolution} />
                </p>
              </div>
              <div>
                <span className="eyebrow">SCORING NOTES</span>
                <p>
                  <MathText text={part.scoringNotes} />
                </p>
                {part.partialCreditNotes ? (
                  <p className="frq-partial">
                    <MathText text={part.partialCreditNotes} />
                  </p>
                ) : null}
              </div>
              <div className="frq-score-row">
                <span>Your points:</span>
                {Array.from({ length: part.pointsAvailable + 1 }, (_, n) => (
                  <button
                    key={n}
                    type="button"
                    className={"frq-score-pick " + (partScores[part.letter] === n ? "active" : "")}
                    onClick={() => setPartScores((s) => ({ ...s, [part.letter]: n }))}
                  >
                    {n}
                  </button>
                ))}
                <small>/ {part.pointsAvailable}</small>
              </div>
            </div>
          ) : null}
        </section>
      ))}

      {!grading ? (
        <section className="card frq-response">
          <label htmlFor="frq-response">
            <span className="eyebrow">YOUR RESPONSE</span>
          </label>
          <textarea
            id="frq-response"
            value={response}
            onChange={(event) => setResponse(event.target.value)}
            placeholder="Work every part in order. Show the work that leads to each answer; on the real exam, answers without supporting work earn nothing."
          />
          <div className="question-actions">
            <span>Grade only when your written response is complete.</span>
            <button className="button button-primary" type="button" onClick={() => setGrading(true)} disabled={response.trim().length === 0}>
              Grade against the rubric →
            </button>
          </div>
        </section>
      ) : (
        <section className="card frq-total">
          <div>
            <span className="eyebrow">SELF-SCORE</span>
            <h2>
              {totalScore} / {totalAvailable}
            </h2>
            <p>{allScored ? "All parts scored. Save it to your progress." : "Score every part against the scoring notes above."}</p>
          </div>
          <details className="frq-your-response">
            <summary>Your response</summary>
            <pre>{response}</pre>
          </details>
          <div className="button-row">
            <button className="button button-primary" type="button" onClick={save} disabled={!allScored || saved}>
              {saved ? "✓ Saved to progress" : "Save score"}
            </button>
            <button className="button button-secondary" type="button" onClick={onExit}>
              {saved ? "Back to FRQs" : "Discard"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export function FrqPage({
  frqId,
  recordAttempt,
}: {
  frqId?: string;
  recordAttempt: (attempt: FRQAttempt) => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(frqId ?? null);
  const active = useMemo(() => (activeId ? frqBank.find((q) => q.id === activeId) ?? null : null), [activeId]);

  if (active) {
    return <FrqRunner frq={active} onExit={() => setActiveId(null)} recordAttempt={recordAttempt} key={active.id} />;
  }

  return (
    <>
      <div className="section-header">
        <div>
          <h1>FRQ practice</h1>
          <p>4 question types, 6 points each. Graded against the verbatim 2025 College Board rubric structure: you self-score each point with the scoring notes.</p>
        </div>
      </div>
      {FRQ_TYPE_ORDER.map((type) => {
        const questions = frqByType[type];
        if (!questions.length) return null;
        const calc = questions[0].calcMode === "calc-required";
        return (
          <section className="lesson-unit" key={type}>
            <div className="unit-heading">
              <div>
                <h2>{frqTypeLabels[type]}</h2>
              </div>
              <span className={calc ? "pill" : "pill"}>{calc ? "Calculator" : "No calculator"} · {questions.length} FRQs</span>
            </div>
            <div className="frq-list">
              {questions.map((q) => (
                <div className="card frq-list-item" key={q.id}>
                  <p>
                    <MathText text={q.context} />
                  </p>
                  {q.contextSetup ? <pre className="mcq-stimulus">{q.contextSetup}</pre> : null}
                  {q.graph ? <FunctionGraph {...q.graph} width={q.graph.width ?? 460} height={q.graph.height ?? 240} /> : null}
                  <div className="button-row">
                    <button className="button button-primary" type="button" onClick={() => setActiveId(q.id)}>
                      Answer this FRQ →
                    </button>
                    <span className="muted-copy">Unit {q.unitId} · {q.parts.length} parts · {q.totalPoints} points</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
