import fs from "node:fs/promises";

const host = "http://127.0.0.1:9224";
const targets = await (await fetch(host + "/json/list")).json();
const target = targets.find((item) => item.type === "page");
if (!target) throw new Error("No Chrome page target found");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let nextId = 1;
const pending = new Map();
const events = new Map();

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    if (message.error) entry.reject(new Error(message.error.message));
    else entry.resolve(message.result);
    return;
  }
  for (const listener of events.get(message.method) ?? []) listener(message.params ?? {});
});

function send(method, params = {}) {
  const id = nextId;
  nextId += 1;
  const promise = new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  socket.send(JSON.stringify({ id, method, params }));
  return promise;
}

function on(method, listener) {
  const listeners = events.get(method) ?? [];
  listeners.push(listener);
  events.set(method, listeners);
}

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function evaluate(expression) {
  const response = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true,
  });
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text || "Evaluation failed");
  }
  return response.result.value;
}

async function navigate(url) {
  await send("Page.navigate", { url });
  for (let attempt = 0; attempt < 80; attempt += 1) {
    await delay(100);
    if ((await evaluate("document.readyState")) === "complete") break;
  }
  await delay(500);
}

async function screenshot(name) {
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile("/tmp/bc-bridge-" + name + ".png", Buffer.from(shot.data, "base64"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const consoleErrors = [];
const pageErrors = [];
on("Runtime.consoleAPICalled", (event) => {
  if (event.type === "error") consoleErrors.push(event.args.map((arg) => arg.value ?? arg.description).join(" "));
});
on("Runtime.exceptionThrown", (event) => {
  pageErrors.push(event.exceptionDetails.exception?.description || event.exceptionDetails.text);
});

await send("Page.enable");
await send("Runtime.enable");
await send("Network.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});

await navigate("http://localhost:3000/precalc");
await evaluate("localStorage.removeItem('bc-bridge-progress-v1')");
await navigate("http://localhost:3000/precalc");

const desktop = await evaluate("(() => ({ title: document.title, h1: document.querySelector('h1')?.innerText, width: innerWidth, scrollWidth: document.documentElement.scrollWidth, buttons: document.querySelectorAll('button').length, nav: document.querySelectorAll('nav button').length, main: Boolean(document.querySelector('main')), aside: Boolean(document.querySelector('aside')) }))()");
assert(desktop.title.includes("BC Bridge"), "Document title is incorrect");
assert(desktop.h1 === "One day. Start Calc BC ready.", "Dashboard heading missing");
assert(desktop.scrollWidth <= desktop.width + 1, "Desktop has horizontal overflow: " + JSON.stringify(desktop));
assert(desktop.nav === 15, "Primary navigation is incomplete");
assert(desktop.main && desktop.aside, "Main or sidebar landmark missing");
await screenshot("qa-dashboard");

await evaluate("(() => { const button = [...document.querySelectorAll('nav button')].find((item) => item.innerText.includes('Crash lessons')); button?.click(); })()");
await delay(250);
assert(await evaluate("document.querySelector('h1')?.innerText === 'Precalc Tutor'"), "Crash lesson catalog did not open");
assert((await evaluate("document.querySelectorAll('.lesson-row').length")) === 14, "Catalog does not show all 14 lessons");

await evaluate("document.querySelector('.lesson-row')?.click()");
await delay(250);
assert(await evaluate("document.querySelector('h1')?.innerText === 'Radians and the unit circle'"), "Lesson detail did not open");
assert((await evaluate("document.querySelectorAll('.concept-block').length")) === 3, "Lesson essentials are incomplete");
await evaluate("document.querySelector('.gate-question summary')?.click()");
await delay(100);
assert(await evaluate("Boolean(document.querySelector('.gate-question[open] .gate-answer'))"), "Mastery answer did not reveal");
await evaluate("(() => { const notes = document.querySelector('#lesson-notes'); notes.value = 'Always carry domain restrictions.'; notes.dispatchEvent(new Event('input', { bubbles: true })); const complete = [...document.querySelectorAll('button')].find((item) => item.innerText === 'Mark lesson complete'); complete?.click(); })()");
await delay(250);
assert(await evaluate("[...document.querySelectorAll('button')].some((item) => item.innerText.includes('Completed — undo'))"), "Lesson completion did not update");
await screenshot("qa-lesson");

await evaluate("(() => { const button = [...document.querySelectorAll('nav button')].find((item) => item.innerText.includes('Drills')); button?.click(); })()");
await delay(200);
await evaluate("(() => { const button = [...document.querySelectorAll('.drill-option')].find((item) => item.innerText.includes('Quick drill')); button?.click(); })()");
await delay(200);
assert((await evaluate("document.querySelectorAll('.answer-options button').length")) === 4, "Drill question did not render four choices");
await evaluate("document.querySelector('.answer-options button')?.click()");
await delay(150);
assert(await evaluate("Boolean(document.querySelector('.feedback'))"), "Answer feedback did not appear");
assert(await evaluate("!document.querySelector('.question-actions .button')?.disabled"), "Next question did not enable");
await screenshot("qa-drill");

await evaluate("(() => { const buttons = [...document.querySelectorAll('nav button')].filter((item) => item.innerText.includes('Formula sheet')); buttons[buttons.length - 1]?.click(); })()");
await delay(200);
const formulaAudit = await evaluate("(() => { const input = document.querySelector('#formula-search'); const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; setter.call(input, 'unit circle'); input.dispatchEvent(new Event('input', { bubbles: true })); return { labels: [...document.querySelectorAll('label')].map((label) => label.htmlFor), formulaRows: document.querySelectorAll('.formula-row').length }; })()");
await delay(150);
const formulaRowsAfterSearch = await evaluate("document.querySelectorAll('.formula-row').length");
assert(formulaAudit.labels.includes("formula-search"), "Formula search lacks a label");
assert(formulaRowsAfterSearch >= 4, "Unit-circle formula search returned too little");

const a11y = await evaluate("(() => ({ namelessButtons: [...document.querySelectorAll('button')].filter((button) => !(button.innerText.trim() || button.getAttribute('aria-label'))).length, duplicateIds: [...document.querySelectorAll('[id]')].map((node) => node.id).filter((id, index, all) => all.indexOf(id) !== index), unlabeledInputs: [...document.querySelectorAll('input,textarea')].filter((input) => !input.labels?.length && !input.getAttribute('aria-label')).length }))()");
assert(a11y.namelessButtons === 0, "Found nameless buttons");
assert(a11y.duplicateIds.length === 0, "Found duplicate IDs");
assert(a11y.unlabeledInputs === 0, "Found unlabeled form controls");

await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await navigate("http://localhost:3000/precalc");
const mobile = await evaluate("(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, mobileHeader: getComputedStyle(document.querySelector('.mobile-header')).display, sidebarTransform: getComputedStyle(document.querySelector('.sidebar')).transform, textBlocks: [...document.querySelectorAll('.section-header p, .next-action-copy p')].map((node) => ({ clientWidth: node.clientWidth, scrollWidth: node.scrollWidth, whiteSpace: getComputedStyle(node).whiteSpace, overflow: getComputedStyle(node).overflow })) }))()");
assert(mobile.scrollWidth <= mobile.width + 1, "Mobile has horizontal overflow: " + JSON.stringify(mobile));
assert(mobile.mobileHeader !== "none", "Mobile header is hidden");
assert(mobile.textBlocks.every((block) => block.scrollWidth <= block.clientWidth + 1), "Mobile text is clipped: " + JSON.stringify(mobile.textBlocks));
await evaluate("document.querySelector('[aria-label=\"Open menu\"]')?.click()");
await delay(150);
assert(await evaluate("document.querySelector('.sidebar')?.classList.contains('is-open')"), "Mobile menu did not open");
assert(await evaluate("Boolean(document.querySelector('.drawer-scrim'))"), "Mobile menu scrim is missing");
await screenshot("qa-mobile-menu");

assert(consoleErrors.length === 0, "Console errors: " + consoleErrors.join(" | "));
assert(pageErrors.length === 0, "Page errors: " + pageErrors.join(" | "));

const report = {
  verdict: "PASS",
  desktop,
  formulaRowsAfterSearch,
  accessibility: a11y,
  mobile,
  consoleErrors,
  pageErrors,
};

await fs.writeFile("/tmp/bc-bridge-qa-report.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
socket.close();
