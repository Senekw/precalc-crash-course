"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  blockThemes,
  cutTopics,
  formulaGroups,
  getLesson,
  lessons,
  practiceQuestions,
  totalMinutes,
  type BlockNumber,
  type PracticeQuestion,
} from "../curriculum";
import type { PrecalcGo, PrecalcNavParams, PrecalcView } from "./nav";
import { usePrecalcProgress } from "./store";
import { PrecalcDashboard } from "./pages/Dashboard";
import { TutorPage } from "./pages/Tutor";
import { StudyGuidesPage } from "./pages/StudyGuides";
import { McqPage } from "./pages/Mcq";
import { FrqPage } from "./pages/Frq";
import { FlashcardsPage } from "./pages/Flashcards";
import { FormulasPage } from "./pages/Formulas";
import { ExamsPage } from "./pages/Exams";
import { ProgressPage } from "./pages/Progress";

type BridgeView = "dashboard" | "plan" | "learn" | "drill" | "formulas" | "mastery";
type View = BridgeView | PrecalcView;
type DrillResult = { id: string; correct: boolean; skill: string; choice?: number };
type StoredProgress = {
  completed: string[];
  notes: Record<string, string>;
  results: DrillResult[];
  theme: "dark" | "light";
};

const STORAGE_KEY = "bc-bridge-progress-v1";

// Saved progress can predate the one-day rebuild; drop ids that no longer exist.
const validLessonIds = new Set(lessons.map((lesson) => lesson.id));
const validQuestionIds = new Set(practiceQuestions.map((question) => question.id));

const navGroups: { label: string; items: { id: View; label: string; icon: string }[] }[] = [
  {
    label: "AP PRECALCULUS",
    items: [
      { id: "pc-dash", label: "Dashboard", icon: "◎" },
      { id: "pc-tutor", label: "Tutor", icon: "◇" },
      { id: "pc-study", label: "Study guides", icon: "▤" },
      { id: "pc-mcq", label: "MCQ practice", icon: "✓" },
      { id: "pc-frq", label: "FRQ practice", icon: "✎" },
      { id: "pc-cards", label: "Flashcards", icon: "▯" },
      { id: "pc-formulas", label: "Formula sheet", icon: "Σ" },
      { id: "pc-exams", label: "Practice exams", icon: "◫" },
      { id: "pc-progress", label: "Progress", icon: "▥" },
    ],
  },
  {
    label: "1-DAY BRIDGE",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "⌂" },
      { id: "plan", label: "One-day plan", icon: "◷" },
      { id: "learn", label: "Crash lessons", icon: "◈" },
      { id: "drill", label: "Drills", icon: "≟" },
      { id: "formulas", label: "Formula sheet", icon: "ƒ" },
      { id: "mastery", label: "Mastery", icon: "▦" },
    ],
  },
];

const allNavItems = navGroups.flatMap((group) => group.items);

const skillOrder = ["Algebra", "Functions", "Trig", "Exp / Log", "BC Bridge"];

const diagnosticIds = [
  "q1", "q3", "q5", "q7", "q9", "q10", "q11",
  "q14", "q15", "q16", "q18", "q19", "q21",
  "q22", "q23", "q24", "q26", "q27", "q35", "q36",
];

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (!hours) return mins + " min";
  if (!mins) return hours + " hr";
  return hours + " hr " + mins + " min";
}

function formatClockOffset(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours + ":" + String(mins).padStart(2, "0");
}

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function ProgressRing({ value, size = 78 }: { value: number; size?: number }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div
      className="progress-ring"
      style={{
        width: size,
        height: size,
        background: "conic-gradient(var(--accent) " + safeValue + "%, var(--surface-muted) 0)",
      }}
    >
      <span>{Math.round(safeValue)}%</span>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="section-header">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {action ? <div className="section-actions">{action}</div> : null}
    </div>
  );
}

function AppButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={"button button-" + variant + " " + className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pcParams, setPcParams] = useState<PrecalcNavParams>({});
  const precalc = usePrecalcProgress();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [results, setResults] = useState<DrillResult[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hydrated, setHydrated] = useState(false);
  const [formulaSearch, setFormulaSearch] = useState("");
  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [sessionResults, setSessionResults] = useState<DrillResult[]>([]);
  const [sessionDone, setSessionDone] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as StoredProgress;
          setCompleted(
            Array.isArray(saved.completed) ? saved.completed.filter((id) => validLessonIds.has(id)) : [],
          );
          setNotes(saved.notes ?? {});
          setResults(
            Array.isArray(saved.results) ? saved.results.filter((result) => validQuestionIds.has(result.id)) : [],
          );
          setTheme(saved.theme === "light" ? "light" : "dark");
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (!hydrated) return;
    const stored: StoredProgress = { completed, notes, results, theme };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }, [completed, notes, results, theme, hydrated]);

  const completedSet = useMemo(() => new Set(completed), [completed]);
  const studiedMinutes = useMemo(
    () => lessons.filter((lesson) => completedSet.has(lesson.id)).reduce((sum, lesson) => sum + lesson.minutes, 0),
    [completedSet],
  );
  const completionPercent = (completed.length / lessons.length) * 100;
  const nextLesson = lessons.find((lesson) => !completedSet.has(lesson.id)) ?? lessons[lessons.length - 1];
  const currentQuestion = sessionIds.length
    ? practiceQuestions.find((question) => question.id === sessionIds[questionIndex]) ?? null
    : null;

  function navigate(nextView: View) {
    setView(nextView);
    setMenuOpen(false);
    if (nextView === "learn") setActiveLessonId(null);
    if (nextView.startsWith("pc-")) setPcParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const goPrecalc: PrecalcGo = (nextView, params) => {
    setPcParams(params ?? {});
    setView(nextView);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function openLesson(id: string) {
    setActiveLessonId(id);
    setView("learn");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleComplete(id: string) {
    setCompleted((current) =>
      current.includes(id) ? current.filter((lessonId) => lessonId !== id) : [...current, id],
    );
  }

  function startDrill(size: number, skill?: string, diagnostic = false) {
    let picked: PracticeQuestion[];
    if (diagnostic) {
      picked = diagnosticIds
        .map((id) => practiceQuestions.find((question) => question.id === id))
        .filter((question): question is PracticeQuestion => Boolean(question));
    } else {
      const pool = skill
        ? practiceQuestions.filter((question) => question.skill === skill)
        : practiceQuestions;
      picked = shuffle(pool).slice(0, Math.min(size, pool.length));
    }
    setSessionIds(picked.map((question) => question.id));
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setSessionResults([]);
    setSessionDone(false);
  }

  function answerQuestion(choice: number) {
    if (!currentQuestion || selectedAnswer !== null) return;
    const result = {
      id: currentQuestion.id,
      correct: choice === currentQuestion.answer,
      skill: currentQuestion.skill,
      choice,
    };
    setSelectedAnswer(choice);
    setSessionResults((current) => [...current, result]);
    setResults((current) => [...current, result].slice(-300));
  }

  function nextQuestion() {
    if (questionIndex >= sessionIds.length - 1) {
      setSessionDone(true);
      return;
    }
    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);
    setSelectedAnswer(sessionResults[nextIndex]?.choice ?? null);
  }

  function resetProgress() {
    if (!window.confirm("Reset every completed lesson, note, and drill result on this device?")) return;
    setCompleted([]);
    setNotes({});
    setResults([]);
    setSessionIds([]);
    setSessionDone(false);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  const dashboard = (
    <>
      <SectionHeader
        title="One day. Start Calc BC ready."
        subtitle="13.5 focused hours. Zero retention assumed in; calculus-ready fluency out."
      />

      <section className="next-action card accent-card">
        <div className="next-action-icon">◎</div>
        <div className="next-action-copy">
          <span className="eyebrow">NEXT ACTION · {nextLesson.number}</span>
          <h2>{nextLesson.title}</h2>
          <p>{nextLesson.payoff}</p>
          <div className="meta-row">
            <span>Block {nextLesson.block}</span>
            <span>{formatMinutes(nextLesson.minutes)}</span>
            <span>Direct BC prerequisite</span>
          </div>
        </div>
        <AppButton onClick={() => openLesson(nextLesson.id)}>
          {completed.length ? "Continue" : "Start now"} <span aria-hidden="true">→</span>
        </AppButton>
      </section>

      <section className="next-action card">
        <div className="next-action-icon">◎</div>
        <div className="next-action-copy">
          <span className="eyebrow">FULL COURSE</span>
          <h2>AP Precalculus suite</h2>
          <p>44 step-by-step lessons, 103 MCQs, 23 rubric-scored FRQs, 88 flashcards, and 4 full-length practice exams.</p>
        </div>
        <AppButton variant="secondary" onClick={() => goPrecalc("pc-dash")}>
          Open <span aria-hidden="true">→</span>
        </AppButton>
      </section>

      <section className="metric-grid" aria-label="Progress summary">
        <div className="metric card">
          <span className="metric-label">COURSE PROGRESS</span>
          <strong>{Math.round(completionPercent)}%</strong>
          <span>{completed.length} of {lessons.length} lessons</span>
        </div>
        <div className="metric card">
          <span className="metric-label">FOCUSED TIME</span>
          <strong>{formatMinutes(studiedMinutes)}</strong>
          <span>of {formatMinutes(totalMinutes)} completed</span>
        </div>
        <div className="metric card">
          <span className="metric-label">DRILL ACCURACY</span>
          <strong>{results.length ? Math.round((results.filter((result) => result.correct).length / results.length) * 100) + "%" : "—"}</strong>
          <span>{results.length ? results.length + " answers recorded" : "Take the diagnostic"}</span>
        </div>
        <div className="metric card">
          <span className="metric-label">SCOPE</span>
          <strong>Zero filler</strong>
          <span>{cutTopics.length} low-payoff topics cut</span>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="card dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">THE 13.5-HOUR PATH</span>
              <h2>Highest payoff first</h2>
            </div>
            <button className="text-link" type="button" onClick={() => navigate("plan")}>Open plan →</button>
          </div>
          <div className="dependency-list">
            {([1, 2, 3] as BlockNumber[]).map((block) => {
              const blockLessons = lessons.filter((lesson) => lesson.block === block);
              const blockDone = blockLessons.filter((lesson) => completedSet.has(lesson.id)).length;
              return (
                <button className="dependency-row" type="button" key={block} onClick={() => navigate("plan")}>
                  <span className="day-index">0{block}</span>
                  <span className="dependency-copy">
                    <strong>{blockThemes[block].title}</strong>
                    <small>{blockThemes[block].outcome}</small>
                  </span>
                  <span className="dependency-progress">{blockDone}/{blockLessons.length}</span>
                  <span aria-hidden="true">→</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="card zero-filler">
        <div>
          <span className="eyebrow">THE FILTER</span>
          <h2>If it does not pay rent in week one of Calc BC, it is gone.</h2>
          <p>No AP Precalculus exam padding. No survey units. No topics BC reteaches from scratch later. Every lesson feeds the limits and derivatives you meet immediately.</p>
        </div>
        <div className="cut-tags">
          {cutTopics.slice(0, 5).map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      </section>
    </>
  );

  const plan = (
    <>
      <SectionHeader
        title="Your one-day grind"
        subtitle="About 13.5 hours in three blocks. The material you absolutely cannot walk in without comes first, while you are fresh."
        action={<AppButton onClick={() => openLesson(nextLesson.id)}>Resume next lesson →</AppButton>}
      />
      <div className="plan-days">
        {([1, 2, 3] as BlockNumber[]).map((block) => {
          const blockLessons = lessons.filter((lesson) => lesson.block === block);
          const blockMinutes = blockLessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
          let elapsed = lessons
            .filter((lesson) => lesson.block < block)
            .reduce((sum, lesson) => sum + lesson.minutes, 0);
          return (
            <section className="plan-day card" key={block}>
              <div className="plan-day-head">
                <div>
                  <span className="eyebrow">BLOCK {block} · {formatMinutes(blockMinutes).toUpperCase()}</span>
                  <h2>{blockThemes[block].title}</h2>
                  <p>{blockThemes[block].focus}</p>
                </div>
                <span className="day-total">
                  {blockLessons.filter((lesson) => completedSet.has(lesson.id)).length}/{blockLessons.length}
                </span>
              </div>
              <div className="timeline">
                {blockLessons.map((lesson) => {
                  const start = elapsed;
                  elapsed += lesson.minutes;
                  const done = completedSet.has(lesson.id);
                  return (
                    <button className={"timeline-item " + (done ? "is-done" : "")} type="button" key={lesson.id} onClick={() => openLesson(lesson.id)}>
                      <span className="timeline-time">{formatClockOffset(start)}–{formatClockOffset(elapsed)}</span>
                      <span className="timeline-marker">{done ? "✓" : lesson.number}</span>
                      <span className="timeline-copy">
                        <strong>{lesson.shortTitle}</strong>
                        <small>{lesson.payoff}</small>
                      </span>
                      <span aria-hidden="true">→</span>
                    </button>
                  );
                })}
              </div>
              <div className="outcome-callout">
                <span>END-OF-BLOCK GATE</span>
                <p>{blockThemes[block].outcome}</p>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );

  const learnCatalog = (
    <>
      <SectionHeader
        title="Precalc Tutor"
        subtitle="Read sequentially. Each compact lesson explains the idea, works it step by step, and ends with a mastery gate."
      />
      <div className="how-to card accent-card subtle-accent">
        <span aria-hidden="true">◇</span>
        <p><strong>How to use:</strong> retrieve from memory first, read the essentials, reproduce the worked example, then answer the gate before revealing it.</p>
      </div>
      {([1, 2, 3] as BlockNumber[]).map((block) => (
        <section className="lesson-unit" key={block}>
          <div className="unit-heading">
            <div>
              <span className="eyebrow">BLOCK {block}</span>
              <h2>{blockThemes[block].title}</h2>
            </div>
            <span>
              {lessons.filter((lesson) => lesson.block === block).length} lessons ·{" "}
              {formatMinutes(lessons.filter((lesson) => lesson.block === block).reduce((sum, lesson) => sum + lesson.minutes, 0))}
            </span>
          </div>
          <div className="lesson-grid">
            {lessons.filter((lesson) => lesson.block === block).map((lesson) => (
              <button
                className={"lesson-row card " + (completedSet.has(lesson.id) ? "is-done" : "")}
                type="button"
                key={lesson.id}
                onClick={() => openLesson(lesson.id)}
              >
                <span className="lesson-number">{completedSet.has(lesson.id) ? "✓" : lesson.number}</span>
                <span className="lesson-row-copy">
                  <strong>{lesson.title}</strong>
                  <small>3 essentials · 1 worked example · 2 gate checks · {formatMinutes(lesson.minutes)}</small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </>
  );

  const activeLesson = activeLessonId ? getLesson(activeLessonId) : null;
  const activeIndex = activeLesson ? lessons.findIndex((lesson) => lesson.id === activeLesson.id) : -1;
  const previousInOrder = activeIndex > 0 ? lessons[activeIndex - 1] : null;
  const nextInOrder = activeIndex >= 0 && activeIndex < lessons.length - 1 ? lessons[activeIndex + 1] : null;

  const lessonDetail = activeLesson ? (
    <article className="lesson-detail">
      <div className="lesson-topbar">
        <button className="back-link" type="button" onClick={() => setActiveLessonId(null)}>← All lessons</button>
        <div className="lesson-step-nav">
          <button
            type="button"
            disabled={!previousInOrder}
            aria-label={previousInOrder ? "Previous lesson: " + previousInOrder.number + " " + previousInOrder.shortTitle : "No previous lesson"}
            onClick={() => previousInOrder && openLesson(previousInOrder.id)}
          >
            ←
          </button>
          <span>{activeIndex + 1} / {lessons.length}</span>
          <button
            type="button"
            disabled={!nextInOrder}
            aria-label={nextInOrder ? "Next lesson: " + nextInOrder.number + " " + nextInOrder.shortTitle : "No next lesson"}
            onClick={() => nextInOrder && openLesson(nextInOrder.id)}
          >
            →
          </button>
        </div>
      </div>
      <div className="lesson-detail-head">
        <div>
          <span className="pill">BLOCK {activeLesson.block} · LESSON {activeLesson.number}</span>
          <h1>{activeLesson.title}</h1>
          <p>{activeLesson.payoff}</p>
        </div>
        <div className="lesson-detail-meta card">
          <span>TIMEBOX</span>
          <strong>{formatMinutes(activeLesson.minutes)}</strong>
          <small>Lesson {activeIndex + 1} of {lessons.length}</small>
        </div>
      </div>

      <section className="objectives card accent-card subtle-accent">
        <span className="eyebrow">YOU MUST BE ABLE TO</span>
        <ul>
          {activeLesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}
        </ul>
      </section>

      <section className="reading-section">
        <span className="eyebrow">THE ESSENTIALS</span>
        {activeLesson.essentials.map((essential, index) => (
          <div className="concept-block" key={essential.title}>
            <span className="concept-index">0{index + 1}</span>
            <div>
              <h2>{essential.title}</h2>
              <p>{essential.body}</p>
              {essential.formula ? <div className="formula-display">{essential.formula}</div> : null}
            </div>
          </div>
        ))}
      </section>

      <section className="worked-example card">
        <div className="example-heading">
          <span className="eyebrow">WORKED EXAMPLE</span>
          <span>Do not skip lines</span>
        </div>
        <h2>{activeLesson.example.problem}</h2>
        <ol>
          {activeLesson.example.steps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
        <div className="answer-callout"><span>ANSWER</span>{activeLesson.example.answer}</div>
      </section>

      <section className="trap-card">
        <span className="eyebrow">CALCULUS-KILLING TRAPS</span>
        <ul>{activeLesson.traps.map((trap) => <li key={trap}>{trap}</li>)}</ul>
      </section>

      <section className="mastery-gate">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">CLOSED-NOTE GATE</span>
            <h2>Prove it before you mark complete</h2>
          </div>
          <span className="pill">2 / 2 required</span>
        </div>
        <div className="gate-grid">
          {activeLesson.gate.map((item, index) => (
            <details className="gate-question card" key={item.prompt}>
              <summary>
                <span>0{index + 1}</span>
                <strong>{item.prompt}</strong>
                <small>Reveal answer</small>
              </summary>
              <div className="gate-answer">{item.answer}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="lesson-notes card">
        <label htmlFor="lesson-notes"><span className="eyebrow">YOUR RETRIEVAL NOTE</span></label>
        <textarea
          id="lesson-notes"
          value={notes[activeLesson.id] ?? ""}
          onChange={(event) => setNotes((current) => ({ ...current, [activeLesson.id]: event.target.value }))}
          placeholder="Write the one rule or mistake you need to retrieve later. Saved on this device."
        />
      </section>

      <div className="lesson-footer-actions">
        <AppButton
          variant={completedSet.has(activeLesson.id) ? "secondary" : "primary"}
          onClick={() => toggleComplete(activeLesson.id)}
        >
          {completedSet.has(activeLesson.id) ? "✓ Completed — undo" : "Mark lesson complete"}
        </AppButton>
        <AppButton
          variant="secondary"
          onClick={() => {
            startDrill(5, undefined, false);
            setView("drill");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Open a 5-question drill
        </AppButton>
        {nextInOrder ? (
          <AppButton variant="secondary" onClick={() => openLesson(nextInOrder.id)}>
            Next lesson: {nextInOrder.number} <span aria-hidden="true">→</span>
          </AppButton>
        ) : null}
      </div>

      <nav className="lesson-pager" aria-label="Lesson navigation">
        {previousInOrder ? (
          <button className="pager-card card" type="button" onClick={() => openLesson(previousInOrder.id)}>
            <span className="pager-direction">← PREVIOUS LESSON</span>
            <strong>{previousInOrder.number} {previousInOrder.title}</strong>
            <small>Block {previousInOrder.block} · {formatMinutes(previousInOrder.minutes)}</small>
          </button>
        ) : (
          <div className="pager-card card is-placeholder">
            <span className="pager-direction">START OF THE COURSE</span>
            <strong>This is the first lesson</strong>
            <small>Everything after it depends on this one.</small>
          </div>
        )}
        {nextInOrder ? (
          <button className="pager-card card is-next" type="button" onClick={() => openLesson(nextInOrder.id)}>
            <span className="pager-direction">NEXT LESSON →</span>
            <strong>{nextInOrder.number} {nextInOrder.title}</strong>
            <small>Block {nextInOrder.block} · {formatMinutes(nextInOrder.minutes)}</small>
          </button>
        ) : (
          <button className="pager-card card is-next" type="button" onClick={() => navigate("mastery")}>
            <span className="pager-direction">END OF THE PATH →</span>
            <strong>Check your mastery gates</strong>
            <small>85% overall · 80% in every strand</small>
          </button>
        )}
      </nav>
    </article>
  ) : null;

  function renderDrillSession() {
    if (sessionDone) {
      const correct = sessionResults.filter((result) => result.correct).length;
      const percent = sessionResults.length ? Math.round((correct / sessionResults.length) * 100) : 0;
      return (
        <div className="session-summary card">
          <ProgressRing value={percent} size={104} />
          <span className="eyebrow">SESSION COMPLETE</span>
          <h2>{correct} / {sessionResults.length} correct</h2>
          <p>{percent >= 85 ? "Gate cleared. Keep the explanations retrievable." : "Repair every miss before taking a fresh set."}</p>
          <div className="button-row">
            <AppButton onClick={() => startDrill(sessionIds.length)}>Fresh set</AppButton>
            <AppButton variant="secondary" onClick={() => { setSessionIds([]); setSessionDone(false); }}>Back to drills</AppButton>
          </div>
        </div>
      );
    }
    if (!currentQuestion) return null;
    return (
      <div className="drill-session">
        <button className="back-link" type="button" onClick={() => setSessionIds([])}>← Exit session</button>
        <div className="session-progress">
          <span>QUESTION {questionIndex + 1} OF {sessionIds.length}</span>
          <span>{Math.round((questionIndex / sessionIds.length) * 100)}%</span>
          <div><span style={{ width: ((questionIndex + (selectedAnswer !== null ? 1 : 0)) / sessionIds.length) * 100 + "%" }} /></div>
        </div>
        <div className="question-navigator" aria-label="Question navigator">
          {sessionIds.map((id, index) => (
            <button
              type="button"
              key={id}
              disabled={index > sessionResults.length}
              className={index === questionIndex ? "active" : index < sessionResults.length ? (sessionResults[index]?.correct ? "correct" : "wrong") : ""}
              onClick={() => {
                if (index >= sessionResults.length) return;
                setQuestionIndex(index);
                const priorQuestion = practiceQuestions.find((question) => question.id === sessionIds[index]);
                const result = sessionResults[index];
                setSelectedAnswer(result?.choice ?? (result?.correct ? priorQuestion?.answer ?? null : null));
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <section className="question-card card">
          <div className="question-meta">
            <span className="pill">{currentQuestion.skill}</span>
            <span className="pill">Difficulty {currentQuestion.difficulty}/3</span>
            <span className="pill">No calculator needed</span>
          </div>
          <h2>{currentQuestion.prompt}</h2>
          <div className="answer-options">
            {currentQuestion.choices.map((choice, index) => {
              let state = "";
              if (selectedAnswer !== null) {
                if (index === currentQuestion.answer) state = "correct";
                else if (index === selectedAnswer) state = "wrong";
              }
              return (
                <button
                  type="button"
                  className={state}
                  key={choice}
                  disabled={selectedAnswer !== null}
                  onClick={() => answerQuestion(index)}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  <strong>{choice}</strong>
                  {state === "correct" ? <b>✓</b> : state === "wrong" ? <b>×</b> : null}
                </button>
              );
            })}
          </div>
          {selectedAnswer !== null ? (
            <div className={"feedback " + (selectedAnswer === currentQuestion.answer ? "feedback-correct" : "feedback-wrong")}>
              <span className="eyebrow">{selectedAnswer === currentQuestion.answer ? "CORRECT" : "REPAIR THIS"}</span>
              <p>{currentQuestion.explanation}</p>
              <button type="button" className="text-link" onClick={() => openLesson(currentQuestion.lessonId)}>
                Review the exact lesson →
              </button>
            </div>
          ) : null}
          <div className="question-actions">
            <span>{selectedAnswer === null ? "Choose one answer to continue." : "Read the reasoning, then move on."}</span>
            <AppButton onClick={nextQuestion} disabled={selectedAnswer === null}>
              {questionIndex === sessionIds.length - 1 ? "Finish set" : "Next question"} →
            </AppButton>
          </div>
        </section>
      </div>
    );
  }

  const drill = sessionIds.length ? renderDrillSession() : (
    <>
      <SectionHeader
        title="Closed-note drills"
        subtitle="Immediate feedback, a direct link to the missed lesson, and no points for guessing."
      />
      <section className="drill-hero card accent-card">
        <div>
          <span className="eyebrow">YOUR FINAL GATE</span>
          <h2>20-question BC readiness diagnostic</h2>
          <p>Balanced across algebra, functions, trig, logs, and the BC bridge. Take it closed-note at the end of the grind; every miss becomes your repair list.</p>
          <div className="meta-row"><span>20 questions</span><span>25–35 minutes</span><span>Target 85%</span></div>
        </div>
        <AppButton onClick={() => startDrill(20, undefined, true)}>Start diagnostic →</AppButton>
      </section>
      <div className="drill-options">
        <button className="drill-option card" type="button" onClick={() => startDrill(5)}>
          <span className="drill-icon">⚡</span>
          <strong>Quick drill</strong>
          <p>Five mixed questions for retrieval between lessons.</p>
          <small>5 questions · ~7 min</small>
        </button>
        <button className="drill-option card" type="button" onClick={() => startDrill(15)}>
          <span className="drill-icon">◎</span>
          <strong>Standard set</strong>
          <p>Fifteen mixed questions with immediate explanations.</p>
          <small>15 questions · ~20 min</small>
        </button>
        <button className="drill-option card" type="button" onClick={() => startDrill(practiceQuestions.length)}>
          <span className="drill-icon">◇</span>
          <strong>Full bank</strong>
          <p>Every local practice question in one cumulative pass.</p>
          <small>{practiceQuestions.length} questions · ~40 min</small>
        </button>
      </div>
      <section className="skill-drills">
        <div className="unit-heading">
          <h2>Target one prerequisite strand</h2>
          <span>Use after the diagnostic identifies a gap</span>
        </div>
        <div className="skill-grid">
          {skillOrder.map((skill) => {
            const count = practiceQuestions.filter((question) => question.skill === skill).length;
            const skillResults = results.filter((result) => result.skill === skill);
            const score = skillResults.length
              ? Math.round((skillResults.filter((result) => result.correct).length / skillResults.length) * 100)
              : null;
            return (
              <button className="skill-row card" type="button" key={skill} onClick={() => startDrill(count, skill)}>
                <span>{skill.slice(0, 1)}</span>
                <div><strong>{skill}</strong><small>{count} questions</small></div>
                <b>{score === null ? "Not tested" : score + "%"}</b>
                <i aria-hidden="true">→</i>
              </button>
            );
          })}
        </div>
      </section>
    </>
  );

  const filteredFormulaGroups = formulaGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        (group.title + " " + item.name + " " + item.formula + " " + item.use)
          .toLowerCase()
          .includes(formulaSearch.toLowerCase()),
      ),
    }))
    .filter((group) => group.items.length);

  const formulas = (
    <>
      <SectionHeader
        title="Calc BC prerequisite formula sheet"
        subtitle="This is a retrieval checker, not a substitute for memory. Every item below has direct BC payoff."
      />
      <div className="formula-tools card">
        <label htmlFor="formula-search">Search formulas</label>
        <input
          id="formula-search"
          type="search"
          value={formulaSearch}
          onChange={(event) => setFormulaSearch(event.target.value)}
          placeholder="Try unit circle, double angle, log…"
        />
        <span>{formulaGroups.reduce((sum, group) => sum + group.items.length, 0)} essentials</span>
      </div>
      <div className="formula-groups">
        {filteredFormulaGroups.map((group) => (
          <section className="formula-group" key={group.title}>
            <div className="unit-heading">
              <div><h2>{group.title}</h2><p>{group.subtitle}</p></div>
              <span>{group.items.length} formulas</span>
            </div>
            <div className="formula-list card">
              {group.items.map((item) => (
                <div className="formula-row" key={item.name}>
                  <div><strong>{item.name}</strong><small>{item.use}</small></div>
                  <div className="formula-display">{item.formula}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
        {!filteredFormulaGroups.length ? <div className="empty-state card">No essential formula matches “{formulaSearch}”.</div> : null}
      </div>
    </>
  );

  const mastery = (
    <>
      <SectionHeader
        title="Mastery, not page views"
        subtitle="A lesson counts when you can retrieve and apply it closed-note. Drill results remain on this device."
        action={<AppButton variant="secondary" onClick={resetProgress}>Reset local progress</AppButton>}
      />
      <section className="mastery-overview card">
        <ProgressRing value={completionPercent} size={122} />
        <div>
          <span className="eyebrow">ONE-DAY COMPLETION</span>
          <h2>{completed.length} of {lessons.length} lessons mastered</h2>
          <p>{formatMinutes(studiedMinutes)} completed · {formatMinutes(totalMinutes - studiedMinutes)} remaining</p>
        </div>
        <AppButton onClick={() => openLesson(nextLesson.id)}>Continue path →</AppButton>
      </section>
      <section className="strand-section">
        <div className="unit-heading">
          <h2>Prerequisite strands</h2>
          <span>Final gate: 85% overall and 80% in every strand</span>
        </div>
        <div className="strand-grid">
          {skillOrder.map((skill) => {
            const skillResults = results.filter((result) => result.skill === skill);
            const correct = skillResults.filter((result) => result.correct).length;
            const score = skillResults.length ? Math.round((correct / skillResults.length) * 100) : 0;
            return (
              <div className="strand-card card" key={skill}>
                <div><strong>{skill}</strong><span>{skillResults.length ? score + "%" : "Untested"}</span></div>
                <div className="bar"><span style={{ width: score + "%" }} /></div>
                <small>{skillResults.length ? correct + " correct of " + skillResults.length : "Run the diagnostic to establish a baseline."}</small>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mastery-columns">
        <div className="card">
          <div className="panel-heading"><h2>Completed lessons</h2><span>{completed.length}/{lessons.length}</span></div>
          <div className="compact-list">
            {lessons.map((lesson) => (
              <button type="button" key={lesson.id} onClick={() => openLesson(lesson.id)}>
                <span className={completedSet.has(lesson.id) ? "check is-done" : "check"}>{completedSet.has(lesson.id) ? "✓" : ""}</span>
                <span><strong>{lesson.number} {lesson.shortTitle}</strong><small>Block {lesson.block} · {formatMinutes(lesson.minutes)}</small></span>
                <i>→</i>
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="panel-heading"><h2>Deliberately excluded</h2><span>no filler</span></div>
          <p className="muted-copy">These are valid math topics, but they are not day-one Calc BC prerequisites. Parametric, polar, and series are BC Units 9 and 10; the course teaches them from scratch months from now. None of it belongs in a one-day emergency grind.</p>
          <ul className="cut-list">
            {cutTopics.map((topic) => <li key={topic}><span>×</span>{topic}</li>)}
          </ul>
        </div>
      </section>
    </>
  );

  let content: React.ReactNode = dashboard;
  if (view === "plan") content = plan;
  if (view === "learn") content = activeLesson ? lessonDetail : learnCatalog;
  if (view === "drill") content = drill;
  if (view === "formulas") content = formulas;
  if (view === "mastery") content = mastery;
  if (view === "pc-dash") content = <PrecalcDashboard go={goPrecalc} progress={precalc.progress} />;
  if (view === "pc-tutor")
    content = (
      <TutorPage
        go={goPrecalc}
        topicId={pcParams.topicId}
        readTopics={precalc.progress.readTopics}
        markTopicRead={precalc.markTopicRead}
      />
    );
  if (view === "pc-study") content = <StudyGuidesPage go={goPrecalc} unitId={pcParams.unitId} />;
  if (view === "pc-mcq")
    content = (
      <McqPage
        key={JSON.stringify(pcParams.mcq ?? null)}
        go={goPrecalc}
        preset={pcParams.mcq}
        recordAttempt={precalc.recordAttempt}
      />
    );
  if (view === "pc-frq")
    content = <FrqPage key={pcParams.frqId ?? "list"} frqId={pcParams.frqId} recordAttempt={precalc.recordAttempt} />;
  if (view === "pc-cards")
    content = (
      <FlashcardsPage
        go={goPrecalc}
        unitId={pcParams.unitId}
        srState={precalc.progress.srState}
        updateSRCard={precalc.updateSRCard}
      />
    );
  if (view === "pc-formulas") content = <FormulasPage />;
  if (view === "pc-exams") content = <ExamsPage go={goPrecalc} />;
  if (view === "pc-progress")
    content = <ProgressPage go={goPrecalc} progress={precalc.progress} resetPrecalcProgress={precalc.resetPrecalcProgress} />;

  return (
    <div className="app-shell">
      <aside className={"sidebar " + (menuOpen ? "is-open" : "")}>
        <div className="brand-block">
          <div className="brand-mark">∫</div>
          <div><strong>BC Bridge</strong><span>PRECALC · 1-DAY SPRINT</span></div>
          <button className="mobile-close" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
        </div>

        <div className="sprint-panel">
          <span>YOUR MISSION</span>
          <strong>13.5 focused hours</strong>
          <small>Only what BC week one assumes</small>
          <div className="sidebar-progress"><span style={{ width: completionPercent + "%" }} /></div>
          <div><b>{Math.round(completionPercent)}% complete</b><b>1 day</b></div>
        </div>

        <nav aria-label="Primary">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <span className="nav-group-label">{group.label}</span>
              {group.items.map((item) => (
                <button
                  type="button"
                  className={view === item.id ? "active" : ""}
                  key={item.id}
                  onClick={() => navigate(item.id)}
                >
                  <span aria-hidden="true">{item.icon}</span>{item.label}
                  {item.id === "learn" && completed.length ? <small>{completed.length}</small> : null}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
          >
            <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
            {theme === "dark" ? "Dark mode" : "Light mode"}
          </button>
          <Link className="all-courses-link" href="/">← All courses</Link>
          <span className="local-note">Progress saves locally on this device.</span>
        </div>
      </aside>

      {menuOpen ? <button className="drawer-scrim" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} /> : null}

      <header className="mobile-header">
        <button type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>☰</button>
        <div className="brand-mark">π</div>
        <div><strong>BC Bridge</strong><span>{allNavItems.find((item) => item.id === view)?.label}</span></div>
        <span>{Math.round(completionPercent)}%</span>
      </header>

      <main>
        <div
          className={
            "content " +
            (activeLesson ||
            (view === "pc-tutor" && pcParams.topicId) ||
            (view === "pc-study" && pcParams.unitId) ||
            view === "pc-frq"
              ? "reading-width"
              : "")
          }
        >
          {content}
        </div>
      </main>
    </div>
  );
}
