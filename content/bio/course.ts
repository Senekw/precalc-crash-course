// AP Biology course bundle: assembles the per-unit slices (8 CED units
// plus the Required Investigations labs unit) and defines course-wide
// configuration. Unit slice files are owned by their writers; THIS file
// is owned by the integrator alone.

import type { CourseBundle, CourseUnitSlice, ReferenceGroup, PracticeExam, UnitTest } from "../courseTypes";
import { assembleSlices } from "../assemble";
import { u01 } from "./units/u01";
import { u02 } from "./units/u02";
import { u02b } from "./units/u02b";
import { u03 } from "./units/u03";
import { u04 } from "./units/u04";
import { u05 } from "./units/u05";
import { u06 } from "./units/u06";
import { u07 } from "./units/u07";
import { u07b } from "./units/u07b";
import { u08 } from "./units/u08";
import { u09 } from "./units/u09";
import { u09b } from "./units/u09b";

const slices: CourseUnitSlice[] = [u01, u02, u02b, u03, u04, u05, u06, u07, u07b, u08, u09, u09b];
const assembled = assembleSlices(slices);

// Mirrors the equations-and-formulas sheet supplied with the real exam,
// organized by where each formula first appears in the course.
const reference: ReferenceGroup[] = [
  {
    title: "Statistics and data",
    subtitle: "Provided on the real exam's formula sheet",
    items: [
      { name: "Mean", latex: "\\bar{x} = \\frac{1}{n} \\sum x_i" },
      { name: "Standard deviation", latex: "s = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n-1}}" },
      { name: "Standard error of the mean", latex: "SE_{\\bar{x}} = \\frac{s}{\\sqrt{n}}", note: "Error bars of about 2 SE that do not overlap suggest a real difference between means." },
      { name: "Chi-square", latex: "\\chi^2 = \\sum \\frac{(o - e)^2}{e}", note: "o = observed, e = expected; compare with the critical value at df = categories - 1." },
    ],
    tables: [
      {
        caption: "Chi-square critical values (p = 0.05). Exceeding the critical value rejects the null hypothesis.",
        headers: ["df", "1", "2", "3", "4", "5", "6", "7", "8"],
        rows: [["Critical value", "3.84", "5.99", "7.82", "9.49", "11.07", "12.59", "14.07", "15.51"]],
      },
    ],
  },
  {
    title: "Genetics and evolution",
    subtitle: "Units 5-7",
    items: [
      { name: "Hardy-Weinberg allele frequencies", latex: "p + q = 1", note: "p = frequency of the dominant allele, q = recessive." },
      { name: "Hardy-Weinberg genotype frequencies", latex: "p^2 + 2pq + q^2 = 1", note: "Valid only with no selection, mutation, migration, or drift, and random mating." },
      { name: "Laws of probability", text: "Multiply independent events ($P(A \\text{ and } B) = P(A)P(B)$); add mutually exclusive events ($P(A \\text{ or } B) = P(A) + P(B)$).", note: "The engine behind Punnett-square shortcuts." },
    ],
  },
  {
    title: "Cells and energetics",
    subtitle: "Units 1-3",
    items: [
      { name: "Water potential", latex: "\\Psi = \\Psi_p + \\Psi_s", note: "Pressure potential plus solute potential; water moves toward lower (more negative) potential." },
      { name: "Solute potential", latex: "\\Psi_s = -iCRT", note: "i = ionization constant, C = molarity, R = 0.0831 L·bar/(mol·K), T in kelvin." },
      { name: "Surface area to volume", text: "For a sphere: $SA = 4\\pi r^2$, $V = \\tfrac{4}{3}\\pi r^3$; for a cube of side $s$: $SA = 6s^2$, $V = s^3$. Small cells keep the ratio high for efficient exchange." },
      { name: "Gibbs free energy", latex: "\\Delta G = \\Delta H - T \\Delta S", note: "Negative ΔG means a spontaneous (exergonic) process." },
      { name: "pH", latex: "\\text{pH} = -\\log_{10} [\\text{H}^+]" },
    ],
  },
  {
    title: "Populations and ecology",
    subtitle: "Unit 8",
    items: [
      { name: "Population growth rate", latex: "\\frac{dN}{dt} = B - D", note: "Births minus deaths." },
      { name: "Exponential growth", latex: "\\frac{dN}{dt} = r_{max} N", note: "Unlimited resources; J-shaped curve." },
      { name: "Logistic growth", latex: "\\frac{dN}{dt} = r_{max} N \\left(\\frac{K - N}{K}\\right)", note: "Growth slows approaching carrying capacity K; S-shaped curve." },
      { name: "Simpson's diversity index", latex: "D = 1 - \\sum \\left(\\frac{n}{N}\\right)^2", note: "n = individuals of one species, N = total individuals; higher D means more diverse." },
      { name: "Rate of temperature-dependent reactions", latex: "Q_{10} = \\left(\\frac{k_2}{k_1}\\right)^{\\frac{10}{t_2 - t_1}}", note: "Factor by which a rate changes per 10°C." },
    ],
  },
];

const exams: PracticeExam[] = [
  {
    id: "bio-exam-1",
    title: "Practice Exam 1: full AP Biology format",
    description:
      "The official format: 60 MCQs in 90 minutes, then six free-response questions in 90 minutes (two long questions of about 25 minutes each, four short questions of about 10 minutes each). A four-function calculator with square root is allowed throughout.",
    totalMinutes: 180,
    totalPoints: 94,
    sections: [
      {
        name: "Section I · Multiple choice",
        minutes: 90,
        kind: "mcq",
        mcq: { count: 60 },
        notes: "60 questions · 50% of exam score",
      },
      {
        name: "Section II · Long FRQs (Q1-Q2)",
        minutes: 50,
        kind: "frq",
        frqIds: ["bio-frq-u3-long", "bio-frq-u6-long"],
        notes: "Interpreting and evaluating experimental results · 9 points each",
      },
      {
        name: "Section II · Short FRQs (Q3-Q6)",
        minutes: 40,
        kind: "frq",
        frqIds: ["bio-frq-u1-short", "bio-frq-u4-short", "bio-frq-u7-short", "bio-frq-u8-short"],
        notes: "Four points each: describe, explain, predict, justify",
      },
    ],
    scoreCurve: { score5Min: 59, score4Min: 48, score3Min: 36, score2Min: 25 },
  },
];

const unitTitles: Record<number, string> = {
  1: "Chemistry of Life",
  2: "Cell Structure and Function",
  3: "Cellular Energetics",
  4: "Cell Communication and Cell Cycle",
  5: "Heredity",
  6: "Gene Expression and Regulation",
  7: "Natural Selection",
  8: "Ecology",
  9: "Required Investigations (Labs)",
};

const unitTests: UnitTest[] = Array.from({ length: 9 }, (_, i) => {
  const n = i + 1;
  const isLabs = n === 9;
  return {
    unitId: n,
    title: unitTitles[n],
    description: isLabs
      ? "Lab-practical test: 8 MCQs on design and data analysis with feedback held to the end, then the lab-data FRQs (one long, one short) scored on rubric points."
      : "AP-format unit test: 10 MCQs with feedback held to the end, then one long FRQ (9 points) and one short FRQ (4 points) scored on rubric points.",
    minutes: isLabs ? 45 : 50,
    mcq: { count: isLabs ? 8 : 10 },
    frqIds: ["bio-frq-u" + n + "-long", "bio-frq-u" + n + "-short"],
    masteryPct: 75,
  };
});

export const bioBundle: CourseBundle = {
  id: "bio",
  name: "AP Biology",
  shortName: "AP Bio",
  brandMark: "🧬",
  tagline:
    "The full AP Biology suite: one lesson per CED topic plus the 13 required investigations, original labeled diagrams, exam-style MCQs, long and short FRQs with rubric-point solutions, vocabulary decks, and a full-length practice exam.",
  examName: "the AP exam",
  unitLabel: "unit",
  units: assembled.units,
  lessons: assembled.lessons,
  flashcards: assembled.flashcards,
  mcq: assembled.mcq,
  frq: assembled.frq,
  frqTypes: [
    {
      key: "long",
      label: "Long FRQ (Q1-Q2 style)",
      description: "Interpreting and evaluating experimental results: describe, construct or analyze, and evaluate across 8-10 rubric points.",
      minutes: 25,
    },
    {
      key: "short",
      label: "Short FRQ (Q3-Q6 style)",
      description: "Four rubric points, usually one each for describe, explain, predict, and justify.",
      minutes: 10,
    },
  ],
  reference,
  referenceTitle: "Equations & formulas",
  referenceSubtitle: "The exam's formula sheet with the statistics, genetics, energetics, and ecology equations.",
  exams,
  unitTests,
  scoring: {
    mcqWeight: 0.5,
    frqWeight: 0.5,
    cuts: { five: 0.63, four: 0.5, three: 0.38, two: 0.27 },
    minMcq: 10,
    minFrq: 1,
    scale: { kind: "ap" },
    note: "50% MCQ / 50% FRQ · cut points are estimates",
  },
};
