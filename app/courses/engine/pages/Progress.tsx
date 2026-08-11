"use client";

// Progress: accuracy by unit and by topic, FRQ averages by question type,
// predicted score with the composite formula documented, and the attempt
// log. Data lives on this device only, with a reset control.

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
import type { CourseProgress } from "../store";
import type { CourseGo } from "../nav";
import type { CourseBundle } from "../../../../content/courseTypes";

export function ProgressPage({
  bundle,
  go,
  progress,
  resetProgress,
}: {
  bundle: CourseBundle;
  go: CourseGo;
  progress: CourseProgress;
  resetProgress: () => void;
}) {
  const attempts = progress.attempts;
  const unitIds = useMemo(() => bundle.units.map((u) => u.id), [bundle]);
  const byUnit = useMemo(() => accuracyByUnit(attempts, unitIds), [attempts, unitIds]);
  const byTopic = useMemo(() => accuracyByTopic(attempts), [attempts]);
  const typeKeys = useMemo(() => bundle.frqTypes.map((t) => t.key), [bundle]);
  const frqStats = useMemo(() => frqStatsByType(attempts, typeKeys), [attempts, typeKeys]);
  const prediction = useMemo(() => predictedScore(attempts, bundle.scoring), [attempts, bundle.scoring]);
  const log = useMemo(() => [...attempts].reverse().slice(0, 100), [attempts]);

  const topicRows = Object.keys(byTopic).sort((a, b) => byTopic[a].accuracy - byTopic[b].accuracy);
  const summaryByTopicId = useMemo(() => {
    const m: Record<string, string> = {};
    for (const u of bundle.units) for (const t of u.subTopics) m[t.id] = t.title;
    return m;
  }, [bundle]);
  const frqTypeLabel = (key: string) => bundle.frqTypes.find((t) => t.key === key)?.label ?? key;

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
              if (
                window.confirm(
                  "Reset all " + bundle.name + " attempts, flashcard scheduling, and read lessons on this device?",
                )
              ) {
                resetProgress();
              }
            }}
          >
            Reset progress
          </button>
        </div>
      </div>

      <section className="metric-grid" aria-label="Progress summary">
        <div className="metric card">
          <span className="metric-label">
            {bundle.scoring.scale.kind === "ap" ? "PREDICTED AP SCORE" : "PREDICTED GRADE"}
          </span>
          <strong>{prediction.hasEnoughData ? prediction.label : "—"}</strong>
          <span>
            {prediction.hasEnoughData
              ? Math.round(prediction.pct * 100) + "% composite (" + bundle.scoring.note + ")"
              : "Need " + bundle.scoring.minMcq + "+ MCQs and " + bundle.scoring.minFrq + "+ FRQ" + (bundle.scoring.minFrq === 1 ? "" : "s")}
          </span>
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
          <h2>Accuracy by {bundle.unitLabel}</h2>
          <span>MCQ attempts</span>
        </div>
        <div className="strand-grid">
          {bundle.units.map((u) => {
            const stats = byUnit[u.id] ?? { correct: 0, total: 0, accuracy: 0 };
            const pct = Math.round(stats.accuracy * 100);
            return (
              <div className="strand-card card" key={u.id}>
                <div>
                  <strong>
                    {u.id}: {u.title}
                  </strong>
                  <span>{stats.total ? pct + "%" : "Untested"}</span>
                </div>
                <div className="bar">
                  <span style={{ width: pct + "%" }} />
                </div>
                <small>
                  {stats.total ? stats.correct + " correct of " + stats.total : "Run a " + bundle.unitLabel + " drill to establish a baseline."}
                </small>
              </div>
            );
          })}
        </div>
      </section>

      {bundle.frqTypes.length ? (
        <section className="strand-section">
          <div className="unit-heading">
            <h2>FRQ averages by question type</h2>
            <span>fraction of available points</span>
          </div>
          <div className="strand-grid">
            {typeKeys.map((type) => {
              const stats = frqStats[type];
              return (
                <div className="strand-card card" key={type}>
                  <div>
                    <strong>{frqTypeLabel(type)}</strong>
                    <span>{stats.count ? Math.round(stats.avgFraction * 100) + "%" : "Untested"}</span>
                  </div>
                  <div className="bar">
                    <span style={{ width: stats.avgFraction * 100 + "%" }} />
                  </div>
                  <small>{stats.count ? stats.count + " attempts" : "Answer one in FRQ practice."}</small>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

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
                  return (
                    <tr key={topicId}>
                      <td>
                        {topicId} {summaryByTopicId[topicId] ? "· " + summaryByTopicId[topicId] : ""}
                      </td>
                      <td>
                        {stats.correct}/{stats.total}
                      </td>
                      <td>{Math.round(stats.accuracy * 100)}%</td>
                      <td>
                        <button className="text-link" type="button" onClick={() => go("tutor", { topicId })}>
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
                  {isMcqAttempt(attempt) ? attempt.topicId : frqTypeLabel(attempt.frqType)}
                </span>
                <small>{timeAgo(attempt.attemptedAt)}</small>
                <b>
                  {isMcqAttempt(attempt)
                    ? attempt.correct
                      ? "✓"
                      : "×"
                    : attempt.grade.totalScore + "/" + attempt.grade.totalAvailable}
                </b>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
