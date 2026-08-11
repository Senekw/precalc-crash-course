# Build status — six course modes

Resume anchor for the master build prompt. Courses complete strictly in this
order. A course flips to DONE only after its checkpoint commit is pushed,
the Vercel deploy is verified live, and its audit table is appended to
docs/BUILD_AUDIT.md.

| # | Course | Route | Status | ⚠ count | Commit |
|---|--------|-------|--------|---------|--------|
| 1 | AP Calculus BC | /calc-bc | PENDING | - | - |
| 2 | AP Statistics | /stats | PENDING | - | - |
| 3 | AP Biology | /bio | PENDING | - | - |
| 4 | AP English Language & Composition | /english-lang | PENDING | - | - |
| 5 | AP Art History | /art-history | PENDING | - | - |
| 6 | Comp Sci 2 KAP | /cs2 | PENDING | - | - |

## Working notes (updated between checkpoints)

- Phase 1 scaffold verified: docs/COURSE_TEMPLATE.md, content/<course>/config.ts, registry, scaffold routes all present.
- Port-first check: scripts/ holds only the precalc snapshot (precalc-content-extracted.json). No extracted snapshots exist for any of the six courses, so all six are authored fresh under the accuracy rule.
- Architecture: one shared course engine (app/courses/engine/) parameterized by a typed CourseBundle; per-course content lives only in content/<course>/. Engine is built once before Course 1 writers fan out, including the optional capabilities later courses need (mode tags, code blocks, checklist and timeline views) so it does not churn mid-run.
