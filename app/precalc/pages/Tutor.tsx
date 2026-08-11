"use client";

// Advanced tutor: 44 deep-dive topics across 3 units.
// Topic view renders objectives, intro, teaching sections with callouts,
// fully worked examples, graph illustrations, practice problems with
// hint / solution reveal, and takeaways. Flat prev/next topic ordering.

import { useMemo, useState } from "react";
import { MathBlock, MathText } from "../math";
import { FunctionGraph } from "../FunctionGraph";
import { precalcUnits } from "../data/topics";
import { tutorTopics } from "../data/tutor";
import { withGraphs } from "../data/tutor-graphs";
import type { PrecalcGo } from "../nav";
import type { TutorPractice, TutorTopic } from "../types";

function PracticeCard({ practice, index }: { practice: TutorPractice; index: number }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  return (
    <div className="card tutor-practice">
      <div className="tutor-practice-head">
        <span className="concept-index">0{index + 1}</span>
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
          {practice.solution.map((step, i) => (
            <div className="tutor-step" key={i}>
              <span>{i + 1}</span>
              <div>
                <p>
                  <MathText text={step.explanation} />
                </p>
                {step.math ? <MathBlock>{step.math}</MathBlock> : null}
              </div>
            </div>
          ))}
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

function TopicDetail({
  topic,
  index,
  total,
  go,
  onPrev,
  onNext,
  isRead,
  markRead,
}: {
  topic: TutorTopic;
  index: number;
  total: number;
  go: PrecalcGo;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
  isRead: boolean;
  markRead: () => void;
}) {
  return (
    <article className="lesson-detail">
      <div className="lesson-topbar">
        <button className="back-link" type="button" onClick={() => go("pc-tutor")}>
          ← All topics
        </button>
        <div className="lesson-step-nav">
          <button type="button" disabled={!onPrev} aria-label="Previous topic" onClick={() => onPrev?.()}>
            ←
          </button>
          <span>
            {index + 1} / {total}
          </span>
          <button type="button" disabled={!onNext} aria-label="Next topic" onClick={() => onNext?.()}>
            →
          </button>
        </div>
      </div>

      <div className="lesson-detail-head">
        <div>
          <span className="pill">UNIT {topic.unitId} · TOPIC {topic.topicId}</span>
          <h1>{topic.title}</h1>
          <p>
            <MathText text={topic.intro} />
          </p>
        </div>
      </div>

      <section className="objectives card accent-card subtle-accent">
        <span className="eyebrow">OBJECTIVES</span>
        <ul>
          {topic.objectives.map((objective) => (
            <li key={objective}>
              <MathText text={objective} />
            </li>
          ))}
        </ul>
      </section>

      {topic.sections.map((section, sectionIndex) => (
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
                <div className="tutor-callout card" key={i}>
                  <span className="eyebrow">{callout.label}</span>
                  <MathBlock>{callout.math}</MathBlock>
                </div>
              ))}
            </div>
          ) : null}
          {section.plots?.map((plot, i) => (
            <FunctionGraph key={i} {...plot} width={plot.width ?? 460} height={plot.height ?? 260} />
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
              <div className="tutor-solution">
                {example.steps.map((step, stepIndex) => (
                  <div className="tutor-step" key={stepIndex}>
                    <span>{stepIndex + 1}</span>
                    <div>
                      <p>
                        <MathText text={step.explanation} />
                      </p>
                      {step.math ? <MathBlock>{step.math}</MathBlock> : null}
                    </div>
                  </div>
                ))}
              </div>
              <div className="answer-callout">
                <span>ANSWER</span>
                <MathText text={example.answer} />
              </div>
            </div>
          ))}
        </section>
      ))}

      <section className="tutor-practice-block">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">PRACTICE</span>
            <h2>Do these before moving on</h2>
          </div>
          <span className="pill">{topic.practice.length} problems</span>
        </div>
        {topic.practice.map((practice, i) => (
          <PracticeCard practice={practice} index={i} key={i} />
        ))}
      </section>

      <section className="trap-card">
        <span className="eyebrow">TAKEAWAYS</span>
        <ul>
          {topic.takeaways.map((takeaway) => (
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
          {isRead ? "✓ Marked as read" : "Mark topic read"}
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={() => go("pc-mcq", { mcq: { unitId: topic.unitId, count: 10, mode: "drill" } })}
        >
          Drill this unit →
        </button>
        {onNext ? (
          <button className="button button-secondary" type="button" onClick={onNext}>
            Next topic →
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function TutorPage({
  go,
  topicId,
  readTopics,
  markTopicRead,
}: {
  go: PrecalcGo;
  topicId?: string;
  readTopics: string[];
  markTopicRead: (topicId: string) => void;
}) {
  const topics = useMemo(() => withGraphs(tutorTopics), []);
  const active = topicId ? topics.find((t) => t.topicId === topicId) ?? null : null;

  if (active) {
    const index = topics.findIndex((t) => t.topicId === active.topicId);
    const prev = index > 0 ? topics[index - 1] : null;
    const next = index < topics.length - 1 ? topics[index + 1] : null;
    return (
      <TopicDetail
        topic={active}
        index={index}
        total={topics.length}
        go={go}
        onPrev={prev ? () => go("pc-tutor", { topicId: prev.topicId }) : null}
        onNext={next ? () => go("pc-tutor", { topicId: next.topicId }) : null}
        isRead={readTopics.includes(active.topicId)}
        markRead={() => markTopicRead(active.topicId)}
      />
    );
  }

  return (
    <>
      <div className="section-header">
        <div>
          <h1>AP Precalculus Tutor</h1>
          <p>44 step-by-step topics. Every section teaches, works examples line by line, then makes you practice.</p>
        </div>
      </div>
      {precalcUnits.map((unit) => (
        <section className="lesson-unit" key={unit.id}>
          <div className="unit-heading">
            <div>
              <span className="eyebrow">UNIT {unit.id} · {unit.weight} OF THE EXAM</span>
              <h2>{unit.title}</h2>
            </div>
            <span>{topics.filter((t) => t.unitId === unit.id).length} topics</span>
          </div>
          <div className="lesson-grid">
            {topics
              .filter((t) => t.unitId === unit.id)
              .map((topic) => (
                <button
                  className={"lesson-row card " + (readTopics.includes(topic.topicId) ? "is-done" : "")}
                  type="button"
                  key={topic.topicId}
                  onClick={() => go("pc-tutor", { topicId: topic.topicId })}
                >
                  <span className="lesson-number">{readTopics.includes(topic.topicId) ? "✓" : topic.topicId}</span>
                  <span className="lesson-row-copy">
                    <strong>{topic.title}</strong>
                    <small>
                      {topic.sections.length} sections · {topic.practice.length} practice problems
                    </small>
                  </span>
                  <span aria-hidden="true">→</span>
                </button>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
