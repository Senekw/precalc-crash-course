// Course registry: one entry per mode. The switcher home screen and the
// scaffold shells render from this config. Filling a course's content
// happens ONLY in content/<course>/ and never touches this file beyond
// flipping `status` to "live".

export type CourseUnit = {
  number: number;
  title: string;
  // Named placeholder slots rendered until real lessons exist
  // (e.g. "Reading track", "Writing track") or a work count for
  // collection-based courses like Art History.
  slots?: string[];
  workCount?: number;
};

export type Course = {
  id: string;
  name: string;
  route: string;
  period: string;
  teacher?: string;
  color: string;
  status: "live" | "scaffold";
  unitLabel: string;
  units: CourseUnit[];
  extras?: string[];
};

export const courses: Course[] = [
  {
    id: "precalc",
    name: "AP Precalculus",
    route: "/precalc",
    period: "Reference mode",
    color: "#8179f0",
    status: "live",
    unitLabel: "unit",
    units: [
      { number: 1, title: "Polynomial and Rational Functions" },
      { number: 2, title: "Exponential and Logarithmic Functions" },
      { number: 3, title: "Trigonometric and Polar Functions" },
    ],
  },
  {
    id: "calc-bc",
    name: "AP Calculus BC",
    route: "/calc-bc",
    period: "Period 2",
    teacher: "Myers",
    color: "#38bdf8",
    status: "scaffold",
    unitLabel: "unit",
    units: [
      { number: 1, title: "Limits and Continuity" },
      { number: 2, title: "Differentiation: Definition and Fundamental Properties" },
      { number: 3, title: "Differentiation: Composite, Implicit, and Inverse Functions" },
      { number: 4, title: "Contextual Applications of Differentiation" },
      { number: 5, title: "Analytical Applications of Differentiation" },
      { number: 6, title: "Integration and Accumulation of Change" },
      { number: 7, title: "Differential Equations" },
      { number: 8, title: "Applications of Integration" },
      { number: 9, title: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions" },
      { number: 10, title: "Infinite Sequences and Series" },
    ],
  },
  {
    id: "english-lang",
    name: "AP English Language & Composition",
    route: "/english-lang",
    period: "Period 3",
    teacher: "Carroll",
    color: "#f472b6",
    status: "scaffold",
    unitLabel: "skill strand",
    units: [
      { number: 1, title: "Rhetorical Situation", slots: ["Reading track", "Writing track"] },
      { number: 2, title: "Claims and Evidence", slots: ["Reading track", "Writing track"] },
      { number: 3, title: "Reasoning and Organization", slots: ["Reading track", "Writing track"] },
      { number: 4, title: "Style", slots: ["Reading track", "Writing track"] },
    ],
    extras: ["FRQ module: Synthesis", "FRQ module: Rhetorical Analysis", "FRQ module: Argument", "MCQ practice section"],
  },
  {
    id: "stats",
    name: "AP Statistics",
    route: "/stats",
    period: "Period 5",
    teacher: "Harper",
    color: "#4ade80",
    status: "scaffold",
    unitLabel: "unit",
    units: [
      { number: 1, title: "Exploring One-Variable Data" },
      { number: 2, title: "Exploring Two-Variable Data" },
      { number: 3, title: "Collecting Data" },
      { number: 4, title: "Probability, Random Variables, and Probability Distributions" },
      { number: 5, title: "Sampling Distributions" },
      { number: 6, title: "Inference for Categorical Data: Proportions" },
      { number: 7, title: "Inference for Quantitative Data: Means" },
      { number: 8, title: "Inference for Categorical Data: Chi-Square" },
      { number: 9, title: "Inference for Quantitative Data: Slopes" },
    ],
  },
  {
    id: "bio",
    name: "AP Biology",
    route: "/bio",
    period: "Period 7",
    teacher: "Hsu",
    color: "#fbbf24",
    status: "scaffold",
    unitLabel: "unit",
    units: [
      { number: 1, title: "Chemistry of Life" },
      { number: 2, title: "Cell Structure and Function" },
      { number: 3, title: "Cellular Energetics" },
      { number: 4, title: "Cell Communication and Cell Cycle" },
      { number: 5, title: "Heredity" },
      { number: 6, title: "Gene Expression and Regulation" },
      { number: 7, title: "Natural Selection" },
      { number: 8, title: "Ecology" },
    ],
    extras: ["Labs section: the 13 required investigations"],
  },
  {
    id: "art-history",
    name: "AP Art History",
    route: "/art-history",
    period: "Period 15 · virtual",
    teacher: "Mitchell",
    color: "#fb7185",
    status: "scaffold",
    unitLabel: "content area",
    units: [
      { number: 1, title: "Global Prehistory", workCount: 11 },
      { number: 2, title: "Ancient Mediterranean", workCount: 36 },
      { number: 3, title: "Early Europe and Colonial Americas", workCount: 51 },
      { number: 4, title: "Later Europe and Americas", workCount: 54 },
      { number: 5, title: "Indigenous Americas", workCount: 14 },
      { number: 6, title: "Africa", workCount: 14 },
      { number: 7, title: "West and Central Asia", workCount: 11 },
      { number: 8, title: "South, East, and Southeast Asia", workCount: 21 },
      { number: 9, title: "The Pacific", workCount: 11 },
      { number: 10, title: "Global Contemporary", workCount: 27 },
    ],
    extras: ["250-work checklist dashboard", "Chronological timeline view"],
  },
  {
    id: "cs2",
    name: "Comp Sci 2 KAP",
    route: "/cs2",
    period: "Period 16 · virtual",
    teacher: "Cordova Ramirez",
    color: "#a78bfa",
    status: "scaffold",
    unitLabel: "unit",
    units: [
      { number: 1, title: "Java Refresher: Types & Control Flow" },
      { number: 2, title: "Methods" },
      { number: 3, title: "Classes & Objects" },
      { number: 4, title: "Arrays & ArrayLists" },
      { number: 5, title: "2D Arrays" },
      { number: 6, title: "Inheritance & Polymorphism" },
      { number: 7, title: "Recursion" },
      { number: 8, title: "Searching & Sorting" },
      { number: 9, title: "Projects" },
    ],
    extras: ["PLACEHOLDER outline: awaiting the real syllabus"],
  },
];

export const courseById: Record<string, Course> = Object.fromEntries(courses.map((c) => [c.id, c]));

export function totalArtHistoryWorks(): number {
  return courseById["art-history"].units.reduce((sum, u) => sum + (u.workCount ?? 0), 0);
}
