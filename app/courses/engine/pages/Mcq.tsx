"use client";

// MCQ practice: quick 5 / standard 15 / full section sim, mode-tag
// filters (calculator, reading/writing, ...), per-unit drills. Drill mode
// gives instant feedback with every choice's explanation; sim mode holds
// feedback to the end. Every answer is recorded for progress analytics.

import { useState } from "react";
import { MathText } from "../../../precalc/math";
import { CodeBox, FigureBox, TableBox } from "../bits";
import type { CourseGo, McqPreset } from "../nav";
import type { CourseBundle, MCQ, MCQAttempt } from "../../../../content/courseTypes";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildMcqSession(bundle: CourseBundle, config: McqPreset): MCQ[] {
  let pool = bundle.mcq;
  if (config.unitId) pool = pool.filter((q) => q.unitId === config.unitId);
  if (config.unitIds?.length) pool = pool.filter((q) => config.unitIds!.includes(q.unitId));
  if (config.tag) pool = pool.filter((q) => q.modeTag === config.tag);
  return shuffle(pool).slice(0, Math.min(config.count, pool.length));
}

function buildAttempt(question: MCQ, letter: string | null, startedAt: number, splitAcross = 1): MCQAttempt {
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

function Stimulus({ q }: { q: MCQ }) {
  return (
    <>
      {q.stimulusText ? <pre className="mcq-stimulus">{q.stimulusText}</pre> : null}
      {q.code ? <CodeBox block={q.code} /> : null}
      {q.table ? <TableBox table={q.table} /> : null}
      {q.figure ? <FigureBox figure={q.figure} /> : null}
    </>
  );
}

export function McqPage({
  bundle,
  go,
  preset,
  recordAttempt,
}: {
  bundle: CourseBundle;
  go: CourseGo;
  preset?: McqPreset;
  recordAttempt: (attempt: MCQAttempt) => void;
}) {
  const [session, setSession] = useState<MCQ[] | null>(() => (preset ? buildMcqSession(bundle, preset) : null));
  const [sessionMode, setSessionMode] = useState<"drill" | "sim">(preset?.mode ?? "drill");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  const simCount = Math.min(
    bundle.exams[0]?.sections.find((s) => s.kind === "mcq")?.mcq?.count ?? 40,
    bundle.mcq.length,
  );

  function start(config: McqPreset) {
    setSession(buildMcqSession(bundle, config));
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

  function modeLabel(tagKey?: string): string {
    if (!tagKey) return "";
    return bundle.mcqModes?.find((m) => m.key === tagKey)?.label ?? tagKey;
  }

  if (!session) {
    return (
      <>
        <div className="section-header">
          <div>
            <h1>MCQ practice</h1>
            <p>
              Drill specific units{bundle.mcqModes?.length ? ", filter by question mode," : ""} or simulate the
              exam section. {bundle.mcq.length} questions in the bank.
            </p>
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
          <button className="drill-option card" type="button" onClick={() => start({ count: simCount, mode: "sim" })}>
            <span className="drill-icon">◇</span>
            <strong>Section sim</strong>
            <p>{simCount} questions, all feedback held to the end, exactly like the real section.</p>
            <small>{simCount} questions</small>
          </button>
        </div>
        {bundle.mcqModes?.length ? (
          <div className="calc-filter-row">
            {bundle.mcqModes.map((mode) => (
              <button
                className="skill-row card"
                type="button"
                key={mode.key}
                onClick={() => start({ count: 15, mode: "drill", tag: mode.key })}
              >
                <span>{mode.short}</span>
                <div>
                  <strong>{mode.label}</strong>
                  <small>{bundle.mcq.filter((q) => q.modeTag === mode.key).length} questions</small>
                </div>
                <i aria-hidden="true">→</i>
              </button>
            ))}
          </div>
        ) : null}
        <section className="skill-drills">
          <div className="unit-heading">
            <h2>By {bundle.unitLabel}</h2>
            <span>10-question targeted drills</span>
          </div>
          <div className="skill-grid">
            {bundle.units.map((unit) => {
              const count = bundle.mcq.filter((q) => q.unitId === unit.id).length;
              if (!count) return null;
              return (
                <button
                  className="skill-row card"
                  type="button"
                  key={unit.id}
                  onClick={() => start({ unitId: unit.id, count: 10, mode: "drill" })}
                >
                  <span>{unit.id}</span>
                  <div>
                    <strong>
                      {unit.id}: {unit.title}
                    </strong>
                    <small>{count} available</small>
                  </div>
                  <i aria-hidden="true">→</i>
                </button>
              );
            })}
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
                  <Stimulus q={q} />
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
                  <button className="text-link" type="button" onClick={() => go("tutor", { topicId: q.topicId })}>
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
          <span className="pill">
            {bundle.unitLabel} {current.unitId} · {current.topicId}
          </span>
          {current.modeTag ? <span className="pill">{modeLabel(current.modeTag)}</span> : null}
          <span className="pill">Difficulty {current.difficulty}/3</span>
          <span className="pill">{current.skill}</span>
        </div>
        <Stimulus q={current} />
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
            <button type="button" className="text-link" onClick={() => go("tutor", { topicId: current.topicId })}>
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
          <button
            className="button button-primary"
            type="button"
            onClick={next}
            disabled={sessionMode === "drill" && selected === null}
          >
            {index === session.length - 1 ? "Finish set" : "Next question"} →
          </button>
        </div>
      </section>
    </div>
  );
}
