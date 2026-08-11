import type { CourseContentConfig } from "../types";

const lessonSlots = [
  "Work entries: identification + form/function/content/context + flashcard (image slot links out, no embedded images)",
  "Attribution-style MCQ set",
  "Compare/contrast FRQ prompts with model responses",
];

export const config: CourseContentConfig = {
  courseId: "art-history",
  units: [
    { number: 1, title: "Global Prehistory", workCount: 11, lessonSlots },
    { number: 2, title: "Ancient Mediterranean", workCount: 36, lessonSlots },
    { number: 3, title: "Early Europe and Colonial Americas", workCount: 51, lessonSlots },
    { number: 4, title: "Later Europe and Americas", workCount: 54, lessonSlots },
    { number: 5, title: "Indigenous Americas", workCount: 14, lessonSlots },
    { number: 6, title: "Africa", workCount: 14, lessonSlots },
    { number: 7, title: "West and Central Asia", workCount: 11, lessonSlots },
    { number: 8, title: "South, East, and Southeast Asia", workCount: 21, lessonSlots },
    { number: 9, title: "The Pacific", workCount: 11, lessonSlots },
    { number: 10, title: "Global Contemporary", workCount: 27, lessonSlots },
  ],
  courseWide: [
    "250-work checklist dashboard with per-area progress",
    "Chronological timeline view",
  ],
};

export default config;
