// AP Statistics course bundle: assembles the per-unit slices and defines
// course-wide configuration (FRQ types, scoring weights, formula sheet,
// critical-value tables, the inference-procedure chooser, exams, unit
// tests). Unit slice files are owned by their writers; THIS file is owned
// by the integrator alone.

import type { CourseBundle, CourseUnitSlice, ReferenceGroup, PracticeExam, UnitTest } from "../courseTypes";
import { assembleSlices } from "../assemble";
import { u01 } from "./units/u01";
import { u01b } from "./units/u01b";
import { u02 } from "./units/u02";
import { u02b } from "./units/u02b";
import { u03 } from "./units/u03";
import { u04 } from "./units/u04";
import { u04b } from "./units/u04b";
import { u05 } from "./units/u05";
import { u06 } from "./units/u06";
import { u06b } from "./units/u06b";
import { u07 } from "./units/u07";
import { u07b } from "./units/u07b";
import { u08 } from "./units/u08";
import { u09 } from "./units/u09";

const slices: CourseUnitSlice[] = [u01, u01b, u02, u02b, u03, u04, u04b, u05, u06, u06b, u07, u07b, u08, u09];
const assembled = assembleSlices(slices);

const chooserFlowchart = `<svg viewBox="0 0 880 460" xmlns="http://www.w3.org/2000/svg" font-family="inherit" font-size="13">
  <g fill="none" stroke="currentColor" stroke-opacity="0.55">
    <rect x="330" y="10" width="220" height="40" rx="8"/>
    <rect x="120" y="90" width="220" height="40" rx="8"/>
    <rect x="550" y="90" width="220" height="40" rx="8"/>
    <rect x="20" y="180" width="200" height="52" rx="8"/>
    <rect x="240" y="180" width="200" height="52" rx="8"/>
    <rect x="460" y="180" width="190" height="52" rx="8"/>
    <rect x="670" y="180" width="190" height="52" rx="8"/>
    <rect x="20" y="290" width="200" height="60" rx="8"/>
    <rect x="240" y="290" width="200" height="60" rx="8"/>
    <rect x="460" y="290" width="190" height="60" rx="8"/>
    <rect x="670" y="290" width="190" height="60" rx="8"/>
    <rect x="240" y="390" width="400" height="52" rx="8"/>
    <line x1="440" y1="50" x2="230" y2="90"/>
    <line x1="440" y1="50" x2="660" y2="90"/>
    <line x1="230" y1="130" x2="120" y2="180"/>
    <line x1="230" y1="130" x2="340" y2="180"/>
    <line x1="660" y1="130" x2="555" y2="180"/>
    <line x1="660" y1="130" x2="765" y2="180"/>
    <line x1="120" y1="232" x2="120" y2="290"/>
    <line x1="340" y1="232" x2="340" y2="290"/>
    <line x1="555" y1="232" x2="555" y2="290"/>
    <line x1="765" y1="232" x2="765" y2="290"/>
    <line x1="440" y1="350" x2="440" y2="390"/>
  </g>
  <g fill="currentColor" text-anchor="middle">
    <text x="440" y="35" font-weight="700">What kind of data?</text>
    <text x="230" y="115" font-weight="600">Categorical</text>
    <text x="660" y="115" font-weight="600">Quantitative</text>
    <text x="120" y="201">One or two</text>
    <text x="120" y="217">proportions</text>
    <text x="340" y="201">Counts in</text>
    <text x="340" y="217">categories / tables</text>
    <text x="555" y="201">One mean, two means,</text>
    <text x="555" y="217">or paired diffs</text>
    <text x="765" y="201">Slope of a</text>
    <text x="765" y="217">regression line</text>
    <text x="120" y="312" font-weight="600">z procedures</text>
    <text x="120" y="328">1-PropZInt / 1-PropZTest</text>
    <text x="120" y="342">2-PropZInt / 2-PropZTest</text>
    <text x="340" y="312" font-weight="600">chi-square tests</text>
    <text x="340" y="328">GOF-Test (one variable)</text>
    <text x="340" y="342">χ²-Test (two-way table)</text>
    <text x="555" y="312" font-weight="600">t procedures</text>
    <text x="555" y="328">TInterval / T-Test</text>
    <text x="555" y="342">2-SampTInt / 2-SampTTest</text>
    <text x="765" y="312" font-weight="600">t for slope</text>
    <text x="765" y="328">LinRegTInt</text>
    <text x="765" y="342">LinRegTTest</text>
    <text x="440" y="412" font-weight="600">Always: check conditions, then state - plan - do - conclude</text>
    <text x="440" y="430">Random sample or assignment · Normality/large counts · Independence (10% condition)</text>
  </g>
</svg>`;

const reference: ReferenceGroup[] = [
  {
    title: "Describing data",
    subtitle: "Units 1-2 · matches the official exam formula sheet",
    items: [
      { name: "Sample mean", latex: "\\bar{x} = \\frac{\\sum x_i}{n}" },
      { name: "Sample standard deviation", latex: "s_x = \\sqrt{\\frac{1}{n-1} \\sum (x_i - \\bar{x})^2}", note: "Divide by n-1, not n." },
      { name: "Z-score (position)", latex: "z = \\frac{x - \\mu}{\\sigma}", note: "Standard deviations from the mean." },
      { name: "Correlation", latex: "r = \\frac{1}{n-1} \\sum \\left(\\frac{x_i - \\bar{x}}{s_x}\\right)\\left(\\frac{y_i - \\bar{y}}{s_y}\\right)", note: "Unitless, between -1 and 1." },
      { name: "Least-squares regression line", latex: "\\hat{y} = a + bx, \\quad b = r \\frac{s_y}{s_x}, \\quad a = \\bar{y} - b\\bar{x}", note: "Passes through $(\\bar{x}, \\bar{y})$." },
      { name: "Residual", latex: "\\text{residual} = y - \\hat{y}", note: "Actual minus predicted." },
      { name: "Coefficient of determination", text: "$r^2$ is the fraction of variation in $y$ explained by the linear relationship with $x$." },
    ],
  },
  {
    title: "Probability and random variables",
    subtitle: "Unit 4",
    items: [
      { name: "Addition rule", latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)" },
      { name: "Conditional probability", latex: "P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}" },
      { name: "Independence", latex: "P(A \\mid B) = P(A) \\iff A, B \\text{ independent}", note: "Equivalently $P(A \\cap B) = P(A)P(B)$." },
      { name: "Mean of a discrete random variable", latex: "\\mu_X = E(X) = \\sum x_i p_i" },
      { name: "Variance of a discrete random variable", latex: "\\sigma_X^2 = \\sum (x_i - \\mu_X)^2 p_i" },
      { name: "Combining random variables", latex: "\\mu_{X \\pm Y} = \\mu_X \\pm \\mu_Y, \\quad \\sigma_{X \\pm Y}^2 = \\sigma_X^2 + \\sigma_Y^2 \\ (X, Y \\text{ indep.})", note: "Variances ADD even when subtracting." },
      { name: "Binomial distribution", latex: "P(X = x) = \\binom{n}{x} p^x (1-p)^{n-x}, \\quad \\mu = np, \\quad \\sigma = \\sqrt{np(1-p)}", note: "TI-84: binompdf / binomcdf." },
      { name: "Geometric distribution", latex: "P(X = x) = (1-p)^{x-1} p, \\quad \\mu = \\frac{1}{p}", note: "Trials until first success. TI-84: geometpdf / geometcdf." },
    ],
  },
  {
    title: "Sampling distributions and inference",
    subtitle: "Units 5-9",
    items: [
      { name: "The universal test statistic", latex: "\\text{statistic} = \\frac{\\text{estimate} - \\text{parameter}}{\\text{standard error}}", note: "Every z, t, and slope test is this template." },
      { name: "The universal confidence interval", latex: "\\text{estimate} \\pm (\\text{critical value}) \\cdot (\\text{standard error})" },
      { name: "Sampling distribution of a proportion", latex: "\\mu_{\\hat{p}} = p, \\quad \\sigma_{\\hat{p}} = \\sqrt{\\frac{p(1-p)}{n}}", note: "Large counts: $np \\ge 10$ and $n(1-p) \\ge 10$." },
      { name: "Sampling distribution of a mean", latex: "\\mu_{\\bar{x}} = \\mu, \\quad \\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}", note: "CLT: approximately normal for $n \\ge 30$ regardless of population shape." },
      { name: "One-sample t interval for a mean", latex: "\\bar{x} \\pm t^* \\frac{s}{\\sqrt{n}}, \\quad df = n - 1" },
      { name: "Two-proportion SE (test, pooled)", latex: "\\sqrt{\\hat{p}_c(1-\\hat{p}_c)\\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)}", note: "$\\hat{p}_c$ pools successes over both samples." },
      { name: "Two-sample t SE", latex: "\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}" },
      { name: "Chi-square statistic", latex: "\\chi^2 = \\sum \\frac{(\\text{observed} - \\text{expected})^2}{\\text{expected}}", note: "All expected counts at least 5." },
      { name: "Expected count in a two-way table", latex: "\\text{expected} = \\frac{(\\text{row total})(\\text{column total})}{\\text{table total}}" },
      { name: "SE of the regression slope", latex: "SE_b = \\frac{s}{s_x \\sqrt{n-1}}, \\quad s = \\sqrt{\\frac{\\sum (y_i - \\hat{y}_i)^2}{n-2}}, \\quad df = n-2" },
      { name: "Type I / Type II errors and power", text: "Type I: rejecting a true null (probability $\\alpha$). Type II: failing to reject a false null (probability $\\beta$). Power $= 1 - \\beta$ rises with larger $n$, larger $\\alpha$, and larger true effect." },
    ],
    tables: [
      {
        caption: "Common critical values z*.",
        headers: ["Confidence", "80%", "90%", "95%", "98%", "99%"],
        rows: [["$z^*$", "1.282", "1.645", "1.960", "2.326", "2.576"]],
      },
      {
        caption: "Selected critical values t* by degrees of freedom.",
        headers: ["df", "90% ($t^*$)", "95% ($t^*$)", "99% ($t^*$)"],
        rows: [
          ["1", "6.314", "12.706", "63.657"],
          ["2", "2.920", "4.303", "9.925"],
          ["3", "2.353", "3.182", "5.841"],
          ["4", "2.132", "2.776", "4.604"],
          ["5", "2.015", "2.571", "4.032"],
          ["10", "1.812", "2.228", "3.169"],
          ["15", "1.753", "2.131", "2.947"],
          ["20", "1.725", "2.086", "2.845"],
          ["25", "1.708", "2.060", "2.787"],
          ["30", "1.697", "2.042", "2.750"],
          ["40", "1.684", "2.021", "2.704"],
          ["60", "1.671", "2.000", "2.660"],
          ["large (z)", "1.645", "1.960", "2.576"],
        ],
      },
      {
        caption: "Chi-square critical values.",
        headers: ["df", "$\\alpha = 0.05$", "$\\alpha = 0.01$"],
        rows: [
          ["1", "3.841", "6.635"],
          ["2", "5.991", "9.210"],
          ["3", "7.815", "11.345"],
          ["4", "9.488", "13.277"],
          ["5", "11.070", "15.086"],
          ["6", "12.592", "16.812"],
          ["7", "14.067", "18.475"],
          ["8", "15.507", "20.090"],
          ["9", "16.919", "21.666"],
          ["10", "18.307", "23.209"],
        ],
      },
    ],
  },
  {
    title: "Choosing an inference procedure",
    subtitle: "The chooser: data type, then groups, then procedure",
    items: [
      { name: "One proportion", text: "CI: 1-PropZInt. Test: 1-PropZTest. Conditions: random, $n\\hat{p} \\ge 10$ and $n(1-\\hat{p}) \\ge 10$, 10% condition." },
      { name: "Two proportions", text: "CI: 2-PropZInt. Test: 2-PropZTest (pooled SE). Conditions per group." },
      { name: "One mean or paired differences", text: "CI: TInterval. Test: T-Test, df $= n-1$. Paired data: run the one-sample procedure on the differences." },
      { name: "Two independent means", text: "CI: 2-SampTInt. Test: 2-SampTTest. Never pool variances on the AP exam." },
      { name: "Goodness of fit (one categorical variable)", text: "χ² GOF-Test, df $=$ categories $- 1$." },
      { name: "Homogeneity or independence (two-way table)", text: "χ²-Test on the matrix, df $= (r-1)(c-1)$." },
      { name: "Slope of a regression line", text: "CI: LinRegTInt. Test: LinRegTTest, df $= n-2$." },
    ],
    figures: [
      {
        svg: chooserFlowchart,
        caption: "The inference-procedure chooser. Identify the data type, count the groups, pick the procedure, then write state - plan - do - conclude.",
      },
    ],
  },
];

const exams: PracticeExam[] = [
  {
    id: "st-exam-1",
    title: "Practice Exam 1: full AP Statistics format",
    description:
      "The official format: 40 MCQs in 90 minutes, then six free-response questions in 90 minutes (five focused questions of about 12 minutes each, and one 30-minute investigative task). A four-function, scientific, or graphing calculator is allowed throughout.",
    totalMinutes: 180,
    totalPoints: 64,
    sections: [
      {
        name: "Section I · Multiple choice",
        minutes: 90,
        kind: "mcq",
        mcq: { count: 40 },
        notes: "40 questions · 50% of exam score",
      },
      {
        name: "Section II Part A · Five focused FRQs",
        minutes: 60,
        kind: "frq",
        frqIds: ["st-frq-u1-1", "st-frq-u3-1", "st-frq-u4-1", "st-frq-u6-1", "st-frq-u7-1"],
        notes: "About 12 minutes each · 37.5% of exam score",
      },
      {
        name: "Section II Part B · Investigative task",
        minutes: 30,
        kind: "frq",
        frqIds: ["st-frq-u9-2"],
        notes: "12.5% of exam score",
      },
    ],
    scoreCurve: { score5Min: 45, score4Min: 36, score3Min: 28, score2Min: 20 },
  },
];

const unitTitles: Record<number, string> = {
  1: "Exploring One-Variable Data",
  2: "Exploring Two-Variable Data",
  3: "Collecting Data",
  4: "Probability, Random Variables, and Probability Distributions",
  5: "Sampling Distributions",
  6: "Inference for Categorical Data: Proportions",
  7: "Inference for Quantitative Data: Means",
  8: "Inference for Categorical Data: Chi-Square",
  9: "Inference for Quantitative Data: Slopes",
};

const unitTests: UnitTest[] = Array.from({ length: 9 }, (_, i) => {
  const n = i + 1;
  const investigative = n >= 6;
  return {
    unitId: n,
    title: unitTitles[n],
    description:
      "AP-format unit test: 10 MCQs with feedback held to the end, then the unit's free-response questions" +
      (investigative ? ", including its investigative-task-style FRQ, " : " ") +
      "scored with state-plan-do-conclude expectations.",
    minutes: 45,
    mcq: { count: 10 },
    frqIds: ["st-frq-u" + n + "-1", "st-frq-u" + n + "-2"],
    masteryPct: 75,
  };
});

export const statsBundle: CourseBundle = {
  id: "stats",
  name: "AP Statistics",
  shortName: "AP Stats",
  brandMark: "σ",
  tagline:
    "The full AP Statistics suite: one lesson per CED topic with TI-84 keystrokes in every procedure lesson, exam-style MCQs, state-plan-do-conclude FRQs with investigative tasks, flashcards, and a full-length practice exam.",
  examName: "the AP exam",
  unitLabel: "unit",
  units: assembled.units,
  lessons: assembled.lessons,
  flashcards: assembled.flashcards,
  mcq: assembled.mcq,
  frq: assembled.frq,
  frqTypes: [
    {
      key: "standard",
      label: "Focused free response (Q1-5 style)",
      description: "One scenario, several parts. Scored E/P/I per part; write state - plan - do - conclude for any inference part.",
      minutes: 12,
    },
    {
      key: "investigative",
      label: "Investigative task (Q6 style)",
      description: "Extends familiar methods to an unfamiliar setting. Worth 12.5% of the real exam; expect to reason beyond the recipe.",
      minutes: 30,
    },
  ],
  reference,
  referenceTitle: "Formulas & tables",
  referenceSubtitle: "The exam formula sheet, critical-value tables, and the inference-procedure chooser.",
  exams,
  unitTests,
  scoring: {
    mcqWeight: 0.5,
    frqWeight: 0.5,
    cuts: { five: 0.68, four: 0.54, three: 0.4, two: 0.28 },
    minMcq: 10,
    minFrq: 1,
    scale: { kind: "ap" },
    note: "50% MCQ / 50% FRQ · cut points are estimates",
  },
};
