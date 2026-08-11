// Shared types for the AP Precalculus section.
// Shapes mirror the source app's data exactly; do not narrow or rename fields.

export type PrecalcUnitId = 1 | 2 | 3;
export type CalcMode = "no-calc" | "calc-required";
export type FRQType =
  | "function-concepts"
  | "modeling-non-periodic"
  | "modeling-periodic"
  | "symbolic-manipulations";

export type PrecalcTopicSummary = {
  id: string;
  unitId: PrecalcUnitId;
  number: string;
  title: string;
  summary: string;
  keyIdeas: string[];
  formulas: string[];
  commonMistakes: string[];
  workedExample?: { problem: string; solution: string };
};

export type PrecalcUnit = {
  id: PrecalcUnitId;
  number: number;
  title: string;
  weight: string;
  description: string;
  bigIdeas: string[];
  subTopics: PrecalcTopicSummary[];
};

export type PrecalcFlashcard = {
  id: string;
  term: string;
  definition: string;
  formula?: string;
  unitId: PrecalcUnitId;
  topicId: string;
  importance: 1 | 2 | 3;
};

export type MCQChoice = { letter: string; text: string; explanation: string };

export type PrecalcMCQ = {
  id: string;
  unitId: PrecalcUnitId;
  topicId: string;
  calcMode: CalcMode;
  difficulty: 1 | 2 | 3;
  skill: string;
  questionText: string;
  choices: MCQChoice[];
  correctChoice: string;
  stimulusText?: string;
  source: string;
};

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

export type FRQPart = {
  letter: string;
  task: string;
  pointName: string;
  pointsAvailable: number;
  modelSolution: string;
  scoringNotes: string;
  partialCreditNotes?: string;
};

export type PrecalcFRQ = {
  id: string;
  type: FRQType;
  calcMode: CalcMode;
  unitId: PrecalcUnitId;
  topicIds: string[];
  context: string;
  contextSetup?: string;
  graph?: GraphSpec;
  parts: FRQPart[];
  totalPoints: number;
  source: string;
};

export type FormulaItem = { name: string; latex: string; note?: string };
export type PrecalcFormulaGroup = { unitId: number; title: string; formulas: FormulaItem[] };
export type UnitCircleRow = { angle: string; radian: string; cos: string; sin: string; tan: string };
export type UnitCircleTable = { title: string; rows: UnitCircleRow[] };

export type TutorCallout = { label: string; math: string };
export type TutorStep = { explanation: string; math?: string };
export type TutorExample = { problem: string; steps: TutorStep[]; answer: string };
export type TutorPractice = { problem: string; hint?: string; solution: TutorStep[]; answer: string };

export type TutorSection = {
  heading: string;
  body: string;
  callouts?: TutorCallout[];
  examples?: TutorExample[];
  plots?: GraphSpec[];
};

export type TutorTopic = {
  topicId: string;
  unitId: PrecalcUnitId;
  title: string;
  objectives: string[];
  intro: string;
  sections: TutorSection[];
  practice: TutorPractice[];
  takeaways: string[];
};

export type ExamSectionKind = "mcq" | "frq";

export type ExamSection = {
  name: string;
  minutes: number;
  kind: ExamSectionKind;
  questionIds: string[];
  notes?: string;
};

export type PracticeExam = {
  id: string;
  mode: string;
  title: string;
  description: string;
  totalMinutes: number;
  totalPoints: number;
  sections: ExamSection[];
  scoreCurve: { score5Min: number; score4Min: number; score3Min: number; score2Min: number };
};

// Attempt records, stored locally on this device.
export type MCQAttempt = {
  id: string;
  type: "mcq";
  questionId: string;
  selectedChoice: string | null;
  correct: boolean;
  timeSpentSec: number;
  attemptedAt: string;
  unitId: PrecalcUnitId;
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
  unitId: PrecalcUnitId;
  frqType: FRQType;
};

export type PrecalcAttempt = MCQAttempt | FRQAttempt;

export type SRCardState = {
  termId: string;
  easeFactor: number;
  intervalDays: number;
  dueDate: string;
  lastReviewed: string | null;
  reps: number;
  lapses: number;
};

export type SRRating = "again" | "hard" | "good" | "easy";
