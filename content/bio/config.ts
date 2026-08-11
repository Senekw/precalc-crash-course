import type { CourseContentConfig } from "../types";

const standardSlots = [
  "Lessons: one per official CED topic",
  "Vocabulary deck",
  "Label-the-diagram practice (original SVGs)",
  "Unit study guide",
  "Unit test: MCQ + one long FRQ + one short FRQ with rubric-point solutions",
];

export const config: CourseContentConfig = {
  courseId: "bio",
  units: [
    { number: 1, title: "Chemistry of Life", lessonSlots: [...standardSlots] },
    { number: 2, title: "Cell Structure and Function", lessonSlots: [...standardSlots] },
    { number: 3, title: "Cellular Energetics", lessonSlots: [...standardSlots] },
    { number: 4, title: "Cell Communication and Cell Cycle", lessonSlots: [...standardSlots] },
    { number: 5, title: "Heredity", lessonSlots: [...standardSlots] },
    { number: 6, title: "Gene Expression and Regulation", lessonSlots: [...standardSlots] },
    { number: 7, title: "Natural Selection", lessonSlots: [...standardSlots] },
    { number: 8, title: "Ecology", lessonSlots: [...standardSlots] },
  ],
  courseWide: [
    "Labs section: the 13 required investigations (design, data analysis, FRQ angles)",
    "Full-length practice exam",
  ],
};

export default config;
