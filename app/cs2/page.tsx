"use client";

import { CourseScaffold } from "../courses/CourseScaffold";
import { courseById } from "../courses/registry";
import config from "../../content/cs2/config";

export default function Page() {
  return <CourseScaffold course={courseById["cs2"]} content={config} />;
}
