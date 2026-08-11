"use client";

// Course shell: grouped sidebar navigation, view routing, theme toggle,
// and localStorage-backed progress, parameterized by a CourseBundle.
// Mirrors the AP Precalculus shell (app/precalc/page.tsx) feature for
// feature; content comes exclusively from content/<course>/.

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Course } from "../registry";
import type { CourseBundle } from "../../../content/courseTypes";
import type { CourseGo, CourseNavParams, CourseView } from "./nav";
import { useCourseProgress } from "./store";
import { DashboardPage } from "./pages/Dashboard";
import { TutorPage } from "./pages/Tutor";
import { StudyGuidesPage } from "./pages/StudyGuides";
import { McqPage } from "./pages/Mcq";
import { FrqPage } from "./pages/Frq";
import { FlashcardsPage } from "./pages/Flashcards";
import { ReferencePage } from "./pages/Reference";
import { ExamsPage } from "./pages/Exams";
import { ProgressPage } from "./pages/Progress";
import { ChecklistPage } from "./pages/Checklist";
import { TimelinePage } from "./pages/Timeline";

const THEME_KEY = "course-theme-v1";

export function CourseApp({ course, bundle }: { course: Course; bundle: CourseBundle }) {
  const [view, setView] = useState<CourseView>("dash");
  const [menuOpen, setMenuOpen] = useState(false);
  const [params, setParams] = useState<CourseNavParams>({});
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const progressApi = useCourseProgress(bundle.id);
  const { progress } = progressApi;

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_KEY);
      if (stored === "light" || stored === "dark") setTheme(stored);
    } catch {
      // keep default
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const go: CourseGo = (nextView, nextParams) => {
    setParams(nextParams ?? {});
    setView(nextView);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const readPct = bundle.lessons.length
    ? Math.round((progress.readTopics.filter((t) => bundle.lessons.some((l) => l.topicId === t)).length / bundle.lessons.length) * 100)
    : 0;

  const navItems: { id: CourseView; label: string; icon: string }[] = [
    { id: "dash", label: "Dashboard", icon: "◎" },
    ...(bundle.features?.workChecklist
      ? [{ id: "checklist" as CourseView, label: "Work checklist", icon: "▣" }]
      : []),
    ...(bundle.features?.timeline ? [{ id: "timeline" as CourseView, label: "Timeline", icon: "↦" }] : []),
    { id: "tutor", label: "Tutor", icon: "◇" },
    { id: "study", label: "Study guides", icon: "▤" },
    { id: "mcq", label: "MCQ practice", icon: "✓" },
    { id: "frq", label: "FRQ practice", icon: "✎" },
    { id: "cards", label: "Flashcards", icon: "▯" },
    { id: "reference", label: bundle.referenceTitle, icon: "Σ" },
    { id: "exams", label: "Practice exams", icon: "◫" },
    { id: "progress", label: "Progress", icon: "▥" },
  ];

  let content: React.ReactNode = null;
  if (view === "dash") content = <DashboardPage bundle={bundle} go={go} progress={progress} />;
  if (view === "checklist") content = <ChecklistPage bundle={bundle} go={go} readTopics={progress.readTopics} />;
  if (view === "timeline") content = <TimelinePage bundle={bundle} go={go} readTopics={progress.readTopics} />;
  if (view === "tutor")
    content = (
      <TutorPage
        bundle={bundle}
        go={go}
        topicId={params.topicId}
        readTopics={progress.readTopics}
        markTopicRead={progressApi.markTopicRead}
      />
    );
  if (view === "study") content = <StudyGuidesPage bundle={bundle} go={go} unitId={params.unitId} progress={progress} />;
  if (view === "mcq")
    content = (
      <McqPage
        key={JSON.stringify(params.mcq ?? null)}
        bundle={bundle}
        go={go}
        preset={params.mcq}
        recordAttempt={progressApi.recordAttempt}
      />
    );
  if (view === "frq")
    content = (
      <FrqPage
        key={params.frqId ?? params.frqType ?? "list"}
        bundle={bundle}
        frqId={params.frqId}
        frqType={params.frqType}
        recordAttempt={progressApi.recordAttempt}
      />
    );
  if (view === "cards")
    content = (
      <FlashcardsPage
        bundle={bundle}
        go={go}
        unitId={params.unitId}
        srState={progress.srState}
        updateSRCard={progressApi.updateSRCard}
      />
    );
  if (view === "reference") content = <ReferencePage bundle={bundle} />;
  if (view === "exams") content = <ExamsPage bundle={bundle} go={go} />;
  if (view === "progress")
    content = <ProgressPage bundle={bundle} go={go} progress={progress} resetProgress={progressApi.resetProgress} />;

  const readingWidth =
    (view === "tutor" && params.topicId) || (view === "study" && params.unitId) || view === "frq";

  return (
    <div className="app-shell">
      <aside className={"sidebar " + (menuOpen ? "is-open" : "")}>
        <div className="brand-block">
          <div className="brand-mark" style={{ background: course.color }}>
            {bundle.brandMark}
          </div>
          <div>
            <strong>{bundle.shortName}</strong>
            <span>{course.period.toUpperCase()}</span>
          </div>
          <button className="mobile-close" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            ×
          </button>
        </div>

        <div className="sprint-panel">
          <span>LESSONS READ</span>
          <strong>
            {progress.readTopics.filter((t) => bundle.lessons.some((l) => l.topicId === t)).length} / {bundle.lessons.length}
          </strong>
          <small>
            {bundle.mcq.length} MCQs · {bundle.frq.length} FRQs · {bundle.flashcards.length} cards
          </small>
          <div className="sidebar-progress">
            <span style={{ width: readPct + "%" }} />
          </div>
          <div>
            <b>{readPct}% read</b>
            <b>{progress.attempts.length} attempts</b>
          </div>
        </div>

        <nav aria-label="Primary">
          <div className="nav-group">
            <span className="nav-group-label">{bundle.name.toUpperCase()}</span>
            {navItems.map((item) => (
              <button
                type="button"
                className={view === item.id ? "active" : ""}
                key={item.id}
                onClick={() => go(item.id)}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="sidebar-bottom">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
            {theme === "dark" ? "Dark mode" : "Light mode"}
          </button>
          <Link className="all-courses-link" href="/">
            ← All courses
          </Link>
          <span className="local-note">Progress saves locally on this device.</span>
        </div>
      </aside>

      {menuOpen ? (
        <button className="drawer-scrim" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
      ) : null}

      <header className="mobile-header">
        <button type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <div className="brand-mark" style={{ background: course.color }}>
          {bundle.brandMark}
        </div>
        <div>
          <strong>{bundle.shortName}</strong>
          <span>{navItems.find((item) => item.id === view)?.label}</span>
        </div>
        <span>{readPct}%</span>
      </header>

      <main>
        <div className={"content " + (readingWidth ? "reading-width" : "")}>{content}</div>
      </main>
    </div>
  );
}
