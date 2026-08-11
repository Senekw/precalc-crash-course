"use client";

import { CourseApp } from "../courses/engine/CourseApp";
import { courseById } from "../courses/registry";
import { calcBcBundle } from "../../content/calc-bc/course";

export default function Page() {
  return <CourseApp course={courseById["calc-bc"]} bundle={calcBcBundle} />;
}
