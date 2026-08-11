// Shared shape for per-course content configs. Each course's config lives
// in content/<course>/config.ts and is owned exclusively by that course.

export type CourseContentUnit = {
  number: number;
  title: string;
  workCount?: number;
  // Placeholder slots until real lessons are written (Prompt 2 fills these).
  lessonSlots: string[];
};

export type CourseContentConfig = {
  courseId: string;
  units: CourseContentUnit[];
  courseWide: string[];
  notes?: string;
};
