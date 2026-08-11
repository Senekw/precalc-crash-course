"use client";

import { CourseScaffold } from "../courses/CourseScaffold";
import { courseById } from "../courses/registry";
import config from "../../content/english-lang/config";

export default function Page() {
  return <CourseScaffold course={courseById["english-lang"]} content={config} />;
}
