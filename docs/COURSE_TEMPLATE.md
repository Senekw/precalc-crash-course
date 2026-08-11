# Course parity contract

This checklist is extracted from the AP Precalculus mode, the reference
implementation. A course mode is **complete** only when every applicable box
is checked. If the precalc mode gains a feature that is not listed here, that
is a bug in this file: add it.

Source of the reference implementation:

- Shell and navigation: `app/precalc/page.tsx` (course shell, grouped sidebar, view routing)
- Pages: `app/precalc/pages/*.tsx` (Dashboard, Tutor, StudyGuides, Mcq, Frq, Flashcards, Formulas, Exams, Progress)
- Data: `app/precalc/data/*.ts` (typed content banks)
- Engines: `app/precalc/analytics.ts` (accuracy, prediction, next action), `app/precalc/sr.ts` (SM-2 spaced repetition), `app/precalc/store.ts` (localStorage persistence)
- Rendering: `app/precalc/math.tsx` (KaTeX inline/display + **bold** text runs), `app/precalc/FunctionGraph.tsx` (SVG grapher)

## 1. Dashboard

- [ ] Next-action recommendation card (rule-based engine: untouched FRQ type first, then weakest under-drilled unit, then lowest unit, then baseline drill)
- [ ] Stat tiles: predicted exam score (or equivalent readiness metric), MCQ accuracy, FRQs/essays graded, flashcards due + topics read
- [ ] Weakest-units panel (bottom 3 by accuracy, minimum attempt threshold, links into study guide)
- [ ] Recent-attempts panel (last 30 days, latest 5, links to full progress)
- [ ] Quick-link grid to every section of the mode
- [ ] NO timers, countdowns, streaks, or motivational widgets

## 2. Tutor (lesson pages)

- [ ] One deep-dive lesson per topic, organized by unit
- [ ] Lesson anatomy: objectives list, intro paragraph, teaching sections with heading + body prose
- [ ] Callout boxes for key formulas/definitions inside sections
- [ ] Fully worked examples with numbered steps (explanation + optional display math per step) and a boxed final answer
- [ ] Graph/diagram illustrations where the topic needs them (SVG, original)
- [ ] Practice problems with hint reveal, then step-by-step solution reveal, then boxed answer
- [ ] Takeaways list at the end of each lesson
- [ ] Mark-topic-read tracking (persisted locally)
- [ ] Flat prev/next topic ordering across the whole mode (n / N counter, arrows top and bottom)
- [ ] "Drill this unit" cross-link into MCQ practice

## 3. Study guides

- [ ] Unit index page with per-unit cards (weight on the exam, sub-topic count, key-term count)
- [ ] Per-unit cram sheet: big ideas, then every sub-topic with summary, key ideas, formulas, common mistakes, worked example
- [ ] Key-terms list per unit (collapsible beyond a preview count) cross-linked to flashcards
- [ ] Cross-links into MCQ drill and flashcards for the unit
- [ ] Prev/next unit pager

## 4. MCQ practice

- [ ] Question bank tagged by unit, topic, difficulty, skill, and calculator mode (where the exam has calc/no-calc sections)
- [ ] Quick drill (5) / standard set (15) / full section simulation (exam-length, feedback held to the end)
- [ ] Filters: by unit, by calculator mode
- [ ] Every choice carries its own explanation (why right AND why each distractor is wrong)
- [ ] Instant feedback in drill mode; end-of-set review in sim mode
- [ ] Set-complete screen with score, guidance thresholds, and expandable per-question review
- [ ] "Review the exact topic" link on every question
- [ ] Every answer recorded to progress analytics

## 5. FRQ / free-response practice

- [ ] Question bank organized by the exam's official FRQ types
- [ ] Question anatomy: context (+ optional data/setup block, optional graph), lettered parts with point names and points available
- [ ] Model solution per part
- [ ] Scoring notes per part (what earns each point) + partial-credit notes where applicable
- [ ] Written-response box, then rubric-based self-scoring per part, then save to progress
- [ ] NO countdown timer (official section timings shown as text where relevant)

## 6. Flashcards

- [ ] Term bank tagged by unit, topic, importance
- [ ] Definition + optional formula per card
- [ ] SM-2 spaced repetition: Again 1d / Hard ~2d / Good scheduled / Easy far out (`app/precalc/sr.ts`)
- [ ] Due cards first, capped new cards per session
- [ ] Per-unit deck selection

## 7. Reference sheet

- [ ] Grouped formula/reference tables with searchable names and notes
- [ ] Any exam-specific reference tables (e.g., precalc's 16-row unit circle)

## 8. Practice exams

- [ ] Full-length exam blueprints in the official format (sections, minutes, points, question counts)
- [ ] MCQ sections launch the section simulator with the right pool, count, and mode
- [ ] FRQ sections open their exact assigned questions
- [ ] Score curve displayed per exam

## 9. Progress

- [ ] Attempts logged locally (MCQ + FRQ), with reset control
- [ ] Accuracy by unit (bars) and by topic (table, weakest first, review links)
- [ ] FRQ averages by question type
- [ ] Predicted score with the composite formula documented
- [ ] Attempt log (most recent N)

## 10. Mode integration

- [ ] Registry entry in `app/courses/registry.ts` (id, name, route, period, optional teacher, color, unit list)
- [ ] Course switcher card on the home screen with name, period, and progress
- [ ] Content lives ONLY in `content/<course>/` (or `app/precalc/data/` for the reference mode); filling one course never touches another course's files
- [ ] Grouped sidebar navigation inside the mode
- [ ] All persistence in localStorage, namespaced per course
- [ ] KaTeX for all math; original SVG for all diagrams; no hotlinked or copyrighted assets
- [ ] `npm run build` and `npm test` green, with a content-lock test for the course's banks

## Formatting rules (all modes)

- Math in `$...$` / `$$...$$` LaTeX, rendered by `app/precalc/math.tsx`
- `**bold**` allowed in prose fields
- No em/en dashes in newly authored prose (verbatim-imported content keeps its original punctuation)
- No filler gadgets: timers, countdowns, streaks, motivational widgets are banned platform-wide
