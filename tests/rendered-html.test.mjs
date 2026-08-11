import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", String(process.pid) + "-" + String(Date.now()) + "-" + path);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost" + path, {
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

test("server-renders the course switcher on the home route", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Study modes/);
  assert.match(html, /AP Precalculus/);
  assert.match(html, /AP Calculus BC/);
  assert.match(html, /AP English Language &(amp;)? Composition/);
  assert.match(html, /AP Statistics/);
  assert.match(html, /AP Biology/);
  assert.match(html, /AP Art History/);
  assert.match(html, /Comp Sci 2 KAP/);
  assert.match(html, /Period 2/);
  assert.match(html, /Period 16/);
  assert.match(
    html,
    /<meta(?=[^>]*\bproperty=["']og:image["'])(?=[^>]*\bcontent=["']http:\/\/localhost(?::3000)?\/og\.png["'])[^>]*>/i,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape|Starter Project/i);
});

test("server-renders the complete BC Bridge dashboard at /precalc", async () => {
  const response = await render("/precalc");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /One day\. Start Calc BC ready\./);
  assert.match(html, /13\.5 focused hours/);
  assert.match(html, /Only what BC week one assumes/);
  assert.match(html, /If it does not pay rent in week one of Calc BC, it is gone\./);
  assert.match(html, /AP Precalculus suite/);
});

test("server-renders the live AP Calculus BC mode", async () => {
  const response = await render("/calc-bc");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /AP Calculus BC/);
  assert.match(html, /The full BC suite/);
  assert.doesNotMatch(html, /content pending/);
});

test("server-renders every scaffold mode with its exact unit skeleton", async () => {
  const expectations = [
    ["/english-lang", ["Rhetorical Situation", "Style"], 4],
    ["/stats", ["Exploring One-Variable Data", "Inference for Quantitative Data: Slopes"], 9],
    ["/bio", ["Chemistry of Life", "Ecology"], 8],
    ["/art-history", ["Global Prehistory", "Global Contemporary"], 10],
    ["/cs2", ["Methods", "Projects"], 9],
  ];
  for (const [path, markers, unitCount] of expectations) {
    const response = await render(path);
    assert.equal(response.status, 200, path + " should render");
    const html = await response.text();
    for (const marker of markers) {
      assert.ok(html.includes(marker), path + " should include " + JSON.stringify(marker));
    }
    const slots = html.match(/content pending/g) ?? [];
    assert.ok(slots.length >= unitCount, path + " should render at least one pending slot per unit");
  }
});

test("locks the curriculum to 14 lessons and exactly 13.5 hours", async () => {
  const curriculum = await readFile(new URL("../app/curriculum.ts", import.meta.url), "utf8");
  const lessonSource = curriculum.split("export const practiceQuestions")[0];
  const lessonCount = [...lessonSource.matchAll(/^\s{4}id: "/gm)].length;
  const minuteValues = [...lessonSource.matchAll(/^\s{4}minutes: (\d+),$/gm)].map((match) => Number(match[1]));

  assert.equal(lessonCount, 14);
  assert.equal(minuteValues.reduce((sum, minutes) => sum + minutes, 0), 810);
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

test("locks the AP Precalculus content bank", async () => {
  const read = (p) => readFile(new URL(p, import.meta.url), "utf8");

  const topics = await read("../app/precalc/data/topics.ts");
  assert.equal([...topics.matchAll(/mW\(`/g)].length, 44);
  assert.equal([...topics.matchAll(/subTopics:topicsU\d/g)].length, 3);

  const mcq = await read("../app/precalc/data/mcq.ts");
  assert.equal([...mcq.matchAll(/V\(`mc-/g)].length, 103);
  assert.equal([...mcq.matchAll(/`no-calc`/g)].length, 84);
  assert.equal([...mcq.matchAll(/`calc-required`/g)].length, 19);

  const frq = await read("../app/precalc/data/frq.ts");
  assert.equal([...frq.matchAll(/topicIds:\[/g)].length, 23);
  assert.equal([...frq.matchAll(/modelSolution:`/g)].length, 72);

  const cards = await read("../app/precalc/data/flashcards.ts");
  assert.equal([...cards.matchAll(/B\(`/g)].length, 88);

  const formulas = await read("../app/precalc/data/formulas.ts");
  assert.equal([...formulas.matchAll(/latex:`/g)].length, 45);
  assert.equal([...formulas.matchAll(/\{angle:`/g)].length, 16);

  const tutor = await read("../app/precalc/data/tutor.ts");
  assert.equal([...tutor.matchAll(/\{topicId:`\d/g)].length, 44);

  const exams = await read("../app/precalc/data/exams.ts");
  assert.equal([...exams.matchAll(/\{id:`precalc-pe-\d`/g)].length, 4);
});
