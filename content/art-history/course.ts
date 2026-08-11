// AP Art History course bundle: assembles the ten content-area slices
// covering all 250 required works and defines course-wide configuration,
// including the 250-work checklist dashboard and the chronological
// timeline. Slice files are owned by their writers; THIS file is owned by
// the integrator alone.

import type { CourseBundle, CourseUnitSlice, ReferenceGroup, PracticeExam, UnitTest } from "../courseTypes";
import { assembleSlices } from "../assemble";
import { ca01 } from "./units/ca01";
import { ca02 } from "./units/ca02";
import { ca02b } from "./units/ca02b";
import { ca02c } from "./units/ca02c";
import { ca03 } from "./units/ca03";
import { ca03b } from "./units/ca03b";
import { ca03c } from "./units/ca03c";
import { ca03d } from "./units/ca03d";
import { ca04 } from "./units/ca04";
import { ca04b } from "./units/ca04b";
import { ca04c } from "./units/ca04c";
import { ca04d } from "./units/ca04d";
import { ca05 } from "./units/ca05";
import { ca06 } from "./units/ca06";
import { ca07 } from "./units/ca07";
import { ca08 } from "./units/ca08";
import { ca08b } from "./units/ca08b";
import { ca09 } from "./units/ca09";
import { ca10 } from "./units/ca10";
import { ca10b } from "./units/ca10b";

const slices: CourseUnitSlice[] = [
  ca01, ca02, ca02b, ca02c, ca03, ca03b, ca03c, ca03d,
  ca04, ca04b, ca04c, ca04d, ca05, ca06, ca07, ca08, ca08b, ca09, ca10, ca10b,
];
const assembled = assembleSlices(slices);

const reference: ReferenceGroup[] = [
  {
    title: "Formal analysis vocabulary",
    subtitle: "The words that earn visual-analysis points",
    items: [
      { name: "Composition", text: "How elements are arranged: symmetry, balance, focal point, framing. Say what the arrangement DOES (directs the eye, ranks figures)." },
      { name: "Hierarchy of scale", text: "Size signals importance: rulers rendered larger than attendants regardless of realistic proportion." },
      { name: "Registers", text: "Horizontal bands that organize a narrative or ranked scene, common in ancient Near Eastern and Egyptian art." },
      { name: "Contrapposto", text: "Weight shifted onto one leg, tilting hips and shoulders in counterbalance; a marker of naturalism from Greek sculpture onward." },
      { name: "Foreshortening", text: "Depicting a form receding toward the viewer by compressing its length; a virtuoso naturalist device." },
      { name: "Linear perspective", text: "Orthogonal lines converging to vanishing points to construct measurable depth on a flat surface." },
      { name: "Atmospheric perspective", text: "Distance implied by hazier contours and cooler, paler color toward the horizon." },
      { name: "Chiaroscuro", text: "Modeling form through gradations of light and shadow." },
      { name: "Tenebrism", text: "Theatrical extreme of chiaroscuro: figures spotlit against enveloping darkness." },
      { name: "Impasto", text: "Paint applied thickly enough to preserve the stroke as physical texture." },
      { name: "Iconography", text: "The identifiable symbols and subject conventions that carry meaning for a knowing audience." },
      { name: "Patronage", text: "Who paid, and what the commission was for; the fastest route into a work's function and context." },
    ],
  },
  {
    title: "Attribution checklist",
    subtitle: "For any unknown work, argue from evidence in this order",
    items: [
      { name: "1 · Medium and technique", text: "What is it physically? Fresco, oil on canvas, cast bronze, ukiyo-e woodblock: each narrows culture and era immediately." },
      { name: "2 · Form", text: "Naturalism vs. abstraction, treatment of space, color logic, surface finish; compare to a NAMED work from the 250 with shared traits." },
      { name: "3 · Subject and iconography", text: "Who or what is shown, and which tradition uses that subject this way?" },
      { name: "4 · Function", text: "What was it FOR: altar, tomb, palace, print market, protest? Function ties form to culture." },
      { name: "5 · Claim with qualifier", text: "\"Most likely [culture/artist/period] because [two features shared with a specific known work].\" Certainty is not required; evidence is." },
    ],
  },
  {
    title: "Content areas at a glance",
    subtitle: "The exam's ten divisions of the 250 works",
    items: [],
    tables: [
      {
        caption: "Official content areas with work counts and approximate exam weighting.",
        headers: ["#", "Content area", "Works", "Share of exam"],
        rows: [
          ["1", "Global Prehistory (30,000-500 B.C.E.)", "11", "4%"],
          ["2", "Ancient Mediterranean (3500 B.C.E.-300 C.E.)", "36", "15%"],
          ["3", "Early Europe and Colonial Americas (200-1750 C.E.)", "51", "21%"],
          ["4", "Later Europe and Americas (1750-1980 C.E.)", "54", "21%"],
          ["5", "Indigenous Americas (1000 B.C.E.-1980 C.E.)", "14", "6%"],
          ["6", "Africa (1100-1980 C.E.)", "14", "6%"],
          ["7", "West and Central Asia (500 B.C.E.-1980 C.E.)", "11", "4%"],
          ["8", "South, East, and Southeast Asia (300 B.C.E.-1980 C.E.)", "21", "8%"],
          ["9", "The Pacific (700-1980 C.E.)", "11", "4%"],
          ["10", "Global Contemporary (1980 C.E. to present)", "27", "11%"],
        ],
      },
    ],
  },
];

const exams: PracticeExam[] = [
  {
    id: "ah-exam-1",
    title: "Practice Exam 1: full AP Art History format",
    description:
      "The official format: 80 MCQs in 60 minutes, then six free-response questions in 120 minutes (two 30-minute essays, including the cross-cultural comparison, and four 15-minute questions, several attribution-style). Section weights are 50/50.",
    totalMinutes: 180,
    totalPoints: 114,
    sections: [
      {
        name: "Section I · Multiple choice",
        minutes: 60,
        kind: "mcq",
        mcq: { count: 80 },
        notes: "80 questions · 50% of exam score",
      },
      {
        name: "Section II · Long essays (Q1-Q2)",
        minutes: 60,
        kind: "frq",
        frqIds: ["ah-frq-ca10-1", "ah-frq-ca3-1"],
        notes: "30 minutes each: comparison and extended analysis",
      },
      {
        name: "Section II · Short questions (Q3-Q6)",
        minutes: 60,
        kind: "frq",
        frqIds: ["ah-frq-ca2-2", "ah-frq-ca4-2", "ah-frq-ca6-2", "ah-frq-ca8-2"],
        notes: "15 minutes each, attribution and focused analysis",
      },
    ],
    scoreCurve: { score5Min: 80, score4Min: 65, score3Min: 50, score2Min: 36 },
  },
];

const areaTitles: Record<number, string> = {
  1: "Global Prehistory",
  2: "Ancient Mediterranean",
  3: "Early Europe and Colonial Americas",
  4: "Later Europe and Americas",
  5: "Indigenous Americas",
  6: "Africa",
  7: "West and Central Asia",
  8: "South, East, and Southeast Asia",
  9: "The Pacific",
  10: "Global Contemporary",
};

const unitTests: UnitTest[] = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1;
  return {
    unitId: n,
    title: areaTitles[n] + " area test",
    description:
      "Exam-format area test: 8 attribution-style MCQs with feedback held to the end, then the area's comparison essay and attribution question scored against their model responses.",
    minutes: 40,
    mcq: { count: 8 },
    frqIds: ["ah-frq-ca" + n + "-1", "ah-frq-ca" + n + "-2"],
    masteryPct: 75,
  };
});

export const artHistoryBundle: CourseBundle = {
  id: "art-history",
  name: "AP Art History",
  shortName: "AP Art Hist",
  brandMark: "◬",
  tagline:
    "All 250 required works with full identification and form / function / content / context entries, a checklist dashboard and chronological timeline, attribution MCQs, compare-and-contrast essays with model responses, and a full-length practice exam.",
  examName: "the AP exam",
  unitLabel: "content area",
  units: assembled.units,
  lessons: assembled.lessons,
  flashcards: assembled.flashcards,
  mcq: assembled.mcq,
  frq: assembled.frq,
  frqTypes: [
    {
      key: "comparison",
      label: "Comparison essay (Q1 style)",
      description: "Compare a required work with another work of your choosing around a shared theme; argue from form, function, content, and context.",
      minutes: 30,
    },
    {
      key: "attribution",
      label: "Attribution (Q3 style)",
      description: "Attribute an unknown work to a culture, period, or artist, justifying with specific visual evidence and a named comparison from the 250.",
      minutes: 15,
    },
  ],
  reference,
  referenceTitle: "Analysis toolkit",
  referenceSubtitle: "Formal-analysis vocabulary, the attribution checklist, and the content areas at a glance.",
  exams,
  unitTests,
  scoring: {
    mcqWeight: 0.5,
    frqWeight: 0.5,
    cuts: { five: 0.65, four: 0.52, three: 0.39, two: 0.28 },
    minMcq: 10,
    minFrq: 1,
    scale: { kind: "ap" },
    note: "50% MCQ / 50% FRQ · cut points are estimates",
  },
  features: {
    workChecklist: true,
    timeline: true,
  },
};
