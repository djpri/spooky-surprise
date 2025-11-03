import type { StoryNode } from "./storyNodes";

export const reflectionNodes: Record<string, StoryNode> = {
  reflection__archivist_of_ash__archivist: {
    id: "The Archivist of Ash",
    text: (playerName) =>
      "Shelves of candlelit skulls whisper fragments of your name as the Archivist passes, ledger open to a page not yet written. Soot falls like snow from a ceiling you cannot see. The Archivist does not look up. He never needs to — every story that ends here ends the same way: with a signature. Somewhere in the stacks, a skull exhales a single word: PLAYERNAME.\n\n“Truth is not a lantern,” he says, “it's a ledger. The cost is the column beside it.” He turns the book so you can read a line where your name should be. The space hums.\n".replace(
        /PLAYERNAME/g,
        String(playerName)
      ),

    choices: [
      {
        text: "Bargain for Knowledge",
        next: "reflection__archivist_of_ash__bargain_for_knowledge",
      },
      {
        text: "Refuse His Bargain",
        next: "reflection__archivist_of_ash__refuse_bargain",
      },
    ],
    imagePath: null,
  },
  reflection__archivist_of_ash__bargain_for_knowledge: {
    id: "Bargain for Knowledge",
    text: "Ink runs uphill. The Archivist's quill waits above a line where your name should be. He dips it in a well of ash that never empties. “We can write the loss now,” he offers gently, “or let the Child do it later.” His smile is kind and exhausted.\n\nAround you, shelves breathe. The skulls on them are patient; they have time to hear you decide.\n",

    diceCheck: {
      stat: "reason",
      target: 15,
      success: "reflection__archivist_of_ash__break_cycle",
      fail: "reflection__archivist_of_ash__madness",
    },

    imagePath: "/backgrounds/amulet.jpg",
  },
  reflection__archivist_of_ash__break_cycle: {
    id: "Ending — Break the Cycle (Transcendent)",
    text: "Guided by the Record, you edit your reflection — not to erase, but to reconcile. The Veil mends along your fault lines.\n",

    choices: [],
    imagePath: null,
  },
  reflection__archivist_of_ash__madness: {
    id: "Ending — Learn Too Much (Madness)",
    text: "Shelves breathe with you. You alphabetize your screams.\n",

    choices: [],
    imagePath: null,
  },
  reflection__archivist_of_ash__refuse_bargain: {
    id: "Ending — History Repeats (Fated)",
    text: "You close the ledger. Another you will read it later.\n",

    choices: [],
    imagePath: null,
  },
  reflection__chamber_of_glass__destroy_mirror: {
    id: "Destroy the Mirror",
    text: "You lift the lens. Truth cuts before it cleanses; the room holds its breath. On the mirror's surface, your mistakes line up like candles, some burned low, some never lit. Muir ripples, showing kindnesses you forgot to take credit for.\n\nSomewhere far away, glass hums in sympathy. You realize that if you shatter this one, somewhere, some version of you will have to keep singing to hold the seams together.\n",

    diceCheck: {
      stat: "insight",
      target: 14,
      success: "reflection__chamber_of_glass__world_cracks",
      fail: "reflection__chamber_of_glass__mirror_consumes",
    },

    imagePath: null,
  },
  reflection__chamber_of_glass__give_away_reflection: {
    id: "Ending — Save the Child, Forget Yourself",
    text: "The Child steps out. You remain, careful and bright, inside the glass.\n",

    choices: [],
    imagePath: null,
  },
  reflection__chamber_of_glass__mirror_child: {
    id: "Chamber of Glass — The Mirror Child",
    text: "In the glass, the child does not blink. Your lips press together; theirs part. It finishes the sentence you chose not to speak — not cruelly, not kindly, only precisely. When you lie, the fog on the glass writes the truth backward.\n\nEvery mirror in the chamber holds a different year of your face. Some have ash on the cheeks. Some are smiling and don't know why. The Child stands in all of them at once, a patient axis, waiting to see which you will choose to keep.\n",

    choices: [
      {
        text: "Give Away Your Reflection",
        next: "reflection__chamber_of_glass__give_away_reflection",
      },
      {
        text: "Destroy the Mirror",
        next: "reflection__chamber_of_glass__destroy_mirror",
      },
    ],
    imagePath: null,
  },
  reflection__chamber_of_glass__mirror_consumes: {
    id: "Ending — The Mirror Consumes You",
    text: "You fall between images, a breath trapped forever in glass.\n",

    choices: [],
    imagePath: null,
  },
  reflection__chamber_of_glass__world_cracks: {
    id: "Ending — The World Cracks but Survives",
    text: "Glass storms across the sky in hairline seams. Life continues, carefully.\n",

    choices: [],
    imagePath: "/backgrounds/moonDoor.jpg",
  },
  reflection__start: {
    id: "Reflection — The Mirror's Truth",
    text: (playerName) =>
      "Glass remembers everything, PLAYERNAME. When you breathe, the mirrors breathe back.\n\nThe Chamber of Glass rises like a grove of winter trees — tall panes, beveled edges catching candlelight in thin, cold lines. Every surface shows a true thing and a comforting lie, overlapping like ripples. Somewhere inside those echoing corridors, a child's voice hums a tune whose words you can't afford to recall. Further below, the Archivist catalogs choices you haven't made yet.\n\nSomewhere on the road, a wayfaring thaumaturge fans a brazier. His glaze sings when heated; his smile does the same.\n".replace(
        /PLAYERNAME/g,
        String(playerName)
      ),

    choices: [
      {
        text: "Enter the Chamber of Glass",
        next: "reflection__chamber_of_glass__mirror_child",
      },
      {
        text: "Seek the Archivist of Ash",
        next: "reflection__archivist_of_ash__archivist",
      },
      {
        text: "Meet Mr. Harriot at the Wayfarer's Fire",
        next: "reflection__wayfarers_fire__mr_harriot",
      },
    ],
    imagePath: "/backgrounds/Muir.jpg",
  },
  reflection__wayfarers_fire__accept_glaze: {
    id: "Harriot's Mirror-Glaze",
    text: "The glaze sings when heated, a thin, eager note that rings along your teeth. Your reflection lags a heartbeat behind and seems relieved to do so. When you look away, it keeps looking for a fraction too long, as if watching who you are when no one else is.\n",

    choices: [
      { text: "Return to the Reflection Path", next: "reflection__start" },
      {
        text: "Head for the Chamber of Glass",
        next: "reflection__chamber_of_glass__mirror_child",
      },
    ],
    imagePath: null,
  },
  reflection__wayfarers_fire__mr_harriot: {
    id: "Mr. Harriot at the Wayfarer's Fire",
    text: (playerName) =>
      "By a roadside brazier, he paints a shimmering glaze over a cracked hand-mirror. The brush leaves ripples that won't settle, as if the glass were a pond with a memory. “Name for a recipe,” he smiles. “A nickname will do, PLAYERNAME.”\n\nHe warms the mirror over coals that smell faintly of rosemary and something sweet you can't place. When the glaze sings, your reflection lags a heartbeat. The smile he gives you is friendly and not entirely for you.\n".replace(
        /PLAYERNAME/g,
        String(playerName)
      ),

    choices: [
      {
        text: "Trade a Name for Mirror-Glaze",
        next: "reflection__wayfarers_fire__accept_glaze",
      },
      { text: "Decline with Courtesy", next: "reflection__start" },
    ],
    imagePath: null,
  },
};
