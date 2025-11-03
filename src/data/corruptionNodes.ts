import type { StoryNode } from "./storyNodes";

export const corruptionNodes: Record<string, StoryNode> = {
  corruption__ashen_bride__accept_ring: {
    id: "Accept the Bride's Ring",
    text: "Ash and lace tighten at your wrist. Two pulses in one vein.\n",

    diceCheck: {
      stat: "will",
      target: 14,
      success: "corruption__ashen_bride__gnostic_wedding",
      fail: "corruption__ashen_bride__reflection_binds",
    },

    imagePath: null,
  },
  corruption__ashen_bride__ashen_bride: {
    id: "The Ashen Bride",
    text: "She offers a ring braided from hair and wick-thread. If worn, your reflection answers to her before it answers to you. The veil she wears is not cloth but breath: ash settling, rising, settling again.\n\nHer eyes are the color of extinguished incense. “This is not slavery,” she says, “it is grammar. We will decide together where the sentence ends.” When she smiles you feel your pulse double, as if your heart were practicing for a duet.\n",

    choices: [
      { text: "Accept the Ring", next: "corruption__ashen_bride__accept_ring" },
      { text: "Refuse the Ring", next: "corruption__ashen_bride__refuse_ring" },
      {
        text: "Bargain the Terms",
        next: "corruption__ashen_bride__bargain_ring",
      },
    ],
    imagePath: null,
  },
  corruption__ashen_bride__bargain_ring: {
    id: "Bargain the Terms",
    text: "You name a price. She names a boundary. The mirror waits.\n",

    diceCheck: {
      stat: "insight",
      target: 15,
      success: "corruption__ashen_bride__earned_balance",
      fail: "corruption__ashen_bride__refuse_ring",
    },

    imagePath: null,
  },
  corruption__ashen_bride__earned_balance: {
    id: "Ending — Earned Balance (Integration without Surrender)",
    text: "You keep your name. The Bride nods once and looks away. Candles neither lean nor flee.\n",

    choices: [],
    imagePath: null,
  },
  corruption__ashen_bride__gnostic_wedding: {
    id: "Ending — Gnostic Wedding (Integration Variant)",
    text: "Union brings comprehension and constraint. The Veil rests; freedom narrows.\n",

    choices: [],
    imagePath: null,
  },
  corruption__ashen_bride__reflection_binds: {
    id: "Ending — Reflection Binds to Her (Loss of Autonomy)",
    text: "Your reflection looks to her before it looks to you.\n",

    choices: [],
    imagePath: null,
  },
  corruption__ashen_bride__refuse_ring: {
    id: "Ending — She Withholds Aid (Hard Path)",
    text: "You lower your hand. Frost forms on nearby glass.\n",

    choices: [],
    imagePath: null,
  },
  corruption__beneath_the_altar__abyssal_power: {
    id: "Ending — Gain Power, Lose Humanity (Abyssal)",
    text: "Light burns black-violet. Doors open when you do not ask.\n",

    choices: [],
    imagePath: null,
  },
  corruption__beneath_the_altar__balance: {
    id: "Ending — Achieve Balance (True Victory)",
    text: "The triad holds. The world is safer. You are less yourself.\n",

    choices: [],
    imagePath: null,
  },
  corruption__beneath_the_altar__bind: {
    id: "Bind the Spirit",
    text: "You draw the circle twice and say the name once. The roots above you tense. The spirit tests the circle and finds it holds. “All right,” it whispers, almost relieved. “But you keep the key where I can see it.”\n",

    diceCheck: {
      stat: "ritual",
      target: 15,
      success: "corruption__beneath_the_altar__balance",
      fail: "corruption__beneath_the_altar__inner_torment",
    },

    imagePath: "/backgrounds/soulLock.jpg",
  },
  corruption__beneath_the_altar__bound_spirit: {
    id: "Beneath the Altar — The Bound Spirit",
    text: "A tarnished censer pulses with stolen breaths. Spirits circle it like moths to a wound. Each pass leaves a thread of light snagged on the brass like a web. The bindings are not only ritual — they are habit, the most dangerous kind.\n\nWhen you lift the lens, Talamh pulls at your wrist, eager to resolve the knot. Muir shows you the moment the spirit was taken — a hand you almost recognize, a debt you thought you'd paid. Nèamh brightens, promising a clean end that might not be the right one.\n",

    choices: [
      { text: "Devour It", next: "corruption__beneath_the_altar__devour" },
      { text: "Free It", next: "corruption__beneath_the_altar__free" },
      { text: "Bind It", next: "corruption__beneath_the_altar__bind" },
    ],
    imagePath: "/backgrounds/cellar.jpg",
  },
  corruption__beneath_the_altar__devour: {
    id: "Devour the Spirit",
    text: "You open the inner ring. Hunger answers. The air snaps cold, then hot; the bindings twitch like veins waking from sleep. You taste iron and old prayers. If you keep going, there won't be any left to say.\n",

    diceCheck: {
      stat: "will",
      target: 14,
      success: "corruption__beneath_the_altar__new_god",
      fail: "corruption__beneath_the_altar__abyssal_power",
    },

    imagePath: null,
  },
  corruption__beneath_the_altar__free: {
    id: "Free the Spirit",
    text: "You loosen the bindings. The censer sighs. The spirit expands like a breath held too long, touching every root, every stone. Gratitude brushes your cheek — and then something larger inhales from the dark beyond the wall.\n",

    diceCheck: {
      stat: "mercy",
      target: 12,
      success: "corruption__beneath_the_altar__veil_weakens",
      fail: "corruption__beneath_the_altar__spirit_betrays",
    },

    imagePath: null,
  },
  corruption__beneath_the_altar__inner_torment: {
    id: "Ending — It Whispers Madness (Inner Torment)",
    text: "Bound power bleeds into thought. Your shadow moves its lips when you don't.\n",

    choices: [],
    imagePath: null,
  },
  corruption__beneath_the_altar__new_god: {
    id: "Ending — Merge With the Spirit (New God)",
    text: "You and the bound spirit share one will. Birds stop mid-flight when you exhale.\n",

    choices: [],
    imagePath: null,
  },
  corruption__beneath_the_altar__spirit_betrays: {
    id: "Ending — The Spirit Betrays You (Despair)",
    text: "Kindness opens the door. Hunger walks through wearing your name.\n",

    choices: [],
    imagePath: null,
  },
  corruption__beneath_the_altar__veil_weakens: {
    id: "Ending — The Veil Weakens (World Fracture)",
    text: "Fractures spread moth-quiet. Doors refuse to stay closed.\n",

    choices: [],
    imagePath: null,
  },
  corruption__descent_into_rootdeep__deeper_the_fading: {
    id: "Deeper — The Fading",
    text: "As you descend, the voices shift and fracture. Some shriek unbearably, others groan subsonic in your bones. They thin—stretching into wisps that break apart mid-cry, fading to nothing.\n\n*You* are leaving *them* behind.\n\nWith each step, the cost becomes clear:\n- Your breath slows, the air too thin or too old.\n- Your joints ache with borrowed decades.\n- Talamh's light gutters like a candle in windless dark.\n- The corruption beneath your skin pulses more hungrily.\n\nThe wailing becomes an echo of an echo. The spirits seal themselves above, unable to follow. Their cries fade through stone and centuries.\n\nThen, silence. Not absence—the silence of a held breath. Something patient and aware, waiting where sound forgets how to move.\n\nYou have descended past the suffering of the many. What remains is singular.\n\n",

    choices: [
      {
        text: "Continue your descent into the void",
        next: "corruption__descent_into_rootdeep__void_face_to_face",
      },
      {
        text: "Resist the pull and try to ascend",
        next: "corruption__descent_into_rootdeep__void_face_to_face",
      },
      {
        text: "Steady yourself and press on without hesitation",
        next: "corruption__descent_into_rootdeep__void_face_to_face",
      },
    ],
    imagePath: "/backgrounds/brichan_cave.webp",
  },
  corruption__descent_into_rootdeep__entry_the_voices: {
    id: "Rootdeep Entry — The Wailing Spirits",
    text: "The mouth of Rootdeep yawns before you—a throat of stone that smells of deep earth and something ancient. As you descend, your breath echoes off walls worn smooth by centuries. Then you hear them.\n\nVoices. All female. All wailing.\n\nThey spiral up like smoke from a thousand candles—a *cacophony* of pleas, mourning, accusations, wordless keening from the stone itself. One voice breaks into fractured harmony, another rises and falls like a wave, another sounds screamed backwards through time.\n\nThis is every sorrow the cave has swallowed. Centuries of spirits bound at the Veil's edge, all female, all caught between worlds. They cry out in desperate recognition—your arrival is a chance for witness, for burial, for judgment, for *anything* but endless darkness.\n\nYour lantern dims. Talamh gutters.\n\nThe voices grow louder, more *numerous*, stirring awake. They know what you carry. Some beg. Some warn. Some call you *home*.\n\n",

    choices: [
      {
        text: "Press deeper into the chaos of voices",
        next: "corruption__descent_into_rootdeep__deeper_the_fading",
      },
      {
        text: "Attempt to hear an individual plea and follow it",
        next: "corruption__descent_into_rootdeep__deeper_the_fading",
      },
      {
        text: "Brace yourself and descend with haste, pushing past the sorrow",
        next: "corruption__descent_into_rootdeep__deeper_the_fading",
      },
    ],
    imagePath: "/backgrounds/brichan_cave.webp",
    audioPath: "/audio/cave_voices.mp3",
  },
  corruption__descent_into_rootdeep__final_trial: {
    id: "The Descent into Rootdeep — Final Trial",
    text: "The threshold to Rootdeep opens before you—a crack in the world that tastes of ages and dust older than prayer. The lantern made from three mirrors flares once, as if in warning, then settles to a dim and anxious glow. Each breath you take at this precipice is borrowed from a version of you that will never leave. To descend is to accept that you will emerge changed—if you emerge at all.\n\nBelow, even at this distance, you sense them: the spirits and the guardian both, waiting in the dark like memory and hunger pressed into stone.\n\nThe descent will cost you. \n- Years will settle into your joints.\n- Your face will age in the mirror of black-violet stone.\n- The marks beneath your skin will pulse with hunger you have tried to ignore.\n\nBut it is the only way forward. The guardian is not something to avoid or bind. It is something to *meet*.\n\nStep down into the dark. Listen to what waits. Choose what you become.\n",

    choices: [
      {
        text: "Begin the descent into Rootdeep",
        next: "corruption__descent_into_rootdeep__entry_the_voices",
      },
    ],
    imagePath: "/backgrounds/lanternTaken.jpg",
  },
  corruption__descent_into_rootdeep__guardian_consumes: {
    id: "Ending — The Guardian Consumes (Hollow Escape)",
    text: "You press the shadow down until it slips your grip and takes the hand that held it. The cave exhales your name and keeps the breath.\n\nYou climb out lighter only where it matters; elsewhere, you are a husk packed with obligation. People are saved. You are not.\n\nThe cycle continues. The shadow is patient. It does not need to eat quickly to win.\n",

    choices: [],
    imagePath: "/backgrounds/brichan_cave.webp",
  },
  corruption__descent_into_rootdeep__guardian_transforms: {
    id: "Ending — The Guardian Transforms (True Integration)",
    text: "You turn and let it turn with you. Where teeth waited, there are tools; where claws coiled, there are hands. The shadow steps forward and does not need to speak to be understood.\n\nYou emerge older than you entered — hair threaded with frost, breath quieter, eyes steady. The Veil mends along your fault lines. You carry both hunger and light without lying about either.\n\nThe cycle breaks here. Not through power, but through integration.\n\n",

    choices: [],
    imagePath: "/backgrounds/brichan_cave.webp",
  },
  corruption__descent_into_rootdeep__void_face_to_face: {
    id: "The Void — Face to Face with the Guardian",
    text: "At the bottom of the descent, the Wailing ceases. A door seals between you and the spirits above.\n\nWhat remains is singular.\n\nIn the absolute darkness, you sense movement—something *vast* and *patient*. Not breath, but something like it. A presence so large the cave seems small around it.\n\nThen it moves. Stone grinds against stone. Something that might be a heartbeat echoes in the dark.\n\nThis is the **Cave Guardian**—Elar's unintegrated shadow, embodied hunger, every unlived life given form. It has waited here since before you were born, patient as stone.\n\nYour lantern gutters. The light of Talamh flickers. For a moment you see it—bone, root, and hunger twisted together.\n\nDarkness returns. You are alone with its breathing.\n\nThe spirits above cannot help you. Your light is a flame in a closing fist. The Guardian does not wish to speak.\n\nIt wishes to know if you can accept what you are—and what it is—without pretense, without the comfortable lie that one is light and the other only shadow.\n\nThis is the final moment. The cycle breaks here, or continues.\n\n",

    choices: [
      {
        text: "Let it stand beside you",
        next: "corruption__descent_into_rootdeep__guardian_transforms",
      },
      {
        text: "Grind it under heel",
        next: "corruption__descent_into_rootdeep__guardian_consumes",
      },
    ],
    imagePath: "/backgrounds/brichan_cave.webp",
    audioPath: "/audio/cave_monster.mp3",
  },
  corruption__start: {
    id: "Corruption — The Root Flame",
    text: (playerName) =>
      "Roots seize stone; the old fire hums low. What you bind binds you back, PLAYERNAME.\n\nUnder the chapel, the air tastes of coins and wet dirt. Roots thread the vaulting like ribs. In the center, an altar-stone veined with soot sleeps over a throat in the world. When you align Talamh with the others, the stone feels you like a tooth feels a tongue.\n\n“Name me,” whispers something patient and proud. Another voice — softer, nearer — promises vows in the language of ash and lace. Beneath them both, the bound spirit thrums, a knot that could be cut, devoured, or taught to hold.\n".replace(
        /PLAYERNAME/g,
        String(playerName)
      ),

    choices: [
      {
        text: "Descend to the Bound Spirit",
        next: "corruption__beneath_the_altar__bound_spirit",
      },
      {
        text: "Listen to the Voice Beneath the Altar",
        next: "corruption__voice_beneath_the_altar__voice",
      },
      {
        text: "Answer the Ashen Bride",
        next: "corruption__ashen_bride__ashen_bride",
      },
      {
        text: "Descend into Rootdeep — Final Trial",
        next: "corruption__descent_into_rootdeep__final_trial",
      },
    ],
    imagePath: "/backgrounds/talamh.jpg",
  },
  corruption__voice_beneath_the_altar__condemn_voice: {
    id: "Ending — Condemn the Voice (Eternal Cycle)",
    text: "The altar seals. The next you will open it again.\n",

    choices: [],
    imagePath: null,
  },
  corruption__voice_beneath_the_altar__free_voice: {
    id: "Ending — Free the Voice (Collapse)",
    text: "Walls inhale. The world exhales.\n",

    choices: [],
    imagePath: "/backgrounds/secretPassage.jpg",
  },
  corruption__voice_beneath_the_altar__merge_voice: {
    id: "Ending — Merge With the Voice (Omniscient)",
    text: "You speak with every voice and cannot stop hearing.\n",

    choices: [],
    imagePath: null,
  },
  corruption__voice_beneath_the_altar__voice: {
    id: "The Voice Beneath the Altar",
    text: "The cracks murmur in your childhood tone, then your mother's, then your own: “I bear the name you buried.” The Voice carries three registers — judgment like sun-heat on your scalp, reflection like cool riverwater in your mouth, and root-flame like a coal under the tongue. Each offers a truth; each demands a price.\n\nYou feel the shape of yourself as the Voice understands it: a mask smoothed for strangers, a hunger that keeps to the dark, a tender calling braided with ash and lace. Something quiet waits at the center, patient as winter.\n",

    choices: [
      {
        text: "Free the Voice",
        next: "corruption__voice_beneath_the_altar__free_voice",
      },
      {
        text: "Merge With It",
        next: "corruption__voice_beneath_the_altar__merge_voice",
      },
      {
        text: "Condemn It",
        next: "corruption__voice_beneath_the_altar__condemn_voice",
      },
    ],
    imagePath: "/backgrounds/whisper.jpg",
  },
};
