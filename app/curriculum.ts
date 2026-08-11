export type BlockNumber = 1 | 2 | 3;

export type Lesson = {
  id: string;
  block: BlockNumber;
  number: string;
  title: string;
  shortTitle: string;
  minutes: number;
  payoff: string;
  objectives: string[];
  essentials: { title: string; body: string; formula?: string }[];
  example: { problem: string; steps: string[]; answer: string };
  traps: string[];
  gate: { prompt: string; answer: string }[];
};

export type PracticeQuestion = {
  id: string;
  lessonId: string;
  skill: string;
  difficulty: 1 | 2 | 3;
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export type FormulaGroup = {
  title: string;
  subtitle: string;
  items: { name: string; formula: string; use: string }[];
};

export const blockThemes: Record<BlockNumber, { title: string; focus: string; outcome: string }> = {
  1: {
    title: "The non-negotiables",
    focus: "Memorize the unit circle, exact trig values, core identities, exponent laws, and factoring patterns first, while the day is young.",
    outcome: "You can produce exact trig values, identities, exponent rules, and factorizations from memory, on demand.",
  },
  2: {
    title: "Function fluency",
    focus: "Composition, inverses, e and logarithms, trig equations, and sign analysis: the moves BC uses in every derivative problem.",
    outcome: "Function notation, logs, and equation solving no longer consume working memory.",
  },
  3: {
    title: "The bridge to calculus",
    focus: "Transformations, asymptotic behavior, the difference quotient, and limit-ready algebra, then a final closed-note gate.",
    outcome: "You can walk into a limits lesson and only the calculus is new.",
  },
};

export const lessons: Lesson[] = [
  {
    id: "unit-circle",
    block: 1,
    number: "1.1",
    title: "Radians and the unit circle",
    shortTitle: "Unit circle",
    minutes: 105,
    payoff: "Trig derivatives, integrals, and limits assume radians and exact unit-circle values from day one.",
    objectives: ["Convert degrees and radians.", "Generate exact sin, cos, and tan values in every quadrant.", "Use reference angles and signs without a chart."],
    essentials: [
      {
        title: "Radians measure arc length",
        body: "θ radians equals arc length divided by radius. A full revolution is 2π, so multiply degrees by π/180 and radians by 180/π. Calculus trig rules work in radians.",
        formula: "θ = s/r; 180° = π radians",
      },
      {
        title: "Coordinates are cosine and sine",
        body: "On the unit circle, the point at angle θ is (cos θ, sin θ); tan θ = sin θ/cos θ when cos θ ≠ 0. Memorize first-quadrant values for 0, π/6, π/4, π/3, π/2, then use symmetry.",
        formula: "(x, y) = (cos θ, sin θ)",
      },
      {
        title: "Reference angle + quadrant sign",
        body: "Reduce the angle modulo 2π, find its acute reference angle, then attach signs from the quadrant: I all positive; II sine; III tangent; IV cosine.",
        formula: "sin: + in I,II; cos: + in I,IV; tan: + in I,III",
      },
    ],
    example: {
      problem: "Find exact sin(5π/6), cos(5π/6), and tan(5π/6).",
      steps: ["5π/6 is in quadrant II with reference angle π/6.", "At π/6, |sin| = 1/2 and |cos| = √3/2.", "In quadrant II sine is positive and cosine/tangent are negative."],
      answer: "sin = 1/2, cos = −√3/2, tan = −√3/3",
    },
    traps: ["Using degrees inside calculus formulas or calculator settings.", "Memorizing a giant chart instead of reconstructing values from reference angles and signs."],
    gate: [
      { prompt: "Convert 225° to radians.", answer: "5π/4" },
      { prompt: "Find cos(7π/6).", answer: "−√3/2" },
    ],
  },
  {
    id: "trig-graphs",
    block: 1,
    number: "1.2",
    title: "Trig functions, graphs, and inverse trig",
    shortTitle: "Trig graphs",
    minutes: 45,
    payoff: "BC requires domains, ranges, periodic behavior, and inverse trig outputs for derivatives and integrals.",
    objectives: ["Sketch six trig functions from core features.", "Read amplitude, period, and phase shift.", "Use principal ranges of inverse trig."],
    essentials: [
      {
        title: "Sine and cosine are periodic coordinates",
        body: "Both have domain all real numbers, range [−1,1], and period 2π. tan = sin/cos has period π and vertical asymptotes where cos = 0.",
        formula: "period sin/cos = 2π; period tan = π",
      },
      {
        title: "Transform with parameters",
        body: "For A sin(B(x − C)) + D, amplitude is |A|, period is 2π/|B|, phase shift is C, and midline is y = D. For tangent, period is π/|B|.",
        formula: "A sin(B(x − C)) + D",
      },
      {
        title: "Inverse trig returns one principal angle",
        body: "arcsin outputs [−π/2, π/2], arccos outputs [0, π], and arctan outputs (−π/2, π/2). These restrictions make the inverse a function.",
        formula: "sin⁻¹: [−1,1] → [−π/2,π/2]",
      },
    ],
    example: {
      problem: "For y = −3 cos(2(x − π/4)) + 1, give amplitude, period, phase shift, and midline.",
      steps: ["Amplitude = |−3| = 3; the negative reflects the graph.", "Period = 2π/2 = π.", "Phase shift = π/4 right; midline y = 1."],
      answer: "Amplitude 3, period π, right π/4, midline y = 1",
    },
    traps: ["Treating sin⁻¹x as 1/sin x; the reciprocal is csc x.", "Returning an inverse-trig angle outside its principal range."],
    gate: [
      { prompt: "What is the period of tan(3x)?", answer: "π/3" },
      { prompt: "Evaluate arcsin(sin(2π/3)).", answer: "π/3" },
    ],
  },
  {
    id: "trig-identities",
    block: 1,
    number: "1.3",
    title: "Essential trig identities",
    shortTitle: "Trig identities",
    minutes: 60,
    payoff: "Derivatives, integrals, and limits regularly require equivalent trig forms.",
    objectives: ["Use reciprocal, quotient, and Pythagorean identities.", "Use sum/difference identities for exact values.", "Use double-angle forms when they simplify work."],
    essentials: [
      {
        title: "The three identity families",
        body: "Know reciprocal identities, tan = sin/cos, and the three Pythagorean identities. Derive the last two by dividing sin²x + cos²x = 1 instead of treating them as unrelated facts.",
        formula: "sin²x + cos²x = 1; 1 + tan²x = sec²x; 1 + cot²x = csc²x",
      },
      {
        title: "Sum and difference",
        body: "The sign stays the same in the sine identity and switches in the cosine identity. These create exact values such as 15° and 75° and explain angle combinations.",
        formula: "sin(a±b)=sin a cos b±cos a sin b; cos(a±b)=cos a cos b∓sin a sin b",
      },
      {
        title: "Double-angle identities",
        body: "The most useful are sin(2x)=2sin x cos x and cos(2x)=cos²x−sin²x, with equivalent cosine forms obtained from the Pythagorean identity.",
        formula: "cos(2x)=2cos²x−1=1−2sin²x",
      },
    ],
    example: {
      problem: "Simplify (1 − cos²x)/(sin x), where defined.",
      steps: ["Use 1 − cos²x = sin²x.", "Then sin²x/sin x = sin x.", "The original expression requires sin x ≠ 0 even though the simplified formula is defined there."],
      answer: "sin x, on the original domain sin x ≠ 0",
    },
    traps: ["Canceling across a sum before factoring or applying an identity.", "Proving an identity by manipulating both sides and accidentally assuming the desired result."],
    gate: [
      { prompt: "Rewrite sec²x − 1.", answer: "tan²x" },
      { prompt: "Find sin(15°) exactly.", answer: "(√6 − √2)/4" },
    ],
  },
  {
    id: "powers-radicals",
    block: 1,
    number: "1.4",
    title: "Fractions, exponents, and radicals",
    shortTitle: "Powers & radicals",
    minutes: 60,
    payoff: "Power, chain, and integration rules constantly create negative and fractional exponents.",
    objectives: ["Use every exponent law in both directions.", "Move between radicals and rational exponents.", "Rationalize and simplify without changing domain."],
    essentials: [
      {
        title: "Same base: add or subtract exponents",
        body: "Multiplication adds exponents; division subtracts them. A power raised to a power multiplies exponents. These rules require the same base.",
        formula: "xᵃxᵇ = xᵃ⁺ᵇ; xᵃ/xᵇ = xᵃ⁻ᵇ; (xᵃ)ᵇ = xᵃᵇ",
      },
      {
        title: "Negative and zero exponents",
        body: "A negative exponent means reciprocal, not a negative value. Any nonzero base to the zero power is 1.",
        formula: "x⁻ⁿ = 1/xⁿ; x⁰ = 1",
      },
      {
        title: "Rational exponents are roots",
        body: "The denominator is the root and the numerator is the power. For even roots over the reals, the radicand must be nonnegative.",
        formula: "xᵐ⁄ⁿ = ⁿ√(xᵐ)",
      },
    ],
    example: {
      problem: "Rewrite and simplify (x³√x)/(x⁻²), for x > 0.",
      steps: ["√x = x¹⁄², so the numerator is x³x¹⁄² = x⁷⁄².", "Dividing by x⁻² subtracts −2: x⁷⁄²⁻⁽⁻²⁾ = x¹¹⁄².", "Equivalent radical form is x⁵√x."],
      answer: "x¹¹⁄² = x⁵√x",
    },
    traps: [
      "Distributing an exponent over a sum: (a + b)² is not a² + b².",
      "Writing √(x²) = x for every real x; the correct value is |x|.",
      "Adding fractions without a common denominator, or clearing only one denominator instead of multiplying every term by the LCD.",
    ],
    gate: [
      { prompt: "Simplify x⁵/x⁻³.", answer: "x⁸, for x ≠ 0" },
      { prompt: "Rewrite x⁻³⁄² without a negative exponent.", answer: "1/(x√x), for x > 0" },
    ],
  },
  {
    id: "polynomial-algebra",
    block: 1,
    number: "1.5",
    title: "Factoring and polynomial algebra",
    shortTitle: "Factor & divide",
    minutes: 60,
    payoff: "Factoring is the main algebra move behind limits, partial fractions, sign analysis, and roots.",
    objectives: ["Factor common patterns quickly.", "Find zeros and multiplicity.", "Divide polynomials and match coefficients."],
    essentials: [
      {
        title: "Always take the GCF first",
        body: "Then look for a difference of squares, a trinomial, grouping, or a sum/difference of cubes. A complete factorization exposes zeros and cancellations.",
        formula: "a² − b² = (a − b)(a + b)",
      },
      {
        title: "Zeros come from factors",
        body: "If a product is zero, at least one factor is zero. A factor (x − r) repeated m times gives root r with multiplicity m; even multiplicity touches the axis, odd multiplicity crosses.",
        formula: "(x − r)ᵐ = 0 ⇒ x = r",
      },
      {
        title: "Division has a remainder",
        body: "Polynomial long or synthetic division writes a polynomial as divisor × quotient + remainder. The Remainder Theorem says division by x − c leaves P(c).",
        formula: "P(x) = (x − c)Q(x) + P(c)",
      },
    ],
    example: {
      problem: "Factor x³ − 4x² − x + 4 and list its zeros.",
      steps: ["Group: x²(x − 4) − 1(x − 4).", "Factor the common binomial: (x² − 1)(x − 4).", "Use difference of squares: (x − 1)(x + 1)(x − 4)."],
      answer: "Zeros: −1, 1, 4",
    },
    traps: [
      "Stopping at x² − 1 instead of factoring completely.",
      "Canceling a factor and forgetting that the original expression was still undefined where that factor was zero.",
      "Restrictions travel with the work: record x-values that make a denominator zero before simplifying.",
    ],
    gate: [
      { prompt: "Factor 2x² − 5x − 3.", answer: "(2x + 1)(x − 3)" },
      { prompt: "What is the remainder when P(x) is divided by x − 2?", answer: "P(2)" },
    ],
  },
  {
    id: "functions",
    block: 2,
    number: "2.1",
    title: "Functions, domains, composition, and inverses",
    shortTitle: "Function fluency",
    minutes: 60,
    payoff: "Calculus is the study of functions; notation must become automatic before limits begin.",
    objectives: ["Evaluate and interpret function notation.", "Find domains and compose functions.", "Build and verify inverse functions."],
    essentials: [
      {
        title: "Input, rule, output",
        body: "f(x) names the output produced from input x; it is not f times x. A function assigns one output to each allowed input. Domain restrictions come from denominators, even roots, and logs.",
        formula: "f(a + h) means substitute (a + h) for every x",
      },
      {
        title: "Composition is ordered substitution",
        body: "(f ∘ g)(x) = f(g(x)): evaluate the inside function first. The input must belong to g's domain and g(x) must land in f's domain.",
        formula: "(f ∘ g)(x) = f(g(x))",
      },
      {
        title: "An inverse undoes a one-to-one function",
        body: "Swap x and y, solve for y, and verify both compositions give x. A function needs a restricted domain when it fails the horizontal-line test.",
        formula: "f(f⁻¹(x)) = x and f⁻¹(f(x)) = x",
      },
    ],
    example: {
      problem: "Let f(x) = 2x − 3 and g(x) = x². Find (g ∘ f)(x) and f⁻¹(x).",
      steps: ["g(f(x)) = g(2x − 3) = (2x − 3)².", "For the inverse, write y = 2x − 3, swap: x = 2y − 3.", "Solve: y = (x + 3)/2."],
      answer: "(g ∘ f)(x) = (2x − 3)²; f⁻¹(x) = (x + 3)/2",
    },
    traps: ["Confusing f⁻¹(x) with 1/f(x).", "Finding only the denominator restriction and missing a square-root or log restriction inside a composition."],
    gate: [
      { prompt: "If f(x) = x² + 1, find [f(x + h) − f(x)]/h for h ≠ 0.", answer: "2x + h" },
      { prompt: "Find the real domain of √(5 − x)/(x + 1).", answer: "(−∞, −1) ∪ (−1, 5]" },
    ],
  },
  {
    id: "exp-logs",
    block: 2,
    number: "2.2",
    title: "Exponentials, logarithms, and e",
    shortTitle: "Exponentials & logs",
    minutes: 60,
    payoff: "eˣ, ln x, growth/decay, differential equations, and improper integrals are central BC objects.",
    objectives: ["Move between exponential and logarithmic form.", "Apply log laws with domain awareness.", "Solve exponential/log equations and interpret e-based models."],
    essentials: [
      {
        title: "Logs are inverse exponents",
        body: "log_b x asks what exponent on b produces x. The base must be positive and not 1; the log argument must be positive. ln means base e.",
        formula: "log_b x = y ⇔ bʸ = x",
      },
      {
        title: "Products become sums",
        body: "Logs turn multiplication into addition, division into subtraction, and powers into coefficients. There is no corresponding rule for log(a + b).",
        formula: "ln(ab)=ln a+ln b; ln(a/b)=ln a−ln b; ln(aʳ)=r ln a",
      },
      {
        title: "e models continuous change",
        body: "Exponential models have form A=A₀eᵏᵗ. Positive k grows and negative k decays. Doubling and half-life come from solving with logarithms.",
        formula: "A(t)=A₀eᵏᵗ; t_double = ln 2/k",
      },
    ],
    example: {
      problem: "Solve 3e²ˣ = 12.",
      steps: ["Divide by 3: e²ˣ = 4.", "Take ln: ln(e²ˣ) = ln 4, so 2x = ln 4.", "x = (ln 4)/2 = ln 2."],
      answer: "x = ln 2",
    },
    traps: ["Writing ln(a + b) = ln a + ln b.", "Accepting a solution that makes any original logarithm's argument zero or negative."],
    gate: [
      { prompt: "Expand ln(x³/√(x−1)), assuming x > 1.", answer: "3 ln x − (1/2)ln(x − 1)" },
      { prompt: "Solve ln(x − 2) = 0.", answer: "x = 3" },
    ],
  },
  {
    id: "trig-equations",
    block: 2,
    number: "2.3",
    title: "Trig equations and inverse-trig composition",
    shortTitle: "Trig equations",
    minutes: 45,
    payoff: "You will solve trig critical-point equations and simplify inverse-trig expressions throughout BC.",
    objectives: ["Solve trig equations on an interval.", "Write general periodic solutions.", "Simplify inverse-trig compositions with triangle/domain reasoning."],
    essentials: [
      {
        title: "Isolate, reference, sweep",
        body: "Isolate one trig function, find the reference angle, select quadrants with the correct sign, and list only solutions in the requested interval. Add full periods for general solutions.",
        formula: "sin x = a ⇒ reference angle + valid quadrants",
      },
      {
        title: "Factor trig equations like algebra",
        body: "Move all terms to one side and factor. After using the zero-product rule, solve each trig factor separately. Identities often convert an equation into a quadratic form.",
      },
      {
        title: "Composition depends on range",
        body: "sin(arcsin x)=x on [−1,1], but arcsin(sin θ) equals θ only when θ is in arcsin's principal range. For expressions like cos(arctan x), draw a right triangle.",
        formula: "cos(arctan x) = 1/√(1+x²)",
      },
    ],
    example: {
      problem: "Solve 2sin²x − sin x = 0 on [0, 2π).",
      steps: ["Factor: sin x(2sin x − 1) = 0.", "sin x = 0 gives x = 0, π (2π is excluded).", "sin x = 1/2 gives x = π/6, 5π/6."],
      answer: "x = 0, π/6, 5π/6, π",
    },
    traps: ["Giving only the calculator's principal inverse value and missing another quadrant.", "Including an endpoint outside a half-open interval such as [0, 2π)."],
    gate: [
      { prompt: "Solve cos x = −1/2 on [0, 2π).", answer: "x = 2π/3, 4π/3" },
      { prompt: "Simplify tan(arctan x).", answer: "x for all real x" },
    ],
  },
  {
    id: "solve-analyze",
    block: 2,
    number: "2.4",
    title: "Equations, inequalities, and absolute value",
    shortTitle: "Solve & analyze",
    minutes: 45,
    payoff: "Calculus answers often end with solving an equation or testing where an expression is positive.",
    objectives: ["Solve quadratic and rational equations.", "Use sign charts for inequalities.", "Handle absolute value as distance and reject extraneous roots."],
    essentials: [
      {
        title: "Use structure before a formula",
        body: "Move everything to one side, factor if possible, then use the zero-product rule. Use the quadratic formula only when factoring is not efficient.",
        formula: "x = (−b ± √(b² − 4ac))/(2a)",
      },
      {
        title: "Inequalities need interval testing",
        body: "Critical values come from zeros and undefined points. Place them on a number line, test each interval, and include endpoints only when allowed.",
        formula: "sign changes can occur only at zeros or undefined points",
      },
      {
        title: "Absolute value is distance",
        body: "|u| = a gives u = ±a for a ≥ 0. |u| < a means between; |u| > a means outside. Squaring or clearing denominators can create candidates that must be checked.",
        formula: "|x − c| < r ⇒ c − r < x < c + r",
      },
    ],
    example: {
      problem: "Solve (x − 1)/(x + 2) ≥ 0.",
      steps: ["Critical values: x = 1 makes the numerator zero; x = −2 is forbidden.", "Test intervals (−∞, −2), (−2, 1), and (1, ∞): signs are +, −, +.", "Include x = 1 because equality is allowed; exclude x = −2."],
      answer: "(−∞, −2) ∪ [1, ∞)",
    },
    traps: ["Multiplying an inequality by an expression of unknown sign without tracking whether the sign flips.", "Keeping a denominator-zero value or an extraneous squared root."],
    gate: [
      { prompt: "Solve x² − 5x + 6 = 0.", answer: "x = 2 or x = 3" },
      { prompt: "Solve |2x − 1| < 5.", answer: "−2 < x < 3" },
    ],
  },
  {
    id: "graphs",
    block: 3,
    number: "3.1",
    title: "Graphs, transformations, and piecewise rules",
    shortTitle: "Read graphs",
    minutes: 45,
    payoff: "BC constantly asks you to infer sign, rate, extrema, continuity, and accumulated change from graphs.",
    objectives: ["Read intercepts, intervals, and end behavior.", "Apply graph transformations in the correct direction.", "Evaluate and analyze piecewise functions."],
    essentials: [
      {
        title: "Read behavior as intervals",
        body: "State where a graph is positive/negative and increasing/decreasing using x-intervals. Intercepts are points; zeros are their x-values. End behavior describes what happens as x → ±∞.",
        formula: "x-intercept: f(x) = 0; y-intercept: f(0)",
      },
      {
        title: "Inside changes run backward",
        body: "In y = a f(b(x − h)) + k, h shifts right, k shifts up, a scales vertically (and reflects if negative), while b scales horizontally by 1/|b|.",
        formula: "a f(b(x − h)) + k",
      },
      {
        title: "Piecewise means choose first",
        body: "Before substituting, determine which condition contains the input. Endpoint dots show inclusion. At a boundary, compare the left behavior, right behavior, and actual function value.",
        formula: "closed dot = included; open dot = excluded",
      },
    ],
    example: {
      problem: "Describe y = −2f(3(x − 4)) + 1 from y = f(x).",
      steps: ["Compress horizontally by a factor of 1/3: f(x) becomes f(3x).", "Shift right 4: f(3x) becomes f(3(x − 4)).", "Reflect across the x-axis and stretch vertically by 2; then shift up 1."],
      answer: "Right 4, horizontal compression 1/3, reflect/stretch vertically by 2, up 1",
    },
    traps: ["Saying 3 inside causes a horizontal stretch by 3; it causes a compression by 1/3.", "Plugging a boundary into the wrong branch of a piecewise definition."],
    gate: [
      { prompt: "What transformation takes f(x) to f(x + 5) − 2?", answer: "Left 5 and down 2" },
      { prompt: "If a graph is below the x-axis on (1, 4), what is the sign of f there?", answer: "f(x) < 0" },
    ],
  },
  {
    id: "rational-functions",
    block: 3,
    number: "3.2",
    title: "Rational functions and asymptotic behavior",
    shortTitle: "Rational behavior",
    minutes: 45,
    payoff: "Limits, continuity, improper integrals, and partial fractions require fast recognition of holes and asymptotes.",
    objectives: ["Distinguish holes from vertical asymptotes.", "Find horizontal/slant asymptotes from degree.", "Analyze signs and end behavior."],
    essentials: [
      {
        title: "Factor before classifying",
        body: "A factor that cancels creates a removable hole at the forbidden x-value. An uncanceled denominator zero creates a vertical asymptote, subject to real-domain analysis.",
        formula: "canceled denominator factor → hole; uncanceled → vertical asymptote",
      },
      {
        title: "Degree controls end behavior",
        body: "For numerator degree less than denominator, y=0 is horizontal. Equal degrees give the ratio of leading coefficients. Numerator degree exactly one higher gives a slant asymptote from division.",
      },
      {
        title: "Asymptotes describe approach, not a wall",
        body: "A graph may cross a horizontal or slant asymptote. Near a vertical asymptote, determine +∞ or −∞ from one-sided signs rather than guessing from a sketch.",
      },
    ],
    example: {
      problem: "Analyze f(x) = (x² − 1)/(x² − x − 2).",
      steps: ["Factor: (x−1)(x+1)/[(x−2)(x+1)].", "x = −1 is a hole; simplified value there would be (−2)/(−3)=2/3.", "x = 2 is a vertical asymptote. Equal degrees give horizontal asymptote y=1."],
      answer: "Hole (−1, 2/3); vertical asymptote x=2; horizontal asymptote y=1",
    },
    traps: ["Calling every denominator zero a vertical asymptote before canceling common factors.", "Believing a graph can never cross a horizontal asymptote."],
    gate: [
      { prompt: "Find the horizontal asymptote of (3x²+1)/(2x²−5).", answer: "y = 3/2" },
      { prompt: "What does a canceled factor x − 4 create?", answer: "A hole at x = 4, while x = 4 remains excluded" },
    ],
  },
  {
    id: "rates-difference",
    block: 3,
    number: "3.3",
    title: "Lines, average rate, and the difference quotient",
    shortTitle: "Rates & slopes",
    minutes: 60,
    payoff: "The derivative begins as slopes of secant lines approaching a tangent line.",
    objectives: ["Compute and interpret average rate of change.", "Write secant and tangent-style line equations.", "Simplify difference quotients without substituting h=0."],
    essentials: [
      {
        title: "Slope is output change per input change",
        body: "Average rate of change from a to b is the slope of the secant line through (a,f(a)) and (b,f(b)). Track units: output units per input unit.",
        formula: "[f(b) − f(a)]/(b − a)",
      },
      {
        title: "Point-slope form is the workhorse",
        body: "Once you know slope m at a point (x₁,y₁), use y − y₁ = m(x − x₁). Parallel slopes match; perpendicular nonvertical slopes are negative reciprocals.",
        formula: "y − y₁ = m(x − x₁)",
      },
      {
        title: "The difference quotient must simplify first",
        body: "Expand or rationalize f(x+h)−f(x), factor out h, and cancel only for h≠0. Calculus then asks what the simplified expression approaches as h→0.",
        formula: "[f(x+h) − f(x)]/h",
      },
    ],
    example: {
      problem: "Simplify the difference quotient for f(x)=x²−3x.",
      steps: ["f(x+h)=(x+h)²−3(x+h)=x²+2xh+h²−3x−3h.", "Subtract f(x)=x²−3x: the numerator becomes 2xh+h²−3h.", "Factor and cancel h: h(2x+h−3)/h = 2x+h−3 for h≠0."],
      answer: "2x + h − 3",
    },
    traps: ["Replacing h by 0 before canceling the common h.", "Reversing the order in only one of the two differences in a slope."],
    gate: [
      { prompt: "Average rate of f(x)=x² from x=1 to x=4?", answer: "5" },
      { prompt: "Line through (2,5) with slope −3?", answer: "y − 5 = −3(x − 2), or y = −3x + 11" },
    ],
  },
  {
    id: "limit-ready",
    block: 3,
    number: "3.4",
    title: "Limit-ready algebra and continuity language",
    shortTitle: "Limit-ready algebra",
    minutes: 60,
    payoff: "The first weeks of calculus demand factoring, rationalizing, one-sided behavior, and continuity notation immediately.",
    objectives: ["Simplify indeterminate-looking expressions algebraically.", "Describe one-sided behavior from graphs and formulas.", "Recognize the three requirements for continuity at a point."],
    essentials: [
      {
        title: "0/0 is a signal to rewrite",
        body: "When direct substitution produces 0/0, factor and cancel a common factor, combine fractions, or rationalize with a conjugate. The rewritten expression agrees away from the hole and reveals nearby behavior.",
        formula: "(x²−a²)/(x−a)=x+a for x≠a",
      },
      {
        title: "Left and right must agree",
        body: "x→a⁻ means approach from values less than a; x→a⁺ means from greater values. A two-sided limit can exist only when the one-sided limits are equal.",
        formula: "lim x→a exists ⇔ left limit = right limit",
      },
      {
        title: "Continuity is a three-part check",
        body: "At x=a, f(a) must exist, the limit as x→a must exist, and that limit must equal f(a). Holes, jumps, and vertical asymptotes violate different parts of this test.",
        formula: "continuous at a: f(a) exists, lim f exists, lim f=f(a)",
      },
    ],
    example: {
      problem: "Simplify (√(x+9)−3)/x for x≠0 and predict its nearby value as x approaches 0.",
      steps: ["Multiply by the conjugate: [(√(x+9)−3)(√(x+9)+3)]/[x(√(x+9)+3)].", "The numerator is x+9−9=x; cancel x for x≠0.", "The expression becomes 1/(√(x+9)+3), which approaches 1/6 near x=0."],
      answer: "1/(√(x+9)+3), approaching 1/6",
    },
    traps: ["Calling 0/0 the limit value; it is an indeterminate form that requests more work.", "Assuming a two-sided limit exists when left and right behavior differ."],
    gate: [
      { prompt: "Simplify (x²−25)/(x−5), x≠5.", answer: "x+5" },
      { prompt: "Name the continuity test at x=a.", answer: "f(a) exists; lim x→a f(x) exists; they are equal" },
    ],
  },
  {
    id: "final-gate",
    block: 3,
    number: "3.5",
    title: "Final BC-readiness gate and repair",
    shortTitle: "Final gate",
    minutes: 60,
    payoff: "Turn the diagnostic into a short repair list rather than entering BC with hidden prerequisite gaps.",
    objectives: ["Complete a mixed cumulative set without notes.", "Classify and repair every miss.", "Leave with a compact first-week reference list."],
    essentials: [
      {
        title: "Pass criteria",
        body: "Target at least 85% overall, at least 80% in each of Algebra/Functions, Trig/Exp-Log, and BC Bridge, plus correct unit-circle exact values. A lower section score tells you exactly where to spend the remaining time.",
        formula: "overall ≥85%; every strand ≥80%",
      },
      {
        title: "Repair beats rereading",
        body: "For every miss: hide the solution, identify the first wrong line, restate the relevant rule, redo the problem, then solve a parallel question. Reading an explanation is not yet retrieval.",
      },
      {
        title: "Carry only the essentials",
        body: "Before bed, reproduce the unit-circle values, core identities, log laws, the difference quotient, and the continuity test from memory. Use the formula sheet only to check afterward.",
      },
    ],
    example: {
      problem: "A final-gate score is 88% overall, but trig is 70%. Is the gate passed?",
      steps: ["The overall threshold is met.", "The strand threshold is not: every strand must be at least 80%.", "Repair trig misses, then take a fresh trig-only set."],
      answer: "Not yet; repair and retest the trig strand",
    },
    traps: ["Using the same memorized questions as a retest.", "Trading sleep for low-quality rereading after the repair list is already clear."],
    gate: [
      { prompt: "What are the final pass thresholds?", answer: "≥85% overall and ≥80% in every strand" },
      { prompt: "What proves a miss is repaired?", answer: "A correct blank-page redo plus a fresh parallel problem" },
    ],
  },
];

export const practiceQuestions: PracticeQuestion[] = [
  { id: "q1", lessonId: "solve-analyze", skill: "Algebra", difficulty: 1, prompt: "Solve 3(2x − 5) = 4x + 7.", choices: ["x = 8", "x = 11", "x = 4", "x = −11"], answer: 1, explanation: "6x−15=4x+7, so 2x=22 and x=11." },
  { id: "q2", lessonId: "polynomial-algebra", skill: "Algebra", difficulty: 2, prompt: "Which values must be excluded from (x−1)/(x²−5x+6)?", choices: ["1 only", "2 only", "2 and 3", "−2 and −3"], answer: 2, explanation: "x²−5x+6=(x−2)(x−3), so x cannot be 2 or 3." },
  { id: "q3", lessonId: "powers-radicals", skill: "Algebra", difficulty: 1, prompt: "Simplify (x³)²/x⁻¹.", choices: ["x⁵", "x⁶", "x⁷", "1/x⁷"], answer: 2, explanation: "(x³)²=x⁶, and x⁶/x⁻¹=x⁶⁻⁽⁻¹⁾=x⁷." },
  { id: "q4", lessonId: "powers-radicals", skill: "Algebra", difficulty: 2, prompt: "For real x, √(x²) equals:", choices: ["x", "−x", "|x|", "x²"], answer: 2, explanation: "The principal square root is nonnegative, so √(x²)=|x|." },
  { id: "q5", lessonId: "polynomial-algebra", skill: "Algebra", difficulty: 1, prompt: "Factor x²−9x+20.", choices: ["(x−10)(x+2)", "(x−5)(x−4)", "(x+5)(x+4)", "(x−20)(x+1)"], answer: 1, explanation: "−5 and −4 multiply to 20 and add to −9." },
  { id: "q6", lessonId: "polynomial-algebra", skill: "Algebra", difficulty: 3, prompt: "If P(x)=x³−2x+5, what is the remainder after division by x−2?", choices: ["5", "7", "9", "13"], answer: 2, explanation: "By the Remainder Theorem, compute P(2)=8−4+5=9." },
  { id: "q7", lessonId: "solve-analyze", skill: "Algebra", difficulty: 2, prompt: "Solve (x−2)(x+1)≤0.", choices: ["x≤−1 or x≥2", "−1≤x≤2", "x<−1", "x>2"], answer: 1, explanation: "The upward-opening product is nonpositive between its zeros, including both endpoints." },
  { id: "q8", lessonId: "solve-analyze", skill: "Algebra", difficulty: 2, prompt: "Solve |x+3|>5.", choices: ["−8<x<2", "x<−8 or x>2", "x>8", "x<2"], answer: 1, explanation: "Distance from −3 exceeds 5, so x<−8 or x>2." },
  { id: "q9", lessonId: "functions", skill: "Functions", difficulty: 1, prompt: "If f(x)=x²−1, what is f(3+h)?", choices: ["8+h²", "9+h²−1", "h²+6h+8", "h²+3h−1"], answer: 2, explanation: "(3+h)²−1=9+6h+h²−1=h²+6h+8." },
  { id: "q10", lessonId: "functions", skill: "Functions", difficulty: 2, prompt: "If f(x)=3x+2, then f⁻¹(x) is:", choices: ["1/(3x+2)", "(x−2)/3", "3x−2", "(x+2)/3"], answer: 1, explanation: "Swap x and y in y=3x+2 and solve: y=(x−2)/3." },
  { id: "q11", lessonId: "functions", skill: "Functions", difficulty: 3, prompt: "What is the domain of ln(4−x²)?", choices: ["All real x", "x<2", "−2<x<2", "x≤−2 or x≥2"], answer: 2, explanation: "A log argument must be positive: 4−x²>0, so −2<x<2." },
  { id: "q12", lessonId: "graphs", skill: "Functions", difficulty: 1, prompt: "The graph of f(2x) is horizontally:", choices: ["stretched by 2", "compressed by 1/2", "shifted right 2", "reflected"], answer: 1, explanation: "Inside scaling runs inversely: f(2x) compresses horizontal distances by 1/2." },
  { id: "q13", lessonId: "graphs", skill: "Functions", difficulty: 2, prompt: "If f is below the x-axis and decreasing on (1,4), which is true?", choices: ["f>0 and slope>0", "f<0 and outputs fall as x grows", "f<0 and outputs rise", "f=0"], answer: 1, explanation: "Below the axis means negative outputs; decreasing means outputs become smaller as x increases." },
  { id: "q14", lessonId: "unit-circle", skill: "Trig", difficulty: 1, prompt: "Convert 300° to radians.", choices: ["3π/5", "5π/3", "5π/6", "2π/3"], answer: 1, explanation: "300·π/180=5π/3." },
  { id: "q15", lessonId: "unit-circle", skill: "Trig", difficulty: 1, prompt: "What is sin(7π/4)?", choices: ["√2/2", "−√2/2", "1/2", "−1/2"], answer: 1, explanation: "Reference angle π/4 in quadrant IV; sine is negative." },
  { id: "q16", lessonId: "unit-circle", skill: "Trig", difficulty: 2, prompt: "What is tan(2π/3)?", choices: ["√3", "−√3", "√3/3", "−√3/3"], answer: 1, explanation: "Reference angle π/3 in quadrant II; tangent is negative, so −√3." },
  { id: "q17", lessonId: "trig-graphs", skill: "Trig", difficulty: 2, prompt: "What is the period of y=sin(4x)?", choices: ["4π", "2π", "π/2", "π/4"], answer: 2, explanation: "Period=2π/|4|=π/2." },
  { id: "q18", lessonId: "trig-graphs", skill: "Trig", difficulty: 3, prompt: "Evaluate arccos(cos(5π/3)).", choices: ["5π/3", "π/3", "−π/3", "2π/3"], answer: 1, explanation: "arccos returns a value in [0,π]; cos(5π/3)=1/2, so the output is π/3." },
  { id: "q19", lessonId: "trig-identities", skill: "Trig", difficulty: 1, prompt: "Which equals 1−sin²x?", choices: ["tan²x", "cos²x", "sec²x", "cot²x"], answer: 1, explanation: "sin²x+cos²x=1." },
  { id: "q20", lessonId: "trig-identities", skill: "Trig", difficulty: 2, prompt: "Simplify tan x·cos x, where defined.", choices: ["1", "sin x", "cos x", "sec x"], answer: 1, explanation: "tan x=sin x/cos x, so the cosines cancel on the original domain." },
  { id: "q21", lessonId: "trig-equations", skill: "Trig", difficulty: 2, prompt: "Solve sin x=−1/2 on [0,2π).", choices: ["π/6,5π/6", "7π/6,11π/6", "2π/3,4π/3", "3π/2 only"], answer: 1, explanation: "Reference angle π/6; sine is negative in quadrants III and IV." },
  { id: "q22", lessonId: "exp-logs", skill: "Exp / Log", difficulty: 1, prompt: "Which exponential statement equals log₂8=3?", choices: ["8²=3", "2³=8", "3²=8", "8³=2"], answer: 1, explanation: "log_b x=y means bʸ=x." },
  { id: "q23", lessonId: "exp-logs", skill: "Exp / Log", difficulty: 2, prompt: "Solve eˣ=7.", choices: ["x=e⁷", "x=7/e", "x=ln 7", "x=log₇e"], answer: 2, explanation: "Apply natural log to both sides: x=ln 7." },
  { id: "q24", lessonId: "exp-logs", skill: "Exp / Log", difficulty: 3, prompt: "What is the real domain of ln(x−1)+ln(5−x)?", choices: ["x>1", "x<5", "1<x<5", "x<1 or x>5"], answer: 2, explanation: "Both arguments must be positive: x>1 and x<5." },
  { id: "q25", lessonId: "rational-functions", skill: "Functions", difficulty: 2, prompt: "For (x²−4)/(x−2), what occurs at x=2?", choices: ["Vertical asymptote", "Hole", "Horizontal asymptote", "Nothing"], answer: 1, explanation: "The x−2 factor cancels, but the original domain still excludes x=2, producing a hole." },
  { id: "q26", lessonId: "rates-difference", skill: "BC Bridge", difficulty: 2, prompt: "Average rate of change of f(x)=x²+1 from x=0 to x=3?", choices: ["2", "3", "4", "10"], answer: 1, explanation: "[f(3)−f(0)]/(3−0)=(10−1)/3=3." },
  { id: "q27", lessonId: "rates-difference", skill: "BC Bridge", difficulty: 3, prompt: "For f(x)=1/x, the simplified difference quotient is:", choices: ["1/h", "−1/[x(x+h)]", "1/[x(x+h)]", "−h/x"], answer: 1, explanation: "[1/(x+h)−1/x]/h=[−h/(x(x+h))]/h=−1/[x(x+h)]." },
  { id: "q35", lessonId: "limit-ready", skill: "BC Bridge", difficulty: 2, prompt: "Simplify (x²−16)/(x−4) for x≠4.", choices: ["x−4", "x+4", "x²+4", "1"], answer: 1, explanation: "x²−16=(x−4)(x+4); cancel x−4 on the punctured domain." },
  { id: "q36", lessonId: "limit-ready", skill: "BC Bridge", difficulty: 2, prompt: "If the left-hand behavior approaches 2 and right-hand behavior approaches 5 at x=a, then the two-sided limit:", choices: ["is 2", "is 5", "is 3.5", "does not exist"], answer: 3, explanation: "A two-sided limit exists only when the one-sided limits agree." },
];

export const formulaGroups: FormulaGroup[] = [
  {
    title: "Algebra laws",
    subtitle: "The simplifications calculus expects instantly",
    items: [
      { name: "Exponent product", formula: "xᵃxᵇ = xᵃ⁺ᵇ", use: "Combine like bases." },
      { name: "Exponent quotient", formula: "xᵃ/xᵇ = xᵃ⁻ᵇ", use: "Simplify powers and rational expressions." },
      { name: "Negative exponent", formula: "x⁻ⁿ = 1/xⁿ", use: "Rewrite derivative and integral results." },
      { name: "Rational exponent", formula: "xᵐ⁄ⁿ = ⁿ√(xᵐ)", use: "Move between radical and power forms." },
      { name: "Difference of squares", formula: "a²−b²=(a−b)(a+b)", use: "Factor limits and rational functions." },
      { name: "Quadratic formula", formula: "x=(−b±√(b²−4ac))/(2a)", use: "Solve nonfactorable quadratics." },
    ],
  },
  {
    title: "Functions and rates",
    subtitle: "Notation behind limits and derivatives",
    items: [
      { name: "Composition", formula: "(f∘g)(x)=f(g(x))", use: "Read chain-rule structure." },
      { name: "Inverse check", formula: "f(f⁻¹(x))=x", use: "Verify inverse functions." },
      { name: "Average rate", formula: "[f(b)−f(a)]/(b−a)", use: "Compute secant slope." },
      { name: "Difference quotient", formula: "[f(x+h)−f(x)]/h", use: "Prepare the derivative definition." },
      { name: "Point-slope line", formula: "y−y₁=m(x−x₁)", use: "Write secant or tangent lines." },
    ],
  },
  {
    title: "Unit circle",
    subtitle: "Radians and exact values",
    items: [
      { name: "Angle conversion", formula: "degrees·π/180 = radians", use: "Use calculus-compatible angle measure." },
      { name: "Circle coordinate", formula: "(cosθ,sinθ)", use: "Generate exact trig values." },
      { name: "Special angles", formula: "0, π/6, π/4, π/3, π/2", use: "Memorize first-quadrant coordinates." },
      { name: "Arc length", formula: "s=rθ", use: "Relate radians to distance." },
    ],
  },
  {
    title: "Trig identities",
    subtitle: "Only identities with direct BC payoff",
    items: [
      { name: "Quotient", formula: "tanx=sinx/cosx; cotx=cosx/sinx", use: "Rewrite to sine and cosine." },
      { name: "Reciprocal", formula: "secx=1/cosx; cscx=1/sinx", use: "Recognize derivative/integral forms." },
      { name: "Pythagorean I", formula: "sin²x+cos²x=1", use: "Simplify squared trig expressions." },
      { name: "Pythagorean II", formula: "1+tan²x=sec²x", use: "Simplify sec/tan expressions." },
      { name: "Pythagorean III", formula: "1+cot²x=csc²x", use: "Simplify csc/cot expressions." },
      { name: "Sine sum/difference", formula: "sin(a±b)=sin a cos b±cos a sin b", use: "Build exact combined-angle values." },
      { name: "Cosine sum/difference", formula: "cos(a±b)=cos a cos b∓sin a sin b", use: "Build exact combined-angle values." },
      { name: "Double angle", formula: "sin(2x)=2sinx cosx", use: "Rewrite products and oscillations." },
      { name: "Cosine double angle", formula: "cos(2x)=cos²x−sin²x", use: "Switch between squared forms." },
    ],
  },
  {
    title: "Exponential and logarithmic",
    subtitle: "Inverse rules and continuous growth",
    items: [
      { name: "Inverse definition", formula: "log_b x=y ⇔ bʸ=x", use: "Move between log and exponential form." },
      { name: "Product law", formula: "ln(ab)=ln a+ln b", use: "Expand products." },
      { name: "Quotient law", formula: "ln(a/b)=ln a−ln b", use: "Expand ratios." },
      { name: "Power law", formula: "ln(aʳ)=r ln a", use: "Bring exponents down." },
      { name: "Inverse pair", formula: "ln(eˣ)=x; eˡⁿˣ=x", use: "Simplify compositions on valid domains." },
      { name: "Continuous model", formula: "A=A₀eᵏᵗ", use: "Model growth and decay." },
    ],
  },
  {
    title: "Limit language",
    subtitle: "Enough to make week one survivable",
    items: [
      { name: "Two-sided existence", formula: "left limit = right limit", use: "Decide whether a limit exists." },
      { name: "Continuity at a", formula: "f(a) exists; lim f exists; lim f=f(a)", use: "Check point continuity." },
      { name: "Conjugate", formula: "(a−b)(a+b)=a²−b²", use: "Rationalize radical limits." },
    ],
  },
];

export const cutTopics = [
  "Parametric and vector motion (BC Unit 9 teaches it from scratch)",
  "Polar coordinates and curves (BC Unit 9)",
  "Sequences, sigma notation, and series (BC Unit 10)",
  "Matrices and determinants",
  "Probability and statistics",
  "General conic-section classification",
  "Law of sines and law of cosines",
  "Complex-number surveys",
  "Induction and standalone vector geometry",
  "Logistic modeling and synthetic-division drills",
];

export const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
export const getLesson = (id: string) => lessons.find((lesson) => lesson.id === id) ?? lessons[0];
