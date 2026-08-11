// AP English Language · FRQ module: Rhetorical Analysis (Question 2).
// The first entry below is the COURSE EXEMPLAR FRQ: the 6-point rubric
// rendered as scorable parts (Thesis 1 / Evidence & Commentary 4 /
// Sophistication 1) with a fully annotated sample essay inside the
// Evidence & Commentary model solution. The module writer APPENDS 1-2
// more rhetorical-analysis FRQs matching this shape.
//
// Passages must be original or verified public-domain (the exemplar uses
// the closing of Lincoln's Second Inaugural Address, 1865, public domain).

import type { FRQ } from "../../courseTypes";

export const rhetoricalAnalysisFrqs: FRQ[] = [
  {
    id: "el-frq-ra-1",
    type: "rhetorical-analysis",
    unitId: 4,
    topicIds: ["1.R1"],
    context:
      "On March 4, 1865, with the Civil War weeks from its end after four years and enormous loss of life, President Abraham Lincoln delivered his Second Inaugural Address to a crowd that expected a victory speech. The passage below is the address's closing (public domain, excerpted). Read it carefully, then write an essay that analyzes the rhetorical choices Lincoln makes to convey his purpose. In your response you should: respond to the prompt with a defensible thesis; select and use evidence to support your line of reasoning; explain how the evidence supports your line of reasoning; and demonstrate an understanding of the rhetorical situation.",
    contextSetup:
      "Fondly do we hope, fervently do we pray, that this mighty scourge of war may\n" +
      "speedily pass away. Yet, if God wills that it continue until all the wealth piled\n" +
      "by the bondsman's two hundred and fifty years of unrequited toil shall be sunk,\n" +
      "and until every drop of blood drawn with the lash shall be paid by another drawn\n" +
      "with the sword, as was said three thousand years ago, so still it must be said\n" +
      "\"the judgments of the Lord are true and righteous altogether.\"\n\n" +
      "With malice toward none, with charity for all, with firmness in the right as God\n" +
      "gives us to see the right, let us strive on to finish the work we are in, to bind\n" +
      "up the nation's wounds, to care for him who shall have borne the battle and for\n" +
      "his widow and his orphan, to do all which may achieve and cherish a just and\n" +
      "lasting peace among ourselves and with all nations.",
    parts: [
      {
        letter: "A",
        task: "**Row A · Thesis (0-1 point).** Write a defensible thesis that analyzes the writer's rhetorical choices, then check it against the rubric.",
        pointName: "Thesis",
        pointsAvailable: 1,
        modelSolution:
          "Sample thesis that earns the point: \"Speaking to a victorious North hungry for vindication, Lincoln refuses triumph: through biblical framing that assigns the war's cost to divine justice rather than Southern guilt, and through a closing sentence built on parallel acts of mercy, he redefines victory as shared repair, preparing his audience to accept a peace without vengeance.\" It earns Row A because it makes a claim about HOW choices serve a purpose, and it is defensible from the text alone.",
        scoringNotes:
          "1 point for a defensible thesis that responds to the prompt by analyzing rhetorical choices tied to purpose. 0 points for restating the prompt, summarizing the passage, or a thesis with no analytic claim (\"Lincoln uses ethos, pathos, and logos\").",
      },
      {
        letter: "B",
        task:
          "**Row B · Evidence and Commentary (0-4 points).** Draft the body of the essay: specific evidence from the passage, with commentary that explains how each piece supports your line of reasoning. Compare your draft with the annotated sample.",
        pointName: "Evidence & Commentary",
        pointsAvailable: 4,
        modelSolution:
          "Annotated sample body (annotations in brackets show the rubric work each move does):\n\n" +
          "\"Lincoln's audience expected an accounting of enemies; he gives them a theology of shared debt. The war is 'this mighty scourge,' a word that casts four years of battle as an affliction sent, not a contest won. [EVIDENCE: specific word choice] By reckoning the war's length against 'two hundred and fifty years of unrequited toil,' Lincoln sets Northern suffering beside the longer ledger of slavery, so that no listener, Northern or Southern, can hear the cost as someone else's bill. [COMMENTARY: explains what the choice does to the audience's expected frame] The conditional 'if God wills that it continue' is the passage's most audacious move: it strips both armies of authorship over the war's end, and with it, the North's standing to gloat. [COMMENTARY tied to purpose: disarming vindication] Quoting the psalm, 'the judgments of the Lord are true and righteous altogether,' he borrows an authority his audience cannot argue with; submission to that verdict, not victory, becomes the speech's ground. [EVIDENCE + COMMENTARY: allusion analyzed for its effect on a pious audience]\n\n" +
          "Then the register turns from judgment to labor. The final sentence marches through parallel infinitives, 'to bind up... to care for... to do all which may achieve,' a grammar of tasks rather than triumphs. [EVIDENCE: syntax identified precisely] Each object of care, 'him who shall have borne the battle,' 'his widow,' 'his orphan,' is singular and personal, shrinking the war's arithmetic to one family at a time; mercy is made concrete enough to perform. [COMMENTARY: links syntax and diction to the redefinition of victory as repair] The famous opening triad, 'with malice toward none, with charity for all,' places the renunciation of revenge grammatically before every task that follows, making forgiveness the precondition of the work, exactly the sequence Lincoln needs his audience to accept. [SOPHISTICATION-LEVEL move: notices ordering as argument]\"",
        scoringNotes:
          "4 points: specific evidence throughout, with commentary that consistently explains how the evidence supports the line of reasoning, and multiple choices analyzed. 3 points: specific evidence with commentary that sometimes explains, sometimes only labels or repeats. 2 points: some specific evidence, but commentary summarizes rather than analyzes. 1 point: evidence mostly general or paraphrase. 0 points: no relevant evidence.",
        partialCreditNotes:
          "The most common cap at 2 points is device-listing: naming parallelism and allusion without explaining what each does to THIS audience at THIS moment.",
      },
      {
        letter: "C",
        task: "**Row C · Sophistication (0-1 point).** Identify where your essay could demonstrate sophistication, then check the sample's qualifying moves.",
        pointName: "Sophistication",
        pointsAvailable: 1,
        modelSolution:
          "Qualifying moves in the sample: (1) it situates the passage inside the tension of the rhetorical situation (a victory audience handed a speech that refuses victory) and reads every choice against that tension; (2) it identifies complexity in the argument itself, the audacity of assigning the war to divine justice while the war was still killing the audience's sons; (3) its own style stays controlled and precise. Any ONE sustained move of this kind can earn the point.",
        scoringNotes:
          "1 point for sophistication of thought or a persuasive style sustained throughout: exploring tensions or complexities in the passage, situating it in its broader context, or consistently vivid and precise prose. 0 points for isolated flourishes, generic statements about \"society,\" or complexity asserted but not shown.",
      },
    ],
    totalPoints: 6,
    source: "original prompt; passage: Abraham Lincoln, Second Inaugural Address (1865), public domain",
  },
];
