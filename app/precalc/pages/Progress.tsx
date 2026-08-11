"use client";

// Progress: accuracy by unit and by topic, FRQ averages by question type,
// and the full attempt log. Data lives on this device only.

import { useMemo } from "react";
import {
  accuracyByTopic,
  accuracyByUnit,
  frqStatsByType,
  isFrqAttempt,
  isMcqAttempt,
  predictedScore,
  timeAgo,
} from "../analytics";
import { frqTypeLabels } from "../data/frq";
import { topicSummaryById, unitById } from "../data/topics";
import type { PrecalcProgress } from "../store";
import type { PrecalcGo } from "../nav";
import type { FRQType } from "../types";

export function ProgressPage({
  go,
  progress,
  resetPrecalcProgress,
}: {
  go: PrecalcGo;
  progress: PrecalcProgress;
  resetPrecalcProgress: () => void;
}) {
  const attempts = progress.attempts;
  const byUnit = useMemo(() => accuracyByUnit(attempts), [attempts]);
  const byTopic = useMemo(() => accuracyByTopic(attempts), [attempts]);
  const frqStats = useMemo(() => frqStatsByType(attempts), [attempts]);
  const prediction = useMemo(() => predictedScore(attempts), [attempts]);
  const log = useMemo(() => [...attempts].reverse().slice(0, 100), [attempts]);

  const topicRows = Object.keys(byTopic).sort((a, b) => byTopic[a].accuracy - byTopic[b].accuracy);

  return (
    <>
      <div className="section-header">
        <div>
          <h1>Progress</h1>
          <p>{attempts.length} attempts logged on this device.</p>
        </div>
        <div className="section-actions">
          <button
            className="button button-secondary"
            type="button"
            onClick={() => {
              if (window.confirm("Reset all AP Precalculus attempts, flashcard scheduling, and read topics on this device?")) {
                resetPrecalcProgress();
              }
            }}
          >
            Reset precalc progress
          </button>
        </div>
      </div>

      <section className="metric-grid" aria-label="Progress summary">
        <div className="metric card">
          <span className="metric-label">PREDICTED AP SCORE</span>
          <strong>{prediction.hasEnoughData ? prediction.score : "—"}</strong>
          <span>{prediction.hasEnoughData ? Math.round(prediction.pct * 100) + "% composite (62.5% MCQ / 37.5% FRQ)" : "Need 10+ MCQs and 1 FRQ"}</span>
        </div>
        <div className="metric card">
          <span className="metric-label">MCQS ANSWERED</span>
          <strong>{attempts.filter(isMcqAttempt).length}</strong>
          <span>{attempts.filter((a) => isMcqAttempt(a) && a.correct).length} correct</span>
        </div>
        <div className="metric card">
          <span className="metric-label">FRQS GRADED</span>
          <strong>{attempts.filter(isFrqAttempt).length}</strong>
          <span>self-scored on the rubric</span>
        </div>
      </section>

      <section className="strand-section">
        <div className="unit-heading">
          <h2>Accuracy by unit</h2>
          <span>MCQ attempts</span>
        </div>
        <div className="strand-grid">
          {[1, 2, 3].map((u) => {
            const stats = byUnit[u];
            const pct = Math.round(stats.accuracy * 100);
            return (
              <div className="strand-card card" key={u}>
                <div>
                  <strong>Unit {u}: {unitById[u].title}</strong>
                  <span>{stats.total ? pct + "%" : "Untested"}</span>
                </div>
                <div className="bar">
                  <span style={{ width: pct + "%" }} />
                </div>
                <small>{stats.total ? stats.correct + " correct of " + stats.total : "Run a unit drill to establish a baseline."}</small>
              </div>
            );
          })}
        </div>
      </section>

      <section className="strand-section">
        <div className="unit-heading">
          <h2>FRQ averages by question type</h2>
          <span>out of 6 points</span>
        </div>
        <div className="strand-grid">
          {(Object.keys(frqStats) as FRQType[]).map((type) => {
            const stats = frqStats[type];
            return (
              <div className="strand-card card" key={type}>
                <div>
                  <strong>{frqTypeLabels[type]}</strong>
                  <span>{stats.count ? stats.avg.toFixed(1) + "/6" : "Untested"}</span>
                </div>
                <div className="bar">
                  <span style={{ width: (stats.count ? (stats.avg / 6) * 100 : 0) + "%" }} />
                </div>
                <small>{stats.count ? stats.count + " attempts" : "Answer one in FRQ practice."}</small>
              </div>
            );
          })}
        </div>
      </section>

      {topicRows.length ? (
        <section className="strand-section">
          <div className="unit-heading">
            <h2>Accuracy by topic</h2>
            <span>weakest first</span>
          </div>
          <div className="card topic-table-wrap">
            <table className="topic-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Correct</th>
                  <th>Accuracy</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {topicRows.map((topicId) => {
                  const stats = byTopic[topicId];
                  const summary = topicSummaryById[topicId];
                  return (
                    <tr key={topicId}>
                      <td>
                        {topicId} {summary ? "· " + summary.title : ""}
                      </td>
                      <td>
                        {stats.correct}/{stats.total}
                      </td>
                      <td>{Math.round(stats.accuracy * 100)}%</td>
                      <td>
                        <button className="text-link" type="button" onClick={() => go("pc-tutor", { topicId })}>
                          Review →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="strand-section">
        <div className="unit-heading">
          <h2>Attempt log</h2>
          <span>most recent 100</span>
        </div>
        {log.length === 0 ? (
          <p className="muted-copy">No attempts yet. Start with a 15-question drill.</p>
        ) : (
          <div className="card attempt-log">
            {log.map((attempt) => (
              <div className="recent-attempt" key={attempt.id}>
                <span className="pill">{attempt.type.toUpperCase()}</span>
                <span className="recent-attempt-copy">
                  {isMcqAttempt(attempt) ? attempt.topicId : frqTypeLabels[attempt.frqType]}
                </span>
                <small>{timeAgo(attempt.attemptedAt)}</small>
                <b>{isMcqAttempt(attempt) ? (attempt.correct ? "✓" : "×") : attempt.grade.totalScore + "/" + attempt.grade.totalAvailable}</b>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
