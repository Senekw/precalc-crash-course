import type { CourseContentConfig } from "../types";

const coreSlots = [
  "Lessons: one per official CED topic, with TI-84 keystroke callouts",
  "Unit study guide",
  "Unit test: MCQ + FRQ with state-plan-do-conclude solutions",
];

const inferenceSlots = [...coreSlots, "Investigative-task-style FRQ"];

export const config: CourseContentConfig = {
  courseId: "stats",
  units: [
    { number: 1, title: "Exploring One-Variable Data", lessonSlots: [...coreSlots] },
    { number: 2, title: "Exploring Two-Variable Data", lessonSlots: [...coreSlots] },
    { number: 3, title: "Collecting Data", lessonSlots: [...coreSlots] },
    {
      number: 4,
      title: "Probability, Random Variables, and Probability Distributions",
      lessonSlots: [...coreSlots],
    },
    { number: 5, title: "Sampling Distributions", lessonSlots: [...coreSlots] },
    {
      number: 6,
      title: "Inference for Categorical Data: Proportions",
      lessonSlots: [...inferenceSlots],
    },
    {
      number: 7,
      title: "Inference for Quantitative Data: Means",
      lessonSlots: [...inferenceSlots],
    },
    {
      number: 8,
      title: "Inference for Categorical Data: Chi-Square",
      lessonSlots: [...inferenceSlots],
    },
    {
      number: 9,
      title: "Inference for Quantitative Data: Slopes",
      lessonSlots: [...inferenceSlots],
    },
  ],
  courseWide: [
    "Formula sheet and table references (z, t, chi-square)",
    "Inference procedure chooser flowchart",
    "Full-length practice exam",
  ],
};

export default config;
