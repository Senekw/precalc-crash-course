"use client";

import { CourseScaffold } from "../courses/CourseScaffold";
import { courseById } from "../courses/registry";
import config from "../../content/calc-bc/config";

export default function Page() {
  return <CourseScaffold course={courseById["calc-bc"]} content={config} />;
}
