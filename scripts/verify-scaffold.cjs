// Orchestrator audit: verifies every content/<course>/config.ts against the
// authoritative unit lists from the scaffold spec. Exits nonzero on any drift.
const { execSync } = require('child_process');
const path = require('path');

const expected = {
  'calc-bc': {
    units: [
      'Limits and Continuity',
      'Differentiation: Definition and Fundamental Properties',
      'Differentiation: Composite, Implicit, and Inverse Functions',
      'Contextual Applications of Differentiation',
      'Analytical Applications of Differentiation',
      'Integration and Accumulation of Change',
      'Differential Equations',
      'Applications of Integration',
      'Parametric Equations, Polar Coordinates, and Vector-Valued Functions',
      'Infinite Sequences and Series',
    ],
  },
  'english-lang': {
    units: ['Rhetorical Situation', 'Claims and Evidence', 'Reasoning and Organization', 'Style'],
  },
  stats: {
    units: [
      'Exploring One-Variable Data',
      'Exploring Two-Variable Data',
      'Collecting Data',
      'Probability, Random Variables, and Probability Distributions',
      'Sampling Distributions',
      'Inference for Categorical Data: Proportions',
      'Inference for Quantitative Data: Means',
      'Inference for Categorical Data: Chi-Square',
      'Inference for Quantitative Data: Slopes',
    ],
  },
  bio: {
    units: [
      'Chemistry of Life',
      'Cell Structure and Function',
      'Cellular Energetics',
      'Cell Communication and Cell Cycle',
      'Heredity',
      'Gene Expression and Regulation',
      'Natural Selection',
      'Ecology',
    ],
  },
  'art-history': {
    units: [
      'Global Prehistory',
      'Ancient Mediterranean',
      'Early Europe and Colonial Americas',
      'Later Europe and Americas',
      'Indigenous Americas',
      'Africa',
      'West and Central Asia',
      'South, East, and Southeast Asia',
      'The Pacific',
      'Global Contemporary',
    ],
    workCounts: [11, 36, 51, 54, 14, 14, 11, 21, 11, 27],
  },
  cs2: {
    units: [
      'Java Refresher: Types & Control Flow',
      'Methods',
      'Classes & Objects',
      'Arrays & ArrayLists',
      '2D Arrays',
      'Inheritance & Polymorphism',
      'Recursion',
      'Searching & Sorting',
      'Projects',
    ],
  },
};

// Strip types so plain Node can evaluate each config file.
function loadConfig(courseId) {
  const file = path.join(__dirname, '..', 'content', courseId, 'config.ts');
  const src = require('fs')
    .readFileSync(file, 'utf8')
    .replace(/import type[^;]+;/g, '')
    .replace(/:\s*CourseContentConfig/g, '')
    .replace(/export default config;?/g, 'module.exports = config;')
    .replace(/export const/g, 'const');
  const mod = { exports: {} };
  new Function('module', 'exports', src)(mod, mod.exports);
  return mod.exports;
}

let failures = 0;
for (const [courseId, spec] of Object.entries(expected)) {
  const config = loadConfig(courseId);
  const titles = config.units.map((u) => u.title);
  const numbers = config.units.map((u) => u.number);
  const problems = [];
  if (config.courseId !== courseId) problems.push('courseId mismatch: ' + config.courseId);
  if (titles.length !== spec.units.length) problems.push('unit count ' + titles.length + ' != ' + spec.units.length);
  spec.units.forEach((title, i) => {
    if (titles[i] !== title) problems.push('unit ' + (i + 1) + ' title drift: ' + JSON.stringify(titles[i]));
    if (numbers[i] !== i + 1) problems.push('unit ' + (i + 1) + ' numbered ' + numbers[i]);
  });
  if (spec.workCounts) {
    const counts = config.units.map((u) => u.workCount);
    spec.workCounts.forEach((n, i) => {
      if (counts[i] !== n) problems.push('area ' + (i + 1) + ' workCount ' + counts[i] + ' != ' + n);
    });
    const total = counts.reduce((a, b) => a + (b || 0), 0);
    if (total !== 250) problems.push('workCount total ' + total + ' != 250');
  }
  for (const unit of config.units) {
    if (!Array.isArray(unit.lessonSlots) || unit.lessonSlots.length === 0) problems.push('unit ' + unit.number + ' has no lessonSlots');
  }
  if (!Array.isArray(config.courseWide)) problems.push('missing courseWide');
  const emDash = JSON.stringify(config).match(/[—–]/g);
  if (emDash) problems.push('em/en dash found in authored content: ' + emDash.length + ' occurrences');
  if (problems.length) {
    failures += problems.length;
    console.log('FAIL ' + courseId + ':');
    for (const p of problems) console.log('  - ' + p);
  } else {
    console.log(
      'OK   ' + courseId + ': ' + titles.length + ' units, slots per unit [' + config.units.map((u) => u.lessonSlots.length).join(',') + '], courseWide ' + config.courseWide.length,
    );
  }
}

// Ownership audit: content/ must contain exactly the 6 config files + types.ts
const files = execSync('git status --porcelain content/', { cwd: path.join(__dirname, '..') })
  .toString()
  .trim()
  .split('\n')
  .map((l) => l.slice(3));
console.log('content/ additions:', files.join(' '));

process.exit(failures ? 1 : 0);
