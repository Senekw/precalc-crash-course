import type { CourseContentConfig } from "../types";

const standardSlots = [
  "Lessons: one per official CED topic",
  "Unit study guide",
  "Unit test: AP-style MCQ (calculator and no-calculator tagged) + 2 FRQs",
];

export const config: CourseContentConfig = {
  courseId: "calc-bc",
  units: [
    {
      number: 1,
      title: "Limits and Continuity",
      lessonSlots: [...standardSlots],
    },
    {
      number: 2,
      title: "Differentiation: Definition and Fundamental Properties",
      lessonSlots: [...standardSlots],
    },
    {
      number: 3,
      title: "Differentiation: Composite, Implicit, and Inverse Functions",
      lessonSlots: [...standardSlots],
    },
    {
      number: 4,
      title: "Contextual Applications of Differentiation",
      lessonSlots: [...standardSlots],
    },
    {
      number: 5,
      title: "Analytical Applications of Differentiation",
      lessonSlots: [...standardSlots],
    },
    {
      number: 6,
      title: "Integration and Accumulation of Change",
      lessonSlots: [...standardSlots],
    },
    {
      number: 7,
      title: "Differential Equations",
      lessonSlots: [...standardSlots],
    },
    {
      number: 8,
      title: "Applications of Integration",
      lessonSlots: [...standardSlots],
    },
    {
      number: 9,
      title: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
      lessonSlots: [...standardSlots],
    },
    {
      number: 10,
      title: "Infinite Sequences and Series",
      lessonSlots: [...standardSlots],
    },
  ],
  courseWide: [
    "Formula sheet",
    "Series convergence-test summary table",
    "Full-length practice exam",
  ],
  notes: "Chains directly off the AP Precalculus mode. Topic lists arrive with the content fill.",
};

export default config;
