// Navigation contract between the course shell (CourseApp) and its pages.
// Generic twin of app/precalc/nav.ts: views carry no course prefix and MCQ
// presets filter by the course's declared mode tags.

export type CourseView =
  | "dash"
  | "tutor"
  | "study"
  | "mcq"
  | "frq"
  | "cards"
  | "reference"
  | "exams"
  | "progress"
  | "checklist"
  | "timeline";

export type McqPreset = {
  unitId?: number;
  unitIds?: number[];
  count: number;
  mode: "drill" | "sim";
  tag?: string; // mode-tag key, e.g. "no-calc"
};

export type CourseNavParams = {
  topicId?: string;
  unitId?: number;
  mcq?: McqPreset;
  frqId?: string;
  frqType?: string;
};

export type CourseGo = (view: CourseView, params?: CourseNavParams) => void;
