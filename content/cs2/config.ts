import type { CourseContentConfig } from "../types";

const lessonSlots = [
  "Lessons: concept + annotated code examples + trace tables",
  "Unit test: code-tracing MCQ + write-the-method problems with solutions and test cases",
];

export const config: CourseContentConfig = {
  courseId: "cs2",
  units: [
    { number: 1, title: "Java Refresher: Types & Control Flow", lessonSlots: [...lessonSlots] },
    { number: 2, title: "Methods", lessonSlots: [...lessonSlots] },
    { number: 3, title: "Classes & Objects", lessonSlots: [...lessonSlots] },
    { number: 4, title: "Arrays & ArrayLists", lessonSlots: [...lessonSlots] },
    { number: 5, title: "2D Arrays", lessonSlots: [...lessonSlots] },
    { number: 6, title: "Inheritance & Polymorphism", lessonSlots: [...lessonSlots] },
    { number: 7, title: "Recursion", lessonSlots: [...lessonSlots] },
    { number: 8, title: "Searching & Sorting", lessonSlots: [...lessonSlots] },
    { number: 9, title: "Projects", lessonSlots: [...lessonSlots] },
  ],
  courseWide: ["One-page Java quick-reference sheet"],
  notes: "PLACEHOLDER outline until the real syllabus is provided; unit list will be replaced then.",
};

export default config;
