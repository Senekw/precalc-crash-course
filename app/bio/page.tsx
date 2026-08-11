"use client";

import { CourseScaffold } from "../courses/CourseScaffold";
import { courseById } from "../courses/registry";
import config from "../../content/bio/config";

export default function Page() {
  return <CourseScaffold course={courseById["bio"]} content={config} />;
}
