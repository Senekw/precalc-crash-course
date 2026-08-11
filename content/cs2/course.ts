// Comp Sci 2 KAP course bundle: assembles the nine unit slices and
// defines course-wide configuration. The unit outline is a PLACEHOLDER
// until the real syllabus arrives. Unit slice files are owned by their
// writers; THIS file is owned by the integrator alone.

import type { CourseBundle, CourseUnitSlice, ReferenceGroup, PracticeExam, UnitTest } from "../courseTypes";
import { assembleSlices } from "../assemble";
import { u01 } from "./units/u01";
import { u02 } from "./units/u02";
import { u03 } from "./units/u03";
import { u04 } from "./units/u04";
import { u05 } from "./units/u05";
import { u06 } from "./units/u06";
import { u07 } from "./units/u07";
import { u08 } from "./units/u08";
import { u09 } from "./units/u09";

const slices: CourseUnitSlice[] = [u01, u02, u03, u04, u05, u06, u07, u08, u09];
const assembled = assembleSlices(slices);

// Java quick-reference sheet: expanded at integration.
const reference: ReferenceGroup[] = [
  {
    title: "Types and operators",
    subtitle: "Java quick reference · part 1",
    items: [
      { name: "Primitive declarations", code: "int n = 5;   double d = 2.5;\nboolean ok = true;   char c = 'A';" },
      { name: "Integer division and modulo", code: "7 / 2 == 3      7 % 2 == 1\n7 / 2.0 == 3.5  // promotion", note: "int op int stays int; division truncates." },
      { name: "Casting", code: "(int) 3.9 == 3      (double) 7 / 2 == 3.5", note: "Casting to int truncates toward zero." },
      { name: "Comparison and logic", code: "==  !=  <  <=  >  >=\n&&  ||  !", note: "Use .equals for Strings, == only for primitives." },
    ],
  },
];

const exams: PracticeExam[] = [
  {
    id: "cs2-exam-1",
    title: "Practice Final: full course format",
    description:
      "The course final's format: 30 code-tracing and concept MCQs with feedback held to the end, then three write-the-method problems scored against their rubrics and test cases.",
    totalMinutes: 120,
    totalPoints: 54,
    sections: [
      {
        name: "Section I · Code-tracing MCQ",
        minutes: 60,
        kind: "mcq",
        mcq: { count: 30 },
        notes: "30 questions",
      },
      {
        name: "Section II · Write the method",
        minutes: 60,
        kind: "frq",
        frqIds: ["cs2-frq-u2-1", "cs2-frq-u4-1", "cs2-frq-u7-1"],
        notes: "Three problems with test-case tables",
      },
    ],
  },
];

const unitTitles: Record<number, string> = {
  1: "Java Refresher: Types & Control Flow",
  2: "Methods",
  3: "Classes & Objects",
  4: "Arrays & ArrayLists",
  5: "2D Arrays",
  6: "Inheritance & Polymorphism",
  7: "Recursion",
  8: "Searching & Sorting",
  9: "Projects",
};

const unitTests: UnitTest[] = Array.from({ length: 9 }, (_, i) => {
  const n = i + 1;
  return {
    unitId: n,
    title: unitTitles[n] + " unit test",
    description:
      "Course-format unit test: 8 code-tracing MCQs with feedback held to the end, then the unit's write-the-method problems checked against their test cases.",
    minutes: 40,
    mcq: { count: 8 },
    frqIds: ["cs2-frq-u" + n + "-1", "cs2-frq-u" + n + "-2"],
    masteryPct: 75,
  };
});

export const cs2Bundle: CourseBundle = {
  id: "cs2",
  name: "Comp Sci 2 KAP",
  shortName: "CS2 KAP",
  brandMark: "{}",
  tagline:
    "The full CS2 suite: concept lessons with annotated Java and trace tables, code-tracing MCQs, write-the-method problems with solutions and test cases, flashcards, and a practice final. Unit outline is a placeholder until the real syllabus lands.",
  examName: "the final",
  unitLabel: "unit",
  units: assembled.units,
  lessons: assembled.lessons,
  flashcards: assembled.flashcards,
  mcq: assembled.mcq,
  frq: assembled.frq,
  frqTypes: [
    {
      key: "write-method",
      label: "Write the method",
      description: "Implement a specified method from its signature and contract; solutions come with rubric points and a test-case table.",
      minutes: 20,
    },
  ],
  reference,
  referenceTitle: "Java quick reference",
  referenceSubtitle: "The one-page syntax and idiom sheet for the whole course.",
  exams,
  unitTests,
  scoring: {
    mcqWeight: 0.5,
    frqWeight: 0.5,
    cuts: { five: 0.85, four: 0.75, three: 0.65, two: 0.55 },
    minMcq: 10,
    minFrq: 1,
    scale: { kind: "grade" },
    note: "50% MCQ / 50% FRQ · classroom grade bands",
  },
};
