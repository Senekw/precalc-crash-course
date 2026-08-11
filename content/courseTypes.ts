// Generic content types for every non-precalc course mode.
// These generalize app/precalc/types.ts: unit ids are plain numbers, FRQ
// types and MCQ mode tags are declared per course, and lessons can carry
// code blocks, data tables, and original SVG figures in addition to math.
//
// Content authors: every prose field supports $inline$ / $$display$$ LaTeX
// and **bold** runs (rendered by app/precalc/math.tsx). Never hotlink or
// embed copyrighted assets; SVG figures must be original.

// ---------- shared primitives ----------

export type Importance = 1 | 2 | 3;
export type Difficulty = 1 | 2 | 3;

// Original inline SVG artwork (diagrams, flowcharts, label-the-diagram).
// The svg string is the full <svg ...>...</svg> markup, theme-friendly:
// use currentColor or the CSS variables var(--ink)/var(--muted)/var(--accent)
// where possible.
export type Figure = {
  svg: string;
  caption?: string;
};

// Small data table (trace tables, TI-84 keystrokes, comparison charts).
// Cells render through MathText, so $...$ works inside cells.
export type DataTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

// Monospace code block (Java, calculator syntax). Rendered verbatim.
export type CodeBlock = {
  code: string;
  caption?: string;
};

// Function-plot spec, identical to the precalc grapher's contract.
// Import type only; the component lives in app/precalc/FunctionGraph.tsx.
export type GraphCurve = {
  fn: (x: number) => number;
  label?: string;
  color?: string;
  dash?: string;
  strokeWidth?: number;
};
export type GraphPoint = {
  x: number;
  y: number;
  label?: string;
  style?: "closed" | "open" | "star";
  color?: string;
};
export type GraphAsymptote = {
  type: "vertical" | "horizontal" | "slant";
  value?: number;
  label?: string;
  fn?: (x: number) => number;
};
export type GraphSpec = {
  id?: string;
  caption?: string;
  curves: GraphCurve[];
  xDomain?: [number, number];
  yRange?: [number, number];
  points?: GraphPoint[];
  asymptotes?: GraphAsymptote[];
  schematic?: boolean;
  xLabel?: string;
  yLabel?: string;
  width?: number;
  height?: number;
};

// ---------- study-guide topic summaries ----------

export type TopicSummary = {
  id: string; // must equal the matching Lesson.topicId
  unitId: number;
  number: string; // display number, e.g. "1.4" or "Work 45"
  title: string;
  summary: string;
  keyIdeas: string[];
  formulas: string[]; // LaTeX strings; [] when the topic has none
  commonMistakes: string[];
  workedExample?: { problem: string; solution: string };
};

export type CourseUnitData = {
  id: number;
  title: string;
  weight: string; // e.g. "10-12% of the exam", "Labs", "Content area 3"
  description: string;
  bigIdeas: string[];
  subTopics: TopicSummary[];
};

// ---------- lessons (tutor) ----------

export type LessonCallout = {
  label: string; // e.g. "KEY FORMULA", "DEFINITION", "TI-84", "RUBRIC"
  math?: string; // display LaTeX
  text?: string; // prose alternative (MathText); use one of math/text
};

export type LessonStep = {
  explanation: string;
  math?: string; // display LaTeX under the explanation
  code?: string; // monospace line(s) under the explanation
};

export type LessonExample = {
  problem: string;
  steps: LessonStep[];
  answer: string;
};

export type LessonPractice = {
  problem: string;
  hint?: string;
  solution: LessonStep[];
  answer: string;
};

export type LessonSection = {
  heading: string;
  body: string;
  callouts?: LessonCallout[];
  examples?: LessonExample[];
  plots?: GraphSpec[];
  figures?: Figure[];
  tables?: DataTable[];
  codeBlocks?: CodeBlock[];
};

// Art History work metadata: present on every AP Art History lesson and
// absent elsewhere. Enables the 250-work checklist and the timeline.
export type WorkMeta = {
  workNumber: number; // official 1-250 list number
  artist: string; // artist or culture of origin
  date: string; // display date, e.g. "c. 1495-1498 C.E."
  sortYear: number; // signed year for timeline sorting (negative = B.C.E.)
  materials: string;
  location?: string; // current location / site
  imageNote?: string; // where to view the image (no hotlinking)
  imageUrl?: string; // external link-out slot (e.g. Smarthistory page)
};

export type Lesson = {
  topicId: string; // globally unique within the course, e.g. "1.4"
  unitId: number;
  title: string;
  track?: string; // e.g. "Reading" | "Writing" for AP Lang strands
  objectives: string[];
  intro: string;
  sections: LessonSection[];
  practice: LessonPractice[];
  takeaways: string[];
  commonMistakes?: string[]; // rendered as a dedicated callout when present
  work?: WorkMeta; // AP Art History only
};

// ---------- flashcards ----------

export type Flashcard = {
  id: string;
  term: string;
  definition: string;
  formula?: string; // display LaTeX
  code?: string; // monospace alternative to formula (CS2)
  unitId: number;
  topicId: string;
  importance: Importance;
};

// ---------- MCQ ----------

export type MCQChoice = { letter: string; text: string; explanation: string };

export type MCQ = {
  id: string;
  unitId: number;
  topicId: string;
  modeTag?: string; // key from CourseBundle.mcqModes, e.g. "calc" | "no-calc"
  difficulty: Difficulty;
  skill: string; // short skill label shown as a pill
  questionText: string;
  choices: MCQChoice[];
  correctChoice: string;
  stimulusText?: string; // preformatted stimulus (passage excerpt, data)
  table?: DataTable;
  figure?: Figure;
  code?: CodeBlock; // code-tracing stimulus (CS2)
  source: string;
};

// ---------- FRQ ----------

export type FRQPart = {
  letter: string;
  task: string;
  pointName: string; // rubric row name, e.g. "Thesis", "Part (a)"
  pointsAvailable: number;
  modelSolution: string;
  scoringNotes: string;
  partialCreditNotes?: string;
};

export type FRQ = {
  id: string;
  type: string; // key from CourseBundle.frqTypes
  unitId: number;
  topicIds: string[];
  modeTag?: string;
  context: string;
  contextSetup?: string; // preformatted block (data, source documents)
  graph?: GraphSpec;
  figure?: Figure;
  table?: DataTable;
  code?: CodeBlock;
  parts: FRQPart[];
  totalPoints: number;
  source: string;
};

export type FRQTypeDef = {
  key: string;
  label: string; // e.g. "Q2: Rhetorical Analysis"
  description?: string;
  minutes?: number; // official suggested time, shown as text (never a timer)
};

// ---------- reference sheet ----------

export type ReferenceItem = {
  name: string;
  latex?: string; // display LaTeX
  text?: string; // prose alternative (MathText)
  code?: string; // monospace alternative (CS2 quick reference)
  note?: string;
};

export type ReferenceGroup = {
  title: string;
  subtitle?: string;
  items: ReferenceItem[];
  tables?: DataTable[]; // e.g. z/t/chi-square tables, convergence tests
  figures?: Figure[]; // e.g. inference-procedure flowchart
};

// ---------- exams and unit tests ----------

export type ExamMcqConfig = {
  count: number;
  modeTag?: string; // restrict the pool to one mode tag
  unitIds?: number[]; // restrict the pool to specific units
};

export type ExamSection = {
  name: string;
  minutes: number; // official timing, displayed as text only
  kind: "mcq" | "frq";
  mcq?: ExamMcqConfig; // kind === "mcq"
  frqIds?: string[]; // kind === "frq"
  notes?: string;
};

export type PracticeExam = {
  id: string;
  title: string;
  description: string;
  totalMinutes: number;
  totalPoints: number;
  sections: ExamSection[];
  scoreCurve?: { score5Min: number; score4Min: number; score3Min: number; score2Min: number };
};

// Per-unit test in the course's exam format. MCQs run as a held-feedback
// section sim from the unit pool; FRQs are exact assigned questions.
export type UnitTest = {
  unitId: number;
  title: string;
  description: string;
  minutes: number;
  mcq: ExamMcqConfig;
  frqIds: string[];
  masteryPct: number; // mastery gate: MCQ score >= this counts the unit mastered
};

// ---------- scoring / prediction ----------

export type ScoringConfig = {
  mcqWeight: number; // e.g. 0.5 (Calc BC/Stats/Bio/Art History), 0.45 (Lang)
  frqWeight: number; // must sum with mcqWeight to 1
  // Composite cut points, highest first. AP scale: [5,4,3,2]; grade scale:
  // labels come from scale.kind.
  cuts: { five: number; four: number; three: number; two: number };
  minMcq: number; // attempts needed before the prediction is shown
  minFrq: number;
  scale: { kind: "ap" } | { kind: "grade" }; // grade maps 5..1 to A/B/C/D/F
  note: string; // shown next to the prediction, e.g. "50% MCQ / 50% FRQ"
};

// ---------- mode tags (calculator sections etc.) ----------

export type ModeTagDef = {
  key: string; // stored on MCQ.modeTag
  label: string; // "Calculator", "No calculator", "Reading", "Writing"
  short: string; // one-letter pill, e.g. "C" / "N" / "R" / "W"
};

// ---------- the assembled course bundle ----------

export type CourseBundle = {
  id: string; // registry id, e.g. "calc-bc"
  name: string; // full display name
  shortName: string; // sidebar brand, e.g. "Calc BC"
  brandMark: string; // sidebar glyph
  tagline: string; // dashboard subtitle (counts sentence)
  examName: string; // "the AP exam" | "the final"
  unitLabel: string; // "unit" | "skill strand" | "content area"
  units: CourseUnitData[];
  lessons: Lesson[]; // flat, in course order (drives prev/next)
  flashcards: Flashcard[];
  mcq: MCQ[];
  frq: FRQ[];
  frqTypes: FRQTypeDef[];
  mcqModes?: ModeTagDef[];
  reference: ReferenceGroup[];
  referenceTitle: string; // e.g. "Formula sheet", "Rhetorical devices bank"
  referenceSubtitle?: string;
  exams: PracticeExam[];
  unitTests: UnitTest[];
  scoring: ScoringConfig;
  features?: {
    workChecklist?: boolean; // Art History 250-work dashboard
    timeline?: boolean; // Art History chronological view
  };
};

// ---------- per-unit content slice (one writer owns one slice) ----------

// Each unit file in content/<course>/units/ exports exactly one of these.
// The course.ts assembler concatenates slices in unit order. A writer
// touches ONLY its own slice file; unit metadata, lessons, drills, cards,
// and FRQs for that unit all live together here.
export type CourseUnitSlice = {
  unit: CourseUnitData;
  lessons: Lesson[];
  flashcards: Flashcard[];
  mcq: MCQ[];
  frq: FRQ[];
};

// ---------- attempts (persisted locally, namespaced per course) ----------

export type MCQAttempt = {
  id: string;
  type: "mcq";
  questionId: string;
  selectedChoice: string | null;
  correct: boolean;
  timeSpentSec: number;
  attemptedAt: string;
  unitId: number;
  topicId: string;
};

export type FRQSelfGrade = {
  totalScore: number;
  totalAvailable: number;
  partScores: Record<string, number>;
};

export type FRQAttempt = {
  id: string;
  type: "frq";
  questionId: string;
  responseText: string;
  grade: FRQSelfGrade;
  timeSpentSec: number;
  attemptedAt: string;
  unitId: number;
  frqType: string;
};

export type CourseAttempt = MCQAttempt | FRQAttempt;
