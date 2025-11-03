import type { StoryNode } from "./storyNodes";

export const faithNodes: Record<string, StoryNode> = {
  "challenge-maerwyn": {
    id: "What Do You Truly Believe?",
    text: 'Sister Maerwyn stands motionless. Around you, the chapel holds its breath.\n\n"You\'re not supposed to ask that," she whispers.\n\n"But you\'ve wondered," you say.\n\nHer reflection moves a half-second late. It\'s not a reflection—it\'s something *wearing* her reflection, listening from the in-between. The Veil-Touched gather at the pyre field edges, drawn by doubt like moths to flame.\n\n"The pyres hold," Sister Maerwyn says, conviction gone. "They must hold. Because if they don\'t..."\n\nShe doesn\'t finish. The implication hangs in the dimness: if the pyres are faith without foundation, everything built on them collapses. The villagers\' safety, your purpose, the annual Hunt—all of it revealed as *negotiation with hunger* rather than *sacred protection*.\n\n"The choice is still yours," she says. "Light the pyres and continue. Or refuse, and face what happens when the machine stops."\n\nShe steps back. The Veil-Touched press closer.\n\nYou hold the lens. Nèamh, Muir, Talamh pulse with expectation.\n\nFaith that holds, or truth that breaks it?\n',

    choices: [
      {
        text: "Proceed with the pyres despite her doubt",
        next: "faith__village_at_dusk__faith_hardened_by_doubt",
      },
      {
        text: "Refuse the pyres; speak the doubt aloud",
        next: "faith__village_at_dusk__refuse_pyres",
      },
    ],
    imagePath: null,
  },
  "doubt-accepted": {
    id: "Faith Questioned",
    text: "You let the doubt step forward. It tastes like ash and salt—familiar, because it is *your* taste.\n\nThe lens cools further in your palm. Nèamh dims. Muir surfaces instead, the water-blue of reflection catching light from angles you didn't know existed. In it, you see not the Chapel but something *behind* the Chapel: a space where rituals go when they die. A graveyard of old faiths, old pyres, old certainties that someone once believed would save the world.\n\n\"What if,\" you ask quietly, \"the pyres are not salvation? What if they are simply *feeding*?\"\n\nThe doubt speaks in your voice, but it carries weight you didn't know you could hold.\n\nSister Maerwyn's composure flickers. For the first time, you see fear in her—not of the Veil, but of *you*, and the question you've just asked aloud.\n\nThe crowd murmurs. Some shuffle back. Some lean closer, desperate to hear an answer.\n\nYou have opened a door. The Veil watches. And now the question of what to do with doubt becomes *your* burden to carry.\n\nYour path has fractured. Time to walk the cracks.\n",

    choices: [
      {
        text: "Ask Sister Maerwyn what she truly believes",
        next: "challenge-maerwyn",
      },
    ],
    imagePath: null,
  },
  "doubt-rejected": {
    id: "Faith Reaffirmed",
    text: 'You push the doubt down. It snarls and writhes, but you have been trained to burn away such things.\n\n"The faith is not mine to question," you say aloud. "It is the *structure that holds*. If I allow doubt to speak, the Veil widens. The people fall. That is not mercy—that is abdication."\n\nNèamh flares in your lens. Your veins brighten, the black-gold burning toward pure white. The doubt doesn\'t vanish—it *sinks*, roots deep into your marrow, where it will feed on every sacrifice you make.\n\nSister Maerwyn nods with approval. The villagers relax.\n\nYou have chosen *to not choose*. You have chosen the role over the self. The doubt, unspeaking but alive, settles into your bones like ash that will never be cleaned.\n\nYour path is cleared. Time to light the pyres.\n',

    choices: [
      {
        text: "Light the pyres with renewed conviction",
        next: "faith__village_at_dusk__rekindle_pyres",
      },
    ],
    imagePath: null,
  },
  faith__start: {
    id: "Faith — The Light That Burns",
    text: (playerName) =>
      "Smoke-sweet air and candle stubs in windows. Bells ring with no hands. Sister Maerwyn meets your gaze, PLAYERNAME, and does not look away.\n\nShe presses a taper into your palm. “The Year's End isn't a night,” she says, “it's a decision that takes a year to pay for.” The pyre fields lie ready — circles of char and bone-white stones, each labeled with a name that might yet be saved or surrendered. In the distance, children chalk mirrors; their parents pretend not to notice the way reflections arrive a blink late.\n\nYour lens warms at the prospect of order. The crowd, at the prospect of certainty. The Veil does not care how you choose, only that you understand the cost.\n".replace(
        /PLAYERNAME/g,
        String(playerName)
      ),

    choices: [
      {
        text: "Rekindle the Pyres with Sister Maerwyn",
        next: "faith__village_at_dusk__rekindle_pyres",
      },
      {
        text: "Refuse to Light the Pyres",
        next: "faith__village_at_dusk__refuse_pyres",
      },
      { text: "Confront your own doubt", next: "faith-own-faith-fractures" },
    ],
    imagePath: "/backgrounds/lantern.jpg",
  },
  faith__village_at_dusk__burn_both: {
    id: "Pyre Dilemma — Burn Both",
    text: "You steady the lens. Wheat and weeds together — mercy in the fire's language. The crowd murmurs a prayer you don't remember teaching them. Heat lifts the hair on your arms as Nèamh flares; the oil darkens to a mirror where faces blur, names thinning to smudges.\n\n“Do it,” says one voice. “Wait,” says another. They might be the same person. Muir shows you who begged, who stole, who carried grain to a hungry neighbor. Talamh drinks in their echoes. If you falter, the breeze will decide for you.\n",

    diceCheck: {
      stat: "fortitude",
      target: 12,
      success: "faith__village_at_dusk__veil_holds",
      fail: "faith__village_at_dusk__martyr",
    },

    imagePath: null,
  },
  faith__village_at_dusk__corruption_spreads: {
    id: "Ending — The Corruption Spreads (Despair)",
    text: "Mercy blooms into rot. Veil-Touched sweep ashes that return as they breathe.\n",

    choices: [],
    imagePath: null,
  },
  faith__village_at_dusk__faith_hardened_by_doubt: {
    id: "Ending — Faith Hardened by Doubt",
    text: "You light the pyres, but something in you calcifies. The ritual holds; the village sleeps. Doubt sets like glass in your bones.\n\nSister Maerwyn thanks you with a voice that sounds like relief and pity braided together. Bells ring with no hands. Candles lean, but they do not warm you.\n\nYou have chosen safety over truth. The Veil holds — and so does the machinery.\n\n",

    choices: [],
    imagePath: null,
  },
  faith__village_at_dusk__faithless_ending: {
    id: "Ending — The Gods Abandon the Faithful",
    text: "Candles stand upright. The Sun's breath is silent. Prayers continue out of habit, like sweeping an empty room.\n",

    choices: [],
    imagePath: null,
  },
  faith__village_at_dusk__martyr: {
    id: "Ending — The Brichan Crumbles to Ash (Martyr)",
    text: "The alignment is perfect — and fatal. Villagers gather you in urns and whisper you as a prayer.\n",

    choices: [],
    imagePath: null,
  },
  faith__village_at_dusk__refuse_pyres: {
    id: "Refuse the Pyres",
    text: "You lower the torch. The murmurs sharpen. Somewhere, a mirror turns its face to the wall. You try to steady the gathering with your breath alone — but breath is a kind of wind, and wind loves to feed fires.\n\n“If not the pyres,” someone says, “then what?” Your veins answer with a warning pulse. The Veil leans closer to hear your reply.\n",

    diceCheck: {
      stat: "presence",
      target: 12,
      success: "faith__village_at_dusk__veil_opens_early",
      fail: "faith__village_at_dusk__witch_trial",
    },

    imagePath: null,
  },
  faith__village_at_dusk__rekindle_pyres: {
    id: "Village at Dusk — Rekindle the Pyres",
    text: "Sister Maerwyn's hands smell of smoke and wax. “The pyres must burn,” she says, “even if the names do with them.” The fields beyond the hedge are a sheet of dark water; every breath raises a ripple of frost. Villagers stand in a wide crescent, their faces bright as coins in the firelight, their reflections wavering in the bowls of oil.\n\nYour lens hums in the palm of your hand. Nèamh warms your knuckles with the promise of clean endings. Muir cools your wrist with questions. Talamh thrums up your bones like a steady drum. Somewhere behind the crowd, a child counts the chimneys. The number changes each time.\n",

    choices: [
      {
        text: "Burn both Innocent and Wicked",
        next: "faith__village_at_dusk__burn_both",
      },
      {
        text: "Save the Innocent Spirit",
        next: "faith__village_at_dusk__save_innocent",
      },
    ],
    imagePath: null,
  },
  faith__village_at_dusk__save_innocent: {
    id: "Mercy Path — Save the Innocent",
    text: "You cut the chain before the flame takes it. The innocent breath fills the cold air — and something else inhales too. The bowl gutters; the saved spirit skims your cheek like a moth escaping a jar.\n\nSister Maerwyn says nothing. The villagers say everything with their eyes. Muir cools your palm with relief that feels untrustworthy. On the horizon, smoke uncoils from chimneys that were not there a moment ago. You have spared one — and invited consequence.\n",

    diceCheck: {
      stat: "insight",
      target: 13,
      success: "faith__village_at_dusk__faithless_ending",
      fail: "faith__village_at_dusk__corruption_spreads",
    },

    imagePath: null,
  },
  faith__village_at_dusk__veil_holds: {
    id: "Ending — The Veil Holds (Tragic Victory)",
    text: "The Veil steadies. Fields blacken. Names blur at their edges. Bells ring with no hands.\n",

    choices: [],
    imagePath: null,
  },
  faith__village_at_dusk__veil_opens_early: {
    id: "Ending — The Veil Opens Early (World Collapse)",
    text: "The sky tears along hairline cracks. Doors refuse to stay closed. The year ends before it begins.\n",

    choices: [],
    imagePath: null,
  },
  faith__village_at_dusk__witch_trial: {
    id: "Ending — You Burn Instead (Condemnation)",
    text: "Rope, wood, and certainty. Your reflection keeps talking when you cannot.\n",

    choices: [],
    imagePath: null,
  },
  "faith-own-faith-fractures": {
    id: "Your Own Faith Fractures",
    text: 'You stand in the Chapel of Sighing Stone. The pyres are ready. Sister Maerwyn looks to you for certainty.\n\nAnd you have none.\n\nIt hits you like a bell rung in reverse—the sound of something *missing*. All the rituals, all the oaths sworn in Nèamh\'s light, all of Elar\'s teachings suddenly feel like *armor* rather than *belief*.\n\nThe candlelight leans toward you, but in *request*, not in *answer*. As if the Veil itself asks: "Do you truly believe this will hold?"\n\nIn your bones, you hear Elar\'s echo: "The light consumes. Names slip. Faith hardens into something that protects nothing but itself."\n\nThe Veil does not thin because you have faith. It thins because it *chooses* to. Every pyre, every prayer, every sacrifice—are these acts of salvation, or acts of *negotiation with hunger*?\n\nSister Maerwyn watches. The villagers murmur. Your lens feels cold now, not warm.\n\nGiven faith, or doubt that sees too clearly?\n\n',

    choices: [
      {
        text: "Defend your faith; push back against doubt",
        next: "doubt-rejected",
      },
      { text: "Acknowledge the doubt; let it speak", next: "doubt-accepted" },
    ],
    imagePath: null,
  },
};
