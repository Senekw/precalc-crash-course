"use client";

// Reference sheet: grouped formula / reference tables with searchable
// names and notes, plus any course-specific tables (convergence tests,
// z/t/chi-square) and figures (inference-procedure flowchart).

import { useState } from "react";
import { MathBlock, MathText } from "../../../precalc/math";
import { FigureBox, TableBox } from "../bits";
import type { CourseBundle } from "../../../../content/courseTypes";

export function ReferencePage({ bundle }: { bundle: CourseBundle }) {
  const [search, setSearch] = useState("");
  const query = search.toLowerCase();
  const filtered = bundle.reference
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        (group.title + " " + item.name + " " + (item.latex ?? "") + " " + (item.text ?? "") + " " + (item.code ?? "") + " " + (item.note ?? ""))
          .toLowerCase()
          .includes(query),
      ),
    }))
    .filter((group) => group.items.length > 0 || (!query && (group.tables?.length || group.figures?.length)));

  const totalItems = bundle.reference.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <>
      <div className="section-header">
        <div>
          <h1>{bundle.referenceTitle}</h1>
          <p>{bundle.referenceSubtitle ?? "Grouped reference for the whole course."}</p>
        </div>
      </div>
      <div className="formula-tools card">
        <label htmlFor="course-reference-search">Search</label>
        <input
          id="course-reference-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, formula, or note…"
        />
        <span>{totalItems} entries</span>
      </div>
      <div className="formula-groups">
        {filtered.map((group) => (
          <section className="formula-group" key={group.title}>
            <div className="unit-heading">
              <div>
                <h2>{group.title}</h2>
                {group.subtitle ? <p>{group.subtitle}</p> : null}
              </div>
              <span>{group.items.length} entries</span>
            </div>
            {group.items.length ? (
              <div className="formula-list card">
                {group.items.map((item) => (
                  <div className="formula-row pc-formula-row" key={item.name}>
                    <div>
                      <strong>{item.name}</strong>
                      {item.note ? (
                        <small>
                          <MathText text={item.note} />
                        </small>
                      ) : null}
                    </div>
                    {item.latex ? <MathBlock className="pc-formula-latex">{item.latex}</MathBlock> : null}
                    {item.text ? (
                      <p className="course-reference-text">
                        <MathText text={item.text} />
                      </p>
                    ) : null}
                    {item.code ? <pre className="mcq-stimulus course-code-pre">{item.code}</pre> : null}
                  </div>
                ))}
              </div>
            ) : null}
            {group.tables?.map((table, i) => (
              <TableBox table={table} key={i} />
            ))}
            {group.figures?.map((figure, i) => (
              <FigureBox figure={figure} key={i} />
            ))}
          </section>
        ))}
        {!filtered.length ? <div className="empty-state card">No entry matches &ldquo;{search}&rdquo;.</div> : null}
      </div>
    </>
  );
}
