// AP Art History · Content Area 1: Global Prehistory (works 1-11).
// Work 1 below is the COURSE EXEMPLAR: every one of the 250 required
// works gets an entry of exactly this shape: identification metadata in
// `work`, then Form / Function / Content / Context sections, an exam-
// connections note, and one flashcard. No images are embedded or
// hotlinked; each entry carries an external link-out slot instead.
//
// The content-area writer APPENDS works 2-11 after the exemplar entries,
// keeping work 1 byte-for-byte unchanged. Identification facts must match
// the official image set; anything uncertain gets a "// FLAGGED:" comment.

import type { CourseUnitSlice } from "../../courseTypes";

export const ca01: CourseUnitSlice = {
  unit: {
    id: 1,
    title: "Global Prehistory",
    weight: "Content area 1 · 11 works · about 4% of the exam",
    description:
      "Before writing, before cities, humans were already making images and objects that carried meaning: painted animals, portable figures, monumental stone arrangements. Content Area 1 spans roughly 30,000 to 500 B.C.E. across every inhabited continent, and its works anchor the course's core habit: reasoning about function and context from physical evidence alone.",
    bigIdeas: [
      "With no written records, every claim about prehistoric art rests on form, material, findspot, and archaeological context.",
      "Portable objects (figurines, beads) and fixed sites (caves, megaliths) imply different mobilities and different social uses.",
      "Recurring subjects, animals, the human female figure, celestial alignments, suggest shared human concerns across isolated cultures.",
      "Materials were chosen deliberately: durability, color, rarity, and workability all carried meaning.",
    ],
    subTopics: [
      {
        id: "work-1",
        unitId: 1,
        number: "Work 1",
        title: "Apollo 11 stones",
        summary:
          "Seven small charcoal-drawn animal plaques from a cave in Namibia, among the oldest dated artworks from the African continent (c. 25,500-25,300 B.C.E.). Their portability, careful drawing, and cave findspot make them the course's opening argument that image-making is an ancient, fundamental human behavior.",
        keyIdeas: [
          "Identification: Apollo 11 stones, Namibia, c. 25,500-25,300 B.C.E., charcoal on stone.",
          "The animal (possibly a feline with human-like hind legs) may mix species, hinting at symbolic rather than literal representation.",
          "The plaques were carried into the cave, brought from elsewhere; portable art implies planning and value.",
          "Dated by the charcoal layers of the excavation context, a model of how archaeology anchors prehistoric chronology.",
        ],
        formulas: [],
        commonMistakes: [
          "Confusing the Apollo 11 stones (Namibia, drawn plaques) with the Lascaux or Chauvet cave paintings (Europe, painted walls).",
          "Writing \"the artist intended...\" as fact; for prehistory, intent is inference and answers must be framed as supported speculation.",
          "Misplacing the date: these are Paleolithic, tens of thousands of years before Stonehenge or the White Temple.",
        ],
        workedExample: {
          problem:
            "An attribution question shows a small stone plaque with a charcoal quadruped. What features justify attributing it to the Apollo 11 stones rather than to a European cave tradition?",
          solution:
            "Support: it is a portable plaque (not a wall painting), drawn in charcoal line rather than polychrome pigment, with a single profiled quadruped; provenance in southern Africa. European parallels are typically painted directly on cave walls with shading and multiple overlapping animals.",
        },
      },
    ],
  },

  lessons: [
    {
      topicId: "work-1",
      unitId: 1,
      title: "Apollo 11 stones",
      work: {
        workNumber: 1,
        artist: "Unknown (ancestral San peoples region), Namibia",
        date: "c. 25,500-25,300 B.C.E.",
        sortYear: -25500,
        materials: "Charcoal on stone",
        location: "Found in the Apollo 11 Cave, Huns Mountains, southwestern Namibia; plaques now held in Windhoek, Namibia",
        imageNote: "View on Smarthistory (search \"Apollo 11 Cave Stones\") or in the official image set.",
        imageUrl: "https://smarthistory.org/apollo-11-stones/",
      },
      objectives: [
        "State the full identification: title, region, date range, and material.",
        "Analyze the work's form and materials, and explain what its portability implies about its function.",
        "Explain how excavation context dates the stones and why that method matters for all prehistoric attributions.",
      ],
      intro:
        "The AP Art History course begins with seven hand-sized stone plaques from a cave in the Huns Mountains of Namibia. They are not the oldest art on Earth, but they are among the oldest **dated** artworks in Africa, and the difference between old and dated is the whole lesson: everything we can responsibly say about prehistoric art flows from context, material, and form, not from written testimony.",
      sections: [
        {
          heading: "Form: line, profile, and a possibly impossible animal",
          body:
            "Each plaque carries a charcoal drawing in confident contour line, the main surviving image showing a quadruped in strict profile. The animal reads most nearly as a **feline**, but its hindquarters bend with an almost human articulation, and later viewers have seen bovid horns in the head. Whether the beast mixes species by intent or accident cannot be settled; what the drawing does establish is control: a steady outline, proportions held consistent, the leg positions describing a stance rather than a scatter of marks. This is picture-making, not doodling.",
          callouts: [
            {
              label: "VOCABULARY",
              text:
                "**Composite creature**: a represented being combining features of more than one species. If the Apollo 11 feline is composite, it would anticipate therianthropes (part-human, part-animal figures) found in later prehistoric art, a possible signal of belief or ritual rather than observation.",
            },
          ],
        },
        {
          heading: "Function: what a portable image can do",
          body:
            "The plaques' stone is not the cave's stone: the pieces were made elsewhere, or at least their material was carried in, and the drawings traveled with their owners before coming to rest in the shelter. Portability changes the interpretive frame. A wall painting serves its one place; a carried image serves its **carrier**, as possession, token, story-prop, or object of exchange. No single function can be proven, and the exam rewards exactly that honesty: state the physical facts (small, portable, deposited in an occupied rock shelter) and frame function as inference bounded by them.",
          callouts: [
            {
              label: "EXAM LANGUAGE",
              text:
                "For prehistoric works, credit follows claims framed as evidence-based inference: \"the plaques' portability **suggests** they held personal or ritual value to people who carried them,\" never \"the artist believed...\" stated as fact.",
            },
          ],
        },
        {
          heading: "Content: an animal without a scene",
          body:
            "The image offers a single animal, no ground line, no landscape, no human hunter, no narrative apparatus at all. That minimalism is itself information. Across Paleolithic image-making worldwide, animals dominate subject matter long before scenes of human activity appear, which suggests that the animal itself, its identity, its power, perhaps its spirit, was the message. Interpreters have proposed hunting magic, totemic identity, and shamanic vision; the plaque underdetermines all of them, and a strong response presents these as competing hypotheses.",
        },
        {
          heading: "Context: the excavation that made the date",
          body:
            "The cave (nicknamed for the 1969 Apollo 11 mission, contemporaneous with the excavation led by archaeologist W. E. Wendt) preserved stratified deposits: layered floors of hearth charcoal and artifacts. The plaques lay within layers whose charcoal could be radiocarbon-dated to roughly 25,500-25,300 B.C.E. The artwork is dated **by its layer**, not by its style. This is the method the whole content area leans on, and it is why removing an object from its findspot (looting) destroys knowledge even when the object survives.",
          callouts: [
            {
              label: "METHOD",
              text:
                "**Radiocarbon dating** measures the decay of carbon-14 in organic material (here, hearth charcoal in the surrounding layer). The stones themselves cannot be radiocarbon-dated; their **context** can. Stratigraphy plus radiocarbon equals the date range you memorize.",
            },
          ],
        },
        {
          heading: "Connections: where this work appears on the exam",
          body:
            "Expect the Apollo 11 stones in three roles. **Attribution**: a small charcoal-on-stone plaque with a profiled animal, southern African provenance. **Comparison**: against European cave painting (fixed site versus portable object; both animal-centered), or against later portable figures like the Camelid sacrum or Anthropomorphic stele for the theme of carried meaning. **Method questions**: how do we know its date, and what can and cannot be claimed about its function? The work is the course's cleanest case study in arguing from evidence.",
        },
      ],
      practice: [
        {
          problem:
            "Compare/contrast practice: identify one similarity and one difference in how the Apollo 11 stones and a European cave painting tradition (such as Lascaux) present animal imagery, and state what each difference implies about use.",
          hint: "Think portable versus fixed, and drawn line versus painted polychrome.",
          solution: [
            {
              explanation:
                "Similarity: both center on animals in profile, with no narrative setting, suggesting the animal itself carried the meaning in both traditions.",
            },
            {
              explanation:
                "Difference: the Apollo 11 images are charcoal drawings on hand-sized portable plaques, usable and movable by individuals, while Lascaux's images are large polychrome paintings bound to fixed, deep cave walls, implying use tied to a specific place, possibly by gathered groups.",
            },
          ],
          answer:
            "Both traditions foreground profiled animals without scenes; but portability (Apollo 11) implies personal, movable significance while fixed monumental walls (Lascaux) imply site-bound, perhaps communal use.",
        },
      ],
      commonMistakes: [
        "Calling them paintings. They are charcoal drawings on stone plaques; medium and support are part of the identification credit.",
        "Attributing them to \"cave artists painting walls.\" The images were carried into the cave, which is central to their interpretation.",
        "Overclaiming function. Hunting magic and ritual use are hypotheses; the scored move is tying any function claim to portability and findspot.",
      ],
      takeaways: [
        "Identification: Apollo 11 stones · Namibia · c. 25,500-25,300 B.C.E. · charcoal on stone.",
        "Among the oldest securely dated artworks of the African continent; dated by radiocarbon on the surrounding excavation layers.",
        "A profiled, possibly composite animal in confident contour line, with no scene: the animal is the message.",
        "Portability implies carried value; function claims must be framed as inference from physical evidence.",
        "Core comparisons: European cave painting (fixed vs. portable) and later portable ritual objects.",
      ],
    },
  ],

  flashcards: [
    {
      id: "ah-fc-1-1",
      term: "Apollo 11 stones",
      definition:
        "Namibia, c. 25,500-25,300 B.C.E., charcoal on stone. Portable plaques bearing a profiled (possibly composite) animal; among the oldest dated African artworks, dated by radiocarbon on their excavation layers. Portability suggests carried personal or ritual value.",
      unitId: 1,
      topicId: "work-1",
      importance: 3,
    },
  ],

  mcq: [
    {
      id: "ah-mcq-ca1-1",
      unitId: 1,
      topicId: "work-1",
      difficulty: 2,
      skill: "Attribution",
      questionText:
        "A hand-sized stone plaque bears a charcoal drawing of a quadruped in profile, excavated from stratified cave deposits in southwestern Africa. The work is most likely which of the following?",
      choices: [
        {
          letter: "A",
          text: "A fragment of the Lascaux cave paintings",
          explanation: "Lascaux's images are polychrome paintings fixed on French cave walls, not portable charcoal plaques from Africa.",
        },
        {
          letter: "B",
          text: "One of the Apollo 11 stones",
          explanation:
            "Correct. Portable plaque, charcoal medium, profiled animal, and southern African stratified cave context together identify the Apollo 11 stones.",
        },
        {
          letter: "C",
          text: "An Anthropomorphic stele",
          explanation: "Steles are upright carved stone markers with human features, not drawn animal plaques.",
        },
        {
          letter: "D",
          text: "A petroglyph from the Great Gallery at Horseshoe Canyon",
          explanation: "Horseshoe Canyon's images are large painted anthropomorphic figures on fixed rock walls in North America.",
        },
      ],
      correctChoice: "B",
      source: "original",
    },
    {
      id: "ah-mcq-ca1-2",
      unitId: 1,
      topicId: "work-1",
      difficulty: 2,
      skill: "Method and context",
      questionText: "The date range assigned to the Apollo 11 stones (c. 25,500-25,300 B.C.E.) rests primarily on which evidence?",
      choices: [
        {
          letter: "A",
          text: "Stylistic comparison with dated European cave paintings",
          explanation: "Style cannot anchor absolute dates across unconnected regions; the dating is independent of Europe.",
        },
        {
          letter: "B",
          text: "Radiocarbon dating of charcoal in the excavation layers containing the plaques",
          explanation:
            "Correct. The stones lay in stratified deposits whose organic material (hearth charcoal) was radiocarbon-dated; the artwork takes its date from its context.",
        },
        {
          letter: "C",
          text: "Written records preserved by descendant communities",
          explanation: "No writing exists from this period; prehistory is defined by the absence of written records.",
        },
        {
          letter: "D",
          text: "Chemical analysis of the charcoal drawing itself",
          explanation: "The drawn charcoal is too scant to date reliably; the layer's abundant hearth charcoal, not the drawing, was tested.",
        },
      ],
      correctChoice: "B",
      source: "original",
    },
  ],

  frq: [],
};
