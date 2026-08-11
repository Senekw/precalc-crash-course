"use client";

// AP Precalculus dashboard: next-action recommendation, predicted score,
// weakest units, and recent attempts. No countdowns, timers, or streaks.

import { useMemo } from "react";
import {
  accuracyByUnit,
  isFrqAttempt,
  isMcqAttempt,
  mcqAccuracy,
  nextAction,
  predictedScore,
  recentAttempts,
  timeAgo,
} from "../analytics";
import { unitById } from "../data/topics";
import { flashcards } from "../data/flashcards";
import { tutorTopics } from "../data/tutor";
import { isDue } from "../sr";
import type { PrecalcProgress } from "../store";
import type { PrecalcGo } from "../nav";

export function PrecalcDashboard({ go, progress }: { go: PrecalcGo; progress: PrecalcProgress }) {
  const attempts = progress.attempts;
  const prediction = useMemo(() => predictedScore(attempts), [attempts]);
  const action = useMemo(() => nextAction(attempts), [attempts]);
  const byUnit = useMemo(() => accuracyByUnit(attempts), [attempts]);
  const recent = useMemo(() => recentAttempts(attempts, 30).slice(-5).reverse(), [attempts]);
  const dueCount = useMemo(
    () => flashcards.filter((card) => progress.srState[card.id] && isDue(progress.srState[card.id])).length,
    [progress.srState],
  );

  const weakest = Object.keys(byUnit)
    .filter((u) => byUnit[u].total >= 3)
    .sort((a, b) => byUnit[a].accuracy - byUnit[b].accuracy)
    .slice(0, 3);

  return (
    <>
      <div className="section-header">
        <div>
          <h1>AP Precalculus</h1>
          <p>The full exam-prep suite: 44 lessons, {" "}103 MCQs, 23 FRQs, 88 flashcards, 4 practice exams.</p>
        </div>
      </div>

      <section className="next-action card accent-card">
        <div className="next-action-icon">◎</div>
        <div className="next-action-copy">
          <span className="eyebrow">NEXT ACTION</span>
          <h2>{action.cta}</h2>
          <p>{action.reason}</p>
        </div>
        <button
          className="button button-primary"
          type="button"
          onClick={() =>
            action.target.view === "frq"
              ? go("pc-frq")
              : go("pc-mcq", { mcq: { unitId: action.target.unitId, count: action.target.count, mode: "drill" } })
          }
        >
          Start <span aria-hidden="true">→</span>
        </button>
      </section>

      <section className="metric-grid" aria-label="Precalc stats">
        <div className="metric card">
          <span className="metric-label">PREDICTED AP SCORE</span>
          <strong>{prediction.hasEnoughData ? prediction.score : "—"}</strong>
          <span>{prediction.hasEnoughData ? Math.round(prediction.pct * 100) + "% composite" : "Need 10+ MCQs and 1 FRQ"}</span>
        </div>
        <div className="metric card">
          <span className="metric-label">MCQ ACCURACY</span>
          <strong>{attempts.filter(isMcqAttempt).length ? Math.round(mcqAccuracy(attempts) * 100) + "%" : "—"}</strong>
          <span>{attempts.filter(isMcqAttempt).length} answered</span>
        </div>
        <div className="metric card">
          <span className="metric-label">FRQS GRADED</span>
          <strong>{attempts.filter(isFrqAttempt).length}</strong>
          <span>of 23 in the bank</span>
        </div>
        <div className="metric card">
          <span className="metric-label">FLASHCARDS DUE</span>
          <strong>{dueCount}</strong>
          <span>{progress.readTopics.length} of {tutorTopics.length} topics read</span>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="card dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">WEAKEST UNITS</span>
              <h2>Aim your repair time</h2>
            </div>
            <button className="text-link" type="button" onClick={() => go("pc-mcq")}>
              Drill more →
            </button>
          </div>
          {weakest.length === 0 ? (
            <p className="muted-copy">Take some MCQs to see weak units.</p>
          ) : (
            <div className="dependency-list">
              {weakest.map((u) => {
                const unit = unitById[Number(u)];
                const stats = byUnit[u];
                return (
                  <button className="dependency-row" type="button" key={u} onClick={() => go("pc-study", { unitId: Number(u) })}>
                    <span className="day-index">U{u}</span>
                    <span className="dependency-copy">
                      <strong>{unit.title}</strong>
                      <small>
                        {stats.correct} / {stats.total} correct
                      </small>
                    </span>
                    <span className="dependency-progress">{Math.round(stats.accuracy * 100)}%</span>
                    <span aria-hidden="true">→</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="card dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">RECENT ATTEMPTS</span>
              <h2>Last 30 days</h2>
            </div>
            <button className="text-link" type="button" onClick={() => go("pc-progress")}>
              All progress →
            </button>
          </div>
          {recent.length === 0 ? (
            <p className="muted-copy">Your attempts will appear here.</p>
          ) : (
            <div className="recent-attempts">
              {recent.map((attempt) => (
                <div className="recent-attempt" key={attempt.id}>
                  <span className="pill">{attempt.type.toUpperCase()}</span>
                  <span className="recent-attempt-copy">
                    U{attempt.unitId} · {unitById[attempt.unitId]?.title}
                  </span>
                  <small>{timeAgo(attempt.attemptedAt)}</small>
                  <b>{isMcqAttempt(attempt) ? (attempt.correct ? "✓" : "×") : attempt.grade.totalScore + "/" + attempt.grade.totalAvailable}</b>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pc-quicklinks">
        {(
          [
            ["pc-tutor", "Tutor", "44 step-by-step topics"],
            ["pc-study", "Study guides", "Per-unit cram sheets"],
            ["pc-mcq", "MCQ practice", "103 questions"],
            ["pc-frq", "FRQ practice", "23 rubric-scored FRQs"],
            ["pc-cards", "Flashcards", "88 terms, spaced repetition"],
            ["pc-formulas", "Formula sheet", "45 formulas + unit circle"],
            ["pc-exams", "Practice exams", "4 full-length blueprints"],
            ["pc-progress", "Progress", "Accuracy by unit and topic"],
          ] as const
        ).map(([view, title, desc]) => (
          <button className="card pc-quicklink" type="button" key={view} onClick={() => go(view)}>
            <strong>{title}</strong>
            <small>{desc}</small>
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </section>
    </>
  );
}
