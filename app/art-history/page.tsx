"use client";

import { CourseScaffold } from "../courses/CourseScaffold";
import { courseById } from "../courses/registry";
import config from "../../content/art-history/config";

export default function Page() {
  return <CourseScaffold course={courseById["art-history"]} content={config} />;
}
