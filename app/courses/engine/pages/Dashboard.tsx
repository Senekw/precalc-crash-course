"use client";

// Course dashboard: next-action recommendation, predicted score at the
// course's real section weights, weakest units, recent attempts, and a
// quick-link grid to every section. No countdowns, timers, or streaks.

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
import { isDue } from "../../../precalc/sr";
import type { CourseProgress } from "../store";
import type { CourseGo, CourseView } from "../nav";
import type { CourseBundle } from "../../../../content/courseTypes";

export function DashboardPage({
  bundle,
  go,
  progress,
}: {
  bundle: CourseBundle;
  go: CourseGo;
  progress: CourseProgress;
}) {
  const attempts = progress.attempts;
  const prediction = useMemo(() => predictedScore(attempts, bundle.scoring), [attempts, bundle.scoring]);
  const action = useMemo(() => nextAction(attempts, bundle), [attempts, bundle]);
  const unitIds = useMemo(() => bundle.units.map((u) => u.id), [bundle]);
  const byUnit = useMemo(() => accuracyByUnit(attempts, unitIds), [attempts, unitIds]);
  const recent = useMemo(() => recentAttempts(attempts, 30).slice(-5).reverse(), [attempts]);
  const dueCount = useMemo(
    () => bundle.flashcards.filter((card) => progress.srState[card.id] && isDue(progress.srState[card.id])).length,
    [bundle.flashcards, progress.srState],
  );

  const weakest = Object.keys(byUnit)
    .filter((u) => byUnit[u].total >= 3)
    .sort((a, b) => byUnit[a].accuracy - byUnit[b].accuracy)
    .slice(0, 3);

  const quicklinks: [CourseView, string, string][] = [
    ["tutor", "Tutor", bundle.lessons.length + " step-by-step lessons"],
    ["study", "Study guides", "Per-" + bundle.unitLabel + " cram sheets"],
    ["mcq", "MCQ practice", bundle.mcq.length + " questions"],
    ["frq", "FRQ practice", bundle.frq.length + " rubric-scored FRQs"],
    ["cards", "Flashcards", bundle.flashcards.length + " terms, spaced repetition"],
    ["reference", bundle.referenceTitle, bundle.reference.reduce((s, g) => s + g.items.length, 0) + " entries"],
    ["exams", "Practice exams", bundle.exams.length + " full-length + " + bundle.unitTests.length + " unit tests"],
    ["progress", "Progress", "Accuracy by " + bundle.unitLabel + " and topic"],
  ];
  if (bundle.features?.workChecklist) {
    quicklinks.splice(1, 0, ["checklist", "250-work checklist", "Every required work, by content area"]);
  }
  if (bundle.features?.timeline) {
    quicklinks.splice(2, 0, ["timeline", "Timeline", "All works in chronological order"]);
  }

  return (
    <>
      <div className="section-header">
        <div>
          <h1>{bundle.name}</h1>
          <p>{bundle.tagline}</p>
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
              ? go("frq")
              : go("mcq", { mcq: { unitId: action.target.unitId, count: action.target.count, mode: "drill" } })
          }
        >
          Start <span aria-hidden="true">→</span>
        </button>
      </section>

      <section className="metric-grid" aria-label="Course stats">
        <div className="metric card">
          <span className="metric-label">
            {bundle.scoring.scale.kind === "ap" ? "PREDICTED AP SCORE" : "PREDICTED GRADE"}
          </span>
          <strong>{prediction.hasEnoughData ? prediction.label : "—"}</strong>
          <span>
            {prediction.hasEnoughData
              ? Math.round(prediction.pct * 100) + "% composite"
              : "Need " + bundle.scoring.minMcq + "+ MCQs and " + bundle.scoring.minFrq + "+ FRQ" + (bundle.scoring.minFrq === 1 ? "" : "s")}
          </span>
        </div>
        <div className="metric card">
          <span className="metric-label">MCQ ACCURACY</span>
          <strong>
            {attempts.filter(isMcqAttempt).length ? Math.round(mcqAccuracy(attempts) * 100) + "%" : "—"}
          </strong>
          <span>{attempts.filter(isMcqAttempt).length} answered</span>
        </div>
        <div className="metric card">
          <span className="metric-label">FRQS GRADED</span>
          <strong>{attempts.filter(isFrqAttempt).length}</strong>
          <span>of {bundle.frq.length} in the bank</span>
        </div>
        <div className="metric card">
          <span className="metric-label">FLASHCARDS DUE</span>
          <strong>{dueCount}</strong>
          <span>
            {progress.readTopics.length} of {bundle.lessons.length} lessons read
          </span>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="card dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">WEAKEST {bundle.unitLabel.toUpperCase()}S</span>
              <h2>Aim your repair time</h2>
            </div>
            <button className="text-link" type="button" onClick={() => go("mcq")}>
              Drill more →
            </button>
          </div>
          {weakest.length === 0 ? (
            <p className="muted-copy">Take some MCQs to see weak {bundle.unitLabel}s.</p>
          ) : (
            <div className="dependency-list">
              {weakest.map((u) => {
                const unit = bundle.units.find((x) => x.id === Number(u));
                const stats = byUnit[u];
                return (
                  <button
                    className="dependency-row"
                    type="button"
                    key={u}
                    onClick={() => go("study", { unitId: Number(u) })}
                  >
                    <span className="day-index">U{u}</span>
                    <span className="dependency-copy">
                      <strong>{unit?.title ?? "Unit " + u}</strong>
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
            <button className="text-link" type="button" onClick={() => go("progress")}>
              All progress →
            </button>
          </div>
          {recent.length === 0 ? (
            <p className="muted-copy">Your attempts will appear here.</p>
          ) : (
            <div className="recent-attempts">
              {recent.map((attempt) => {
                const unit = bundle.units.find((x) => x.id === attempt.unitId);
                return (
                  <div className="recent-attempt" key={attempt.id}>
                    <span className="pill">{attempt.type.toUpperCase()}</span>
                    <span className="recent-attempt-copy">
                      U{attempt.unitId} · {unit?.title ?? ""}
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
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="pc-quicklinks">
        {quicklinks.map(([view, title, desc]) => (
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
