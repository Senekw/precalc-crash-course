import type { CourseContentConfig } from "../types";

export const config: CourseContentConfig = {
  courseId: "english-lang",
  units: [
    {
      number: 1,
      title: "Rhetorical Situation",
      lessonSlots: [
        "Reading track lessons",
        "Writing track lessons",
        "Strand quiz (MCQ)",
      ],
    },
    {
      number: 2,
      title: "Claims and Evidence",
      lessonSlots: [
        "Reading track lessons",
        "Writing track lessons",
        "Strand quiz (MCQ)",
      ],
    },
    {
      number: 3,
      title: "Reasoning and Organization",
      lessonSlots: [
        "Reading track lessons",
        "Writing track lessons",
        "Strand quiz (MCQ)",
      ],
    },
    {
      number: 4,
      title: "Style",
      lessonSlots: [
        "Reading track lessons",
        "Writing track lessons",
        "Strand quiz (MCQ)",
      ],
    },
  ],
  courseWide: [
    "FRQ module: Synthesis (6-point rubric checklist + annotated samples)",
    "FRQ module: Rhetorical Analysis (6-point rubric checklist + annotated samples)",
    "FRQ module: Argument (6-point rubric checklist + annotated samples)",
    "MCQ practice: reading-analysis and writing-revision sets",
    "Rhetorical devices bank with an original example per device",
    "Thesis and evidence-integration templates",
    "Full practice exam: MCQ section + one FRQ of each genre",
  ],
  notes: "Original passages and public-domain texts only; no copyrighted passages will be reproduced.",
};

export default config;
