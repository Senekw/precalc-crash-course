// AP Biology · Unit 1: Chemistry of Life.
// Topics 1.1-1.6. Topic 1.1 below is the COURSE EXEMPLAR: every other
// lesson in this course must match its shape and depth, including original
// SVG diagrams where the topic needs them, and the FRQ below sets the
// rubric-point standard (short FRQ, 4 points, Describe / Explain /
// Predict / Justify).
//
// The unit writer APPENDS topics 1.2-1.6 after the exemplar entries,
// keeping topic 1.1 byte-for-byte unchanged.

import type { CourseUnitSlice } from "../../courseTypes";

const waterDiagram = `<svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" font-family="inherit" font-size="13">
  <defs>
    <radialGradient id="oxy" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#f87171" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#dc2626" stop-opacity="0.85"/>
    </radialGradient>
    <radialGradient id="hyd" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#e5e7eb"/>
      <stop offset="100%" stop-color="#9ca3af"/>
    </radialGradient>
  </defs>
  <!-- molecule 1 -->
  <circle cx="150" cy="120" r="38" fill="url(#oxy)"/>
  <circle cx="98" cy="170" r="22" fill="url(#hyd)"/>
  <circle cx="202" cy="170" r="22" fill="url(#hyd)"/>
  <line x1="128" y1="146" x2="110" y2="158" stroke="currentColor" stroke-width="2" stroke-opacity="0.5"/>
  <line x1="172" y1="146" x2="190" y2="158" stroke="currentColor" stroke-width="2" stroke-opacity="0.5"/>
  <text x="150" y="126" text-anchor="middle" fill="#fff" font-weight="700">O</text>
  <text x="98" y="175" text-anchor="middle" fill="#111" font-weight="700">H</text>
  <text x="202" y="175" text-anchor="middle" fill="#111" font-weight="700">H</text>
  <text x="150" y="66" text-anchor="middle" fill="currentColor">partial negative charge (δ−)</text>
  <text x="150" y="215" text-anchor="middle" fill="currentColor">partial positive charges (δ+)</text>
  <!-- molecule 2 -->
  <circle cx="420" cy="150" r="30" fill="url(#oxy)"/>
  <circle cx="380" cy="190" r="17" fill="url(#hyd)"/>
  <circle cx="461" cy="188" r="17" fill="url(#hyd)"/>
  <text x="420" y="155" text-anchor="middle" fill="#fff" font-weight="700">O</text>
  <text x="380" y="195" text-anchor="middle" fill="#111" font-weight="700">H</text>
  <text x="461" y="193" text-anchor="middle" fill="#111" font-weight="700">H</text>
  <!-- hydrogen bond -->
  <line x1="224" y1="176" x2="388" y2="158" stroke="currentColor" stroke-width="2.5" stroke-dasharray="7 6" stroke-opacity="0.8"/>
  <text x="306" y="152" text-anchor="middle" fill="currentColor" font-weight="600">hydrogen bond</text>
  <text x="306" y="196" text-anchor="middle" fill="currentColor" font-size="12">δ+ hydrogen attracted to δ− oxygen of a neighbor</text>
</svg>`;

export const u01: CourseUnitSlice = {
  unit: {
    id: 1,
    title: "Chemistry of Life",
    weight: "8-11% of the exam",
    description:
      "Life runs on water and carbon. This unit builds the chemistry the rest of the course stands on: the polarity and hydrogen bonding that give water its life-supporting properties, and the monomer-polymer logic of carbohydrates, lipids, proteins, and nucleic acids.",
    bigIdeas: [
      "Water's polarity and hydrogen bonding explain cohesion, adhesion, temperature buffering, and solvent behavior.",
      "Living systems are built from a small set of elements, with carbon's four bonds enabling molecular diversity.",
      "Macromolecules are polymers assembled by dehydration synthesis and disassembled by hydrolysis.",
      "Structure determines function at every scale, from R-groups to protein folds to base pairing.",
      "The directionality of nucleic acids (5' to 3') underlies replication and information flow.",
    ],
    subTopics: [
      {
        id: "1.1",
        unitId: 1,
        number: "1.1",
        title: "Structure of Water and Hydrogen Bonding",
        summary:
          "Water is a polar molecule: its bent shape and oxygen's greater electronegativity leave the oxygen end partially negative and the hydrogens partially positive. The resulting hydrogen bonds between molecules produce cohesion, adhesion, surface tension, temperature buffering, and water's power as a solvent.",
        keyIdeas: [
          "Unequal electron sharing in each O-H bond (polar covalent bonds) plus the bent geometry make water a polar molecule.",
          "A hydrogen bond is a weak attraction between a δ+ hydrogen of one molecule and a δ− atom (O or N) of another; individually weak, collectively powerful.",
          "Cohesion (water to water) and adhesion (water to other polar surfaces) together drive capillary action and transpiration in plants.",
          "Hydrogen bonding gives water a high specific heat and high heat of vaporization, buffering temperature for organisms and ecosystems.",
          "\"Like dissolves like\": polar and charged (hydrophilic) substances dissolve in water; nonpolar (hydrophobic) substances do not.",
        ],
        formulas: [],
        commonMistakes: [
          "Calling the attraction between H and O within one water molecule a hydrogen bond; within a molecule the bonds are polar covalent, hydrogen bonds are BETWEEN molecules.",
          "Saying water's properties come from \"strong\" hydrogen bonds; each bond is weak, the properties come from their sheer number and constant re-forming.",
          "Confusing cohesion (water-water) with adhesion (water-surface) when explaining capillary action.",
        ],
        workedExample: {
          problem:
            "A water strider walks on a pond without sinking. Identify the property responsible and explain it at the molecular level.",
          solution:
            "Surface tension, a consequence of cohesion. Surface water molecules hydrogen-bond to neighbors beside and below them, creating a net inward pull that makes the surface behave like an elastic film able to support the insect's weight.",
        },
      },
    ],
  },

  lessons: [
    {
      topicId: "1.1",
      unitId: 1,
      title: "Structure of Water and Hydrogen Bonding",
      objectives: [
        "Explain how the polarity of the water molecule arises from its bent shape and oxygen's electronegativity.",
        "Distinguish polar covalent bonds within a water molecule from hydrogen bonds between molecules.",
        "Connect hydrogen bonding to water's emergent properties: cohesion, adhesion, surface tension, temperature buffering, and solvent action.",
      ],
      intro:
        "Every AP Biology course opens with water for a reason: nearly every property that makes Earth habitable traces back to one small, bent, polar molecule. This lesson builds the causal chain the exam loves to test: **electronegativity → polarity → hydrogen bonding → emergent properties**. Learn the chain, not the list; FRQ prompts ask you to explain each link.",
      sections: [
        {
          heading: "A bent, polar molecule",
          body:
            "Each O-H bond in water is **polar covalent**: oxygen attracts the shared electrons more strongly than hydrogen does (it is more electronegative), so electrons spend more time near the oxygen. Because the molecule is bent rather than linear, the two bond polarities do not cancel. The oxygen end carries a partial negative charge, written $\\delta^-$, and each hydrogen carries a partial positive charge, $\\delta^+$. A molecule with this kind of charge separation is **polar**.",
          callouts: [
            {
              label: "DEFINITION",
              text:
                "**Polarity**: an unequal distribution of charge across a molecule, caused by unequal electron sharing and asymmetric shape. Water's bent geometry is what keeps the bond polarities from canceling.",
            },
          ],
          figures: [
            {
              svg: waterDiagram,
              caption:
                "Two water molecules. Within each molecule, O-H bonds are polar covalent; the dashed line BETWEEN molecules is a hydrogen bond from a δ+ hydrogen to a neighboring δ− oxygen.",
            },
          ],
        },
        {
          heading: "Hydrogen bonds: weak alone, mighty together",
          body:
            "Opposite partial charges attract. The $\\delta^+$ hydrogen of one water molecule is drawn to the $\\delta^-$ oxygen of a neighbor, forming a **hydrogen bond**. One hydrogen bond is roughly 5 to 10 percent as strong as a covalent bond and lasts only picoseconds; but every water molecule can form up to four at once, and in liquid water they break and re-form constantly. Almost everything special about water is an **emergent property** of this network, a behavior of the collection that no single molecule has.",
          callouts: [
            {
              label: "EXAM LANGUAGE",
              text:
                "Hydrogen bonds form **between** molecules (intermolecular), never within one water molecule. Marking this distinction precisely is routinely worth a point on the FRQ section.",
            },
          ],
          examples: [
            {
              problem:
                "Explain why water resists temperature change more than most liquids, and why sweating cools you.",
              steps: [
                {
                  explanation:
                    "Heating water means making its molecules move faster. Before they can speed up, energy must first break hydrogen bonds, so a large energy input produces only a small temperature rise. This is water's high **specific heat**.",
                },
                {
                  explanation:
                    "Evaporating water means separating molecules from the liquid entirely, which requires breaking ALL of a molecule's hydrogen bonds. This is water's high **heat of vaporization**.",
                },
                {
                  explanation:
                    "Sweat cools because the highest-energy molecules evaporate first, and each departing molecule carries away the energy used to free it from the hydrogen-bond network, leaving the remaining liquid (and your skin) cooler.",
                },
              ],
              answer:
                "Hydrogen bonds absorb energy as they break, giving water a high specific heat and high heat of vaporization; evaporation removes the most energetic molecules, cooling the surface.",
            },
          ],
        },
        {
          heading: "Cohesion, adhesion, and life's plumbing",
          body:
            "**Cohesion** is water sticking to water via hydrogen bonds; **adhesion** is water sticking to other polar or charged surfaces. At a pond's surface, cohesion produces **surface tension**. Inside a plant, the two work as a team: adhesion grips the walls of narrow xylem vessels while cohesion lets evaporation at the leaves pull an unbroken column of water up from the roots (the transpiration-cohesion-tension mechanism, which returns in Unit 8's ecology of water movement and in the transpiration lab).",
          examples: [
            {
              problem:
                "A thin glass tube is placed in water and the water climbs several centimeters up the tube. Identify the two properties involved and assign each its role.",
              steps: [
                {
                  explanation:
                    "Adhesion: water molecules hydrogen-bond to the polar silica surface of the glass, so the edge of the water creeps upward along the wall.",
                },
                {
                  explanation:
                    "Cohesion: each climbing molecule drags neighbors with it through water-to-water hydrogen bonds, so the whole column rises rather than just a film on the glass.",
                },
              ],
              answer:
                "Capillary action: adhesion pulls water up the polar glass surface and cohesion pulls the rest of the column along behind it.",
            },
          ],
        },
        {
          heading: "Water the solvent",
          body:
            "Because water is polar, it surrounds and separates charged and polar solutes: $\\delta^-$ oxygens orient toward cations, $\\delta^+$ hydrogens toward anions, forming hydration shells. Substances that dissolve readily (ions, sugars, most proteins) are **hydrophilic**; nonpolar substances like fats exclude from the network and are **hydrophobic**. This single idea, like dissolves like, predicts membrane structure in Unit 2: phospholipids have a hydrophilic head and hydrophobic tails, so they self-assemble into bilayers.",
          callouts: [
            {
              label: "LOOKING AHEAD",
              text:
                "Hydrophobic exclusion is not a bond but an organizing force. It builds membranes (Unit 2) and folds proteins (Unit 1.5): nonpolar R-groups bury themselves away from water.",
            },
          ],
        },
      ],
      practice: [
        {
          problem:
            "Ice floats on liquid water. Using hydrogen bonding, explain why solid water is LESS dense than liquid water, and give one consequence for organisms.",
          hint: "Think about what a fixed lattice of hydrogen bonds does to the spacing between molecules.",
          solution: [
            {
              explanation:
                "As water freezes, each molecule locks into a lattice with stable hydrogen bonds to four neighbors. The lattice holds molecules at arm's length, farther apart on average than in the liquid, where bonds constantly break and molecules pack closer.",
            },
            {
              explanation:
                "Lower density means ice floats, so ponds freeze from the top down. The surface ice insulates the water below, letting aquatic organisms survive winter under a liquid habitat.",
            },
          ],
          answer:
            "The frozen hydrogen-bond lattice spaces molecules farther apart than in liquid water, so ice is less dense and floats; surface ice then insulates the liquid below, protecting aquatic life.",
        },
        {
          problem:
            "Table salt (NaCl) dissolves readily in water, but olive oil does not. Explain both observations at the molecular level.",
          hint: "Where do the partial charges of water point in each case?",
          solution: [
            {
              explanation:
                "NaCl: water's $\\delta^-$ oxygens orient toward Na$^+$ and its $\\delta^+$ hydrogens toward Cl$^-$, forming hydration shells that pull the ions apart and keep them dispersed. Charged solutes are hydrophilic.",
            },
            {
              explanation:
                "Olive oil is nonpolar: it offers no charges for water to attract. Water molecules hydrogen-bond to each other instead, and the oil is excluded from the network, clumping with itself. Nonpolar solutes are hydrophobic.",
            },
          ],
          answer:
            "Water's partial charges dismantle ionic NaCl into hydrated ions, but nonpolar oil offers no attractions, so the hydrogen-bonding network excludes it.",
        },
        {
          problem:
            "During transpiration, water travels from a redwood's roots to leaves over 90 meters up. Name the two properties of water responsible and describe the role of each.",
          hint: "One property acts between water molecules, the other between water and the xylem wall.",
          solution: [
            {
              explanation:
                "Cohesion: hydrogen bonds between water molecules keep the column in the xylem continuous, so tension created by evaporation at the top pulls the entire column upward.",
            },
            {
              explanation:
                "Adhesion: hydrogen bonds between water and the polar xylem walls resist gravity's pull on the column and prevent it from slipping back down.",
            },
          ],
          answer:
            "Cohesion transmits the evaporative pull down an unbroken water column; adhesion anchors the column to the xylem walls.",
        },
      ],
      commonMistakes: [
        "Placing hydrogen bonds inside a single water molecule. Inside the molecule: polar covalent bonds. Between molecules: hydrogen bonds. Examiners look for the words between molecules.",
        "Writing \"water is polar because it has hydrogen bonds.\" The causality runs the other way: polarity causes hydrogen bonding.",
        "Explaining evaporative cooling as \"heat leaves\" without the mechanism: the highest-energy molecules escape, taking their energy with them.",
      ],
      takeaways: [
        "Electronegativity difference + bent shape → polar molecule with δ− oxygen and δ+ hydrogens.",
        "Hydrogen bonds are weak intermolecular attractions; their collective network creates water's emergent properties.",
        "Cohesion is water-to-water, adhesion is water-to-surface; together they explain surface tension, capillary action, and transpiration.",
        "High specific heat and high heat of vaporization both come from energy spent breaking hydrogen bonds.",
        "Polar dissolves polar: hydration shells for ions, exclusion for nonpolar (hydrophobic) substances.",
      ],
    },
  ],

  flashcards: [
    {
      id: "bio-fc-1.1-1",
      term: "Polar covalent bond",
      definition:
        "A covalent bond with unequal electron sharing; in water, oxygen's greater electronegativity pulls electrons toward itself, leaving partial charges (δ− on O, δ+ on H).",
      unitId: 1,
      topicId: "1.1",
      importance: 3,
    },
    {
      id: "bio-fc-1.1-2",
      term: "Hydrogen bond",
      definition:
        "A weak attraction between a partially positive hydrogen of one molecule and a partially negative atom (O or N) of another. Individually weak and short-lived; collectively responsible for water's emergent properties.",
      unitId: 1,
      topicId: "1.1",
      importance: 3,
    },
    {
      id: "bio-fc-1.1-3",
      term: "Cohesion vs. adhesion",
      definition:
        "Cohesion: attraction of water molecules to one another (surface tension, unbroken xylem columns). Adhesion: attraction of water to other polar surfaces (capillary rise along xylem walls).",
      unitId: 1,
      topicId: "1.1",
      importance: 3,
    },
    {
      id: "bio-fc-1.1-4",
      term: "Hydrophilic vs. hydrophobic",
      definition:
        "Hydrophilic substances are polar or charged and dissolve in water via hydration shells; hydrophobic substances are nonpolar and are excluded by water's hydrogen-bond network.",
      unitId: 1,
      topicId: "1.1",
      importance: 2,
    },
  ],

  mcq: [
    {
      id: "bio-mcq-1.1-1",
      unitId: 1,
      topicId: "1.1",
      difficulty: 1,
      skill: "Concept explanation",
      questionText: "Which statement correctly describes the bonds associated with a single water molecule in liquid water?",
      choices: [
        {
          letter: "A",
          text: "Hydrogen bonds join its O to its two H atoms; polar covalent bonds link it to neighboring molecules.",
          explanation: "This reverses the two bond types: the internal O-H bonds are covalent, and the links to neighbors are hydrogen bonds.",
        },
        {
          letter: "B",
          text: "Polar covalent bonds join its O to its two H atoms; hydrogen bonds link it to neighboring molecules.",
          explanation:
            "Correct. Within the molecule, O and H share electrons unequally in polar covalent bonds; between molecules, δ+ H atoms attract δ− O atoms of neighbors, forming hydrogen bonds.",
        },
        {
          letter: "C",
          text: "Ionic bonds join its O to its two H atoms; hydrogen bonds link it to neighboring molecules.",
          explanation: "Water's internal bonds involve shared electrons (covalent), not transferred electrons (ionic).",
        },
        {
          letter: "D",
          text: "Both the internal bonds and the intermolecular attractions are hydrogen bonds.",
          explanation: "The internal O-H bonds are far stronger polar covalent bonds; only the intermolecular attractions are hydrogen bonds.",
        },
      ],
      correctChoice: "B",
      source: "original",
    },
    {
      id: "bio-mcq-1.1-2",
      unitId: 1,
      topicId: "1.1",
      difficulty: 2,
      skill: "Property to mechanism",
      questionText:
        "Coastal cities experience milder temperature swings than inland cities at the same latitude. Which property of water best explains this, and what is its molecular basis?",
      choices: [
        {
          letter: "A",
          text: "High specific heat; energy absorbed by the ocean goes into breaking hydrogen bonds before raising water temperature.",
          explanation:
            "Correct. Large amounts of heat make only small changes in water temperature because hydrogen bonds must break first, so oceans store and release heat slowly, buffering nearby climates.",
        },
        {
          letter: "B",
          text: "Cohesion; water molecules hold together strongly enough to resist temperature change.",
          explanation: "Cohesion explains surface tension and water columns, not heat storage; sticking together is not the same as absorbing energy.",
        },
        {
          letter: "C",
          text: "Low density of ice; floating ice reflects sunlight away from the coast.",
          explanation: "Ice buoyancy matters for aquatic habitats, but the buffering of coastal air temperature is about the liquid ocean's heat capacity.",
        },
        {
          letter: "D",
          text: "Solvent ability; dissolved salts prevent the ocean from changing temperature.",
          explanation: "Dissolved solutes shift freezing points slightly but are not the reason water absorbs so much heat per degree.",
        },
      ],
      correctChoice: "A",
      source: "original",
    },
    {
      id: "bio-mcq-1.1-3",
      unitId: 1,
      topicId: "1.1",
      difficulty: 2,
      skill: "Data and diagram reasoning",
      questionText:
        "In the diagram of two water molecules shown in this topic's lesson, the dashed line represents an attraction. Between which two atoms does it form, and why?",
      choices: [
        {
          letter: "A",
          text: "Between two oxygen atoms, because both carry partial negative charges.",
          explanation: "Two δ− oxygens repel; the attraction requires opposite partial charges.",
        },
        {
          letter: "B",
          text: "Between two hydrogen atoms, because both carry partial positive charges.",
          explanation: "Two δ+ hydrogens repel each other; like charges cannot form the attraction.",
        },
        {
          letter: "C",
          text: "Between a hydrogen of one molecule and the oxygen of another, because δ+ attracts δ−.",
          explanation:
            "Correct. The hydrogen bond forms from the δ+ hydrogen of one molecule to the δ− oxygen of a neighboring molecule, opposite partial charges attracting.",
        },
        {
          letter: "D",
          text: "Between an oxygen and a hydrogen within the same molecule, because they share electrons.",
          explanation: "Shared electrons within one molecule describe the polar covalent O-H bond, drawn as solid lines, not the dashed intermolecular attraction.",
        },
      ],
      correctChoice: "C",
      source: "original",
    },
    {
      id: "bio-mcq-1.1-4",
      unitId: 1,
      topicId: "1.1",
      difficulty: 3,
      skill: "Prediction",
      questionText:
        "If water molecules were linear (H-O-H in a straight line) instead of bent but kept the same polar covalent bonds, which property would MOST directly be lost, and why?",
      choices: [
        {
          letter: "A",
          text: "Molecular polarity, because the two bond dipoles would point in opposite directions and cancel.",
          explanation:
            "Correct. In a linear molecule the equal and opposite O-H bond polarities cancel (like CO2), leaving no net dipole; without polarity there is no hydrogen bonding and the emergent properties collapse.",
        },
        {
          letter: "B",
          text: "Covalent bond strength, because linear bonds are weaker than bent bonds.",
          explanation: "Bond strength does not depend on the molecule being bent; the O-H covalent bonds would remain intact.",
        },
        {
          letter: "C",
          text: "Mass, because a linear molecule weighs less than a bent one.",
          explanation: "Geometry does not change the atoms present; the mass would be identical.",
        },
        {
          letter: "D",
          text: "The ability to form covalent bonds with other molecules.",
          explanation: "Water's special behavior rests on intermolecular attractions, not on forming covalent bonds with neighbors.",
        },
      ],
      correctChoice: "A",
      source: "original",
    },
    {
      id: "bio-mcq-1.1-5",
      unitId: 1,
      topicId: "1.1",
      difficulty: 1,
      skill: "Application",
      questionText: "Which observation is a direct consequence of cohesion between water molecules?",
      choices: [
        {
          letter: "A",
          text: "Salt crystals separate into ions when stirred into water.",
          explanation: "Dissolving ions is water's solvent property, driven by hydration shells, not cohesion.",
        },
        {
          letter: "B",
          text: "A paper towel draws water upward against gravity.",
          explanation: "Wicking into cellulose is dominated by adhesion of water to the polar fiber surfaces (with cohesion assisting); the defining single-property example of cohesion is surface tension.",
        },
        {
          letter: "C",
          text: "A steel needle can rest on the surface of still water.",
          explanation:
            "Correct. Surface tension comes from cohesion: surface molecules hydrogen-bond to neighbors beside and below, forming a film strong enough to support light objects.",
        },
        {
          letter: "D",
          text: "Sweat evaporating from skin lowers body temperature.",
          explanation: "Evaporative cooling reflects water's high heat of vaporization, not the surface film created by cohesion.",
        },
      ],
      correctChoice: "C",
      source: "original",
    },
  ],

  frq: [
    {
      id: "bio-frq-u1-short",
      type: "short",
      unitId: 1,
      topicIds: ["1.1"],
      context:
        "Researchers compared two greenhouse watering schedules for tomato seedlings. Group X was misted so leaf surfaces stayed wet; Group Y was watered at the soil only. On hot afternoons, Group Y seedlings maintained leaf temperatures about 3°C cooler than expected from air temperature, while wilting was rare in both groups. The researchers note that water moves continuously from the soil through each seedling's xylem to the leaves, where it evaporates through stomata (transpiration).",
      parts: [
        {
          letter: "a",
          task: "**Describe** the property of water that allows an unbroken column of water to be pulled up the narrow xylem from roots to leaves.",
          pointName: "Describe",
          pointsAvailable: 1,
          modelSolution:
            "Cohesion: water molecules attract one another through hydrogen bonds, so the molecules in the xylem column stick together and tension applied at the top pulls the whole column upward without breaking.",
          scoringNotes:
            "1 point for naming cohesion (or hydrogen bonding between water molecules) AND connecting it to the continuity of the water column. Naming adhesion alone does not earn the point.",
        },
        {
          letter: "b",
          task: "**Explain** how transpiration keeps Group Y leaf temperatures below air temperature on hot afternoons.",
          pointName: "Explain",
          pointsAvailable: 1,
          modelSolution:
            "Evaporative cooling: converting liquid water to vapor requires breaking hydrogen bonds, so evaporation consumes a large amount of energy (high heat of vaporization). The most energetic water molecules escape from the leaf surface, carrying that energy away and lowering leaf temperature.",
          scoringNotes:
            "1 point for linking evaporation to energy absorbed in breaking hydrogen bonds (or high heat of vaporization) with the consequence of heat removed from the leaf.",
        },
        {
          letter: "c",
          task:
            "The researchers seal the stomata of some Group Y seedlings with a waxy film. **Predict** the effect on leaf temperature on a hot afternoon.",
          pointName: "Predict",
          pointsAvailable: 1,
          modelSolution:
            "Leaf temperature will rise toward (or above) air temperature, because blocking the stomata stops transpiration, removing the evaporative cooling that had been carrying heat away.",
          scoringNotes: "1 point for predicting warmer leaves WITH the mechanism (loss of evaporative cooling). A bare direction with no mechanism earns nothing.",
        },
        {
          letter: "d",
          task:
            "In a second experiment, seedlings grown in a chamber with saturated (100% humidity) air wilted even though soil water was plentiful. **Justify** this observation using the transpiration mechanism.",
          pointName: "Justify",
          pointsAvailable: 1,
          modelSolution:
            "In saturated air, evaporation from the leaves essentially stops, so no tension is generated at the top of the xylem. Without that evaporative pull, upward water movement through the plant stalls, and cells that consume or lose water are not resupplied, so the seedlings can wilt despite wet soil.",
          scoringNotes:
            "1 point for reasoning that transpiration (evaporation) provides the pulling force for xylem transport, so saturated air halts water delivery to leaf cells.",
        },
      ],
      totalPoints: 4,
      source: "original",
    },
  ],
};
