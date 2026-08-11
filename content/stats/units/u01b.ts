// AP Statistics · Unit 1 (second half): Exploring One-Variable Data.
// Topics 1.6-1.10. Topic 1.10 below is the COURSE EXEMPLAR: every other
// lesson in this course must match its shape and depth, including TI-84
// keystroke callouts in every procedure lesson, and the FRQ below sets
// the state-plan-do-conclude standard for free response.
//
// The unit writer PREPENDS topics 1.6-1.9 at the PREPEND anchors, keeping
// the 1.10 exemplar content byte-for-byte unchanged. Unit metadata is
// owned by the first-half file (u01.ts): description and bigIdeas here
// stay empty.

import type { CourseUnitSlice } from "../../courseTypes";

export const u01b: CourseUnitSlice = {
  unit: {
    id: 1,
    title: "Exploring One-Variable Data",
    weight: "15-23% of the exam",
    description: "",
    bigIdeas: [],
    subTopics: [
      // SUBTOPICS-PREPEND (writer inserts 1.6-1.9 summaries above this line)
      {
        id: "1.10",
        unitId: 1,
        number: "1.10",
        title: "The Normal Distribution",
        summary:
          "The normal distribution is a symmetric, mound-shaped model described completely by its mean $\\mu$ and standard deviation $\\sigma$. Z-scores standardize values so any normal model can be read from one table or one calculator command, and the empirical rule gives fast 68-95-99.7 benchmarks.",
        keyIdeas: [
          "A normal model is specified as $N(\\mu, \\sigma)$; the curve is symmetric about $\\mu$ and changes concavity at $\\mu \\pm \\sigma$.",
          "The empirical rule: about 68% of values fall within $1\\sigma$ of the mean, about 95% within $2\\sigma$, about 99.7% within $3\\sigma$.",
          "A z-score $z = (x - \\mu)/\\sigma$ counts standard deviations from the mean and is the bridge between any normal model and the standard normal.",
          "Proportions under the curve come from normalcdf; boundary values for a given proportion come from invNorm.",
          "Always draw and shade the region before computing; the picture catches direction errors.",
        ],
        formulas: ["z = \\frac{x - \\mu}{\\sigma}"],
        commonMistakes: [
          "Using the empirical rule on a distribution that was never stated to be approximately normal.",
          "Reporting the z-score itself as the answer when the question asks for a proportion or a value of $x$.",
          "Swapping the bounds in normalcdf and returning a proportion of 0, or forgetting that invNorm takes the area to the LEFT.",
        ],
        workedExample: {
          problem:
            "Adult female heights are approximately $N(64.5, 2.5)$ inches. What proportion of adult females are taller than 68 inches?",
          solution:
            "$z = (68 - 64.5)/2.5 = 1.4$. The area to the right of $z = 1.4$ is $1 - 0.9192 = 0.0808$. About 8.1% of adult females are taller than 68 inches.",
        },
      },
    ],
  },

  lessons: [
    // LESSONS-PREPEND (writer inserts lessons 1.6-1.9 above this line)
    {
      topicId: "1.10",
      unitId: 1,
      title: "The Normal Distribution",
      objectives: [
        "Describe a normal model $N(\\mu, \\sigma)$ and use the empirical rule for quick benchmark proportions.",
        "Standardize values with z-scores and interpret them in context.",
        "Compute proportions and percentiles for approximately normal distributions, by table reasoning and with TI-84 commands.",
      ],
      intro:
        "Heights, measurement errors, SAT scores: an enormous number of real variables pile up in a symmetric mound around their mean. The normal distribution is the idealized version of that mound, and it is the single most-used model on the AP exam. Master one skill here, the z-score, and every normal problem becomes the same three steps: **draw, standardize, look up**.",
      sections: [
        {
          heading: "The normal model and the empirical rule",
          body:
            "A normal distribution is completely described by two numbers: the mean $\\mu$ locates the center, and the standard deviation $\\sigma$ sets the spread. We write $N(\\mu, \\sigma)$. The curve is symmetric and mound-shaped, and its inflection points (where the curve switches from bending down to bending up) sit exactly one standard deviation from the mean. For quick estimates you rarely need a calculator, because the **empirical rule** pins down the big regions.",
          callouts: [
            {
              label: "EMPIRICAL RULE (68-95-99.7)",
              text:
                "For an approximately normal distribution: about **68%** of values lie within $1\\sigma$ of $\\mu$, about **95%** within $2\\sigma$, and about **99.7%** within $3\\sigma$.",
            },
          ],
          examples: [
            {
              problem:
                "Scores on a placement test are approximately $N(500, 100)$. Using the empirical rule, about what percent of scores are between 300 and 600?",
              steps: [
                {
                  explanation: "Convert the endpoints to distances from the mean: 300 is $2\\sigma$ below (since $500 - 2 \\cdot 100 = 300$) and 600 is $1\\sigma$ above.",
                },
                {
                  explanation:
                    "Take the pieces symmetric about the mean. From $-2\\sigma$ to the mean is half of 95%, which is 47.5%. From the mean to $+1\\sigma$ is half of 68%, which is 34%.",
                },
                {
                  explanation: "Add the two pieces.",
                  math: "47.5\\% + 34\\% = 81.5\\%",
                },
              ],
              answer: "About 81.5% of scores fall between 300 and 600.",
            },
          ],
        },
        {
          heading: "Z-scores: one ruler for every normal model",
          body:
            "A **z-score** re-expresses a value as a number of standard deviations from the mean. Standardizing squashes every normal model onto the **standard normal** $N(0,1)$, which is why one table serves all problems. A z-score is also a standalone descriptive tool: on the exam, comparing two values from different distributions almost always means comparing their z-scores.",
          callouts: [
            {
              label: "KEY FORMULA",
              math: "z = \\frac{x - \\mu}{\\sigma}",
            },
          ],
          examples: [
            {
              problem:
                "Ana scored 650 on a test with scores $N(500, 100)$; Ben scored 30 on a different test with scores $N(24, 4)$. Who performed better relative to their group?",
              steps: [
                {
                  explanation: "Standardize Ana's score.",
                  math: "z_A = \\frac{650 - 500}{100} = 1.5",
                },
                {
                  explanation: "Standardize Ben's score.",
                  math: "z_B = \\frac{30 - 24}{4} = 1.5",
                },
                {
                  explanation:
                    "Interpret in context: each scored 1.5 standard deviations above their test's mean, so their relative performances are the same.",
                },
              ],
              answer: "They performed equally well relative to their groups; both have $z = 1.5$.",
            },
          ],
        },
        {
          heading: "Proportions and percentiles, by hand and by calculator",
          body:
            "Every normal computation is one of two directions. **Forward**: given a value $x$, find the proportion of the distribution beyond or below it (standardize, then find area). **Backward**: given a proportion, find the boundary value $x$ (find the z with that area to the left, then un-standardize with $x = \\mu + z\\sigma$). Draw the curve and shade the target region first, every time; most lost points here are direction errors the sketch would have caught.",
          callouts: [
            {
              label: "TI-84",
              text:
                "Forward: **2nd → VARS (DISTR) → normalcdf(lower, upper, mu, sigma)**. Use -1E99 or 1E99 for an open end. Backward: **invNorm(area to the LEFT, mu, sigma)**. Write the command and its inputs on your paper; on the FRQ section, naming the distribution and parameters earns the communication point, a bare calculator command does not.",
            },
          ],
          examples: [
            {
              problem:
                "Cereal boxes are filled with weights approximately $N(510, 6)$ grams. The lightest 5% of boxes get rejected. What is the minimum accepted weight?",
              steps: [
                {
                  explanation:
                    "This is a backward problem: we know the area (5% to the left) and want the boundary value. Sketch the curve, shade the left 5%.",
                },
                {
                  explanation: "Find the z-score with area 0.05 to the left.",
                  math: "z = -1.645",
                },
                {
                  explanation: "Un-standardize to the weight scale.",
                  math: "x = \\mu + z\\sigma = 510 + (-1.645)(6) = 500.13",
                },
                {
                  explanation:
                    "Calculator check: invNorm(0.05, 510, 6) = 500.131. State the conclusion in context with units.",
                },
              ],
              answer: "Boxes must weigh at least about 500.1 grams to be accepted.",
            },
          ],
        },
      ],
      practice: [
        {
          problem:
            "Systolic blood pressure for healthy adults is approximately $N(120, 12)$ mmHg. Using the empirical rule, what percent of healthy adults have blood pressure between 108 and 144 mmHg?",
          hint: "Convert 108 and 144 to numbers of standard deviations from 120, then add symmetric pieces.",
          solution: [
            {
              explanation: "108 is $1\\sigma$ below the mean ($120 - 12$); 144 is $2\\sigma$ above ($120 + 24$).",
            },
            {
              explanation:
                "From $-1\\sigma$ to the mean is half of 68%, or 34%. From the mean to $+2\\sigma$ is half of 95%, or 47.5%.",
              math: "34\\% + 47.5\\% = 81.5\\%",
            },
          ],
          answer: "About 81.5%.",
        },
        {
          problem:
            "SAT math scores are approximately $N(520, 110)$. What proportion of students score between 600 and 700?",
          hint: "Standardize both endpoints and subtract the two left areas.",
          solution: [
            {
              explanation: "Standardize both endpoints.",
              math: "z_{600} = \\frac{600-520}{110} = 0.727, \\qquad z_{700} = \\frac{700-520}{110} = 1.636",
            },
            {
              explanation:
                "Area to the left of $z = 1.636$ is about 0.949; area to the left of $z = 0.727$ is about 0.766. Subtract.",
              math: "0.949 - 0.766 = 0.183",
            },
            {
              explanation: "Calculator check: normalcdf(600, 700, 520, 110) = 0.1829.",
            },
          ],
          answer: "About 0.183, or 18.3% of students.",
        },
        {
          problem:
            "The weights of a species of trout are approximately $N(2.8, 0.6)$ pounds. A fishing derby gives trophies for the heaviest 10% of trout. What is the minimum trophy weight?",
          hint: "Heaviest 10% means area 0.90 to the LEFT of the boundary.",
          solution: [
            {
              explanation: "Find the z-score with area 0.90 to the left.",
              math: "z = 1.282",
            },
            {
              explanation: "Un-standardize.",
              math: "x = 2.8 + 1.282(0.6) = 3.57",
            },
            {
              explanation: "Calculator check: invNorm(0.90, 2.8, 0.6) = 3.569.",
            },
          ],
          answer: "About 3.57 pounds.",
        },
      ],
      commonMistakes: [
        "Applying the empirical rule or a z-table to data that is skewed. State (or check) approximate normality before any normal calculation.",
        "In invNorm, entering the area to the right. The calculator always wants the area to the LEFT of the boundary.",
        "Giving a bare calculator answer on an FRQ. Name the distribution and parameters, show the z-score or the command with inputs, and write the conclusion in context.",
      ],
      takeaways: [
        "$N(\\mu, \\sigma)$ is fully determined by center and spread; inflection points sit at $\\mu \\pm \\sigma$.",
        "The empirical rule gives 68-95-99.7 benchmarks within 1, 2, and 3 standard deviations.",
        "$z = (x-\\mu)/\\sigma$ converts any normal problem to the standard normal; compare unlike scores by comparing z-scores.",
        "Forward problems standardize then find area; backward problems find $z$ from area then un-standardize.",
        "Draw and shade first. normalcdf for proportions, invNorm(area-left) for boundaries.",
      ],
    },
  ],

  flashcards: [
    // FLASHCARDS-PREPEND (writer inserts 1.6-1.9 cards above this line)
    {
      id: "st-fc-1.10-1",
      term: "Normal distribution",
      definition:
        "A symmetric, mound-shaped distribution completely described by its mean $\\mu$ and standard deviation $\\sigma$, written $N(\\mu, \\sigma)$; inflection points sit at $\\mu \\pm \\sigma$.",
      unitId: 1,
      topicId: "1.10",
      importance: 3,
    },
    {
      id: "st-fc-1.10-2",
      term: "Z-score",
      definition:
        "The number of standard deviations a value lies from the mean; positive above the mean, negative below. Standardizing lets any normal model be read from the standard normal.",
      formula: "z = \\frac{x - \\mu}{\\sigma}",
      unitId: 1,
      topicId: "1.10",
      importance: 3,
    },
    {
      id: "st-fc-1.10-3",
      term: "Empirical rule (68-95-99.7)",
      definition:
        "For approximately normal distributions, about 68% of values fall within 1 standard deviation of the mean, about 95% within 2, and about 99.7% within 3.",
      unitId: 1,
      topicId: "1.10",
      importance: 3,
    },
  ],

  mcq: [
    // MCQ-PREPEND (writer inserts 1.6-1.9 questions above this line)
    {
      id: "st-mcq-1.10-1",
      unitId: 1,
      topicId: "1.10",
      difficulty: 1,
      skill: "Empirical rule",
      questionText:
        "The lifetimes of a brand of light bulb are approximately normal with mean 1,200 hours and standard deviation 100 hours. About what percent of bulbs last between 1,100 and 1,400 hours?",
      choices: [
        {
          letter: "A",
          text: "68%",
          explanation: "68% covers $\\mu \\pm 1\\sigma$, which is 1,100 to 1,300 hours, not 1,100 to 1,400.",
        },
        {
          letter: "B",
          text: "81.5%",
          explanation:
            "Correct. From $-1\\sigma$ (1,100) to the mean is 34%; from the mean to $+2\\sigma$ (1,400) is 47.5%; together 81.5%.",
        },
        {
          letter: "C",
          text: "95%",
          explanation: "95% covers $\\mu \\pm 2\\sigma$, which is 1,000 to 1,400 hours; the interval here starts at 1,100.",
        },
        {
          letter: "D",
          text: "84%",
          explanation:
            "84% is the area to the left of $+1\\sigma$ (50% + 34%), the percent of bulbs lasting less than 1,300 hours, not this interval.",
        },
      ],
      correctChoice: "B",
      source: "original",
    },
    {
      id: "st-mcq-1.10-2",
      unitId: 1,
      topicId: "1.10",
      difficulty: 2,
      skill: "Comparing with z-scores",
      questionText:
        "Marta ran the 5K in 21.0 minutes in a race where times were approximately $N(24, 2)$ minutes. Her brother ran a different 5K in 19.5 minutes where times were $N(22, 2.5)$. Which statement correctly compares their performances relative to their races?",
      choices: [
        {
          letter: "A",
          text: "Marta did better because her z-score is $-1.5$, which is farther below the mean than her brother's $-1$.",
          explanation:
            "Correct. Marta: $z = (21-24)/2 = -1.5$. Brother: $z = (19.5-22)/2.5 = -1$. For race times, lower is better, so the more negative z-score is the stronger relative performance.",
        },
        {
          letter: "B",
          text: "Her brother did better because 19.5 minutes is a faster time than 21.0 minutes.",
          explanation:
            "Raw times from different races are not comparable; the races have different distributions. Relative standing requires z-scores.",
        },
        {
          letter: "C",
          text: "Her brother did better because his z-score is closer to 0.",
          explanation:
            "A z-score near 0 means near the average. For times, being average is worse than being well below the mean.",
        },
        {
          letter: "D",
          text: "They performed equally well because both z-scores are negative.",
          explanation: "Both beat their race averages, but $-1.5$ is farther below the mean than $-1$; the magnitudes differ.",
        },
      ],
      correctChoice: "A",
      source: "original",
    },
    {
      id: "st-mcq-1.10-3",
      unitId: 1,
      topicId: "1.10",
      difficulty: 2,
      skill: "Forward normal calculation",
      questionText:
        "The amount of soda dispensed by a machine is approximately $N(12.1, 0.15)$ ounces. What proportion of cups receive less than 12 ounces?",
      choices: [
        {
          letter: "A",
          text: "About 0.25",
          explanation:
            "Correct. $z = (12 - 12.1)/0.15 = -0.67$, and the area to the left of $z = -0.67$ is about 0.25. Calculator: normalcdf(-1E99, 12, 12.1, 0.15) = 0.252.",
        },
        {
          letter: "B",
          text: "About 0.75",
          explanation: "This is the area to the RIGHT of 12 ounces, the proportion of cups receiving more than 12 ounces.",
        },
        {
          letter: "C",
          text: "About 0.09",
          explanation: "This would require $z \\approx -1.33$, twice the actual distance; the boundary is only $0.67$ standard deviations below the mean.",
        },
        {
          letter: "D",
          text: "About 0.50",
          explanation:
            "Exactly half the cups fall below the mean, 12.1 ounces. The boundary 12 is below the mean, so the proportion below it must be less than 0.50.",
        },
      ],
      correctChoice: "A",
      source: "original",
    },
    {
      id: "st-mcq-1.10-4",
      unitId: 1,
      topicId: "1.10",
      difficulty: 3,
      skill: "Backward normal calculation",
      questionText:
        "Scores on an exam are approximately $N(72, 8)$. The instructor gives an A to the top 15% of scores. Which is closest to the minimum score earning an A?",
      choices: [
        {
          letter: "A",
          text: "80",
          explanation: "80 is exactly $+1\\sigma$, which cuts off the top 16%, close but the top 15% boundary is slightly higher.",
        },
        {
          letter: "B",
          text: "80.3",
          explanation:
            "Correct. The z-score with area 0.85 to the left is $z = 1.036$; $x = 72 + 1.036(8) = 80.3$. invNorm(0.85, 72, 8) = 80.29.",
        },
        {
          letter: "C",
          text: "83.2",
          explanation: "This uses $z = 1.4$, which cuts off the top 8%, not the top 15%.",
        },
        {
          letter: "D",
          text: "63.7",
          explanation: "This uses $z = -1.036$, the BOTTOM 15% boundary; invNorm wants area to the left of the top-15% cutoff, 0.85.",
        },
      ],
      correctChoice: "B",
      source: "original",
    },
    {
      id: "st-mcq-1.10-5",
      unitId: 1,
      topicId: "1.10",
      difficulty: 1,
      skill: "Model properties",
      questionText: "Which of the following is a property of every normal distribution?",
      choices: [
        {
          letter: "A",
          text: "The mean is greater than the median.",
          explanation: "A normal distribution is symmetric, so the mean and median are equal, not ordered.",
        },
        {
          letter: "B",
          text: "About 50% of values fall within one standard deviation of the mean.",
          explanation: "The empirical rule puts about 68%, not 50%, within one standard deviation.",
        },
        {
          letter: "C",
          text: "The curve is symmetric about the mean, with inflection points at $\\mu - \\sigma$ and $\\mu + \\sigma$.",
          explanation:
            "Correct. Symmetry about $\\mu$ and inflection points exactly one standard deviation from the mean characterize the normal curve's shape.",
        },
        {
          letter: "D",
          text: "All values fall within three standard deviations of the mean.",
          explanation:
            "About 99.7% fall within $3\\sigma$, but the curve's tails extend forever; \"all\" is false.",
        },
      ],
      correctChoice: "C",
      source: "original",
    },
  ],

  frq: [
    // FRQ-PREPEND (writer inserts an additional unit FRQ above this line)
    {
      id: "st-frq-u1-1",
      type: "standard",
      unitId: 1,
      topicIds: ["1.10"],
      context:
        "A machine fills bags of coffee. The distribution of fill weights is approximately normal with mean 340 grams and standard deviation 4 grams. Bags that weigh less than 334 grams cannot be sold.",
      parts: [
        {
          letter: "a",
          task: "What proportion of bags cannot be sold? Show your work, including the distribution, parameters, and boundary you used.",
          pointName: "Part (a)",
          pointsAvailable: 1,
          modelSolution:
            "Let $X$ = fill weight, $X \\sim N(340, 4)$. $z = (334 - 340)/4 = -1.5$. $P(X < 334) = P(z < -1.5) = 0.0668$. About 6.7% of bags cannot be sold.",
          scoringNotes:
            "Essentially correct (1 point) if the response names the normal model with its parameters (or shows the z-score computation), computes $P(X < 334) \\approx 0.067$, and states the answer as a proportion or percent. Partially correct if the setup is right but the area is for the wrong tail.",
        },
        {
          letter: "b",
          task:
            "The quality team will recalibrate the machine's mean fill so that only 1% of bags are unsellable, keeping the standard deviation at 4 grams. What mean fill weight should they use? Show your work.",
          pointName: "Part (b)",
          pointsAvailable: 2,
          modelSolution:
            "We need $P(X < 334) = 0.01$ with $\\sigma = 4$. The z-score with area 0.01 to the left is $z = -2.326$. Solve $-2.326 = (334 - \\mu)/4$, so $\\mu = 334 + 2.326(4) = 343.3$ grams. The machine should be set to a mean of about 343.3 grams.",
          scoringNotes:
            "1 point for identifying the correct z-score ($-2.326$, accept $-2.33$) tied to the 1% left-tail area. 1 point for solving the standardization equation for $\\mu$ and reporting about 343.3 grams with units.",
          partialCreditNotes: "Using $z = +2.326$ and getting 324.7 grams shows a direction error: it earns the solving point only if the equation is otherwise handled correctly.",
        },
        {
          letter: "c",
          task:
            "The team proposes instead reducing the standard deviation while keeping the mean at 340 grams. Would this approach also reduce the proportion of unsellable bags? Explain why or why not without computing a new proportion.",
          pointName: "Part (c)",
          pointsAvailable: 1,
          modelSolution:
            "Yes. The boundary 334 is below the mean. Shrinking the standard deviation concentrates the distribution more tightly around 340, so less area falls beyond any fixed distance below the mean. The z-score of the boundary, $(334-340)/\\sigma$, becomes more negative as $\\sigma$ decreases, so the left-tail area shrinks.",
          scoringNotes:
            "Essentially correct for \"yes\" with reasoning tied to spread: a smaller $\\sigma$ makes 334 more standard deviations below the mean (or concentrates weight near 340). A bare \"yes\" without distributional reasoning is incorrect.",
        },
      ],
      totalPoints: 4,
      source: "original",
    },
  ],
};
