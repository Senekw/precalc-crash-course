"use client";

// Shared scaffold shell for modes whose content is pending. Renders the
// course's full unit skeleton from the registry plus its content config,
// with placeholder lesson slots. No content is invented here.

import Link from "next/link";
import type { Course } from "./registry";
import type { CourseContentConfig } from "../../content/types";

export function CourseScaffold({ course, content }: { course: Course; content: CourseContentConfig }) {
  return (
    <div className="switcher-shell">
      <header className="switcher-head">
        <Link className="all-courses-link" href="/">← All courses</Link>
      </header>
      <div className="scaffold-head" style={{ borderLeftColor: course.color }}>
        <span className="pill">{course.period}</span>
        <h1>{course.name}</h1>
        <p>
          {course.units.length} {course.unitLabel}
          {course.units.length === 1 ? "" : "s"} scaffolded. Content pending: every lesson slot below will follow the
          parity contract in docs/COURSE_TEMPLATE.md, matching the AP Precalculus reference mode feature for feature.
        </p>
      </div>

      <section className="scaffold-units">
        {content.units.map((unit) => (
          <div className="card scaffold-unit" key={unit.number}>
            <div className="scaffold-unit-head">
              <span className="day-index">
                {String(unit.number).padStart(2, "0")}
              </span>
              <div>
                <strong>{unit.title}</strong>
                {unit.workCount ? <small>{unit.workCount} required works</small> : null}
              </div>
            </div>
            <ul className="scaffold-slots">
              {unit.lessonSlots.map((slot) => (
                <li key={slot}>
                  <span className="scaffold-slot-name">{slot}</span>
                  <span className="pill switcher-pending">content pending</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {content.courseWide.length ? (
        <section className="card scaffold-unit">
          <div className="scaffold-unit-head">
            <span className="day-index">CW</span>
            <div>
              <strong>Course-wide modules</strong>
            </div>
          </div>
          <ul className="scaffold-slots">
            {content.courseWide.map((item) => (
              <li key={item}>
                <span className="scaffold-slot-name">{item}</span>
                <span className="pill switcher-pending">content pending</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {content.notes ? <p className="switcher-footnote">{content.notes}</p> : null}
    </div>
  );
}
