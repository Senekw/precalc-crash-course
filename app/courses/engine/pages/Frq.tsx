"use client";

// FRQ practice: the course's official free-response types. Write the
// full response, then grade yourself part by part against the model
// solution and scoring notes. Scores are recorded for progress. Official
// timings appear as text only; there is no countdown timer.

import { useMemo, useState } from "react";
import { MathText } from "../../../precalc/math";
import { FunctionGraph } from "../../../precalc/FunctionGraph";
import { CodeBox, FigureBox, TableBox } from "../bits";
import type { CourseGo } from "../nav";
import type { CourseBundle, FRQ, FRQAttempt } from "../../../../content/courseTypes";

function FrqStimulus({ frq }: { frq: FRQ }) {
  return (
    <>
      {frq.contextSetup ? <pre className="mcq-stimulus">{frq.contextSetup}</pre> : null}
      {frq.code ? <CodeBox block={frq.code} /> : null}
      {frq.table ? <TableBox table={frq.table} /> : null}
      {frq.figure ? <FigureBox figure={frq.figure} /> : null}
      {frq.graph ? <FunctionGraph {...frq.graph} width={frq.graph.width ?? 460} height={frq.graph.height ?? 240} /> : null}
    </>
  );
}

function FrqRunner({
  bundle,
  frq,
  onExit,
  recordAttempt,
}: {
  bundle: CourseBundle;
  frq: FRQ;
  onExit: () => void;
  recordAttempt: (attempt: FRQAttempt) => void;
}) {
  const [response, setResponse] = useState("");
  const [grading, setGrading] = useState(false);
  const [partScores, setPartScores] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);
  const [startedAt] = useState(() => Date.now());

  const typeDef = bundle.frqTypes.find((t) => t.key === frq.type);
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
          <span className="pill">{typeDef?.label ?? frq.type}</span>
          {typeDef?.minutes ? <span className="pill">Suggested time {typeDef.minutes} min</span> : null}
          <span className="pill">{totalAvailable} points</span>
          <h1>FRQ {frq.id.replace(/^[a-z-]*frq-/, "").toUpperCase()}</h1>
        </div>
      </div>

      <section className="card frq-context">
        <span className="eyebrow">CONTEXT</span>
        <p>
          <MathText text={frq.context} />
        </p>
        <FrqStimulus frq={frq} />
      </section>

      {frq.parts.map((part) => (
        <section className="card frq-part" key={part.letter}>
          <div className="frq-part-head">
            <span className="lesson-number">{part.letter}</span>
            <div>
              <p>
                <MathText text={part.task} />
              </p>
              {part.taskCode ? <pre className="mcq-stimulus course-code-pre">{part.taskCode}</pre> : null}
              <small>
                {part.pointName} · {part.pointsAvailable} point{part.pointsAvailable === 1 ? "" : "s"} available
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
                {part.solutionCode ? <pre className="mcq-stimulus course-code-pre">{part.solutionCode}</pre> : null}
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
            placeholder="Work every part in order. Show the work or reasoning that leads to each answer; unsupported answers earn nothing on the real exam."
          />
          <div className="question-actions">
            <span>Grade only when your written response is complete.</span>
            <button
              className="button button-primary"
              type="button"
              onClick={() => setGrading(true)}
              disabled={response.trim().length === 0}
            >
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
  bundle,
  frqId,
  frqType,
  recordAttempt,
}: {
  bundle: CourseBundle;
  frqId?: string;
  frqType?: string;
  recordAttempt: (attempt: FRQAttempt) => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(frqId ?? null);
  const active = useMemo(() => (activeId ? bundle.frq.find((q) => q.id === activeId) ?? null : null), [activeId, bundle]);

  if (active) {
    return (
      <FrqRunner bundle={bundle} frq={active} onExit={() => setActiveId(null)} recordAttempt={recordAttempt} key={active.id} />
    );
  }

  const types = frqType ? bundle.frqTypes.filter((t) => t.key === frqType) : bundle.frqTypes;

  return (
    <>
      <div className="section-header">
        <div>
          <h1>FRQ practice</h1>
          <p>
            {bundle.frqTypes.length} question type{bundle.frqTypes.length === 1 ? "" : "s"}, graded against
            scoring-guideline-style rubrics: you self-score each point with the scoring notes.
          </p>
        </div>
      </div>
      {types.map((typeDef) => {
        const questions = bundle.frq.filter((q) => q.type === typeDef.key);
        if (!questions.length) return null;
        return (
          <section className="lesson-unit" key={typeDef.key}>
            <div className="unit-heading">
              <div>
                <h2>{typeDef.label}</h2>
                {typeDef.description ? (
                  <p>
                    <MathText text={typeDef.description} />
                  </p>
                ) : null}
              </div>
              <span className="pill">
                {typeDef.minutes ? typeDef.minutes + " min · " : ""}
                {questions.length} FRQ{questions.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="frq-list">
              {questions.map((q) => (
                <div className="card frq-list-item" key={q.id}>
                  <p>
                    <MathText text={q.context} />
                  </p>
                  <div className="button-row">
                    <button className="button button-primary" type="button" onClick={() => setActiveId(q.id)}>
                      Answer this FRQ →
                    </button>
                    <span className="muted-copy">
                      {bundle.unitLabel} {q.unitId} · {q.parts.length} parts · {q.totalPoints} points
                    </span>
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
