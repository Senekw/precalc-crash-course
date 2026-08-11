// Comp Sci 2 KAP · Unit 1: Java Refresher: Types & Control Flow.
// NOTE: the unit outline is a PLACEHOLDER until the real syllabus arrives;
// topics use a sensible refresher sequence.
// Topic 1.1 below is the COURSE EXEMPLAR: every lesson in this course
// must match its shape and depth: concept prose, annotated code examples
// (codeBlocks with commented lines), a trace table, practice with
// step-by-step solutions, a code-tracing MCQ drill, and write-the-method
// FRQs with solution code and test cases.
//
// The unit writer APPENDS topics 1.2-1.5 after the exemplar entries,
// keeping topic 1.1 byte-for-byte unchanged.

import type { CourseUnitSlice } from "../../courseTypes";

export const u01: CourseUnitSlice = {
  unit: {
    id: 1,
    title: "Java Refresher: Types & Control Flow",
    weight: "Unit 1 · refresher",
    description:
      "Everything in this course compiles down to the fundamentals: how Java stores values, how expressions evaluate, and how control flow decides which lines run. This refresher rebuilds those foundations precisely, because 2D arrays and recursion will punish any fuzziness about types and evaluation order.",
    bigIdeas: [
      "Java is statically typed: every variable has a declared type that fixes what it can hold and how operators treat it.",
      "Integer division and type promotion are the two most common sources of wrong answers in code tracing.",
      "Control flow (if/else, loops) is fully deterministic; a trace table makes any snippet's behavior visible line by line.",
      "Reading code precisely is a skill separate from writing it, and the exam tests both.",
    ],
    subTopics: [
      {
        id: "1.1",
        unitId: 1,
        number: "1.1",
        title: "Primitive Types, Variables, and Expressions",
        summary:
          "Java's primitive types (int, double, boolean, char) determine how values are stored and how operators behave. Integer division truncates, mixed int/double expressions promote to double, and the modulo operator returns remainders. Precise evaluation order is the foundation of every code-tracing question.",
        keyIdeas: [
          "int holds whole numbers; double holds decimals; boolean holds true/false; char holds a single character.",
          "Integer division truncates toward zero: 7 / 2 is 3, and -7 / 2 is -3.",
          "The modulo operator % gives the remainder: 7 % 2 is 1; a common use is testing evenness with n % 2 == 0.",
          "In a mixed expression, int operands are promoted to double: 7 / 2.0 is 3.5.",
          "Assignment stores a COPY of the value for primitives; changing one variable never changes another.",
        ],
        formulas: [],
        commonMistakes: [
          "Expecting 7 / 2 to be 3.5. Both operands are ints, so the division truncates to 3 first, even if the result is assigned to a double.",
          "Writing x = y and expecting later changes to y to affect x; primitives copy the value at assignment time.",
          "Using == on doubles that come from arithmetic; rounding error makes exact equality unreliable.",
        ],
        workedExample: {
          problem: "What does the expression 1 + 11 % 3 + 11 / 3 evaluate to?",
          solution:
            "Precedence: % and / bind tighter than +. 11 % 3 = 2 and 11 / 3 = 3 (truncated). Then left to right: 1 + 2 + 3 = 6.",
        },
      },
    ],
  },

  lessons: [
    {
      topicId: "1.1",
      unitId: 1,
      title: "Primitive Types, Variables, and Expressions",
      objectives: [
        "Declare and initialize variables of Java's primitive types and predict what each can store.",
        "Evaluate arithmetic expressions exactly, including integer division, modulo, and int-to-double promotion.",
        "Trace a sequence of assignments with a trace table, the tool this course uses for every code-reading task.",
      ],
      intro:
        "Half of every code-tracing question is really a types question. Java decides how an operator behaves by looking at the **types** of its operands, not at what would be mathematically nice: divide two ints and the decimal part is simply gone. This lesson rebuilds the machinery precisely (types, assignment, evaluation order) and introduces the trace table, which you will use on every unit of this course.",
      sections: [
        {
          heading: "The primitive types and what they hold",
          body:
            "A **variable** is a named box whose declared type fixes what it can contain. This course uses four primitives: **int** for whole numbers, **double** for decimal numbers, **boolean** for true/false, and **char** for a single character in single quotes. The declaration creates the box; assignment with = stores a value in it, replacing whatever was there. For primitives, assignment copies the **value**: after b = a, the boxes hold equal but separate copies.",
          codeBlocks: [
            {
              caption: "Declarations, assignment, and value copying.",
              code:
                "int servings = 4;        // whole number\n" +
                "double price = 2.75;     // decimal number\n" +
                "boolean isOpen = true;   // true or false\n" +
                "char grade = 'A';        // one character, single quotes\n" +
                "\n" +
                "int a = 10;\n" +
                "int b = a;               // b gets a COPY of 10\n" +
                "a = 99;                  // changes a only\n" +
                "// now: a is 99, b is still 10",
            },
          ],
        },
        {
          heading: "Integer division and modulo: where traces go wrong",
          body:
            "When BOTH operands of / are ints, Java performs **integer division**: it truncates the decimal part (toward zero), it does not round. The companion operator **%** (modulo) gives the remainder of that division. Together they split a number: for any positive ints, n equals (n / d) * d + (n % d). If either operand is a double, the int is **promoted** and the division is ordinary decimal division. The type of the expression is decided by its operands, never by the variable receiving the result.",
          callouts: [
            {
              label: "THE RULE",
              text:
                "int op int gives int (division truncates). If either side is a double, the result is a double. Assigning to a double does NOT rescue a truncation that already happened: double x = 7 / 2; stores 3.0.",
            },
          ],
          examples: [
            {
              problem: "Evaluate each expression: (a) 17 / 5   (b) 17 % 5   (c) 17 / 5.0   (d) double d = 9 / 4;",
              steps: [
                {
                  explanation: "(a) Both operands are ints, so truncate 3.4 down to 3.",
                  code: "17 / 5  →  3",
                },
                {
                  explanation: "(b) The remainder after taking out 3 fives (15) is 2.",
                  code: "17 % 5  →  2",
                },
                {
                  explanation: "(c) One operand is a double, so 17 is promoted and the division keeps its decimals.",
                  code: "17 / 5.0  →  3.4",
                },
                {
                  explanation:
                    "(d) The right side 9 / 4 is evaluated FIRST as int division giving 2; only then is 2 widened to 2.0 for storage. The truncation already happened.",
                  code: "double d = 9 / 4;  →  d holds 2.0",
                },
              ],
              answer: "(a) 3   (b) 2   (c) 3.4   (d) 2.0",
            },
          ],
        },
        {
          heading: "Trace tables: the habit that earns tracing points",
          body:
            "A **trace table** has one column per variable and one row per executed line. You update only the variable a line changes and copy the rest forward. It feels slow; it is actually the fast way, because it turns \"what does this print?\" from mental juggling into bookkeeping. Trace the snippet below, then check the table.",
          codeBlocks: [
            {
              caption: "Snippet to trace.",
              code:
                "int x = 8;\n" +
                "int y = 3;\n" +
                "int z = x / y;      // integer division\n" +
                "x = x % y;          // remainder\n" +
                "y = x + z * 2;      // * before +\n" +
                "System.out.println(x + \" \" + y + \" \" + z);",
            },
          ],
          tables: [
            {
              caption: "Trace table. Final output: 2 8 2",
              headers: ["Line", "x", "y", "z", "Notes"],
              rows: [
                ["int x = 8;", "8", "-", "-", "declare x"],
                ["int y = 3;", "8", "3", "-", "declare y"],
                ["int z = x / y;", "8", "3", "2", "8 / 3 truncates to 2"],
                ["x = x % y;", "2", "3", "2", "8 % 3 = 2"],
                ["y = x + z * 2;", "2", "6", "2", "z * 2 = 4 first, then 2 + 4"],
                ["println", "2", "6", "2", "prints \"2 6 2\""],
              ],
            },
          ],
        },
      ],
      practice: [
        {
          problem: "Without running it, determine the exact output:\n\nint total = 23;\nint size = 4;\nSystem.out.println(total / size + \" r \" + total % size);",
          hint: "Evaluate / and % as int operations, then let + concatenate left to right.",
          solution: [
            {
              explanation: "total / size is 23 / 4, integer division, which truncates 5.75 to 5.",
              code: "23 / 4  →  5",
            },
            {
              explanation: "total % size is the remainder: 23 - 4*5 = 3.",
              code: "23 % 4  →  3",
            },
            {
              explanation: "String concatenation joins the pieces: 5, \" r \", 3.",
              code: "output: 5 r 3",
            },
          ],
          answer: "5 r 3",
        },
        {
          problem:
            "A trace question: what are the final values of a and b?\n\nint a = 5;\nint b = 2;\na = a * b;      \nb = a - b;      \na = a / b;      ",
          hint: "Build the trace table; each line uses the CURRENT values.",
          solution: [
            {
              explanation: "Line 3: a = 5 * 2 = 10 (a is now 10, b still 2).",
            },
            {
              explanation: "Line 4: b = 10 - 2 = 8 (b is now 8).",
            },
            {
              explanation: "Line 5: a = 10 / 8, integer division, = 1.",
            },
          ],
          answer: "a is 1, b is 8.",
        },
        {
          problem:
            "Write one boolean expression that is true exactly when an int variable n is a positive multiple of 5.",
          hint: "Two conditions joined with &&; % tests divisibility.",
          solution: [
            {
              explanation: "Multiple of 5 means remainder 0 when divided by 5; positive means strictly greater than 0.",
              code: "n > 0 && n % 5 == 0",
            },
          ],
          answer: "n > 0 && n % 5 == 0",
        },
      ],
      commonMistakes: [
        "Reading 9 / 4 as 2.25 in an int context. Say \"truncate\" out loud every time both operands are ints.",
        "Updating a trace table with the NEW value of a variable that the line has not assigned yet; each line reads current values, then writes one box.",
        "Forgetting operator precedence: * / % before + -, so y = x + z * 2 multiplies first.",
      ],
      takeaways: [
        "Declared types decide behavior: int op int stays int, and / truncates.",
        "% gives remainders; n % k == 0 tests divisibility.",
        "Promotion to double happens only when a double is present IN the expression, not at assignment.",
        "Primitives copy values on assignment; boxes stay independent.",
        "Trace tables (one column per variable, one row per line) are this course's universal debugging and exam tool.",
      ],
    },
  ],

  flashcards: [
    {
      id: "cs2-fc-1.1-1",
      term: "Integer division",
      definition:
        "Division where both operands are ints: the decimal part is truncated (dropped toward zero), never rounded. Assigning the result to a double does not restore the lost decimals.",
      code: "7 / 2 == 3      -7 / 2 == -3\ndouble d = 7 / 2;   // d holds 3.0",
      unitId: 1,
      topicId: "1.1",
      importance: 3,
    },
    {
      id: "cs2-fc-1.1-2",
      term: "Modulo operator (%)",
      definition:
        "Gives the remainder of integer division. Standard uses: testing divisibility (n % k == 0), extracting digits (n % 10), and cycling through a range (i % size).",
      code: "17 % 5 == 2     n % 2 == 0  // n is even",
      unitId: 1,
      topicId: "1.1",
      importance: 3,
    },
    {
      id: "cs2-fc-1.1-3",
      term: "Type promotion",
      definition:
        "In a mixed int/double expression, the int operand is converted to double before the operation, so the result keeps decimals. Promotion happens inside the expression, not at assignment.",
      code: "17 / 5.0 == 3.4     (double) 17 / 5 == 3.4",
      unitId: 1,
      topicId: "1.1",
      importance: 2,
    },
  ],

  mcq: [
    {
      id: "cs2-mcq-1.1-1",
      unitId: 1,
      topicId: "1.1",
      difficulty: 1,
      skill: "Expression evaluation",
      questionText: "What value does the following expression evaluate to?",
      code: { code: "int result = 19 / 4 + 19 % 4;" },
      choices: [
        { letter: "A", text: "7", explanation: "Correct. 19 / 4 truncates to 4, and 19 % 4 is the remainder 3; 4 + 3 = 7." },
        { letter: "B", text: "8", explanation: "This treats 19 / 4 as rounding 4.75 up to 5. Integer division truncates, never rounds." },
        { letter: "C", text: "4.75", explanation: "Both operands of / are ints, so the division truncates before the addition; no decimals survive." },
        { letter: "D", text: "6", explanation: "This takes 19 % 4 as 2, but 4 * 4 = 16 leaves remainder 3, not 2." },
      ],
      correctChoice: "A",
      source: "original",
    },
    {
      id: "cs2-mcq-1.1-2",
      unitId: 1,
      topicId: "1.1",
      difficulty: 2,
      skill: "Code tracing",
      questionText: "What is printed by the following code segment?",
      code: {
        code: "int m = 12;\nint n = 5;\nm = m % n;\nn = n - m;\nSystem.out.println(m * 10 + n);",
      },
      choices: [
        { letter: "A", text: "23", explanation: "Correct. m becomes 12 % 5 = 2; n becomes 5 - 2 = 3; then 2 * 10 + 3 = 23." },
        { letter: "B", text: "25", explanation: "This keeps n at 5, missing that line 4 subtracts the NEW value of m (2) from n." },
        { letter: "C", text: "203", explanation: "This concatenates 20 and 3 as strings, but the whole expression is arithmetic (no string operand), so it adds." },
        { letter: "D", text: "120", explanation: "This uses m = 12 in the final line, but line 3 already replaced m with the remainder 2." },
      ],
      correctChoice: "A",
      source: "original",
    },
    {
      id: "cs2-mcq-1.1-3",
      unitId: 1,
      topicId: "1.1",
      difficulty: 2,
      skill: "Types",
      questionText: "After this line executes, what does d hold?",
      code: { code: "double d = 3 / 4 + 0.75;" },
      choices: [
        { letter: "A", text: "1.5", explanation: "This assumes 3 / 4 is 0.75, but both operands are ints: the division truncates to 0 first." },
        { letter: "B", text: "0.75", explanation: "Correct. 3 / 4 is int division giving 0; then 0 + 0.75 = 0.75 is stored." },
        { letter: "C", text: "0.0", explanation: "The addition of 0.75 still happens; only the 3 / 4 part truncated to 0." },
        { letter: "D", text: "1.0", explanation: "There is no rounding anywhere in this line; truncation gives 0, then plus 0.75." },
      ],
      correctChoice: "B",
      source: "original",
    },
    {
      id: "cs2-mcq-1.1-4",
      unitId: 1,
      topicId: "1.1",
      difficulty: 3,
      skill: "Code tracing",
      questionText: "Which values do x and y hold after this segment runs?",
      code: { code: "int x = 7;\nint y = 9;\nx = y % x;   // line A\ny = x % y;   // line B\nx = x + y;   // line C" },
      choices: [
        {
          letter: "A",
          text: "x is 4, y is 2",
          explanation: "Line B computes 2 % 9, which is 2 (not 0): when the left operand is smaller, the remainder is the left operand itself. Then line C gives x = 4. This choice has the right x but a y from a different line order.",
        },
        {
          letter: "B",
          text: "x is 4, y is 2 with the lines reversed",
          explanation: "The lines run strictly top to bottom; no reordering occurs.",
        },
        {
          letter: "C",
          text: "x is 4 and y is 2: line A gives 2, line B gives 2, line C gives 4",
          explanation:
            "Correct. Line A: x = 9 % 7 = 2. Line B: y = 2 % 9 = 2 (a smaller left operand IS the remainder). Line C: x = 2 + 2 = 4. Final: x = 4, y = 2.",
        },
        {
          letter: "D",
          text: "x is 2, y is 0",
          explanation: "This takes 2 % 9 to be 0, but 2 divided by 9 is 0 remainder 2; only the remainder is kept by %.",
        },
      ],
      correctChoice: "C",
      source: "original",
    },
    {
      id: "cs2-mcq-1.1-5",
      unitId: 1,
      topicId: "1.1",
      difficulty: 1,
      skill: "Concepts",
      questionText: "Which statement about primitive assignment in Java is true?",
      choices: [
        {
          letter: "A",
          text: "After int b = a; the variables share one storage box, so changing a changes b.",
          explanation: "Primitives copy values: b receives a copy of a's current value and the boxes stay independent.",
        },
        {
          letter: "B",
          text: "After int b = a; the variable b holds a copy of a's value, and later changes to a leave b unchanged.",
          explanation: "Correct. Assignment copies the value at that moment; there is no lasting link between primitive variables.",
        },
        {
          letter: "C",
          text: "Assignment is only legal if the two variables were declared on the same line.",
          explanation: "Variables may be assigned to each other whenever their types are compatible, regardless of where they were declared.",
        },
        {
          letter: "D",
          text: "An int variable can hold 3.5 if it is assigned from a double expression.",
          explanation: "Java refuses to assign a double expression to an int without an explicit cast; an int can never hold a fractional value.",
        },
      ],
      correctChoice: "B",
      source: "original",
    },
  ],

  frq: [
    {
      id: "cs2-frq-u1-1",
      type: "write-method",
      unitId: 1,
      topicIds: ["1.1"],
      context:
        "A vending machine returns change using the fewest coins. You will write a method that, given a number of cents from 0 to 99, reports how many quarters, dimes, nickels, and pennies to dispense, using integer division and modulo.",
      code: {
        caption: "Method signature to complete.",
        code:
          "/** Returns the coin counts for the given cents (0-99)\n" +
          " *  as a String \"q d n p\", using the fewest coins.\n" +
          " *  Example: makeChange(87) returns \"3 1 0 2\"\n" +
          " */\n" +
          "public static String makeChange(int cents)",
      },
      parts: [
        {
          letter: "a",
          task: "Write the complete method makeChange. Use integer division to count each coin and modulo to carry the remainder to the next smaller coin.",
          pointName: "Implementation",
          pointsAvailable: 6,
          modelSolution:
            "Work from the largest coin down. Integer division by the coin's value counts how many fit; modulo keeps what remains for the smaller coins. Concatenate with spaces.",
          solutionCode:
            "public static String makeChange(int cents) {\n" +
            "    int quarters = cents / 25;      // how many 25s fit\n" +
            "    cents = cents % 25;             // what remains\n" +
            "    int dimes = cents / 10;\n" +
            "    cents = cents % 10;\n" +
            "    int nickels = cents / 5;\n" +
            "    int pennies = cents % 5;        // what remains after 5s\n" +
            "    return quarters + \" \" + dimes + \" \" + nickels + \" \" + pennies;\n" +
            "}",
          scoringNotes:
            "1 point: correct quarters count via cents / 25. 1 point: remainder carried with % 25. 1 point: dimes and nickels each computed from the running remainder. 1 point: pennies as the final remainder. 1 point: returns (not prints) a String in \"q d n p\" order with spaces. 1 point: compiles as written (types, semicolons, signature untouched).",
          partialCreditNotes:
            "Recomputing from the original cents for every coin (e.g. dimes = cents / 10 without removing quarters) breaks the fewest-coins requirement and loses the two remainder points.",
        },
        {
          letter: "b",
          task: "Verify your method against this test table before revealing the solution: predict each output, then check.",
          pointName: "Testing",
          pointsAvailable: 2,
          modelSolution:
            "makeChange(87): 87/25=3 rem 12; 12/10=1 rem 2; 2/5=0 rem 2 → \"3 1 0 2\". makeChange(99): 3 quarters rem 24; 2 dimes rem 4; 0 nickels; 4 pennies → \"3 2 0 4\". makeChange(30): 1 quarter rem 5; 0 dimes; 1 nickel; 0 pennies → \"1 0 1 0\". makeChange(0): all zeros → \"0 0 0 0\".",
          scoringNotes:
            "1 point for correctly predicting all four outputs. 1 point for stating the edge case: 0 cents must return \"0 0 0 0\", which the division/modulo chain handles with no special casing.",
        },
      ],
      table: {
        caption: "Test cases for makeChange.",
        headers: ["Call", "Expected return"],
        rows: [
          ["makeChange(87)", "\"3 1 0 2\""],
          ["makeChange(99)", "\"3 2 0 4\""],
          ["makeChange(30)", "\"1 0 1 0\""],
          ["makeChange(0)", "\"0 0 0 0\""],
        ],
      },
      totalPoints: 8,
      source: "original",
    },
  ],
};
