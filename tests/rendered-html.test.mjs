import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", String(process.pid) + "-" + String(Date.now()));
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete BC Bridge dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>BC Bridge — 3-Day Precalculus Sprint<\/title>/i);
  assert.match(html, /Three days\. Start Calc BC ready\./);
  assert.match(html, /30 focused hours/);
  assert.match(html, /Only direct Calc BC prerequisites/);
  assert.match(html, /If it does not pay rent in Calc BC, it is gone\./);
  assert.match(
    html,
    /<meta(?=[^>]*\bproperty=["']og:image["'])(?=[^>]*\bcontent=["']http:\/\/localhost(?::3000)?\/og\.png["'])[^>]*>/i,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape|Starter Project/i);
});

test("locks the curriculum to 19 lessons and exactly 30 hours", async () => {
  const curriculum = await readFile(new URL("../app/curriculum.ts", import.meta.url), "utf8");
  const lessonSource = curriculum.split("export const practiceQuestions")[0];
  const lessonCount = [...lessonSource.matchAll(/^\s{4}id: "/gm)].length;
  const minuteValues = [...lessonSource.matchAll(/^\s{4}minutes: (\d+),$/gm)].map((match) => Number(match[1]));

  assert.equal(lessonCount, 19);
  assert.equal(minuteValues.reduce((sum, minutes) => sum + minutes, 0), 1800);
  assert.match(curriculum, /Matrices and determinants/);
  assert.match(curriculum, /Probability and statistics/);
  assert.match(curriculum, /General conic-section classification/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));

  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /codex-preview/);
  await assert.rejects(access(new URL("public/favicon.svg", projectRoot)));
  await access(new URL("public/og.png", projectRoot));
});
