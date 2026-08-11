"use client";

// Course tutor: one deep-dive lesson per topic, organized by unit (and by
// track within a unit for strand-based courses). Lesson view renders
// objectives, intro, teaching sections with callouts / worked examples /
// plots / figures / tables / code, practice problems with hint and
// solution reveal, and takeaways. Flat prev/next ordering across the mode.

import { useState } from "react";
import { MathText } from "../../../precalc/math";
import { FunctionGraph } from "../../../precalc/FunctionGraph";
import { CalloutBox, CodeBox, FigureBox, StepList, TableBox } from "../bits";
import type { CourseGo } from "../nav";
import type { CourseBundle, Lesson, LessonPractice } from "../../../../content/courseTypes";

function PracticeCard({ practice, index }: { practice: LessonPractice; index: number }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  return (
    <div className="card tutor-practice">
      <div className="tutor-practice-head">
        <span className="concept-index">{String(index + 1).padStart(2, "0")}</span>
        <p>
          <MathText text={practice.problem} />
        </p>
      </div>
      {stage >= 1 && practice.hint ? (
        <p className="tutor-hint">
          <span className="eyebrow">HINT</span> <MathText text={practice.hint} />
        </p>
      ) : null}
      {stage >= 2 ? (
        <div className="tutor-solution">
          <StepList steps={practice.solution} />
          <div className="answer-callout">
            <span>ANSWER</span>
            <MathText text={practice.answer} />
          </div>
        </div>
      ) : (
        <div className="button-row">
          {practice.hint && stage === 0 ? (
            <button className="button button-ghost" type="button" onClick={() => setStage(1)}>
              Show hint
            </button>
          ) : null}
          <button className="button button-secondary" type="button" onClick={() => setStage(2)}>
            Reveal solution
          </button>
        </div>
      )}
    </div>
  );
}

function WorkHeader({ lesson }: { lesson: Lesson }) {
  const work = lesson.work;
  if (!work) return null;
  return (
    <section className="card frq-context work-id-card">
      <span className="eyebrow">IDENTIFICATION · WORK {work.workNumber} OF 250</span>
      <div className="guide-columns">
        <div>
          <ul>
            <li>
              <strong>Artist / culture:</strong> {work.artist}
            </li>
            <li>
              <strong>Date:</strong> {work.date}
            </li>
            <li>
              <strong>Materials:</strong> {work.materials}
            </li>
            {work.location ? (
              <li>
                <strong>Location:</strong> {work.location}
              </li>
            ) : null}
          </ul>
        </div>
        <div>
          <span className="eyebrow">IMAGE</span>
          {work.imageUrl ? (
            <p>
              <a className="text-link" href={work.imageUrl} target="_blank" rel="noreferrer">
                View this work externally →
              </a>
            </p>
          ) : null}
          <p className="muted-copy">{work.imageNote ?? "Image slot: view this work on Smarthistory or your textbook; no image is embedded here."}</p>
        </div>
      </div>
    </section>
  );
}

function LessonDetail({
  bundle,
  lesson,
  index,
  total,
  go,
  onPrev,
  onNext,
  isRead,
  markRead,
}: {
  bundle: CourseBundle;
  lesson: Lesson;
  index: number;
  total: number;
  go: CourseGo;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
  isRead: boolean;
  markRead: () => void;
}) {
  const unit = bundle.units.find((u) => u.id === lesson.unitId);
  return (
    <article className="lesson-detail">
      <div className="lesson-topbar">
        <button className="back-link" type="button" onClick={() => go("tutor")}>
          ← All lessons
        </button>
        <div className="lesson-step-nav">
          <button type="button" disabled={!onPrev} aria-label="Previous lesson" onClick={() => onPrev?.()}>
            ←
          </button>
          <span>
            {index + 1} / {total}
          </span>
          <button type="button" disabled={!onNext} aria-label="Next lesson" onClick={() => onNext?.()}>
            →
          </button>
        </div>
      </div>

      <div className="lesson-detail-head">
        <div>
          <span className="pill">
            {unit ? unit.title.toUpperCase() : "UNIT " + lesson.unitId} · {lesson.topicId}
            {lesson.track ? " · " + lesson.track.toUpperCase() + " TRACK" : ""}
          </span>
          <h1>{lesson.title}</h1>
          <p>
            <MathText text={lesson.intro} />
          </p>
        </div>
      </div>

      <WorkHeader lesson={lesson} />

      <section className="objectives card accent-card subtle-accent">
        <span className="eyebrow">OBJECTIVES</span>
        <ul>
          {lesson.objectives.map((objective) => (
            <li key={objective}>
              <MathText text={objective} />
            </li>
          ))}
        </ul>
      </section>

      {lesson.sections.map((section, sectionIndex) => (
        <section className="tutor-section" key={sectionIndex}>
          <h2>
            <MathText text={section.heading} />
          </h2>
          <p className="tutor-body">
            <MathText text={section.body} />
          </p>
          {section.callouts?.length ? (
            <div className="tutor-callouts">
              {section.callouts.map((callout, i) => (
                <CalloutBox callout={callout} key={i} />
              ))}
            </div>
          ) : null}
          {section.plots?.map((plot, i) => (
            <FunctionGraph key={i} {...plot} width={plot.width ?? 460} height={plot.height ?? 260} />
          ))}
          {section.figures?.map((figure, i) => (
            <FigureBox figure={figure} key={i} />
          ))}
          {section.tables?.map((table, i) => (
            <TableBox table={table} key={i} />
          ))}
          {section.codeBlocks?.map((block, i) => (
            <CodeBox block={block} key={i} />
          ))}
          {section.examples?.map((example, exampleIndex) => (
            <div className="worked-example card" key={exampleIndex}>
              <div className="example-heading">
                <span className="eyebrow">WORKED EXAMPLE</span>
                <span>Reproduce every line</span>
              </div>
              <h3>
                <MathText text={example.problem} />
              </h3>
              <StepList steps={example.steps} />
              <div className="answer-callout">
                <span>ANSWER</span>
                <MathText text={example.answer} />
              </div>
            </div>
          ))}
        </section>
      ))}

      {lesson.commonMistakes?.length ? (
        <section className="trap-card">
          <span className="eyebrow">COMMON MISTAKES</span>
          <ul>
            {lesson.commonMistakes.map((mistake) => (
              <li key={mistake}>
                <MathText text={mistake} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {lesson.practice.length ? (
        <section className="tutor-practice-block">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">PRACTICE</span>
              <h2>Do these before moving on</h2>
            </div>
            <span className="pill">{lesson.practice.length} problems</span>
          </div>
          {lesson.practice.map((practice, i) => (
            <PracticeCard practice={practice} index={i} key={i} />
          ))}
        </section>
      ) : null}

      <section className="trap-card">
        <span className="eyebrow">TAKEAWAYS</span>
        <ul>
          {lesson.takeaways.map((takeaway) => (
            <li key={takeaway}>
              <MathText text={takeaway} />
            </li>
          ))}
        </ul>
      </section>

      <div className="lesson-footer-actions">
        <button
          className={"button " + (isRead ? "button-secondary" : "button-primary")}
          type="button"
          onClick={markRead}
        >
          {isRead ? "✓ Marked as read" : "Mark lesson read"}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => go("mcq", { mcq: { unitId: lesson.unitId, count: 10, mode: "drill" } })}
        >
          Drill this unit →
        </button>
        {onNext ? (
          <button className="button button-secondary" type="button" onClick={onNext}>
            Next lesson →
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function TutorPage({
  bundle,
  go,
  topicId,
  readTopics,
  markTopicRead,
}: {
  bundle: CourseBundle;
  go: CourseGo;
  topicId?: string;
  readTopics: string[];
  markTopicRead: (topicId: string) => void;
}) {
  const lessons = bundle.lessons;
  const active = topicId ? lessons.find((t) => t.topicId === topicId) ?? null : null;

  if (active) {
    const index = lessons.findIndex((t) => t.topicId === active.topicId);
    const prev = index > 0 ? lessons[index - 1] : null;
    const next = index < lessons.length - 1 ? lessons[index + 1] : null;
    return (
      <LessonDetail
        bundle={bundle}
        lesson={active}
        index={index}
        total={lessons.length}
        go={go}
        onPrev={prev ? () => go("tutor", { topicId: prev.topicId }) : null}
        onNext={next ? () => go("tutor", { topicId: next.topicId }) : null}
        isRead={readTopics.includes(active.topicId)}
        markRead={() => markTopicRead(active.topicId)}
      />
    );
  }

  return (
    <>
      <div className="section-header">
        <div>
          <h1>{bundle.name} Tutor</h1>
          <p>
            {lessons.length} step-by-step lessons. Every section teaches, works examples line by line, then makes you
            practice.
          </p>
        </div>
      </div>
      {bundle.units.map((unit) => {
        const unitLessons = lessons.filter((t) => t.unitId === unit.id);
        if (!unitLessons.length) return null;
        const tracks = [...new Set(unitLessons.map((l) => l.track ?? ""))];
        const grouped = tracks.length > 1;
        return (
          <section className="lesson-unit" key={unit.id}>
            <div className="unit-heading">
              <div>
                <span className="eyebrow">
                  {bundle.unitLabel.toUpperCase()} {unit.id} · {unit.weight.toUpperCase()}
                </span>
                <h2>{unit.title}</h2>
              </div>
              <span>{unitLessons.length} lessons</span>
            </div>
            {(grouped ? tracks : [""]).map((track) => (
              <div key={track || "all"}>
                {grouped && track ? (
                  <div className="unit-heading course-track-heading">
                    <span className="eyebrow">{track.toUpperCase()} TRACK</span>
                  </div>
                ) : null}
                <div className="lesson-grid">
                  {unitLessons
                    .filter((t) => !grouped || (t.track ?? "") === track)
                    .map((lesson) => (
                      <button
                        className={"lesson-row card " + (readTopics.includes(lesson.topicId) ? "is-done" : "")}
                        type="button"
                        key={lesson.topicId}
                        onClick={() => go("tutor", { topicId: lesson.topicId })}
                      >
                        <span className="lesson-number">
                          {readTopics.includes(lesson.topicId) ? "✓" : lesson.topicId}
                        </span>
                        <span className="lesson-row-copy">
                          <strong>{lesson.title}</strong>
                          <small>
                            {lesson.sections.length} sections
                            {lesson.practice.length ? " · " + lesson.practice.length + " practice problems" : ""}
                            {lesson.work ? " · " + lesson.work.date : ""}
                          </small>
                        </span>
                        <span aria-hidden="true">→</span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </>
  );
}
