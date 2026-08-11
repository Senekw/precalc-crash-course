// Navigation contract between the shell (page.tsx) and the precalc pages.
// Pages receive `go` to move between precalc sections with parameters,
// e.g. launching a 15-question unit drill from the dashboard.

import type { CalcMode } from "./types";

export type PrecalcView =
  | "pc-dash"
  | "pc-tutor"
  | "pc-study"
  | "pc-mcq"
  | "pc-frq"
  | "pc-cards"
  | "pc-formulas"
  | "pc-exams"
  | "pc-progress";

export type McqPreset = {
  unitId?: number;
  count: number;
  mode: "drill" | "sim";
  calc?: CalcMode | "any";
};

export type PrecalcNavParams = {
  topicId?: string;
  unitId?: number;
  mcq?: McqPreset;
  frqId?: string;
  frqIds?: string[];
};

export type PrecalcGo = (view: PrecalcView, params?: PrecalcNavParams) => void;
