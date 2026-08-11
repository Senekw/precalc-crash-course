// AP Calculus BC course bundle: assembles the per-unit slices and defines
// course-wide configuration (FRQ types, calculator modes, scoring weights,
// reference sheet, exams, unit tests). Unit slice files are owned by their
// writers; THIS file is owned by the integrator alone.

import type { CourseBundle, CourseUnitSlice, ReferenceGroup, PracticeExam, UnitTest } from "../courseTypes";
import { assembleSlices } from "../assemble";
import { u01 } from "./units/u01";
import { u01b } from "./units/u01b";
import { u02 } from "./units/u02";
import { u02b } from "./units/u02b";
import { u03 } from "./units/u03";
import { u04 } from "./units/u04";
import { u05 } from "./units/u05";
import { u05b } from "./units/u05b";
import { u06 } from "./units/u06";
import { u06b } from "./units/u06b";
import { u07 } from "./units/u07";
import { u07b } from "./units/u07b";
import { u08 } from "./units/u08";
import { u08b } from "./units/u08b";
import { u09 } from "./units/u09";
import { u09b } from "./units/u09b";
import { u10 } from "./units/u10";
import { u10b } from "./units/u10b";

const slices: CourseUnitSlice[] = [
  u01, u01b, u02, u02b, u03, u04, u05, u05b, u06, u06b, u07, u07b, u08, u08b, u09, u09b, u10, u10b,
];
const assembled = assembleSlices(slices);

// Course-wide reference sheet: filled at integration (formula sheet plus
// the series convergence-test summary table).
const reference: ReferenceGroup[] = [
  {
    title: "Limits and continuity",
    subtitle: "Unit 1 essentials",
    items: [
      {
        name: "Average rate of change",
        latex: "\\text{AROC} = \\frac{f(b)-f(a)}{b-a}",
        note: "Secant slope on $[a,b]$.",
      },
      {
        name: "Instantaneous rate of change",
        latex: "\\lim_{h \\to 0} \\frac{f(a+h)-f(a)}{h}",
        note: "Tangent slope at $x=a$; the limit of AROCs.",
      },
      {
        name: "Definition of continuity at a point",
        latex: "f \\text{ cont. at } a \\iff \\lim_{x \\to a} f(x) = f(a)",
        note: "Requires the value to exist, the limit to exist, and equality.",
      },
    ],
  },
];

// Full-length practice exam blueprint(s): assigned at integration.
const exams: PracticeExam[] = [
  {
    id: "bc-exam-1",
    title: "Practice Exam 1: full AP Calculus BC format",
    description:
      "The official 2025 format: 45 MCQs (Part A no calculator, Part B calculator), then 6 FRQs (Part A calculator, Part B no calculator). Run each section on your own clock using the official timings shown.",
    totalMinutes: 195,
    totalPoints: 108,
    sections: [
      {
        name: "Section I Part A · MCQ · No calculator",
        minutes: 60,
        kind: "mcq",
        mcq: { count: 30, modeTag: "no-calc" },
        notes: "30 questions",
      },
      {
        name: "Section I Part B · MCQ · Calculator",
        minutes: 45,
        kind: "mcq",
        mcq: { count: 15, modeTag: "calc" },
        notes: "15 questions",
      },
      {
        name: "Section II Part A · FRQ · Calculator",
        minutes: 30,
        kind: "frq",
        frqIds: [],
        notes: "2 questions, 9 points each",
      },
      {
        name: "Section II Part B · FRQ · No calculator",
        minutes: 60,
        kind: "frq",
        frqIds: [],
        notes: "4 questions, 9 points each",
      },
    ],
    scoreCurve: { score5Min: 70, score4Min: 57, score3Min: 43, score2Min: 30 },
  },
];

// One test per unit, assigned at integration once every unit's FRQs exist.
const unitTests: UnitTest[] = [];

export const calcBcBundle: CourseBundle = {
  id: "calc-bc",
  name: "AP Calculus BC",
  shortName: "Calc BC",
  brandMark: "∂",
  tagline:
    "The full BC suite: one lesson per CED topic across all 10 units, AP-style MCQs in both calculator modes, 9-point FRQs with scoring-guideline solutions, flashcards, and full-length practice exams.",
  examName: "the AP exam",
  unitLabel: "unit",
  units: assembled.units,
  lessons: assembled.lessons,
  flashcards: assembled.flashcards,
  mcq: assembled.mcq,
  frq: assembled.frq,
  frqTypes: [
    {
      key: "calc",
      label: "Part A style: calculator active",
      description: "Two of the six exam FRQs allow a graphing calculator. Expect modeling, numeric integrals, and decimal answers to three places.",
      minutes: 15,
    },
    {
      key: "no-calc",
      label: "Part B style: no calculator",
      description: "Four of the six exam FRQs are calculator-free. Expect exact values, justifications, and symbolic work.",
      minutes: 15,
    },
  ],
  mcqModes: [
    { key: "no-calc", label: "No calculator", short: "N" },
    { key: "calc", label: "Calculator", short: "C" },
  ],
  reference,
  referenceTitle: "Formula sheet",
  referenceSubtitle: "Every formula for Units 1-10, plus the series convergence-test summary table.",
  exams,
  unitTests,
  scoring: {
    mcqWeight: 0.5,
    frqWeight: 0.5,
    cuts: { five: 0.65, four: 0.52, three: 0.39, two: 0.27 },
    minMcq: 10,
    minFrq: 1,
    scale: { kind: "ap" },
    note: "50% MCQ / 50% FRQ · cut points are estimates",
  },
};
