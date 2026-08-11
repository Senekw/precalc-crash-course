// Assembles app/precalc/data/*.ts in the repo from extracted.json.
// Content slices are inserted verbatim; only factory names and export
// wiring are authored here.
const fs = require('fs');
const path = require('path');
const j = JSON.parse(fs.readFileSync(__dirname + '/precalc-content-extracted.json', 'utf8'));
const repo = path.join(__dirname, '..');
const dir = path.join(repo, 'app/precalc/data');
fs.mkdirSync(dir, { recursive: true });

const header = (what) => `// ${what}\n// Content ported verbatim from the AP Precalculus section of whap-one.vercel.app.\n// Do not reword: question text, rubrics, and LaTeX are exact copies.\n`;

// topics.ts
{
  let units = j.units
    .replace('subTopics:hW', 'subTopics:topicsU1')
    .replace('subTopics:gW', 'subTopics:topicsU2')
    .replace('subTopics:_W', 'subTopics:topicsU3');
  const src = `${header('AP Precalculus topic summaries (study guides) and unit metadata.')}
import type { PrecalcTopicSummary, PrecalcUnit } from "../types";

const mW = (
  id: string,
  unitId: 1 | 2 | 3,
  number: string,
  title: string,
  summary: string,
  keyIdeas: string[],
  formulas: string[],
  commonMistakes: string[],
  workedExample?: { problem: string; solution: string },
): PrecalcTopicSummary => ({ id, unitId, number, title, summary, keyIdeas, formulas, commonMistakes, workedExample });

export const topicsU1: PrecalcTopicSummary[] = ${j.topicsU1};

export const topicsU2: PrecalcTopicSummary[] = ${j.topicsU2};

export const topicsU3: PrecalcTopicSummary[] = ${j.topicsU3};

export const precalcUnits: PrecalcUnit[] = ${units};

export const allTopicSummaries: PrecalcTopicSummary[] = [...topicsU1, ...topicsU2, ...topicsU3];
export const unitById: Record<number, PrecalcUnit> = Object.fromEntries(precalcUnits.map((u) => [u.id, u]));
export const topicSummaryById: Record<string, PrecalcTopicSummary> = Object.fromEntries(allTopicSummaries.map((t) => [t.id, t]));
`;
  fs.writeFileSync(path.join(dir, 'topics.ts'), src);
}

// flashcards.ts
{
  const src = `${header('AP Precalculus flashcard bank (88 terms).')}
import type { PrecalcFlashcard } from "../types";

const B = (
  id: string,
  unitId: 1 | 2 | 3,
  topicId: string,
  importance: 1 | 2 | 3,
  term: string,
  definition: string,
  formula?: string,
): PrecalcFlashcard => ({ id, term, definition, formula, unitId, topicId, importance });

export const flashcards: PrecalcFlashcard[] = ${j.flashcards};

export const flashcardsByUnit: Record<number, PrecalcFlashcard[]> = (() => {
  const m: Record<number, PrecalcFlashcard[]> = { 1: [], 2: [], 3: [] };
  for (const c of flashcards) m[c.unitId].push(c);
  return m;
})();
`;
  fs.writeFileSync(path.join(dir, 'flashcards.ts'), src);
}

// mcq.ts
{
  const src = `${header('AP Precalculus MCQ bank (103 questions).')}
import type { PrecalcMCQ, MCQChoice, CalcMode } from "../types";

const V = (
  id: string,
  unitId: 1 | 2 | 3,
  topicId: string,
  calcMode: CalcMode,
  difficulty: 1 | 2 | 3,
  skill: string,
  questionText: string,
  choices: MCQChoice[],
  correctChoice: string,
  stimulusText?: string,
): PrecalcMCQ => ({ id, unitId, topicId, calcMode, difficulty, skill, questionText, choices, correctChoice, stimulusText, source: "precalc-original" });

export const mcqBank: PrecalcMCQ[] = ${j.mcq};

export const mcqByUnit: Record<number, PrecalcMCQ[]> = (() => {
  const m: Record<number, PrecalcMCQ[]> = { 1: [], 2: [], 3: [] };
  for (const q of mcqBank) m[q.unitId].push(q);
  return m;
})();
export const mcqById: Record<string, PrecalcMCQ> = Object.fromEntries(mcqBank.map((q) => [q.id, q]));
`;
  fs.writeFileSync(path.join(dir, 'mcq.ts'), src);
}

// frq.ts
{
  const src = `${header('AP Precalculus FRQ bank (23 questions, 4 College Board types).')}
import type { PrecalcFRQ, FRQType } from "../types";

export const frqBank: PrecalcFRQ[] = ${j.frq};

export const frqTypeLabels: Record<FRQType, string> = {
  "function-concepts": "Q1: Function Concepts",
  "modeling-non-periodic": "Q2: Modeling Non-Periodic Context",
  "modeling-periodic": "Q3: Modeling Periodic Context",
  "symbolic-manipulations": "Q4: Symbolic Manipulations",
};

export const frqByType: Record<FRQType, PrecalcFRQ[]> = (() => {
  const m: Record<FRQType, PrecalcFRQ[]> = {
    "function-concepts": [],
    "modeling-non-periodic": [],
    "modeling-periodic": [],
    "symbolic-manipulations": [],
  };
  for (const q of frqBank) m[q.type].push(q);
  return m;
})();
export const frqById: Record<string, PrecalcFRQ> = Object.fromEntries(frqBank.map((q) => [q.id, q]));
`;
  fs.writeFileSync(path.join(dir, 'frq.ts'), src);
}

// formulas.ts
{
  const src = `${header('AP Precalculus formula sheet (45 formulas in 4 groups) and the unit circle.')}
import type { PrecalcFormulaGroup, UnitCircleTable } from "../types";

export const formulaGroups: PrecalcFormulaGroup[] = ${j.formulaGroups};

export const unitCircle: UnitCircleTable = ${j.unitCircle};
`;
  fs.writeFileSync(path.join(dir, 'formulas.ts'), src);
}

// tutor.ts
{
  const src = `${header('AP Precalculus deep-dive tutor lessons (44 topics with objectives, sections, worked examples, practice, takeaways).')}
import type { TutorTopic } from "../types";

export const tutorU1: TutorTopic[] = ${j.tutorU1};

export const tutorU2: TutorTopic[] = ${j.tutorU2};

export const tutorU3: TutorTopic[] = ${j.tutorU3};

export const tutorTopics: TutorTopic[] = [...tutorU1, ...tutorU2, ...tutorU3];
export const tutorByTopicId: Record<string, TutorTopic> = Object.fromEntries(tutorTopics.map((t) => [t.topicId, t]));
`;
  fs.writeFileSync(path.join(dir, 'tutor.ts'), src);
}

// tutor-graphs.ts
{
  const src = `${header('Graph illustrations for tutor lessons, keyed by topicId then section index.')}
import type { GraphSpec, TutorTopic } from "../types";

export const tutorGraphs: Record<string, Record<number, GraphSpec[]>> = ${j.tutorGraphs};

// Attach plots to their sections, mirroring the source app's merge step.
export function withGraphs(topics: TutorTopic[]): TutorTopic[] {
  return topics.map((topic) => {
    const bySection = tutorGraphs[topic.topicId];
    if (!bySection) return topic;
    return {
      ...topic,
      sections: topic.sections.map((section, index) => {
        const plots = bySection[index];
        return plots ? { ...section, plots: [...(section.plots ?? []), ...plots] } : section;
      }),
    };
  });
}
`;
  fs.writeFileSync(path.join(dir, 'tutor-graphs.ts'), src);
}

// exams.ts
{
  const src = `${header('AP Precalculus full-length practice exam blueprints (4 exams).')}
import type { PracticeExam } from "../types";

export const practiceExams: PracticeExam[] = ${j.exams};
`;
  fs.writeFileSync(path.join(dir, 'exams.ts'), src);
}

console.log('written', fs.readdirSync(dir).map((f) => f + ' ' + fs.statSync(path.join(dir, f)).size));
