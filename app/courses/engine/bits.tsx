"use client";

// Small shared render pieces for course-engine pages: SVG figures,
// data tables, code blocks, worked steps, and callouts. All prose runs
// through MathText so $...$ LaTeX works everywhere.

import { MathBlock, MathText } from "../../precalc/math";
import type {
  CodeBlock,
  DataTable,
  Figure,
  LessonCallout,
  LessonStep,
} from "../../../content/courseTypes";

export function FigureBox({ figure }: { figure: Figure }) {
  return (
    <figure className="course-figure">
      <div className="course-figure-svg" dangerouslySetInnerHTML={{ __html: figure.svg }} />
      {figure.caption ? (
        <figcaption>
          <MathText text={figure.caption} />
        </figcaption>
      ) : null}
    </figure>
  );
}

export function TableBox({ table }: { table: DataTable }) {
  return (
    <div className="card unit-circle-wrap course-table-wrap">
      <table className="unit-circle-table course-data-table">
        <thead>
          <tr>
            {table.headers.map((header, i) => (
              <th key={i}>
                <MathText text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>
                  <MathText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.caption ? (
        <p className="course-table-caption">
          <MathText text={table.caption} />
        </p>
      ) : null}
    </div>
  );
}

export function CodeBox({ block }: { block: CodeBlock }) {
  return (
    <div className="course-code">
      <pre className="mcq-stimulus course-code-pre">{block.code}</pre>
      {block.caption ? (
        <p className="course-table-caption">
          <MathText text={block.caption} />
        </p>
      ) : null}
    </div>
  );
}

export function CalloutBox({ callout }: { callout: LessonCallout }) {
  return (
    <div className="tutor-callout card">
      <span className="eyebrow">{callout.label}</span>
      {callout.math ? <MathBlock>{callout.math}</MathBlock> : null}
      {callout.text ? (
        <p className="course-callout-text">
          <MathText text={callout.text} />
        </p>
      ) : null}
    </div>
  );
}

export function StepList({ steps }: { steps: LessonStep[] }) {
  return (
    <div className="tutor-solution">
      {steps.map((step, i) => (
        <div className="tutor-step" key={i}>
          <span>{i + 1}</span>
          <div>
            <p>
              <MathText text={step.explanation} />
            </p>
            {step.math ? <MathBlock>{step.math}</MathBlock> : null}
            {step.code ? <pre className="mcq-stimulus course-code-pre">{step.code}</pre> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
