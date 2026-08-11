"use client";

// Formula sheet: every formula for Units 1 to 3 in four groups,
// plus the full 16-row unit circle table.

import { useState } from "react";
import { MathBlock } from "../math";
import { MathInline } from "../math";
import { formulaGroups, unitCircle } from "../data/formulas";

export function FormulasPage() {
  const [search, setSearch] = useState("");
  const query = search.toLowerCase();
  const filtered = formulaGroups
    .map((group) => ({
      ...group,
      formulas: group.formulas.filter((item) =>
        (group.title + " " + item.name + " " + item.latex + " " + (item.note ?? "")).toLowerCase().includes(query),
      ),
    }))
    .filter((group) => group.formulas.length > 0);

  return (
    <>
      <div className="section-header">
        <div>
          <h1>AP Precalculus formula sheet</h1>
          <p>Comprehensive reference for every formula in Units 1 to 3, plus the unit circle.</p>
        </div>
      </div>
      <div className="formula-tools card">
        <label htmlFor="pc-formula-search">Search formulas</label>
        <input
          id="pc-formula-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Try asymptote, compound interest, sinusoid, polar…"
        />
        <span>{formulaGroups.reduce((sum, group) => sum + group.formulas.length, 0)} formulas</span>
      </div>
      <div className="formula-groups">
        {filtered.map((group) => (
          <section className="formula-group" key={group.title}>
            <div className="unit-heading">
              <div>
                <h2>{group.title}</h2>
              </div>
              <span>{group.unitId !== 0 ? "Unit " + group.unitId + " · " : ""}{group.formulas.length} formulas</span>
            </div>
            <div className="formula-list card">
              {group.formulas.map((item) => (
                <div className="formula-row pc-formula-row" key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    {item.note ? <small>{item.note}</small> : null}
                  </div>
                  <MathBlock className="pc-formula-latex">{item.latex}</MathBlock>
                </div>
              ))}
            </div>
          </section>
        ))}
        {!filtered.length ? <div className="empty-state card">No formula matches &ldquo;{search}&rdquo;.</div> : null}
      </div>
      <section className="formula-group">
        <div className="unit-heading">
          <div>
            <h2>{unitCircle.title}</h2>
          </div>
          <span>{unitCircle.rows.length} angles</span>
        </div>
        <div className="card unit-circle-wrap">
          <table className="unit-circle-table">
            <thead>
              <tr>
                <th>Degrees</th>
                <th>Radians</th>
                <th>cos θ</th>
                <th>sin θ</th>
                <th>tan θ</th>
              </tr>
            </thead>
            <tbody>
              {unitCircle.rows.map((row) => (
                <tr key={row.angle}>
                  <td>{row.angle}</td>
                  <td>
                    <MathInline>{row.radian}</MathInline>
                  </td>
                  <td>
                    <MathInline>{row.cos}</MathInline>
                  </td>
                  <td>
                    <MathInline>{row.sin}</MathInline>
                  </td>
                  <td>
                    <MathInline>{row.tan}</MathInline>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
