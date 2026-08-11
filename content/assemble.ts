// Assembles per-unit content slices into the flat arrays a CourseBundle
// needs. Multiple slices may share a unit id (large units are split across
// two writer files): the FIRST slice for a unit owns its metadata
// (description, weight, big ideas); later slices contribute only their
// subTopics, lessons, flashcards, MCQs, and FRQs. Order of the input array
// is course order and drives the flat prev/next lesson sequence.

import type { CourseUnitData, CourseUnitSlice } from "./courseTypes";

export function assembleSlices(slices: CourseUnitSlice[]): {
  units: CourseUnitData[];
  lessons: CourseUnitSlice["lessons"];
  flashcards: CourseUnitSlice["flashcards"];
  mcq: CourseUnitSlice["mcq"];
  frq: CourseUnitSlice["frq"];
} {
  const unitOrder: number[] = [];
  const unitById = new Map<number, CourseUnitData>();
  for (const s of slices) {
    const existing = unitById.get(s.unit.id);
    if (!existing) {
      unitOrder.push(s.unit.id);
      unitById.set(s.unit.id, { ...s.unit, subTopics: [...s.unit.subTopics] });
    } else {
      existing.subTopics.push(...s.unit.subTopics);
      if (!existing.description && s.unit.description) existing.description = s.unit.description;
      if (!existing.bigIdeas.length && s.unit.bigIdeas.length) existing.bigIdeas = [...s.unit.bigIdeas];
    }
  }
  return {
    units: unitOrder.map((id) => unitById.get(id)!),
    lessons: slices.flatMap((s) => s.lessons),
    flashcards: slices.flatMap((s) => s.flashcards),
    mcq: slices.flatMap((s) => s.mcq),
    frq: slices.flatMap((s) => s.frq),
  };
}
