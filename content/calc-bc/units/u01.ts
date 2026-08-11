// AP Calculus BC · Unit 1: Limits and Continuity.
// One lesson per CED topic 1.1-1.16, a 5-question drill per lesson,
// flashcard terms, and at least two unit FRQs.
//
// Topic 1.1 below is the COURSE EXEMPLAR: every other lesson in this
// course must match its shape and depth (objectives, intro, teaching
// sections with callouts, numbered worked steps, practice with hint and
// solution reveal, takeaways, common-mistakes note, and a topic summary
// with the same id in unit.subTopics).

import type { CourseUnitSlice } from "../../courseTypes";

export const u01: CourseUnitSlice = {
  unit: {
    id: 1,
    title: "Limits and Continuity",
    weight: "4-7% of the exam",
    description:
      "Limits are the machine that makes calculus run: they turn average rates into instantaneous rates and let us reason about function behavior we cannot reach by plugging in. This unit builds limit notation, evaluation techniques, continuity, asymptotes, and the Intermediate Value Theorem.",
    bigIdeas: [
      "A limit describes the value a function approaches, which is independent of the value the function takes (or fails to take) at the point itself.",
      "Instantaneous change is defined as a limit of average changes over shrinking intervals.",
      "Continuity at a point requires three things: $f(a)$ exists, $\\lim_{x \\to a} f(x)$ exists, and the two agree.",
      "Asymptotes are the graphical fingerprints of infinite limits and limits at infinity.",
      "Continuity on a closed interval is what licenses existence theorems like the Intermediate Value Theorem.",
    ],
    subTopics: [
      {
        id: "1.1",
        unitId: 1,
        number: "1.1",
        title: "Introducing Calculus: Can Change Occur at an Instant?",
        summary:
          "Average rate of change over $[a,b]$ is the slope of a secant line. Shrinking the interval toward a single point drives those secant slopes toward one number: the instantaneous rate of change. That limiting process is the founding move of calculus.",
        keyIdeas: [
          "Average rate of change of $f$ on $[a,b]$ is $\\dfrac{f(b)-f(a)}{b-a}$, the slope of the secant line through $(a, f(a))$ and $(b, f(b))$.",
          "Instantaneous rate of change at $x=a$ is the value the average rates approach as the interval shrinks to $a$.",
          "In the form $\\dfrac{f(a+h)-f(a)}{h}$, shrinking the interval means $h \\to 0$; $h$ never equals $0$.",
          "Units of any rate of change are (units of $f$) per (unit of $x$).",
        ],
        formulas: [
          "\\text{AROC} = \\frac{f(b)-f(a)}{b-a}",
          "\\text{IROC at } x=a \\text{ is } \\lim_{h \\to 0} \\frac{f(a+h)-f(a)}{h}",
        ],
        commonMistakes: [
          "Reporting an average rate when the question asks for an instantaneous rate (or vice versa).",
          "Setting $h=0$ in $\\frac{f(a+h)-f(a)}{h}$ and concluding the rate is $\\frac{0}{0}$ instead of taking a limit.",
          "Dropping units, or inverting them (writing seconds per meter for a velocity).",
        ],
        workedExample: {
          problem: "For $f(x) = x^2$, estimate the instantaneous rate of change at $x=1$ using the intervals $[1,1.1]$ and $[1,1.01]$.",
          solution:
            "On $[1,1.1]$: $\\frac{1.21-1}{0.1} = 2.1$. On $[1,1.01]$: $\\frac{1.0201-1}{0.01} = 2.01$. The slopes approach $2$, so the instantaneous rate at $x=1$ is $2$.",
        },
      },
    ],
  },

  lessons: [
    {
      topicId: "1.1",
      unitId: 1,
      title: "Introducing Calculus: Can Change Occur at an Instant?",
      objectives: [
        "Compute the average rate of change of a function on an interval and interpret it as a secant slope.",
        "Approximate the instantaneous rate of change at a point using average rates over shrinking intervals.",
        "Express an instantaneous rate of change as a limit of a difference quotient, and explain why the limit is necessary.",
      ],
      intro:
        "Speedometers claim to report your speed **right now**. But speed is distance divided by time, and \"right now\" is a single instant: zero distance over zero time. Calculus resolves this paradox with one idea, the limit. This lesson builds the idea from secant slopes, which is exactly how the AP exam introduces it.",
      sections: [
        {
          heading: "Average rate of change is a secant slope",
          body:
            "The **average rate of change** (AROC) of $f$ over $[a,b]$ compares total change in output to total change in input. Graphically, it is the slope of the **secant line** through $(a, f(a))$ and $(b, f(b))$. It says nothing about what happens between those endpoints; it is one number summarizing the whole interval.",
          callouts: [
            {
              label: "KEY FORMULA",
              math: "\\text{AROC on } [a,b] = \\frac{f(b)-f(a)}{b-a}",
            },
          ],
          examples: [
            {
              problem: "Find the average rate of change of $f(x) = x^2$ on $[1,3]$.",
              steps: [
                {
                  explanation: "Evaluate the function at both endpoints.",
                  math: "f(3) = 9, \\qquad f(1) = 1",
                },
                {
                  explanation: "Apply the AROC formula: change in output over change in input.",
                  math: "\\frac{f(3)-f(1)}{3-1} = \\frac{9-1}{2} = 4",
                },
                {
                  explanation:
                    "Interpret: the secant line through $(1,1)$ and $(3,9)$ has slope $4$. On average, $f$ rises $4$ output units per input unit across this interval.",
                },
              ],
              answer: "The average rate of change is $4$.",
            },
          ],
        },
        {
          heading: "Shrink the interval: secant slopes approach a tangent slope",
          body:
            "To talk about the rate **at** $x=1$ rather than across an interval, fix the left endpoint at $1$ and drag the right endpoint toward it. Each interval gives a secant slope; the slopes settle toward a single value. Watch $f(x)=x^2$ at $x=1$:",
          tables: [
            {
              caption: "Secant slopes for $f(x)=x^2$ with left endpoint fixed at $x=1$.",
              headers: ["Interval", "Computation", "Secant slope"],
              rows: [
                ["$[1, 2]$", "$(4-1)/(2-1)$", "$3$"],
                ["$[1, 1.5]$", "$(2.25-1)/(0.5)$", "$2.5$"],
                ["$[1, 1.1]$", "$(1.21-1)/(0.1)$", "$2.1$"],
                ["$[1, 1.01]$", "$(1.0201-1)/(0.01)$", "$2.01$"],
                ["$[1, 1.001]$", "$(1.002001-1)/(0.001)$", "$2.001$"],
              ],
            },
          ],
          plots: [
            {
              caption:
                "The secant line through $x=1$ and $x=2$ (dashed) versus the tangent line at $x=1$ (accent). As the second point slides toward $x=1$, the secant tilts into the tangent.",
              curves: [
                { fn: (x: number) => x * x, label: "f(x) = x²" },
                { fn: (x: number) => 3 * x - 2, label: "secant, slope 3", dash: "6 4" },
                { fn: (x: number) => 2 * x - 1, label: "tangent, slope 2", color: "#e879a0" },
              ],
              points: [
                { x: 1, y: 1, label: "(1, 1)" },
                { x: 2, y: 4, label: "(2, 4)", style: "open" },
              ],
              xDomain: [-0.5, 3],
              yRange: [-1.5, 6],
            },
          ],
          callouts: [
            {
              label: "DEFINITION",
              text:
                "The **instantaneous rate of change** (IROC) of $f$ at $x=a$ is the limiting value of the average rates of change over intervals that shrink to $a$, when that limiting value exists.",
            },
          ],
        },
        {
          heading: "Writing the limit: the difference quotient",
          body:
            "Name the interval width $h$, so the interval is $[a, a+h]$. The AROC becomes the **difference quotient** $\\frac{f(a+h)-f(a)}{h}$, and shrinking the interval means $h \\to 0$. The key subtlety: $h$ approaches $0$ but never equals $0$, so the division is always legal. The value the quotient approaches is the instantaneous rate.",
          callouts: [
            {
              label: "KEY FORMULA",
              math: "\\text{IROC at } x=a: \\quad \\lim_{h \\to 0} \\frac{f(a+h)-f(a)}{h}",
            },
          ],
          examples: [
            {
              problem: "Show algebraically that the instantaneous rate of change of $f(x)=x^2$ at $x=1$ is exactly $2$.",
              steps: [
                {
                  explanation: "Write the difference quotient at $a=1$ with interval width $h$.",
                  math: "\\frac{f(1+h)-f(1)}{h} = \\frac{(1+h)^2 - 1}{h}",
                },
                {
                  explanation: "Expand the square and simplify the numerator.",
                  math: "\\frac{1 + 2h + h^2 - 1}{h} = \\frac{2h + h^2}{h}",
                },
                {
                  explanation: "Because $h \\neq 0$ while we take the limit, cancel one factor of $h$.",
                  math: "\\frac{h(2+h)}{h} = 2 + h",
                },
                {
                  explanation:
                    "As $h \\to 0$, the expression $2+h$ approaches $2$. This confirms the value the table of secant slopes was crowding toward.",
                  math: "\\lim_{h \\to 0} (2+h) = 2",
                },
              ],
              answer: "The instantaneous rate of change at $x=1$ is $2$.",
            },
          ],
        },
      ],
      practice: [
        {
          problem: "Find the average rate of change of $f(x) = \\dfrac{1}{x}$ on the interval $[1,4]$.",
          hint: "Evaluate at both endpoints first; be careful subtracting fractions.",
          solution: [
            {
              explanation: "Evaluate the endpoints.",
              math: "f(4) = \\tfrac{1}{4}, \\qquad f(1) = 1",
            },
            {
              explanation: "Apply the AROC formula.",
              math: "\\frac{\\tfrac{1}{4} - 1}{4 - 1} = \\frac{-\\tfrac{3}{4}}{3} = -\\frac{1}{4}",
            },
          ],
          answer: "$-\\dfrac{1}{4}$",
        },
        {
          problem:
            "For $g(x) = x^3$, estimate the instantaneous rate of change at $x=2$ using the intervals $[2, 2.1]$ and $[2, 2.01]$, then find the exact value with a limit.",
          hint: "For the exact value, expand $(2+h)^3$ and cancel $h$.",
          solution: [
            {
              explanation: "Estimate on $[2,2.1]$: $g(2.1) = 9.261$, $g(2) = 8$.",
              math: "\\frac{9.261 - 8}{0.1} = 12.61",
            },
            {
              explanation: "Estimate on $[2,2.01]$: $g(2.01) = 8.120601$.",
              math: "\\frac{8.120601 - 8}{0.01} = 12.0601",
            },
            {
              explanation: "The estimates head toward $12$. Confirm with the difference quotient.",
              math: "\\frac{(2+h)^3 - 8}{h} = \\frac{12h + 6h^2 + h^3}{h} = 12 + 6h + h^2",
            },
            {
              explanation: "Let $h \\to 0$.",
              math: "\\lim_{h \\to 0} \\left(12 + 6h + h^2\\right) = 12",
            },
          ],
          answer: "Estimates $12.61$ and $12.0601$; exact instantaneous rate $= 12$.",
        },
        {
          problem:
            "A ball dropped from rest falls $s(t) = 4.9t^2$ meters in $t$ seconds. Find its average velocity on $[2,3]$, and its instantaneous velocity at $t=2$. Include units.",
          hint: "Average velocity is AROC of position. For the instant, use the difference quotient at $a=2$.",
          solution: [
            {
              explanation: "Average velocity on $[2,3]$.",
              math: "\\frac{s(3)-s(2)}{3-2} = \\frac{44.1 - 19.6}{1} = 24.5 \\text{ m/s}",
            },
            {
              explanation: "Set up the difference quotient at $t=2$.",
              math: "\\frac{4.9(2+h)^2 - 19.6}{h} = \\frac{19.6h + 4.9h^2}{h} = 19.6 + 4.9h",
            },
            {
              explanation: "Let $h \\to 0$ to get the instantaneous velocity.",
              math: "\\lim_{h \\to 0}(19.6 + 4.9h) = 19.6 \\text{ m/s}",
            },
          ],
          answer: "Average velocity $24.5$ m/s; instantaneous velocity $19.6$ m/s.",
        },
      ],
      commonMistakes: [
        "Answering with an average rate when the question asks for an instantaneous rate. Read for the words **over the interval** (average) versus **at the instant / at $x=a$** (limit).",
        "Substituting $h=0$ directly into the difference quotient and stopping at $\\frac{0}{0}$. The whole point is to simplify first, then let $h \\to 0$.",
        "Forgetting units. On the AP exam, a rate without units loses the units point: velocity from a position in meters against seconds is meters per second.",
      ],
      takeaways: [
        "AROC $= \\frac{f(b)-f(a)}{b-a}$ is a secant slope; it summarizes an interval.",
        "IROC at $a$ is the limit of AROCs as the interval shrinks to $a$; it is a tangent slope.",
        "The difference quotient $\\frac{f(a+h)-f(a)}{h}$ with $h \\to 0$ is the formal version, and $h$ never equals $0$.",
        "Every derivative you compute in Units 2-10 is this one idea industrialized.",
      ],
    },
  ],

  flashcards: [
    {
      id: "bc-fc-1.1-1",
      term: "Average rate of change (AROC)",
      definition:
        "The change in a function's output divided by the change in input over an interval $[a,b]$; the slope of the secant line through the endpoints.",
      formula: "\\text{AROC} = \\frac{f(b)-f(a)}{b-a}",
      unitId: 1,
      topicId: "1.1",
      importance: 3,
    },
    {
      id: "bc-fc-1.1-2",
      term: "Instantaneous rate of change (IROC)",
      definition:
        "The value approached by average rates of change over intervals shrinking to a single point; the slope of the tangent line at that point.",
      formula: "\\lim_{h \\to 0} \\frac{f(a+h)-f(a)}{h}",
      unitId: 1,
      topicId: "1.1",
      importance: 3,
    },
    {
      id: "bc-fc-1.1-3",
      term: "Secant line vs. tangent line",
      definition:
        "A secant line passes through two points of a curve and its slope is an average rate; a tangent line touches at one point and its slope is the instantaneous rate there.",
      unitId: 1,
      topicId: "1.1",
      importance: 2,
    },
  ],

  mcq: [
    {
      id: "bc-mcq-1.1-1",
      unitId: 1,
      topicId: "1.1",
      modeTag: "no-calc",
      difficulty: 1,
      skill: "Procedural fluency",
      questionText: "What is the average rate of change of $f(x) = x^2 + 3x$ on the interval $[1, 4]$?",
      choices: [
        {
          letter: "A",
          text: "$8$",
          explanation:
            "Correct. $f(4) = 16 + 12 = 28$ and $f(1) = 1 + 3 = 4$, so AROC $= \\frac{28-4}{4-1} = \\frac{24}{3} = 8$.",
        },
        {
          letter: "B",
          text: "$24$",
          explanation: "This is $f(4) - f(1)$ alone. AROC divides the change in output by the change in input, $4-1=3$.",
        },
        {
          letter: "C",
          text: "$\\dfrac{32}{3}$",
          explanation: "This uses $f(4) = 32$, an arithmetic slip: $f(4) = 4^2 + 3(4) = 28$, not $32$.",
        },
        {
          letter: "D",
          text: "$11$",
          explanation:
            "This is the instantaneous rate of change at $x=4$ (from later units, $f'(4) = 2(4)+3$), not the average rate on $[1,4]$.",
        },
      ],
      correctChoice: "A",
      source: "original",
    },
    {
      id: "bc-mcq-1.1-2",
      unitId: 1,
      topicId: "1.1",
      modeTag: "no-calc",
      difficulty: 2,
      skill: "Connecting representations",
      questionText:
        "Selected values of a function $g$ are shown. Which of the following is the best estimate of the instantaneous rate of change of $g$ at $x = 3$?",
      table: {
        headers: ["$x$", "$2.0$", "$2.9$", "$2.99$", "$3.0$", "$3.01$", "$3.1$"],
        rows: [["$g(x)$", "$7.00$", "$10.53$", "$10.95$", "$11.00$", "$11.05$", "$11.47$"]],
      },
      choices: [
        {
          letter: "A",
          text: "$4$",
          explanation:
            "This is the average rate on the wide interval $[2,3]$: $\\frac{11-7}{1} = 4$. The narrow intervals hugging $x=3$ give a better estimate of the instant.",
        },
        {
          letter: "B",
          text: "$5$",
          explanation:
            "Correct. On $[2.99, 3.01]$, AROC $= \\frac{11.05 - 10.95}{0.02} = 5$; the narrowest bracketing interval gives the best estimate of the instantaneous rate.",
        },
        {
          letter: "C",
          text: "$11$",
          explanation: "This is the value $g(3)$ itself, not a rate of change. Rates compare changes in output to changes in input.",
        },
        {
          letter: "D",
          text: "$0.1$",
          explanation: "This is an interval width from the table, not a slope computed from the table's outputs.",
        },
      ],
      correctChoice: "B",
      source: "original",
    },
    {
      id: "bc-mcq-1.1-3",
      unitId: 1,
      topicId: "1.1",
      modeTag: "no-calc",
      difficulty: 1,
      skill: "Conceptual understanding",
      questionText: "The instantaneous rate of change of a function $f$ at $x = a$ is best described as which of the following?",
      choices: [
        {
          letter: "A",
          text: "The slope of the secant line through $(a, f(a))$ and $(b, f(b))$ for some $b$ near $a$",
          explanation:
            "A secant slope is an average rate over an interval, and it changes depending on which nearby $b$ you pick. The instantaneous rate is the single value those slopes approach.",
        },
        {
          letter: "B",
          text: "The value of $\\dfrac{f(a+h)-f(a)}{h}$ when $h = 0$",
          explanation:
            "Setting $h=0$ produces the undefined expression $\\frac{0}{0}$. The instantaneous rate is a limit as $h \\to 0$, never an evaluation at $h = 0$.",
        },
        {
          letter: "C",
          text: "The limiting value of average rates of change over intervals that shrink to $a$",
          explanation:
            "Correct. This is the definition: secant slopes over shrinking intervals approach the tangent slope at $a$.",
        },
        {
          letter: "D",
          text: "The average of $f$'s values on a small interval around $a$",
          explanation:
            "Averaging function values estimates the function's typical output, not how fast the output is changing.",
        },
      ],
      correctChoice: "C",
      source: "original",
    },
    {
      id: "bc-mcq-1.1-4",
      unitId: 1,
      topicId: "1.1",
      modeTag: "no-calc",
      difficulty: 2,
      skill: "Contextual application",
      questionText:
        "A particle's position is $s(t) = t^3 - 2t$ meters at time $t$ seconds. What is the particle's average velocity over the interval $[0, 2]$?",
      choices: [
        {
          letter: "A",
          text: "$2$ m/s",
          explanation:
            "Correct. $s(2) = 8 - 4 = 4$ and $s(0) = 0$, so average velocity $= \\frac{4-0}{2-0} = 2$ m/s.",
        },
        {
          letter: "B",
          text: "$4$ m/s",
          explanation: "This is $s(2)$, the position at $t=2$, not a velocity. Divide the change in position by the elapsed time.",
        },
        {
          letter: "C",
          text: "$10$ m/s",
          explanation:
            "This is the instantaneous velocity at $t=2$ ($s'(2) = 3(4) - 2$, from later units), not the average over $[0,2]$.",
        },
        {
          letter: "D",
          text: "$1$ m/s",
          explanation: "This divides by the interval width twice: $\\frac{s(2)-s(0)}{2} = 2$, not $1$.",
        },
      ],
      correctChoice: "A",
      source: "original",
    },
    {
      id: "bc-mcq-1.1-5",
      unitId: 1,
      topicId: "1.1",
      modeTag: "no-calc",
      difficulty: 2,
      skill: "Notation",
      questionText: "Which expression gives the instantaneous rate of change of $f$ at $x = 3$?",
      choices: [
        {
          letter: "A",
          text: "$\\displaystyle \\lim_{h \\to 0} \\frac{f(3+h) - f(3)}{h}$",
          explanation: "Correct. This is the difference quotient at $a=3$ with the interval width $h$ shrinking to $0$.",
        },
        {
          letter: "B",
          text: "$\\dfrac{f(3+h) - f(3)}{h}$",
          explanation:
            "Without the limit this is an average rate over $[3, 3+h]$; its value depends on $h$. The instant requires $h \\to 0$.",
        },
        {
          letter: "C",
          text: "$\\displaystyle \\lim_{h \\to 0} \\frac{f(3+h) + f(3)}{h}$",
          explanation: "The numerator must be a difference of outputs, $f(3+h) - f(3)$; a sum does not measure change.",
        },
        {
          letter: "D",
          text: "$\\dfrac{f(3) - f(0)}{3}$",
          explanation: "This is the average rate of change on $[0,3]$, a secant slope over a fixed wide interval.",
        },
      ],
      correctChoice: "A",
      source: "original",
    },
  ],

  frq: [
    {
      id: "bc-frq-u1-1",
      type: "no-calc",
      unitId: 1,
      topicIds: ["1.6", "1.11", "1.13", "1.15", "1.16"],
      context:
        "Let $f$ be the function defined by $f(x) = \\dfrac{x^2 - 3x + 2}{x - 1}$ for $x \\neq 1$. Parts (a)-(c) concern $f$; part (d) concerns a different function $h$.",
      parts: [
        {
          letter: "a",
          task: "Find $\\displaystyle \\lim_{x \\to 1} f(x)$. Show the algebraic steps that support your answer.",
          pointName: "Limit by algebraic manipulation",
          pointsAvailable: 2,
          modelSolution:
            "Factor the numerator: $x^2 - 3x + 2 = (x-1)(x-2)$. For $x \\neq 1$, $f(x) = \\dfrac{(x-1)(x-2)}{x-1} = x - 2$. Therefore $\\displaystyle \\lim_{x \\to 1} f(x) = 1 - 2 = -1$.",
          scoringNotes:
            "1 point for factoring and canceling to obtain $x-2$ (valid because $x \\neq 1$ in the limit process). 1 point for the value $-1$.",
          partialCreditNotes:
            "A bare answer of $-1$ with no supporting algebra earns only the answer point. Direct substitution written as $\\frac{0}{0}$ with no further work earns 0.",
        },
        {
          letter: "b",
          task:
            "Explain why $f$ has a removable discontinuity at $x = 1$, and state the value that should be assigned to $f(1)$ to make the extended function continuous at $x = 1$. Justify using the definition of continuity.",
          pointName: "Continuity definition",
          pointsAvailable: 2,
          modelSolution:
            "$f(1)$ is undefined, so $f$ is not continuous at $x=1$; but $\\lim_{x \\to 1} f(x) = -1$ exists, so the discontinuity is removable. Assigning $f(1) = -1$ makes $f(1) = \\lim_{x \\to 1} f(x)$, which is exactly the definition of continuity at a point (the function value exists, the limit exists, and they are equal).",
          scoringNotes:
            "1 point for identifying that the limit exists while the function value does not (removable discontinuity). 1 point for $f(1) = -1$ with justification referencing $f(1) = \\lim_{x \\to 1} f(x)$.",
        },
        {
          letter: "c",
          task:
            "Find $\\displaystyle \\lim_{x \\to \\infty} \\frac{x^2 - 3x + 2}{2x^2 + 5x}$ and state what your answer implies about the graph of $y = \\dfrac{x^2 - 3x + 2}{2x^2 + 5x}$.",
          pointName: "Limits at infinity",
          pointsAvailable: 2,
          modelSolution:
            "Divide numerator and denominator by $x^2$: $\\displaystyle \\lim_{x \\to \\infty} \\frac{1 - 3/x + 2/x^2}{2 + 5/x} = \\frac{1}{2}$. The graph has a horizontal asymptote at $y = \\tfrac{1}{2}$ as $x \\to \\infty$.",
          scoringNotes: "1 point for the limit value $\\tfrac{1}{2}$ with supporting work (ratio of leading terms or dividing through by $x^2$). 1 point for interpreting it as the horizontal asymptote $y = \\tfrac{1}{2}$.",
        },
        {
          letter: "d",
          task:
            "A function $h$ is continuous on the closed interval $[1, 6]$ with $h(1) = -4$ and $h(6) = 9$. Must there exist a value $c$ in the open interval $(1, 6)$ such that $h(c) = 0$? Justify your answer, and state whether such a $c$ must be unique.",
          pointName: "Intermediate Value Theorem",
          pointsAvailable: 3,
          modelSolution:
            "Yes. $h$ is continuous on $[1,6]$, and $0$ is between $h(1) = -4$ and $h(6) = 9$. By the Intermediate Value Theorem there exists $c$ in $(1,6)$ with $h(c) = 0$. Such a $c$ need not be unique: a continuous function can cross $y = 0$ several times (for example, a function that wiggles across the axis three times while still running from $-4$ up to $9$).",
          scoringNotes:
            "1 point for citing continuity on the closed interval (the hypothesis). 1 point for noting $0$ lies between $h(1)$ and $h(6)$ and concluding existence by IVT. 1 point for stating uniqueness is NOT guaranteed, with a reason.",
          partialCreditNotes: "Invoking IVT without stating continuity earns at most 1 of the first 2 points; the theorem's hypothesis must appear.",
        },
      ],
      totalPoints: 9,
      source: "original",
    },
  ],
};
