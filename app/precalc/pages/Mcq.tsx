"use client";

// MCQ practice: quick 5 / standard 15 / 40-question section sim,
// calculator-mode filters, per-unit drills. Drill mode gives instant
// feedback with the full explanation for every choice; sim mode reveals
// everything at the end. Every answer is recorded for progress analytics.

import { useState } from "react";
import { MathText } from "../math";
import { mcqBank, mcqByUnit } from "../data/mcq";
import { precalcUnits } from "../data/topics";
import type { McqPreset, PrecalcGo } from "../nav";
import type { MCQAttempt, PrecalcMCQ } from "../types";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildSession(config: McqPreset): PrecalcMCQ[] {
  let pool = config.unitId ? mcqByUnit[config.unitId] ?? [] : mcqBank;
  if (config.calc && config.calc !== "any") pool = pool.filter((q) => q.calcMode === config.calc);
  return shuffle(pool).slice(0, Math.min(config.count, pool.length));
}

function buildAttempt(question: PrecalcMCQ, letter: string | null, startedAt: number, splitAcross = 1): MCQAttempt {
  return {
    id: question.id + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    type: "mcq",
    questionId: question.id,
    selectedChoice: letter,
    correct: letter === question.correctChoice,
    timeSpentSec: Math.floor((Date.now() - startedAt) / 1000 / splitAcross),
    attemptedAt: new Date().toISOString(),
    unitId: question.unitId,
    topicId: question.topicId,
  };
}

export function McqPage({
  go,
  preset,
  recordAttempt,
}: {
  go: PrecalcGo;
  preset?: McqPreset;
  recordAttempt: (attempt: MCQAttempt) => void;
}) {
  const [session, setSession] = useState<PrecalcMCQ[] | null>(() => (preset ? buildSession(preset) : null));
  const [sessionMode, setSessionMode] = useState<"drill" | "sim">(preset?.mode ?? "drill");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  function start(config: McqPreset) {
    setSession(buildSession(config));
    setSessionMode(config.mode);
    setIndex(0);
    setAnswers({});
    setDone(false);
    setStartedAt(Date.now());
  }

  const current = session?.[index] ?? null;
  const selected = current ? answers[current.id] ?? null : null;

  function choose(letter: string) {
    if (!current || answers[current.id]) return;
    setAnswers((a) => ({ ...a, [current.id]: letter }));
    if (sessionMode === "drill") {
      recordAttempt(buildAttempt(current, letter, startedAt));
    }
  }

  function next() {
    if (!session) return;
    if (index + 1 < session.length) {
      setIndex(index + 1);
      return;
    }
    if (sessionMode === "sim") {
      for (const q of session) {
        recordAttempt(buildAttempt(q, answers[q.id] ?? null, startedAt, session.length));
      }
    }
    setDone(true);
  }

  if (!session) {
    return (
      <>
        <div className="section-header">
          <div>
            <h1>MCQ practice</h1>
            <p>Drill specific units, filter by calculator mode, or simulate the 40-question section. {mcqBank.length} questions in the bank.</p>
          </div>
        </div>
        <div className="drill-options">
          <button className="drill-option card" type="button" onClick={() => start({ count: 5, mode: "drill" })}>
            <span className="drill-icon">⚡</span>
            <strong>Quick drill</strong>
            <p>Five questions, instant feedback.</p>
            <small>5 questions</small>
          </button>
          <button className="drill-option card" type="button" onClick={() => start({ count: 15, mode: "drill" })}>
            <span className="drill-icon">◎</span>
            <strong>Standard set</strong>
            <p>Fifteen questions with feedback after each answer.</p>
            <small>15 questions</small>
          </button>
          <button className="drill-option card" type="button" onClick={() => start({ count: 40, mode: "sim" })}>
            <span className="drill-icon">◇</span>
            <strong>Section sim</strong>
            <p>Forty questions, all feedback held to the end, exactly like Section I.</p>
            <small>40 questions</small>
          </button>
        </div>
        <div className="calc-filter-row">
          <button className="skill-row card" type="button" onClick={() => start({ count: 15, mode: "drill", calc: "calc-required" })}>
            <span>C</span>
            <div>
              <strong>Calculator allowed</strong>
              <small>{mcqBank.filter((q) => q.calcMode === "calc-required").length} questions</small>
            </div>
            <i aria-hidden="true">→</i>
          </button>
          <button className="skill-row card" type="button" onClick={() => start({ count: 15, mode: "drill", calc: "no-calc" })}>
            <span>N</span>
            <div>
              <strong>No calculator</strong>
              <small>{mcqBank.filter((q) => q.calcMode === "no-calc").length} questions</small>
            </div>
            <i aria-hidden="true">→</i>
          </button>
        </div>
        <section className="skill-drills">
          <div className="unit-heading">
            <h2>By unit</h2>
            <span>10-question targeted drills</span>
          </div>
          <div className="skill-grid">
            {precalcUnits.map((unit) => (
              <button className="skill-row card" type="button" key={unit.id} onClick={() => start({ unitId: unit.id, count: 10, mode: "drill" })}>
                <span>{unit.id}</span>
                <div>
                  <strong>Unit {unit.id}: {unit.title}</strong>
                  <small>{mcqByUnit[unit.id]?.length ?? 0} available</small>
                </div>
                <i aria-hidden="true">→</i>
              </button>
            ))}
          </div>
        </section>
      </>
    );
  }

  if (done) {
    const correct = session.filter((q) => answers[q.id] === q.correctChoice).length;
    const pct = session.length ? Math.round((correct / session.length) * 100) : 0;
    return (
      <div className="drill-session">
        <button className="back-link" type="button" onClick={() => setSession(null)}>
          ← New set
        </button>
        <div className="session-summary card">
          <span className="eyebrow">SET COMPLETE</span>
          <h2>
            {correct} / {session.length} correct ({pct}%)
          </h2>
          <p>
            {pct >= 80
              ? "Solid. Move to a different unit or take an FRQ."
              : pct >= 60
                ? "Decent. Review the misses below and re-drill weak topics."
                : "Open the study guide for the topics you missed; the explanations below are your study material."}
          </p>
        </div>
        <div className="mcq-review">
          {session.map((q, i) => {
            const chosen = answers[q.id] ?? null;
            const right = chosen === q.correctChoice;
            return (
              <details className="card mcq-review-item" key={q.id}>
                <summary>
                  <span className="mcq-review-index">#{i + 1}</span>
                  <b className={right ? "is-right" : "is-wrong"}>{right ? "✓" : "×"}</b>
                  <span className="mcq-review-text">
                    <MathText text={q.questionText} />
                  </span>
                  <span className="pill">{q.topicId}</span>
                </summary>
                <div className="mcq-review-body">
                  {q.choices.map((choice) => (
                    <div
                      className={
                        "mcq-review-choice " +
                        (choice.letter === q.correctChoice ? "is-correct" : choice.letter === chosen ? "is-chosen" : "")
                      }
                      key={choice.letter}
                    >
                      <span>{choice.letter}</span>
                      <div>
                        <p>
                          <MathText text={choice.text} />
                        </p>
                        <small>
                          <MathText text={choice.explanation} />
                        </small>
                      </div>
                    </div>
                  ))}
                  <button className="text-link" type="button" onClick={() => go("pc-tutor", { topicId: q.topicId })}>
                    Review topic {q.topicId} →
                  </button>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    );
  }

  if (!current) return null;
  const showFeedback = sessionMode === "drill" && selected !== null;

  return (
    <div className="drill-session">
      <button className="back-link" type="button" onClick={() => setSession(null)}>
        ← Exit set
      </button>
      <div className="session-progress">
        <span>
          QUESTION {index + 1} OF {session.length}
        </span>
        <span>{Math.round((index / session.length) * 100)}%</span>
        <div>
          <span style={{ width: ((index + (selected ? 1 : 0)) / session.length) * 100 + "%" }} />
        </div>
      </div>
      <section className="question-card card">
        <div className="question-meta">
          <span className="pill">Unit {current.unitId} · {current.topicId}</span>
          <span className="pill">{current.calcMode === "no-calc" ? "No calculator" : "Calculator"}</span>
          <span className="pill">Difficulty {current.difficulty}/3</span>
          <span className="pill">{current.skill}</span>
        </div>
        {current.stimulusText ? <pre className="mcq-stimulus">{current.stimulusText}</pre> : null}
        <h2>
          <MathText text={current.questionText} />
        </h2>
        <div className="answer-options">
          {current.choices.map((choice) => {
            let state = "";
            if (showFeedback) {
              if (choice.letter === current.correctChoice) state = "correct";
              else if (choice.letter === selected) state = "wrong";
            } else if (sessionMode === "sim" && choice.letter === selected) {
              state = "selected";
            }
            return (
              <button
                type="button"
                className={state}
                key={choice.letter}
                disabled={sessionMode === "drill" && selected !== null}
                onClick={() => choose(choice.letter)}
              >
                <span>{choice.letter}</span>
                <strong>
                  <MathText text={choice.text} />
                </strong>
                {state === "correct" ? <b>✓</b> : state === "wrong" ? <b>×</b> : null}
              </button>
            );
          })}
        </div>
        {showFeedback ? (
          <div className={"feedback " + (selected === current.correctChoice ? "feedback-correct" : "feedback-wrong")}>
            <span className="eyebrow">{selected === current.correctChoice ? "CORRECT" : "REPAIR THIS"}</span>
            {current.choices.map((choice) => (
              <p key={choice.letter}>
                <strong>{choice.letter}.</strong> <MathText text={choice.explanation} />
              </p>
            ))}
            <button type="button" className="text-link" onClick={() => go("pc-tutor", { topicId: current.topicId })}>
              Review topic {current.topicId} →
            </button>
          </div>
        ) : null}
        <div className="question-actions">
          <span>
            {sessionMode === "sim"
              ? selected
                ? "Answer locked. Keep moving."
                : "Pick an answer. Feedback comes at the end."
              : selected
                ? "Read every explanation, then move on."
                : "Choose one answer to continue."}
          </span>
          <button className="button button-primary" type="button" onClick={next} disabled={sessionMode === "drill" && selected === null}>
            {index === session.length - 1 ? "Finish set" : "Next question"} →
          </button>
        </div>
      </section>
    </div>
  );
}
