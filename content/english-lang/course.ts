// AP English Language & Composition course bundle: assembles the four
// skill strands, the three FRQ genre modules, and the rhetorical devices
// bank, and defines course-wide configuration. Strand and module files
// are owned by their writers; THIS file is owned by the integrator alone.

import type { CourseBundle, CourseUnitSlice, ReferenceGroup, PracticeExam, UnitTest } from "../courseTypes";
import { assembleSlices } from "../assemble";
import { u01 } from "./units/u01";
import { u02 } from "./units/u02";
import { u03 } from "./units/u03";
import { u04 } from "./units/u04";
import { synthesisFrqs } from "./units/frq-synthesis";
import { rhetoricalAnalysisFrqs } from "./units/frq-rhetorical-analysis";
import { argumentFrqs } from "./units/frq-argument";
import { deviceGroups } from "./units/reference-devices";

const slices: CourseUnitSlice[] = [u01, u02, u03, u04];
const assembled = assembleSlices(slices);

// Integrator-owned reference: thesis and evidence-integration templates.
// The devices bank (written by its module writer) is appended after.
const templates: ReferenceGroup[] = [
  {
    title: "Thesis templates",
    subtitle: "Fill the brackets; delete the scaffold once the sentence stands alone",
    items: [
      {
        name: "Rhetorical analysis thesis",
        text: "\"Writing to [audience] in the wake of [exigence], [writer] uses [choice 1] and [choice 2] to [purpose as a verb], ultimately [larger effect or redefinition].\"",
        note: "Name choices as actions, not device labels: \"reframes the war as shared debt\" beats \"uses allusion\".",
      },
      {
        name: "Argument thesis (qualified position)",
        text: "\"Although [strongest opposing point], [your position] because [reason 1] and [reason 2], provided that [limit or condition].\"",
        note: "The qualifier is not weakness; it is the line of reasoning's first move toward sophistication.",
      },
      {
        name: "Synthesis thesis",
        text: "\"While [source-backed tension], the sources together suggest [your position]: [factor A] (Sources 1, 4) and [factor B] (Source 6) outweigh [counter-factor] (Source 3).\"",
        note: "Position first, sources in service of it. The essay argues; the sources testify.",
      },
    ],
  },
  {
    title: "Evidence-integration templates",
    subtitle: "Commentary carries the points; evidence alone earns nothing",
    items: [
      {
        name: "Quote-sandwich",
        text: "Claim in your own words → shortest quotation that proves it → commentary beginning \"This [choice] works on [audience] by...\" Two sentences of commentary per one of quotation.",
      },
      {
        name: "The because-test",
        text: "Every analytical sentence should survive: \"The writer does [choice] because [fact about audience, exigence, or purpose].\" If the second half is missing, it is identification, not analysis.",
      },
      {
        name: "Synthesis attribution",
        text: "Cite as (Source A) at the end of the borrowed idea, and make at most one point per source per paragraph; conversation between sources (\"Source B's data undercuts Source A's optimism\") is what moves Row B from 2 to 4.",
      },
      {
        name: "Sophistication moves that actually score",
        text: "Situate the text in the tension of its moment; trace a complexity or contradiction the writer manages; or sustain precise, vivid prose. One sustained move beats five flourishes.",
      },
    ],
  },
];

const exams: PracticeExam[] = [
  {
    id: "el-exam-1",
    title: "Practice Exam 1: full AP English Language format",
    description:
      "The official format: 45 MCQs in 60 minutes (reading-analysis and writing-revision questions), then three essays in 135 minutes (a 15-minute reading period, then about 40 minutes each for Synthesis, Rhetorical Analysis, and Argument).",
    totalMinutes: 195,
    totalPoints: 63,
    sections: [
      {
        name: "Section I · Multiple choice",
        minutes: 60,
        kind: "mcq",
        mcq: { count: 45 },
        notes: "45 questions · 45% of exam score",
      },
      {
        name: "Section II · Q1 Synthesis",
        minutes: 55,
        kind: "frq",
        frqIds: ["el-frq-syn-1"],
        notes: "Includes the 15-minute reading period · 6 points",
      },
      {
        name: "Section II · Q2 Rhetorical Analysis",
        minutes: 40,
        kind: "frq",
        frqIds: ["el-frq-ra-1"],
        notes: "6 points",
      },
      {
        name: "Section II · Q3 Argument",
        minutes: 40,
        kind: "frq",
        frqIds: ["el-frq-arg-1"],
        notes: "6 points",
      },
    ],
    scoreCurve: { score5Min: 42, score4Min: 34, score3Min: 26, score2Min: 19 },
  },
];

const strandTitles: Record<number, string> = {
  1: "Rhetorical Situation",
  2: "Claims and Evidence",
  3: "Reasoning and Organization",
  4: "Style",
};

const unitTests: UnitTest[] = Array.from({ length: 4 }, (_, i) => {
  const n = i + 1;
  return {
    unitId: n,
    title: strandTitles[n] + " strand quiz",
    description:
      "Strand quiz in the exam's MCQ format: 10 questions mixing reading-analysis and writing-revision types, feedback held to the end.",
    minutes: 15,
    mcq: { count: 10 },
    frqIds: [],
    masteryPct: 75,
  };
});

export const englishLangBundle: CourseBundle = {
  id: "english-lang",
  name: "AP English Language & Composition",
  shortName: "AP Lang",
  brandMark: "¶",
  tagline:
    "The full AP Lang suite: four skill strands with Reading and Writing tracks, reading-analysis and writing-revision MCQs, all three essay genres with 6-point rubrics and annotated samples, a rhetorical devices bank, and a full-length practice exam.",
  examName: "the AP exam",
  unitLabel: "strand",
  units: assembled.units,
  lessons: assembled.lessons,
  flashcards: assembled.flashcards,
  mcq: assembled.mcq,
  frq: [...assembled.frq, ...synthesisFrqs, ...rhetoricalAnalysisFrqs, ...argumentFrqs],
  frqTypes: [
    {
      key: "synthesis",
      label: "Q1: Synthesis",
      description: "Six to seven sources on one issue; take a position and marshal at least three sources in its service.",
      minutes: 55,
    },
    {
      key: "rhetorical-analysis",
      label: "Q2: Rhetorical Analysis",
      description: "Analyze how a writer's choices convey purpose within the rhetorical situation.",
      minutes: 40,
    },
    {
      key: "argument",
      label: "Q3: Argument",
      description: "Take a defensible position on an open question and sustain a line of reasoning with evidence from your reading, experience, or observation.",
      minutes: 40,
    },
  ],
  mcqModes: [
    { key: "reading", label: "Reading analysis", short: "R" },
    { key: "writing", label: "Writing revision", short: "W" },
  ],
  reference: [...templates, ...deviceGroups],
  referenceTitle: "Devices & templates",
  referenceSubtitle: "The rhetorical devices bank with original examples, plus thesis and evidence-integration templates.",
  exams,
  unitTests,
  scoring: {
    mcqWeight: 0.45,
    frqWeight: 0.55,
    cuts: { five: 0.66, four: 0.53, three: 0.41, two: 0.3 },
    minMcq: 10,
    minFrq: 1,
    scale: { kind: "ap" },
    note: "45% MCQ / 55% FRQ · cut points are estimates",
  },
};
