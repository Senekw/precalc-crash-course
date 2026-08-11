// AP English Language & Composition · Strand 1: Rhetorical Situation.
// Reading track (1.R1-1.R4) and Writing track (1.W1-1.W4).
// Lesson 1.R1 below is the COURSE EXEMPLAR: every other lesson in this
// course must match its shape and depth. Worked "examples" here are
// analytical walkthroughs of short public-domain texts; practice problems
// are analysis prompts with step-by-step model readings.
//
// The strand writer APPENDS lessons 1.R2-1.R4 and 1.W1-1.W4 after the
// exemplar entries, keeping 1.R1 byte-for-byte unchanged.
// IMPORTANT: passages must be original or verified public-domain
// (pre-20th-century). Never reproduce copyrighted text.

import type { CourseUnitSlice } from "../../courseTypes";

export const u01: CourseUnitSlice = {
  unit: {
    id: 1,
    title: "Rhetorical Situation",
    weight: "Skill category 1",
    description:
      "Every text is an answer to a situation. This strand trains you to name the parts of that situation (exigence, writer, audience, purpose, context, message) when you read, and to write introductions, conclusions, and framing moves that answer your own situation when you write.",
    bigIdeas: [
      "Texts are strategic responses: someone writes, to someone, for a reason, under pressure of some occasion.",
      "Exigence is the spark: the event or urgency that makes the text necessary now.",
      "Claims about strategy must be tied to audience and purpose, or they are empty labels.",
      "Your own essays have a rhetorical situation too: the prompt is your exigence and the reader is your audience.",
    ],
    subTopics: [
      {
        id: "1.R1",
        unitId: 1,
        number: "1.R1",
        title: "Reading the Rhetorical Situation: Exigence, Audience, Purpose",
        summary:
          "The rhetorical situation is the set of circumstances a text answers: the exigence that provoked it, the writer who shapes it, the audience it must move, the purpose it pursues, and the context and message that carry it. Naming these precisely is the first move of every rhetorical analysis.",
        keyIdeas: [
          "Exigence: the occasion or urgency that calls the text into being; ask \"why this text, why now?\"",
          "Audience is never \"everyone\": identify the actual readers or listeners whose beliefs or actions the writer needs to change.",
          "Purpose is a verb aimed at the audience: to persuade them to X, console them for Y, unite them behind Z.",
          "Context (historical moment, venue, genre) constrains what strategies are available and how they will land.",
          "Strong analysis links choices to situation: the writer does X **because** this audience, this moment, this purpose.",
        ],
        formulas: [],
        commonMistakes: [
          "Describing the audience as \"the reader\" or \"everyone\" instead of the specific group whose response matters.",
          "Confusing subject (what the text is about) with purpose (what the text is trying to do to its audience).",
          "Summarizing the text's content instead of analyzing why its choices fit the situation.",
        ],
        workedExample: {
          problem:
            "A senator who just lost a close election gives a concession speech to supporters on election night. Identify the exigence, audience, and purpose.",
          solution:
            "Exigence: the loss itself, minutes old, demands a public response. Audience: primarily grieving supporters (secondarily the winner and the press). Purpose: to console supporters, affirm the legitimacy of the result, and preserve the senator's standing for the future.",
        },
      },
    ],
  },

  lessons: [
    {
      topicId: "1.R1",
      unitId: 1,
      title: "Reading the Rhetorical Situation: Exigence, Audience, Purpose",
      track: "Reading",
      objectives: [
        "Identify and describe the components of a text's rhetorical situation: exigence, writer, audience, purpose, context, and message.",
        "Distinguish a text's subject from its purpose, and a nominal audience from the audience whose response the writer actually needs.",
        "Explain how a specific choice in a text responds to its situation, using the because-structure the exam rewards.",
      ],
      intro:
        "Rhetorical analysis begins before the first device is named. The 2:1 rule of the AP reader: an essay that understands **why the text exists** beats an essay that lists ten devices. This lesson gives you the six-part map of any text's situation and drills the habit of asking, of every choice, \"what about this audience, at this moment, makes that the right move?\"",
      sections: [
        {
          heading: "The six components, and the questions that find them",
          body:
            "Every text on the exam can be unpacked with six questions. **Exigence**: what happened, or what pressure exists, that makes this text necessary now? **Writer**: who speaks, and what identity or authority do they carry or construct? **Audience**: who must be moved, and what do they believe walking in? **Purpose**: what change in that audience does the writer pursue? **Context**: what moment, venue, and genre surround the text? **Message**: what central claim carries the purpose? Memorize the questions, not just the labels; on the exam you will be handed a paragraph of background information, and these questions tell you what to mine it for.",
          callouts: [
            {
              label: "THE BECAUSE-TEST",
              text:
                "Any sentence of analysis should survive this template: \"The writer does **[choice]** because **[fact about audience, exigence, or purpose]**.\" If the second half is missing, you have identification, not analysis.",
            },
          ],
          tables: [
            {
              caption: "The six components applied to a familiar example: a school principal's morning-after email following a fire drill that went badly.",
              headers: ["Component", "Question it answers", "In the example"],
              rows: [
                ["Exigence", "Why this text, why now?", "Yesterday's chaotic drill; safety concern is urgent"],
                ["Writer", "Who speaks, with what standing?", "The principal, responsible for student safety"],
                ["Audience", "Who must be moved?", "Teachers who ran the drill loosely"],
                ["Purpose", "What change is sought?", "Stricter compliance at the next drill"],
                ["Context", "What moment and venue?", "Staff email, mid-semester, after a near-miss"],
                ["Message", "What claim carries it?", "Drills protect lives only if taken seriously"],
              ],
            },
          ],
        },
        {
          heading: "Exigence is not the same as topic",
          body:
            "Students lose points by writing \"the exigence is climate change\" when the text is an op-ed published the week after a hurricane. The **topic** is climate change; the **exigence** is the hurricane and the brief window of public attention it opened. Exigence explains timing and heat: it is the reason the text could not wait. When the exam's background paragraph tells you the date, the event that preceded the text, or the occasion of a speech, it is handing you the exigence.",
          examples: [
            {
              problem:
                "Background: \"In 1873, Susan B. Anthony was arrested, tried, and fined one hundred dollars for voting in the presidential election of 1872. Before her sentencing, she delivered a speech in which she asked, 'Is it a crime for a citizen of the United States to vote?'\" Identify the exigence, audience, and purpose of the speech.",
              steps: [
                {
                  explanation:
                    "Find the triggering pressure. The arrest and impending sentencing create the urgency; without them there is no speech. That is the exigence, not \"women's suffrage\" in general.",
                },
                {
                  explanation:
                    "Locate the audiences. Nominally the court; actually the public and the press who will carry her argument beyond the courtroom, since the verdict itself was already certain.",
                },
                {
                  explanation:
                    "Aim the purpose at the audience as a verb: to reframe her conviction as proof that citizens are being denied a constitutional right, converting a personal legal defeat into a public argument for suffrage.",
                },
              ],
              answer:
                "Exigence: her arrest and sentencing for voting. Audience: the courtroom in name, the wider public in fact. Purpose: to turn her prosecution into a demonstration that denying women the vote is the real crime.",
            },
          ],
        },
        {
          heading: "Audience determines strategy",
          body:
            "The same purpose demands different strategies before different audiences, and this is precisely where analysis earns its points. A writer urging vaccination writes differently for skeptical parents (reassurance, shared values, credible sources) than for legislators (costs, precedent, constituent pressure). When you can say **what the audience believes, fears, or wants walking in**, every choice in the text becomes explainable: this concession disarms that suspicion; this anecdote humanizes that statistic; this formal register earns that skeptical reader's trust.",
          examples: [
            {
              problem:
                "Two texts argue for the same city curfew for minors. Text 1, a mayor's televised address to residents, opens with the story of one family's late-night emergency-room vigil. Text 2, the same mayor's memo to the city council, opens with three years of incident statistics and the projected cost of extra patrols. Explain the difference using audience.",
              steps: [
                {
                  explanation:
                    "Name what each audience needs to be moved. Residents (including affected teens' parents) respond to safety made personal; their objection is emotional (\"my kid is fine\").",
                },
                {
                  explanation:
                    "Council members must justify a vote on the record; their objection is practical (cost, enforceability, precedent). Statistics and budget lines answer objections that a story cannot.",
                },
                {
                  explanation:
                    "State the link as analysis: the strategy differs because the audience's grounds for resistance differ, even though exigence and purpose are identical.",
                },
              ],
              answer:
                "Same purpose, different audiences: the address leads with narrative because residents are moved by personalized safety, while the memo leads with data because council members need defensible, budgetary grounds for a vote.",
            },
          ],
        },
      ],
      practice: [
        {
          problem:
            "Background: \"In 1588, as the Spanish Armada approached England, Queen Elizabeth I rode among her assembled troops at Tilbury and addressed them, saying she was resolved 'to live and die amongst you all.'\" Identify the exigence, the audience, and two purposes of the speech.",
          hint: "One purpose concerns the soldiers' behavior in battle; another concerns how they see a queen leading them.",
          solution: [
            {
              explanation:
                "Exigence: the imminent invasion; the fleet is approaching as she speaks, so the moment demands a rallying act now.",
            },
            {
              explanation:
                "Audience: the assembled soldiers (with the nation beyond them as a secondary audience once the speech circulated).",
            },
            {
              explanation:
                "Purposes: to steel the troops for battle (courage, loyalty), and to preempt doubt about a woman commanding in war by pledging her own life alongside theirs, binding her authority to their risk.",
            },
          ],
          answer:
            "Exigence: the Armada's imminent invasion. Audience: her assembled troops. Purposes: to embolden them to fight, and to secure their confidence in her leadership by sharing their danger.",
        },
        {
          problem:
            "A student council president emails the student body the night before a vote on moving homecoming off-campus, writing: \"Whatever you decide tomorrow, decide it yourselves. Don't let the loudest ten voices in the cafeteria choose for eight hundred of us.\" Identify the exigence and explain what the final sentence reveals about how the writer sees the audience.",
          hint: "What is the writer worried the audience will do, or fail to do?",
          solution: [
            {
              explanation: "Exigence: tomorrow's vote; the email must act tonight or not at all.",
            },
            {
              explanation:
                "The final sentence implies the writer sees the audience as passive and likely to defer to a vocal minority. The plea \"decide it yourselves\" targets apathy, not opposition: the president's fear is low turnout, so the purpose is mobilization rather than persuasion toward either side.",
            },
          ],
          answer:
            "Exigence: the next day's vote. The closing line shows the writer views the audience as disengaged and easily led, so the message aims at turnout (deciding at all) more than at either outcome.",
        },
      ],
      commonMistakes: [
        "Writing \"the audience is anyone who reads it.\" The exam's background paragraph almost always names or implies a specific audience; use it.",
        "Treating exigence as the broad social issue rather than the immediate occasion that makes the text urgent now.",
        "Identifying components without consequence. Naming the audience earns nothing; explaining how a choice answers that audience earns the point.",
      ],
      takeaways: [
        "Six questions unlock any text: why now (exigence), who speaks (writer), who must move (audience), toward what (purpose), amid what (context), carried by what claim (message).",
        "Exigence explains timing; topic does not. Mine the prompt's background paragraph for the occasion.",
        "Audience analysis is the engine of strategy analysis: what they believe walking in explains what the writer does.",
        "Every analytical sentence should pass the because-test: choice, because situation.",
      ],
    },
  ],

  flashcards: [
    {
      id: "el-fc-1.R1-1",
      term: "Rhetorical situation",
      definition:
        "The circumstances a text responds to: exigence, writer, audience, purpose, context, and message. Analysis connects a writer's choices to these circumstances.",
      unitId: 1,
      topicId: "1.R1",
      importance: 3,
    },
    {
      id: "el-fc-1.R1-2",
      term: "Exigence",
      definition:
        "The event, occasion, or urgency that calls a text into being; the answer to \"why this text, why now?\" Distinct from the text's general topic.",
      unitId: 1,
      topicId: "1.R1",
      importance: 3,
    },
    {
      id: "el-fc-1.R1-3",
      term: "Purpose vs. subject",
      definition:
        "Subject is what a text is about; purpose is what the text tries to do to its audience, best stated as a verb aimed at them (persuade, console, unite, mobilize).",
      unitId: 1,
      topicId: "1.R1",
      importance: 3,
    },
  ],

  mcq: [
    {
      id: "el-mcq-1.R1-1",
      unitId: 1,
      topicId: "1.R1",
      modeTag: "reading",
      difficulty: 1,
      skill: "Rhetorical situation",
      questionText:
        "A city's transit authority posts this notice in every station the day after a derailment injures twelve riders: \"Beginning immediately, all trains will operate at reduced speeds while independent inspectors examine every mile of track. We will publish their findings in full.\" The exigence of this notice is best described as which of the following?",
      choices: [
        {
          letter: "A",
          text: "The general importance of public transportation safety",
          explanation: "That is the broad topic, not the occasion. Exigence is the specific pressure that makes the text necessary now.",
        },
        {
          letter: "B",
          text: "The previous day's derailment and the public alarm it caused",
          explanation:
            "Correct. The derailment is the immediate event demanding a response; without it, no notice appears. Timing (\"the day after\") marks it as the exigence.",
        },
        {
          letter: "C",
          text: "The transit authority's desire to appear transparent",
          explanation: "Appearing transparent is part of the authority's purpose, the change it wants in riders' trust, not the occasion that provoked the notice.",
        },
        {
          letter: "D",
          text: "The independent inspectors' examination of the track",
          explanation: "The inspection is a promised action within the message, a strategy for restoring trust, not the circumstance that called the notice into being.",
        },
      ],
      correctChoice: "B",
      source: "original",
    },
    {
      id: "el-mcq-1.R1-2",
      unitId: 1,
      topicId: "1.R1",
      modeTag: "reading",
      difficulty: 2,
      skill: "Audience analysis",
      questionText:
        "A biologist writing about wetland loss publishes two pieces the same month: a data-dense article in a policy journal and a personal essay about her childhood marsh in a Sunday magazine. The difference between the two pieces most directly reflects a difference in which component of the rhetorical situation?",
      choices: [
        {
          letter: "A",
          text: "Exigence, because the two pieces respond to different environmental crises",
          explanation: "Both respond to the same ongoing loss of wetlands; the occasion has not changed between pieces.",
        },
        {
          letter: "B",
          text: "Audience, because policymakers and general readers are moved by different kinds of appeals",
          explanation:
            "Correct. Same writer, same subject, same month: what changes is who must be moved. Policy readers need defensible data; magazine readers are reached through narrative and feeling.",
        },
        {
          letter: "C",
          text: "Writer, because the biologist's credibility differs between publications",
          explanation: "The writer and her expertise are constant; how she deploys that credibility shifts because the readers shift.",
        },
        {
          letter: "D",
          text: "Message, because the two pieces argue for opposite conclusions",
          explanation: "Nothing indicates opposing conclusions; both pieces serve the same conservation purpose through different strategies.",
        },
      ],
      correctChoice: "B",
      source: "original",
    },
    {
      id: "el-mcq-1.R1-3",
      unitId: 1,
      topicId: "1.R1",
      modeTag: "reading",
      difficulty: 2,
      skill: "Purpose",
      questionText:
        "At a retirement dinner, a hospital's chief surgeon says of a departing nurse: \"For thirty years, the first face our sickest patients saw at 5 a.m. was hers. If you want to know what this hospital believes, watch what it applauds tonight.\" The final sentence most strongly suggests that the speaker's purpose extends beyond tribute to which additional aim?",
      choices: [
        {
          letter: "A",
          text: "Urging the audience to treat the values the nurse embodied as the institution's standard",
          explanation:
            "Correct. \"Watch what it applauds\" turns the applause into a public commitment: the speaker uses the tribute to define what the hospital should honor and expect going forward.",
        },
        {
          letter: "B",
          text: "Criticizing the hospital's administration for understaffing early shifts",
          explanation: "No criticism of staffing appears; the 5 a.m. detail establishes the nurse's devotion, not a complaint.",
        },
        {
          letter: "C",
          text: "Persuading the nurse to postpone her retirement",
          explanation: "Nothing asks her to stay; the speech accepts the departure and redirects attention to the audience's values.",
        },
        {
          letter: "D",
          text: "Informing new employees about the hospital's overnight procedures",
          explanation: "The mention of 5 a.m. is characterization, not procedural information; the sentence aims at values, not logistics.",
        },
      ],
      correctChoice: "A",
      source: "original",
    },
    {
      id: "el-mcq-1.R1-4",
      unitId: 1,
      topicId: "1.R1",
      modeTag: "writing",
      difficulty: 2,
      skill: "Writing for the situation",
      questionText:
        "A student is drafting an open letter asking the school board, which has cited budget deficits for two consecutive years, to restore funding for the debate team. Which opening sentence best addresses this audience's likely objection?",
      choices: [
        {
          letter: "A",
          text: "\"Debate changed my life, and cutting it broke my heart.\"",
          explanation:
            "The personal appeal ignores the board's stated constraint. A budget-minded audience's objection (cost) is left standing.",
        },
        {
          letter: "B",
          text: "\"The board's own priorities, college readiness at the lowest cost per student, are exactly what debate delivers: last year the team cost eleven dollars per student and produced our county's highest scholarship total.\"",
          explanation:
            "Correct. It concedes the audience's frame (cost discipline), then answers the objection inside that frame with numbers the board can defend publicly.",
        },
        {
          letter: "C",
          text: "\"It is shameful that a district this size cannot find money for its most successful team.\"",
          explanation: "Opening with an accusation hardens a skeptical audience; shame is a poor lever against readers who must defend a public budget.",
        },
        {
          letter: "D",
          text: "\"Many extracurricular activities have important benefits for students.\"",
          explanation: "The generic claim addresses no particular audience and answers no objection; it wastes the opening on what the board already accepts.",
        },
      ],
      correctChoice: "B",
      source: "original",
    },
    {
      id: "el-mcq-1.R1-5",
      unitId: 1,
      topicId: "1.R1",
      modeTag: "reading",
      difficulty: 3,
      skill: "Context and constraint",
      questionText:
        "A CEO must announce layoffs. Legal counsel has instructed that nothing in the announcement may admit fault for the company's decline. In the final text, the CEO writes that the industry \"has shifted beneath every company in our sector\" before announcing the cuts. This choice is best analyzed as a response to which feature of the rhetorical situation?",
      choices: [
        {
          letter: "A",
          text: "Context, because a legal constraint shapes which explanations the writer may offer",
          explanation:
            "Correct. The industry-wide framing attributes the layoffs to external forces, satisfying the legal constraint while still giving the audience an explanation; the choice is legible only through the situation's constraints.",
        },
        {
          letter: "B",
          text: "Exigence, because the industry shift is what made the announcement necessary",
          explanation:
            "The layoffs themselves are the occasion for the announcement; the industry framing is a strategic explanation shaped by constraint, not the trigger of the text.",
        },
        {
          letter: "C",
          text: "Message, because the announcement's main claim is that the industry has changed",
          explanation: "The main message is the layoffs; the industry line frames them. Mistaking frame for message misses why the sentence exists.",
        },
        {
          letter: "D",
          text: "Audience, because employees are more familiar with industry trends than with company finances",
          explanation: "No evidence supports that familiarity claim; the sentence's cause is the legal instruction, a constraint of context.",
        },
      ],
      correctChoice: "A",
      source: "original",
    },
  ],

  frq: [],
};
